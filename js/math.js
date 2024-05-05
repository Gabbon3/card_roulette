class MATH {
    /**
     * x : y = z : ?
     * @param {number} x parametro della proporzione
     * @param {number} y parametro della proporzione
     * @param {number} z parametro della proporzione
     * @returns {number} risultato della proporzione
     */
    proporzione(x, y, z) {
        return (y * z) / x;
    }
    /**
     * Approssima un numero utilizzando due cifre decimali dopo la virgola
     * @param {Number} num 
     * @returns 
     */
    approssima(num) {
        return Math.round(num * 100) / 100;
    }
    /**
     * genera la sequenza di fibonacci fino a: 'l'
     * partendo da [n, k] che sono due elementi della sequenza fibonacci
     * @returns {array} sequenza di fibonacci personalizzata
     */
    fibonacci(n, k, l) {
        let fibonacci = [n, k];
        for (let i = 1; i < l; i++) {
            fibonacci.push(fibonacci[i] + fibonacci[i - 1]);
        }
        return fibonacci;
    }
    /**
     * genera un array proporzionato ad un array passato in input
     * l'array finale è composto da percentuali
     * @param {array} array da proporzionare
     * @param {number} max elemento massimo dell'array
     * @param {number} l lunghezza array finale
     */
    proporzione_percentuali(array, max, l) {
        let array_proporzionato = [];
        for (let i = 0; i < l; i++) {
            // x : y = z : ?
            array_proporzionato.push(math.proporzione(max, array[i], 1));
        }
        return array_proporzionato;
    }
}

const math = new MATH();

class Random {
    /**
     * restituisce a caso un valore booleano
     */
    bool() {
        return this.min_max(0, 1) == 1;
    }
    /**
     * Restituisce un numero scegliendo un range
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    min_max(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    /**
     * genera un numero casuale sicuro
     * @param {int} min 
     * @param {int} max 
     * @returns {int} numero casuale sicuro
     */
    secure_min_max(min, max) {
        // Calcola la lunghezza del range
        const range = max - min;
        // Crea un array di bytes con la lunghezza del range
        const byteArray = new Uint8Array(1);
        // Genera un numero casuale all'interno del range utilizzando crypto.getRandomValues()
        // Byte casuale verrà mappato nel range specificato
        window.crypto.getRandomValues(byteArray);
        let randomNumber = byteArray[0] / 255;
        // Mappa il numero casuale all'interno del range specificato
        randomNumber = Math.floor(randomNumber * (range + 1));
        // Aggiungi il minimo per ottenere un numero all'interno del range desiderato
        return min + randomNumber;
    }
}

const random = new Random();