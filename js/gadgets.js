$(document).ready(() => {
    $(document).on('click', '.gadget', (e) => {
        gadgets.btn_click(e.currentTarget);
    });
});

const gadgets = {
    arr: ['🚬', '🔎', '📞', '🔧', '🧨', '🛡️', '💊', '🍺'],
    info: {
        '🚬': 'Recupera una vita', // sigaretta
        '🔎': 'Vedi proiettile', // lente di ingrandimento
        '📞': 'Scopri casualmente un proiettile', // telefono
        '🧨': 'Raddoppia il danno', // dinamite
        '🛡️': 'Proteggiti dal prossimo attacco, qualsiasi esso sia', // scudo
        '🔧': 'Cambia il tipo di proiettile', // chiave inglese
        '💊': '50% di possibilità di perdere o recuperare una vita', // pillola misteriosa
        '🍺': 'Scarta Proiettile', // birra
    },
    actions: {},
    ragnatela_attiva: false,
    // ---
    active(emoji, giocatore) {
        if (this.actions[emoji]) {
            this.actions[emoji](giocatore);
            log.print('Il ' + html.nome_giocatore(giocatore) + ' attiva il gadget ' + emoji);
        } else {
            console.log('Emoji non supportata');
        }
    },
    /**
     * 
     */
    sigaretta(giocatore) {
        if (game.giocatori[giocatore].vite >= game.max_vita) return;
        game.giocatori[giocatore].vite++;
        html.stampa_vite();
    },
    /**
     * 
     */
    pillola_misteriosa(giocatore) {
        const result = random.bool();
        if (result) {
            if (!(game.giocatori[giocatore].vite >= game.max_vita)) {
                game.giocatori[giocatore].vite++;
            }
        } else {
            game.giocatori[giocatore].vite--;
        }
        html.stampa_vite();
        game.check_vite();
    },
    /**
     * 
     */
    birra() {
        const proiettili_html = document.querySelectorAll('#game .carta');
        proiettili_html[game.index_proiettile].classList.add('coperta');
        game.index_proiettile++;
        game.check_round();
    },
    /**
     *
     */
    telefono(giocatore) {
        const result = random.min_max(game.index_proiettile, game.proiettili.length - 1);
        // se è il player
        if (giocatore == 1) {
            // recupero i proiettili html
            const proiettili_html = document.querySelectorAll('#game .carta');
            const proiettile = proiettili_html[result];
            // mostro il proiettile
            proiettile.classList.add('coperta');
            setTimeout(() => {
                proiettile.classList.remove('coperta');
            }, 2500);
        }
        // se è il dealer
        else if (giocatore == 0) {
            const tipo_proiettile = game.proiettili[result].sfondo == 'rosso';
            dealer.known_bullets[result] = tipo_proiettile;
        }
    },
    /**
     * 
     */
    chiave_inglese() {
        const proiettile_html = document.querySelectorAll('#game .carta')[game.index_proiettile].getElementsByClassName('retro')[0];
        const proiettile = game.proiettili[game.index_proiettile];
        // scambio
        const sfondo = proiettile.sfondo == 'rosso' ? 'nero' : 'rosso';
        // sul codice
        proiettile.sfondo = sfondo;
        // nell'html
        proiettile_html.setAttribute('class', 'retro ' + sfondo);
        // modifico anche il numero di proiettili
        proiettile.sfondo === 'rosso' ? (game.n_veri++, game.n_falsi--) : (game.n_veri--, game.n_falsi++);
    },
    /**
     * 
     */
    dinamite() {
        game.danno = 2;
    },
    /**
     *
     */
    lente_di_ingrandimento(giocatore) {
        // se è il player
        if (giocatore == 1) {
            // recupero i proiettili html
            const proiettili_html = document.querySelectorAll('#game .carta');
            const proiettile = proiettili_html[game.index_proiettile];
            // mostro il proiettile
            proiettile.classList.add('coperta');
            setTimeout(() => {
                proiettile.classList.remove('coperta');
            }, 2500);
        }
        // se è il dealer
        else if (giocatore == 0) {
            const tipo_proiettile = game.proiettili[game.index_proiettile].sfondo == 'rosso';
            dealer.known_bullets[game.index_proiettile] = tipo_proiettile;
        }
    },
    /**
     * 
     */
    scudo(giocatore) {
        game.giocatori[giocatore].scudo = true;
    },
    btn_click(btn) {
        const gadget = $(btn).attr('data-gadget');
        let giocatore = parseInt($(btn).attr('data-giocatore'));
        // se non è il turno del giocatore che lha cliccato fermo
        if (game.current_player != giocatore && !this.ragnatela_attiva) {
            return;
        }
        // se si invece attivo l'effetto
        this.active(gadget, giocatore);
        html.lock_gadgets(true, true);
        setTimeout(() => {
            html.lock_gadgets(false, false);
            $(btn).remove();
            // rimuovo l'elemento dall'array che tiene conto degli elementi
            const posizione = game.giocatori[giocatore].gadgets.indexOf(gadget);
            game.giocatori[giocatore].gadgets.splice(posizione, 1);
        }, 500);
    }
}

gadgets.actions = {
    '🚬': gadgets.sigaretta, // sigaretta
    '💊': gadgets.pillola_misteriosa, // pillola misteriosa
    '🍺': gadgets.birra, // birra
    '📞': gadgets.telefono, // telefono
    '🔧': gadgets.chiave_inglese, // chiave inglese
    '🧨': gadgets.dinamite, // dinamite
    '🔎': gadgets.lente_di_ingrandimento, // lente di ingrandimento
    '🛡️': gadgets.scudo, // scudo
}