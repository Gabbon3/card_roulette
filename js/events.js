$(document).ready(() => {
    html.lock_player(true);
    html.stampa_informazioni();
    // html.stampa_mazzo();
    // quando clicchi una carta, la giri o la rigiri
    $(document).on('click', '.carta', (e) => {
        // $(e.currentTarget).toggleClass('coperta');
    });
    /**
     * FINESTRE
     */
    $(document).on('click', '.close', (btn) => {
        btn = btn.currentTarget;
        const target = $(btn).attr('data-target');
        finestra.close(target);
    });
    $(document).on('click', '.open', (btn) => {
        btn = btn.currentTarget;
        const target = $(btn).attr('data-target');
        finestra.open(target);
    });
    $('#bc_finestre').click((bc) => {
        bc = bc.currentTarget;
        const target = $(bc).attr('data-target');
        finestra.close(target);
    });
    // ---
    /**
     * BTN GROUPS
     */
    $('.once-allowed').on('click', '.btn.switch', (e) => {
        const clicked_btn = e.currentTarget;
        $('.once-allowed .btn.switch').not(clicked_btn).each((i, btn) => {
            $(btn).attr('data-value', false);
            $(btn).removeClass('on');
        });
    });
    /**
     * Altre Funzioni
     */
    $(document).on('click', '.btn.switch', (e) => {
        const btn = e.currentTarget;
        const val = $(btn).attr('data-value');
        const bool = JSON.parse(val);
        $(btn).attr('data-value', !bool);
        $(btn).toggleClass('on');
    });
});

const finestra = {
    open(target) {
        dom.show('#' + target)
        $('#bc_finestre').attr('data-target', target);
        dom.show('#bc_finestre')
    },
    close(target) {
        dom.hide('#' + target)
        dom.hide('#bc_finestre')
    }
}

const events = {
    
}