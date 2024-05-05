class Timeouts {
    constructor() {
        this.timeout_ids = [];
    }
    add(callback, delay) {
        let timeout_id = setTimeout(callback, delay);
        this.timeout_ids.push(timeout_id);
        return timeout_id;
    }
    clear_all() {
        this.timeout_ids.forEach(timeoutID => clearTimeout(timeoutID));
        this.timeout_ids = []; // Resetta l'array
    }
}