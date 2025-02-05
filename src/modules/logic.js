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
            return this.timesShot >= this.length;
        },
    };
}

function gameboard() {
    const shipCoordinates = {}; // Tracks all ships' positions
    const shotCoordinates = []; // Tracks missed shots
    const hitPositions = []; // Tracks hit positions
    let shipNumbers = 1;

    return {
        shipCoordinates,
        shotCoordinates,
        hitPositions,
        shipNumbers,
        placeShip(ship, startingPointX, startingPointY, isHorizontal) {
          if((ship.length + startingPointX - 1) > 10 && !isHorizontal ||
          (ship.length + startingPointY - 1) > 10 && isHorizontal) {
                return "out of bounds";
            }
            for (let i = 0; i < ship.length; i++) {
                let x = isHorizontal ? startingPointX : startingPointX + i;
                let y = isHorizontal ? startingPointY + i : startingPointY;
                let coordinate = `${x},${y}`;

                for (const coords of Object.values(shipCoordinates)) {
                    if (coords.includes(coordinate)) {
                        return "Coordinates are already occupied";
                    }
                }
            }

            let newCoordinates = [];
            for (let i = 0; i < ship.length; i++) {
                let x = isHorizontal ? startingPointX : startingPointX + i;
                let y = isHorizontal ? startingPointY + i : startingPointY;

                newCoordinates.push(`${x},${y}`);
            }

            shipCoordinates[`ship${shipNumbers}`] = newCoordinates;
            shipNumbers++;
            return "Ship placed successfully";
        },
        receiveAttack(x, y) {

        }
    }
}

module.exports = {ship, gameboard};

