$(document).ready(() => {
    html.lock_player(true);
    // azioni del giocatore
    // si spara
    $('#shoot_player').on('click', () => {
        player.player_shoot(1);
        html.lock_player(true);
    });
    // spara al dealer
    $('#shoot_dealer').on('click', () => {
        player.player_shoot(0);
        html.lock_player(true);
    });
});

const player = {
    gadgets: [],
    /**
     * 
     */
    player_turn() {
        html.lock_player(false);
        game.current_player = 1;
        log.print('-----');
        log.print('Tocca al giocatore');
    },
    /**
     * azioni dedicate al player
     */
    player_shoot(giocatore) {
        if (game.termina_partita || game.proiettili_esauriti) return;
        giocatore == 1 ? log.print('👾 <=') : log.print('👾 => 🤖');
        const mi_sparo = giocatore == 1;
        game.timeouts.add(() => {
            const result = game.spara(giocatore);
            game.timeouts.add(() => {
                /* verifico se:
                   - il dealer si è sparato
                   - se il proiettile è finto
                   - se ci sono ancora proiettili oltre a quello sparato
                */
                if (mi_sparo && !result && game.index_proiettile != game.proiettili.length) {
                    // il giocatore continua il suo turno
                    player.player_turn();
                } else {
                    /**
                     * se ci sono ancora proiettili
                     * passo il turno al dealer
                     */
                    if (game.check_round()) dealer.dealer_turn();
                }
            }, (game.tempo_attesa_sparo + 2000));
        }, 1000);
    }
}