class Carta {
    constructor(valore, seme, sfondo) {
        this.valore = valore;
        this.seme = seme;
        this.sfondo = sfondo;
    }

    html(coperta) {
        const colore = this.get_colore();
        const valore = this.get_valore();
        // const seme = this.get_seme();
        const seme = `<span class='seme'>${this.get_seme()}</span>`;
        const corner = `<img class='corner' src='./img/corner-white.png'></img>`
        return `
        <div class='carta ${coperta ? 'coperta' : ''}'>
            <div class='retro ${this.sfondo}'></div>
            <div class="fronte ${this.seme} valore-${valore} colore ${colore}" value="${valore}">
                ${this.get_html_valore()}
            </div>
        </div>
        `;
        // <span class='valore'>${valore}</span>
        // <span class='seme'>${seme}</span>
    }

    get_html_valore() {
        let txt = '<div class="card__inner">';
        const seme = this.get_seme();
        if ([11, 12, 13].indexOf(this.valore) === -1) {
            if (this.valore == 1) {
                txt += `<div class="card__column single centered">
				    <div class="card__symbol asso">${seme}</div>
			    </div>`;
            }
            else if (this.valore == 2) {
                txt += `<div class="card__column single">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div>`;
            }
            else if (this.valore == 2) {
                txt += `<div class="card__column single">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div>`;
            }
            else if (this.valore == 3) {
                txt += `<div class="card__column single">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div>`;
            }
            else if (this.valore == 4) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
            else if (this.valore == 5) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column centered">
                    <div class="card__symbol">${seme}</div>
                </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
            else if (this.valore == 6) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
            else if (this.valore == 7) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column centered huge-symbol">
                    <div class="card__symbol huge">${seme}</div>
                </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
            else if (this.valore == 8) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column centered">
                    <div class="card__symbol big">${seme}</div>
                    <div class="card__symbol big">${seme}</div>
                </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
            else if (this.valore == 9) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column centered huge-symbol">
                    <div class="card__symbol huge">${seme}</div>
                </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
            else if (this.valore == 10) {
                txt += `<div class="card__column">
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
			    </div><div class="card__column centered">
                    <div class="card__symbol big">${seme}</div>
                    <div class="card__symbol big">${seme}</div>
                </div><div class="card__column">
                    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
				    <div class="card__symbol">${seme}</div>
                    <div class="card__symbol">${seme}</div>
                </div>`;
            }
        } else {
            txt += `<div class="card__column single centered">
                <span class='valore'>${this.get_valore()}</span>
                <span class='seme'>${seme}</span>
            </div>`;
        }
        return txt + '</div>';
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