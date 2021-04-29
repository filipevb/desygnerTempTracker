class TempTracker {
    constructor() {
        this._min = null;
        this._max = null;
        this._avg = null;
        this._history = [];
    }

    /* Getters */
    get min () {
        return this._min;
    }

    get max () {
        return this._max;
    }

    get avg () {
        return this._avg;
    }

    /* Setters */
    feed (value) {
        if (isNaN(parseInt(value))) {
            return;
        }
        this._min = this._min && this._min < value ? this._min : value;
        this._max = this._max && this._max > value ? this._max : value;
        this._history.push(value);
        this._avg = this.calcAvg();
    }

    /* Methods */
    calcAvg () {
        return this._history.reduce((acc, temp) => acc += temp, 0) / this._history.length;
    }
}