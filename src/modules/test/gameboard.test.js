const { gameboard, ship } = require('../logic');

describe('Gameboard Functionality with (x, y) Coordinates', () => {
  test('should place a ship using (x, y) coordinates', () => {
    const myBoard = gameboard();
    const myShip = ship(3);
    const success = myBoard.placeShip(myShip, 1, 1, true); // Place horizontally
    expect(success).toBe("Ship placed successfully");
    expect(myBoard.shipCoordinates.ship1).toEqual(["1,1", "1,2", "1,3"]);
  });

  test('should not allow placing ships with overlapping coordinates', () => {
    const myBoard = gameboard();
    const ship2 = ship(3);
    const ship3 = ship(2);

    myBoard.placeShip(ship2, 1, 1, true); // Place first ship
    const success = myBoard.placeShip(ship3, 1, 1, true); // Overlapping
    expect(success).toBe("Coordinates are already occupied");
  });

  test('should validate coordinates are within bounds', () => {
    const myBoard = gameboard();
    const myShip = ship(2);
    const success = myBoard.placeShip(myShip, 10, 10, true); // Out of bounds
    expect(success).toBe("out of bounds");
  });
});