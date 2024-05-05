class Mazzo {
    /**
     * 
     * @param {*} mazzi immettere i colori dei mazzi, se ne si mette solo 1 si avrà un mazzo
     * se si inserisce ['rosso', 'nero'] si avranno due mazzi, uno a sfondo rosso e uno a sfondo nero
     */
    constructor(mazzi = ['rosso', 'nero']) {
        this.carte = [];
        this.mazzi = mazzi;
    }
    
    _init() {
        this.carte = [];
        const semi = ['Quadri', 'Cuori', 'Fiori', 'Picche'];
        // per ogni mazzo selezionato
        for (let mazzo = 0; mazzo < this.mazzi.length; mazzo++) {
            for (let seme of semi) {
                for (let valore = 1; valore <= 13; valore++) {
                    this.carte.push(new Carta(valore, seme, this.mazzi[mazzo]));
                }
            }
        }
    }

    mescola(n = 1) {
        this.carte.shuffle(n);
    }

    pesca() {
        return this.carte.pop();
    }

    aggiungi_carta(carta) {
        this.carte.unshift(carta);
    }
 
    numero_di_carte() {
        return this.carte.length;
    }
}