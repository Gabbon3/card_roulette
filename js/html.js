const html = {
    stampa_mazzo(coperte = true) {
        game.init();
        game.mazzo.mescola(4);
        let txt = '';
        for (let i = 0; i < game.mazzo.carte.length; i++) {
            document.querySelector('#fixed_deck').innerHTML += game.mazzo.carte[i].html(coperte);
        }
    },
    stampa_carte_round(carte) {
        let txt = '';
        for (let i = 0; i < carte.length; i++) {
            txt += carte[i].html(false);
        }
        $('#game').html(txt);
    },
    stampa_vite(p = game.giocatori[1].vite, d = game.giocatori[0].vite) {
        $('#vite').html("🗿".repeat(p));
        $('#vite_dealer').html("💀".repeat(d));
    },
    lock_player(bool) {
        this.lock_gadgets(bool, true);
        $('#shoot_player').prop('disabled', bool);
        $('#shoot_dealer').prop('disabled', bool);
    },
    /**
     * true blocca, false sblocca
     * @param {*} p blocca i gadget del player
     * @param {*} d blocca i gadget del dealer
     */
    lock_gadgets(p = false, d = true) {
        $('#gadgets_player .gadget').each((index, element) => {
            $(element).prop('disabled', p);
        });
        $('#gadgets_dealer .gadget').each((index, element) => {
            $(element).prop('disabled', d);
        });
    },
    /**
     * 
     * @param {Array} p player
     * @param {Array} d dealer
     */
    stampa_gadgets(p = game.giocatori[1].gadgets, d = game.giocatori[0].gadgets) {
        // init
        $('#gadgets_player').html('');
        $('#gadgets_dealer').html('');
        // ---
        const html = (emoji, giocatore, disabled) => { return `<button title='${gadgets.info[emoji]}' class='btn gadget' data-gadget='${emoji}' data-giocatore='${giocatore}' ${disabled ? 'disabled' : ''}>${emoji}</button>` };
        // stampo quelle del giocatore
        for (let i = 0; i < p.length; i++) {
            document.querySelector('#gadgets_player').innerHTML += html(p[i], 1, false);
        }
        // stampo quelle del dealer
        for (let i = 0; i < d.length; i++) {
            document.querySelector('#gadgets_dealer').innerHTML += html(d[i], 0, true);
        }
    },
    /**
     * html
     */
    nome_giocatore(giocatore) {
        return giocatore == 0 ? 'Dealer' : 'Player';
    },
    death_screen() {
        $('#death_screen').show();
        $('#death_screen').css('background-color', '#fff');
        setTimeout(() => {
            $('#death_screen').css('background-color', '');
        }, 10);
        setTimeout(() => {
            $('#death_screen').fadeOut('slow');
        }, 1500);
    },
}

const dom = {
    get1(target) {
        return document.querySelector(target);
    },
    geta(target) {
        return document.querySelectorAll(target);
    },
    show(target) {
        $(target).show();
    },
    hide(target) {
        $(target).hide();
    },
}