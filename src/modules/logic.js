function ship(length) {
    if (length <= 0) {
        throw new Error("Ship length must be greater than zero.");
    }

    return {
        length: length,
        timesShot: 0,
        hit() {
            if (this.timesShot >= this.length) {
                return "Ship has already been destroyed.";
            }
            this.timesShot += 1;
            if (this.timesShot === this.length) {
                return this.isSunk();
            }
            return this.timesShot;
        },
        isSunk() {
            return true;
        },
    };
}

// function gameboard() {

// }
module.exports = {ship};