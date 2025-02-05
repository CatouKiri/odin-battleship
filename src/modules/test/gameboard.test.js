const { gameboard, ship } = require('../logic');

describe('gameboard placeship functionality', () => {
  test('should place a ship using (x, y) coordinates', () => {
    const myBoard = gameboard();
    const ship1 = ship(3);
    const success = myBoard.placeShip(ship1, 1, 1, true); // Place horizontally
    expect(success).toBe("Ship placed successfully");
    expect(myBoard.shipCoordinates.ship1).toEqual(["1,1", "1,2", "1,3"]);
  });

  test('should place a 2 ship using (x, y) coordinates', () => {
    const myBoard = gameboard();
    const ship1 = ship(2);
    const success1 = myBoard.placeShip(ship1, 1, 1, true); // Place horizontally
    const ship2 = ship(2);
    const success2 = myBoard.placeShip(ship2, 2, 2, true); // Place horizontally
    expect(success1).toBe("Ship placed successfully");
    expect(success2).toBe("Ship placed successfully");
    expect(myBoard.shipCoordinates).toEqual({
      ship1: ["1,1", "1,2",],
      ship2:["2,2", "2,3"]
    });
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


describe('gameboard receiveAttack functionality', () => {
  test('should take shot based on given coordinates', () => {
    const myBoard = gameboard();
    const firstShot = myBoard.receiveAttack(1,1);
    expect(firstShot).toBe("missed attack");
    expect(myBoard.shotCoordinates).toEqual(["1,1",]);
  });

  test('should take 2 shot based on given coordinates', () => {
    const myBoard = gameboard();
    const firstShot = myBoard.receiveAttack(1,1);
    const secondShot = myBoard.receiveAttack(1,2);
    expect(firstShot).toBe("missed attack");
    expect(secondShot).toBe("missed attack");
    expect(myBoard.shotCoordinates).toEqual(["1,1","1,2"]);
  });

  test('should not allow overlapping of shot coordinates', () => {
    const myBoard = gameboard();
    const firstShot = myBoard.receiveAttack(1,1);
    const secondShot = myBoard.receiveAttack(1,1);
    expect(firstShot).toBe("missed attack");
    expect(secondShot).toBe("coordinates already shot");
    expect(myBoard.shotCoordinates).toEqual(["1,1"]);
  });

  test('should take shot based on given coordinates', () => {
    const myBoard = gameboard();
    const ship1 = ship(3);
    myBoard.placeShip(ship1, 1, 1, true); // Place horizontally
    expect(success).toBe("Ship placed successfully");
    const firstShot = myBoard.receiveAttack(1,1);
    expect(firstShot).toBe("hit");
    expect(myBoard.shotCoordinates).toEqual(["1,1"]);
    expect(ship1.timesShot).toEqual(1);
  });

});
