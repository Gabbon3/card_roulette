const dealer = {
    // memorizza i proiettili quando utilizza il gadget del telefono
    known_bullets: {}, // struttura: { indice_proiettile: true (p. vero), false (p. falso), ... }
    lente_usata: false, // tiene traccia se ha usato la lente
    telefono_usato: false, // tiene traccia se ha usato il telefono
    chiave_inglese_usata: false, // tiene traccia se ha usato la chiave inglese
    scudo_usato: false, // tiene traccia se ha usato lo scudo
    dinamite_usato: false, // tiene traccia se ha usato lo scudo
    /**
     * 
     * @returns 
     */
    dealer_turn() {
        if (game.termina_partita || game.proiettili_esauriti) return;
        html.lock_player(true);
        game.current_player = 0;
        log.print('-----');
        log.print('È il turno del Dealer');
        this.gadget_phase();
    },
    /**
     * fa le scelte in base ai gadgets
     */
    gadget_phase() {
        // init
        this.lente_usata = false;
        this.chiave_inglese_usata = false;
        this.scudo_usato = false;
        this.dinamite_usato = false;
        // ---
        game.timeouts.add(() => {
            html.lock_gadgets(true, false);
            const html_btns = document.querySelectorAll('#gadgets_dealer .btn');
            let iteratore = game.giocatori[0].gadgets.length - 1;
            const len = -1;

            // funzione ricorsiva che verifica se usare tutti i gadgets
            itera_gadgets(iteratore);

            function itera_gadgets(i) {
                if (i == len) {
                    return dealer.shoot_phase();
                }
                const gadget = game.giocatori[0].gadgets[i];
                const usa_gadget = dealer.scegli_gadget(gadget);
                if (usa_gadget) {
                    $(html_btns[i]).trigger('click');
                    setTimeout(() => {
                        itera_gadgets(i - 1);
                    }, 1500);
                } else {
                    itera_gadgets(i - 1);
                }
            }
        }, 2000);
    },
    scegli_gadget(gadget) {
        // init
        const dealer = game.giocatori[0];
        // di base non lo sceglie
        let result = false;
        // vanno in ordine di importanza
        // recupera vita
        if (gadget == '🚬' && dealer.vite < game.max_vita) {
            result = true;
        }
        // vedi proiettile subito
        else if (gadget == '🔎' && game.n_veri > 0 && game.n_falsi > 0 && !this.lente_usata) {
            this.lente_usata = true;
            result = true;
        }
        // vedi proiettile a caso 
        else if (gadget == '📞' && game.n_veri > 0 && game.n_falsi > 0 && !this.lente_usata) {
            if (this.telefono_usato) {
                result = random.bool();
            } else {
                this.telefono_usato = true;
                result = true;
            }
        }
        // cambia proiettile se so che il successivo è falso
        else if (gadget == '🔧' && !this.chiave_inglese_usata) {
            if (!this.known_bullets[game.index_proiettile]) {
                result = true;
            } else if (!this.scegli()) {
                result = random.bool();
            }
            if (result) this.chiave_inglese_usata = true;
        }
        // raddoppia il danno se
        else if (gadget == '🧨' && this.scegli() && !this.dinamite_usato) {
            result = true;
            this.dinamite_usato = true;
        }
        /* usa lo scudo se: 
            - il numero dei proiettili veri è maggiore rispetto ai falsi
            - il prossimo proiettile è un proiettile vero
            - lo scudo non sia gia stato usato
        */
        else if (
                gadget == '🛡️' && 
                (
                    game.n_veri > game.n_falsi || 
                    this.known_bullets[game.index_proiettile + 1] === true
                ) && 
                !this.scudo_usato) {
            result = true;
        }
        // recupera vita al 50%
        else if (gadget == '💊' && dealer.vite < game.max_vita && random.min_max(0, 100) > 70) {
            result = true;
        }
        // scarta proiettile
        else if (gadget == '🍺' && this.known_bullets[game.index_proiettile] === false) {
            result = true;
        }
        return result;
    },
    /**
     * Fa le scelte per quanto riguarda chi sparare
     */
    shoot_phase() {
        game.timeouts.add(() => {
            const spara_al_giocatore = dealer.scegli();
            !spara_al_giocatore ? log.print('=> 🤖') : log.print('🤖 => 👾');
            game.timeouts.add(() => {
                const result = game.spara(spara_al_giocatore ? 1 : 0); // 1 cioe spara al gicatore 0 cioe spara al dealer
                if (!game.proiettili_esauriti) {
                    game.timeouts.add(() => {
                        /* verifico se:
                           - il dealer si è sparato
                           - se il proiettile è finto
                           - se ci sono ancora proiettili oltre a quello sparato
                        */
                        if (!spara_al_giocatore && !result && game.index_proiettile != game.proiettili.length) {
                            // il dealer continua il suo turno
                            dealer.dealer_turn();
                        } else {
                            /**
                             * se ci sono ancora proiettili
                             * passo il turno al giocatore
                            */
                            if (game.check_round()) player.player_turn();
                        }
                    }, (game.tempo_attesa_sparo + 3000))
                }
            }, 3000);
        }, 1000);
    },
    /**
     * in base al numero di proiettili, viene scelto se sparare o spararsi
     * @returns {Boolean} true: spara al giocatore, false: il dealer si spara
     */
    scegli() {
        // di base scelgo a random
        let result = random.bool();
        // se è stata usata la chiave inglese sparo al giocatore
        if (this.chiave_inglese_usata || this.dinamite_usato) {
            result = true;
        }
        // se il proiettile corrente è conosciuto
        else if (typeof this.known_bullets[game.index_proiettile] == 'boolean') {
            // se il proiettile è vero sparo al giocatore
            result = game.proiettili[game.index_proiettile].sfondo == 'rosso';
        }
        // se ci sono piu proiettili VERI allora sparo al giocatore
        else if (game.n_veri > game.n_falsi) {
            result = true;
        }
        // se ci sono piu proiettili FALSI allora sparo al Dealer
        else if (game.n_falsi > game.n_veri) {
            result = false;
        }
        // se sono uguali scelgo casualmente ---
        return result;
    }
}