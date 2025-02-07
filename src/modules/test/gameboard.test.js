const { gameboard, ship } = require('../logic');

describe('gameboard placeship functionality', () => {
  test('should place a ship using (x, y) coordinates', () => {
    const myBoard = gameboard();
    const ship1 = ship(3);
    const success = myBoard.placeShip(ship1, 1, 1, true); // Place horizontally
    expect(success).toBe("Ship placed successfully");
    expect(myBoard.shipNumbers).toBe((1));
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

// RECEIVE ATTACK FUNCTION
describe('gameboard receiveAttack functionality', () => {

  test('should take 2 shot based on given coordinates', () => {
    const myBoard = gameboard();
    const firstShot = myBoard.receiveAttack(1,1);
    const secondShot = myBoard.receiveAttack(1,2);
    expect(firstShot).toBe("Miss!");
    expect(secondShot).toBe("Miss!");
    expect(myBoard.shotCoordinates).toEqual(["1,1","1,2"]);
  });

  test('should not allow overlapping of shot coordinates', () => {
    const myBoard = gameboard();
    const firstShot = myBoard.receiveAttack(1,1);
    const secondShot = myBoard.receiveAttack(1,1);
    expect(firstShot).toBe("Miss!");
    expect(secondShot).toBe("Coordinates are already shot");
    expect(myBoard.shotCoordinates).toEqual(["1,1"]);
    expect(myBoard.missedAttacks).toEqual(1);
  });

  test('should return hit when hit 2 ships', () => {
    const myBoard = gameboard();
    const ship1 = ship(3);
    const ship2 = ship(2);
    const success1 = myBoard.placeShip(ship1, 1, 1, true); // Place horizontally
    const success2 = myBoard.placeShip(ship2, 2, 2, true); // Place horizontally
    expect(success1).toBe("Ship placed successfully");
    expect(success2).toBe("Ship placed successfully");
    const firstShot = myBoard.receiveAttack(1,1);
    const secondShot = myBoard.receiveAttack(2,2);
    expect(firstShot).toBe("Hit!");
    expect(secondShot).toBe("Hit!");
    expect(myBoard.shotCoordinates).toEqual(["1,1","2,2"]);
    expect(ship1.timesShot).toEqual(1);
    expect(ship2.timesShot).toEqual(1);
  });

  test('should return gameOver when all ships are sunk', () => {
    const myBoard = gameboard();
    const ship1 = ship(1);
    const ship2 = ship(2);
    const success1 = myBoard.placeShip(ship1, 1, 1, true); // Place horizontally
    const success2 = myBoard.placeShip(ship2, 1, 2, false); // Place vertically
    expect(success1).toBe("Ship placed successfully");
    expect(success2).toBe("Ship placed successfully");
    expect(myBoard.shipCoordinates).toEqual({
      ship1: ["1,1"],
      ship2:["1,2", "2,2"]
    });
    const firstShot = myBoard.receiveAttack(1,1);
    expect(firstShot).toBe("Ship has been sunk!");
    const secondShot = myBoard.receiveAttack(1,2);
    expect(secondShot).toBe("Hit!");
    const thirdShot = myBoard.receiveAttack(2,2);
    expect(thirdShot).toBe("Hit! All ships sunk! Game Over!");
    expect(myBoard.shotCoordinates).toEqual(["1,1","1,2","2,2"]);
    expect(ship1.timesShot).toEqual(1);
    expect(ship2.timesShot).toEqual(2);
  });
});
