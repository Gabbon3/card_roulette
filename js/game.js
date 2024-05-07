$(document).ready(() => {
        game.init();
        game.init_round();
        $('#nuova_partita').on('click', () => {
        game.init();
        game.init_round();
    });
});

class Card_Roulette {
    constructor() {
        this.mazzo = new Mazzo(['rosso', 'nero']);
        // this.dealer = new Dealer();
        // 0 il dealer 1 il player
        this.giocatori = {
            0: { 
                vite: 4, 
                gadgets: [],
                scudo: false,
            }, 
            1: { 
                vite: 4, 
                gadgets: [],
                scudo: false,
            } 
        };
        this.max_vita = 4;
        this.n_veri = 0;
        this.n_falsi = 0;
        this.current_player = null;
        this.proiettili = [];
        this.index_proiettile = 0;
        this.proiettili_esauriti = false;
        this.tempo_attesa_sparo = 1000;
        this.timeouts = new Timeouts();
    }

    init() {
        // inizializzo le variabili
        this.danno = 1;
        // inizializzo le vite dei giocatori
        const vite = this.max_vita;
        this.giocatori = {
            0: { 
                vite: vite, 
                gadgets: [],
                scudo: false,
            }, 
            1: { 
                vite: vite, 
                gadgets: [],
                scudo: false,
            } 
        };
        // html vite
        html.stampa_vite(vite, vite);
        // --- inizializzo il mazzo
        this.mazzo._init();
        this.mazzo.mescola(4);
        // round
        this.termina_partita = false;
        this.proiettili_esauriti = false;
        // inizializzo tutti i timeout
        this.timeouts.clear_all();
    }

    init_round() {
        log.reset();
        this.timeouts.clear_all();
        const n_proiettili = random.min_max(2, 8);
        this.index_proiettile = 0;
        this.n_veri = 0;
        this.n_falsi = 0;
        this.proiettili = [];
        this.termina_partita = false;
        this.proiettili_esauriti = false;
        dealer.known_bullets = {};
        // scelgo le carte che faranno da proiettile
        for (let i = 0; i < n_proiettili; i++) {
            const proiettile = game.mazzo.pesca();
            this.proiettili.push(proiettile);
            // --
            proiettile.sfondo == 'rosso' ? this.n_veri++ : this.n_falsi++;
        }
        // se non ci sono carte di un tipo o di un altro rieseguo l'estrazione
        if (this.n_veri == 0 || this.n_falsi == 0) return this.init_round();
        // stampo le carte
        log.print('Ci sono ' + this.n_veri + ' proiettili veri e ' + this.n_falsi + ' falsi');
        html.stampa_carte_round(this.proiettili);
        // inizializzo i gadgets
        const n_gadgets = random.min_max(2, 4);
        this.giocatori[0].gadgets = this.giocatori[0].gadgets.concat(this.genera_gadgets(n_gadgets));
        this.giocatori[1].gadgets = this.giocatori[1].gadgets.concat(this.genera_gadgets(n_gadgets));
        // ordino i gadgets
        this.ordina_gadgets(this.giocatori[0].gadgets);
        this.ordina_gadgets(this.giocatori[1].gadgets);
        // stampo i gadgets
        html.stampa_gadgets();
        // avvio il turno
        const who_start = this.current_player != null ? (this.current_player == 0) : random.bool();
        who_start ? dealer.dealer_turn() : player.player_turn();
        // player.player_turn();
    }
    /**
     * Genera i gadgets
     */
    genera_gadgets(n_gadgets) {
        const arr = [];
        for (let i = 0; i < n_gadgets; i++) {
            const random_gadget = gadgets.arr[random.min_max(0, gadgets.arr.length - 1)];
            arr.push(random_gadget);
        }
        return arr.reverse();
    }
    ordina_gadgets(arr) {
        return arr.sort((a, b) => gadgets.arr.indexOf(a) - gadgets.arr.indexOf(b)).reverse();
    }
    /**
     * spara il proiettile
     * @param {Number} giocatore il giocatore che verrà colpito
     */
    spara(giocatore) {
        if (this.proiettili_esauriti) {
            return;
        }
        const proiettile = this.proiettili[this.index_proiettile];
        const proiettili_html = document.querySelectorAll('#game .carta');
        // il proiettile è vero?
        const p_vero = proiettile.sfondo == 'rosso';
        // se è vero rimuovo una vita dal giocatore selezionato
        // nel frattempo riduco le variabili per capire quanti proiettili falsi/veri ci sono
        if (p_vero) {
            this.n_veri--;
            // se il giocatore non ha lo scudo attivo
            if (!this.giocatori[giocatore].scudo) {
                const vite = game.giocatori[giocatore].vite;
                game.giocatori[giocatore].vite -= (vite > 1 ? this.danno : 1);
            }
        } else {
            this.n_falsi--;
        }
        // se il giocatore ha utilizzato lo scudo lo disattivo
        if (this.giocatori[giocatore].scudo) {
            this.giocatori[giocatore].scudo = false;
        }
        // resetto il danno nel caso venisse raddoppiato con il gadgets
        this.danno = 1;
        // prima di mostrare la carta attendo per mettere suspance
        this.timeouts.add(() => {
            proiettili_html[this.index_proiettile].classList.add('coperta');
            game.index_proiettile++;
            if (p_vero && giocatore == 1) {
                html.death_screen();
            }
            // stampo le vite
            game.timeouts.add(() => {
                html.stampa_vite();
                game.check_vite();
            }, 1000);
        }, this.tempo_attesa_sparo);
        // ---
        return p_vero;
    }
    /**
     * verifica se ci sono ancora proiettili da giocare se no nuovo round
     * @returns {Boolean} true puo continuare il round, false sono terminati i proiettili
     */
    check_round() {
        if (game.index_proiettile == game.proiettili.length) {
            this.timeouts.clear_all();
            log.print('Proiettili esauriti, nuovo round');
            setTimeout(() => {
                this.init_round();
            }, 4000);
            return false;
        }
        return true;
    }
    /**
     * controlla le vite
     */
    check_vite() {
        // se il dealer non ha piu vite
        if (game.giocatori[0].vite <= 0) {
            this.termina_partita = true;
            this.timeouts.clear_all();
            alert('HAI VINTO!');
            return;
        }
        if (game.giocatori[1].vite == 0) {
            this.termina_partita = true;
            this.timeouts.clear_all();
            alert('HAI PERSO!');
            return;
        }
    }
}

const game = new Card_Roulette();

const log = {
    print(msg) {
        // Ottenere il contenitore con overflow
        const container = document.querySelector('#log');
        const span = document.createElement('span');
        // Inserire il nuovo elemento
        container.appendChild(span);
        typewriter(msg, span, 40);
        // Scorrere il contenitore fino alla fine
        container.scrollTop = container.scrollHeight;
    },
    reset() {
        $('#log').html('');
    }
}