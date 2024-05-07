$(document).ready(() => {
    html.lock_player(true);
    // html.stampa_mazzo();
    // quando clicchi una carta, la giri o la rigiri
    $(document).on('click', '.carta', (e) => {
        $(e.currentTarget).toggleClass('coperta');
    });
});

const events = {
    
}