function ship(length, shipCoordinates) {
    if (length <= 0) {
        throw new Error("Ship length must be greater than zero.");
    }

    return {
        length: length,
        timesShot: 0,
        shipCoordinates: shipCoordinates,
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

function gameboard(shot) {
    return {
        // size: size,
        // coordinates: Array.from({ length: (size * size) + 1 }, (_, i) => i),
        coordinates: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
            91, 92, 93, 94, 95, 96, 97, 98, 99, 100
          ],
        shipCoordinates: {},
        placeShip(ship, startPosition, isHorizontal) {
            const shipPositions = [];
            const boardWidth = size;

            // Calculate positions
            for (let i = 0; i < ship.length; i++) {
                const position = isHorizontal
                    ? startPosition + i
                    : startPosition + i * boardWidth;

                // Check if position is valid
                if (
                    position > boardSize || // Out of bounds
                    (isHorizontal && Math.floor((startPosition - 1) / boardWidth) !== Math.floor((position - 1) / boardWidth)) || // Horizontal wrapping
                    Object.values(this.shipCoordinates).flat().includes(position) // Overlap
                ) {
                    return "Invalid placement.";
                }

                shipPositions.push(position);
            }

            // Place ship
            this.shipCoordinates[ship] = shipPositions;
            return "Ship placed successfully.";
        },
        receiveAttack(shot) {},
    }
}

module.exports = {ship, gameboard};