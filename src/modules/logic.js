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
            if (this.isSunk()) {
                return "Ship has been sunk!";
            }
            return "Hit!";
        },
        isSunk() {
            return this.timesShot >= this.length;
        },
    };
}

function gameboard() {
    const ships = {}; // Tracks all ship objects
    const shipCoordinates = {}; // Tracks all ships' positions
    const shotCoordinates = []; // Tracks missed shots

    return {
        shipCoordinates,
        shotCoordinates,
        shipNumbers: 0,
        missedAttacks: 0,
        placeShip(ship, startingPointX, startingPointY, isHorizontal) {
          if((ship.length + startingPointX - 1) > 10 && !isHorizontal ||
            (ship.length + startingPointY - 1) > 10 && isHorizontal) {
                return "out of bounds";
            }

            let newCoordinates = [];
            for (let i = 0; i < ship.length; i++) {
                let x = isHorizontal ? startingPointX : startingPointX + i;
                let y = isHorizontal ? startingPointY + i : startingPointY;
                let coordinate = `${x},${y}`;

                for (const coords of Object.values(shipCoordinates)) {
                    if (coords.includes(coordinate)) {
                        return "Coordinates are already occupied";
                    }
                }
                newCoordinates.push(`${x},${y}`);
            }

            this.shipNumbers++;
            let shipName = `ship${this.shipNumbers}`;
            shipCoordinates[shipName] = newCoordinates;
            ships[shipName] = ship; // Store the actual ship object

            return "Ship placed successfully";
        },
        receiveAttack(x, y) {
            let coordinate = `${x},${y}`;

            if (shotCoordinates.includes(coordinate)) {
                return "Coordinates are already shot";
            }

            for (const [shipName, positions] of Object.entries(shipCoordinates)) {
                if (positions.includes(coordinate)) {
                    shotCoordinates.push(coordinate);
                    let result = ships[shipName].hit();
                    if(this.gameOver()) {
                        return "Hit! All ships sunk! Game Over!";
                    }
                    return result;
                }
            }

            shotCoordinates.push(coordinate);
            this.missedAttacks++;
            return "Miss!";
        },
        gameOver() {
            return Object.values(ships).every(ship => ship.isSunk());
        },
    }
}

function player() {
    return {
        gameboard: gameboard(), // Each player gets their own gameboard
        attack(enemyGameboard, x, y) {
            return enemyGameboard.receiveAttack(x, y);
        },
    };
}

module.exports = {ship, gameboard, player};

