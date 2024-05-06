class Carta {
    constructor(valore, seme, sfondo) {
        this.valore = valore;
        this.seme = seme;
        this.sfondo = sfondo;
    }

    html(coperta) {
        const colore = this.get_colore();
        const valore = this.get_valore();
        const seme = this.get_seme();
        const corner = `<img class='corner' src='./img/corner.png'></img>`
        return `
        <div class='carta ${coperta ? 'coperta' : ''}'>
            <div class='retro ${this.sfondo}'></div>
            <div class="fronte ${this.seme} valore-${valore} colore ${colore}" value="${valore}">
                ${corner}
                <span class='valore'>${valore}</span>
                <span class='seme'>${seme}</span>
                ${corner}
            </div>
        </div>
        `;
    }

    get_valore() {
        let nome_valore = "";
        switch (this.valore) {
            case 1:
                nome_valore = "A";
                break;
            case 11:
                nome_valore = "J";
                break;
            case 12:
                nome_valore = "Q";
                break;
            case 13:
                nome_valore = "K";
                break;
            default: nome_valore = this.valore;
        }
        return nome_valore;
    }

    get_colore() {
        if (this.seme == 'Quadri' || this.seme == 'Cuori') {
            return 'rosso';
        } else {
            return 'nero';
        }
    }

    get_seme() {
        let seme = '';
        switch (this.seme) {
            case 'Quadri':
                seme = '♦️';
                break;
            case 'Cuori':
                seme = '♥️';
                break;
            case 'Fiori':
                seme = '♣️';
                break;
            case 'Picche':
                seme = '♠️';
                break;
        }
        return seme;
    }
}