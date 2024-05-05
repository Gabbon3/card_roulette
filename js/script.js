/**
 * file dove sono presenti script secondari
 */
/**
 * DateUtils contiene funzioni utili legate alla gestione e visualizzazione delle date
 */
class DateUtils {
    constructor() { }
    get_data_attuale() {
        const oggi = new Date();
        const anno = oggi.getFullYear();
        const mese = ('0' + (oggi.getMonth() + 1)).slice(-2);
        const giorno = ('0' + oggi.getDate()).slice(-2);
        return anno + '-' + mese + '-' + giorno;
    }
    formatta_data(data) {
        var parti = data.split("-");
        return parti[2] + "-" + parti[1] + "-" + parti[0];
    }
    formatta_datetime(datetime) {
        const [data, time] = datetime.split(" ");
        return `${this.formatta_data(data)} alle ${time}`;
    }
    /**
     * se data a > b true, se no false
     * formato data: dd-mm-yyyy
     */
    confronta_date(a, b) {
        return a > b;
    }
    /**
     * Converte una stringa in un oggetto data
     * @param {String} stringa_data 
     * @returns 
     */
    string_to_date(stringa_data) {
        let parti_data = stringa_data.split('-');
        // Il mese nell'oggetto Date è basato su zero, quindi sottraiamo 1
        return new Date(parti_data[0], parti_data[1] - 1, parti_data[2]);
    }
    orario_to_secondi(orario) {
        let p = orario.split(':'); // hh:mm:ss
        p = p.map(i => parseInt(i));
        return (p[0] * 3600) + (p[1] * 60) + p[2];
    }
}

/**
 * restituisce il tipo di dato della variabile passata come parametro
 * @param {*} variabile
 * @returns 
 */
function type_of(variabile) {
    if (Array.isArray(variabile)) {
        return 'array';
    } else if (typeof variabile === 'string') {
        // controllo se è un orario hh:mm:ss
        if (/^\d{2}[:]\d{2}[:]\d{2}$/.test(variabile)) {
            return 'orario';
        }
        // Controlla se la stringa è una data in un formato valido yyyy-mm-dd
        if (/^\d{4}[./-]\d{2}[./-]\d{2}$/.test(variabile)) {
            return 'data';
        }
        return 'stringa';
    } else if (!isNaN(parseFloat(variabile)) && isFinite(variabile)) {
        return 'numero';
    } else {
        // Controlla se è un oggetto
        if (typeof variabile === 'object' && variabile !== null) {
            return 'oggetto';
        }
        return typeof variabile;
    }
}

const date_utils = new DateUtils();

/**
 * Ordinamento di array di oggetti secondo criteri personalizzati
 * @param {Set, Object} sort_order
 * esempio: {
 *   cognome: true, // attributo cognome in ordine crescente
 *   nome: false, // attributo nome in ordine decrescente
 * }
 * Quindi prima ordino per cognome (crescente) e poi per nome (decrescente)
 */
Array.prototype.sort_obj = function (sort_order = false) {
    if (!sort_order) throw new Error('Nessun criterio di ordinamento selezionato');
    this.sort((a, b) => {
        // in ordine, per ogni attributo
        for (let attributo in sort_order) {
            const ordinamento = sort_order[attributo];
            // ---
            let valore_a = a[attributo];
            let valore_b = b[attributo];
            let tipo_a = type_of(valore_a);
            // se sono date le converto
            if (tipo_a == 'orario') {
                valore_a = date_utils.orario_to_secondi(valore_a);
                valore_b = date_utils.orario_to_secondi(valore_b);
                tipo_a = 'numero';
            }
            else if (tipo_a == 'data') {
                valore_a = date_utils.string_to_date(valore_a);
                valore_b = date_utils.string_to_date(valore_b);
            }
            if ((tipo_a == 'stringa' || tipo_a == 'data' ? (valore_a < valore_b) : (valore_a > valore_b))) {
                return ordinamento ? -1 : 1;
            } else if ((tipo_a == 'stringa' || tipo_a == 'data' ? (valore_b < valore_a) : (valore_b > valore_a))) {
                return ordinamento ? 1 : -1;
            }
        }
        return 0;
    });
}
/**
 * Mescola un array n volte utilizzando il metodo di Fisher Yates
 * @param {Int} n default 1
 */
Array.prototype.shuffle = function (n = 1) {
    if (n < 1) throw new Error('Non puoi mescolare l\'array ' + n + ' volte');
    for (let i = this.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = this[i];
        this[i] = this[j];
        this[j] = k;
    }
}

/**
* è letteralmente un ciclo for ma attendendo un determinato tempo ad ogni iterazione
* esempio
this.for_interval((i) => {
   console.log(i);
}, 0, 5, 200);
* in questo esempio ogni 200ms verra stampato i per un totale di 5 volte
*/
/**
* 
* @param {Function} azione 
* @param {Int} i valore iniziale
* @param {Int} n valore finale
* @param {Int} intervallo tra un'iterazione e l'altra
* @param {Function} azione_finale funzione finale da avviare una volta terminato 
*/
function for_interval(azione, i = 0, n = 0, intervallo = 1000, azione_finale) {
    let ciclo = setInterval(() => {
        azione(i);
        if (i == n) {
            if (azione_finale) {
                azione_finale();
            }
            clearInterval(ciclo);
        }
        i++;
    }, intervallo);
}

/**
 * Esegue l'effetto di scrittura automatica su un elemento html
 * @param {String} text 
 * @param {HTMLElement} element 
 * @param {Number} delay in ms, default a 100
 */
function typewriter(text, element, delay = 100) {
    let i = 0;
    const speed = delay; // Velocità di scrittura
    // Funzione ricorsiva per aggiungere caratteri uno alla volta
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    // Avvia la scrittura
    type();
}