const {player, ship } = require('../logic'); // Importing the ship function from the logic file

describe('player 1 attack player 2', () => {
  test('player 1s attack should destroy player 2s ship and lead to a gameover', () => {
    const player1 = player();
    const player2 = player();
    const player1Ship1 = ship(2);
    const player2Ship1 = ship(2);
    const success1 = player1.gameboard.placeShip(player1Ship1, 1, 1, true); // Place horizontally
    const success2 = player2.gameboard.placeShip(player2Ship1, 1, 1, true); // Place horizontally
    expect(success1).toBe("Ship placed successfully");
    expect(success2).toBe("Ship placed successfully");
    expect(player1.gameboard.shipCoordinates).toEqual({
      ship1: ["1,1", "1,2"],
    });
    expect(player2.gameboard.shipCoordinates).toEqual({
      ship1: ["1,1", "1,2"],
    });
    const firstShot = player2.gameboard.receiveAttack(2,2);
    expect(firstShot).toBe("Miss!");
    const secondShot = player1.gameboard.receiveAttack(1,1);
    expect(secondShot).toBe("Hit!");
    const thirdShot = player1.gameboard.receiveAttack(1,2);
    expect(thirdShot).toBe("Hit! All ships sunk! Game Over!");
    expect(player1.gameboard.shotCoordinates).toEqual(["1,1","1,2"]);
    expect(player1.gameboard.shipNumbers).toEqual(1);
    expect(player1.gameboard.missedAttacks).toEqual(0);
    expect(player1Ship1.timesShot).toEqual(2);
    expect(player2.gameboard.shotCoordinates).toEqual(["2,2"]);
    expect(player2.gameboard.shipNumbers).toEqual(1);
    expect(player2.gameboard.missedAttacks).toEqual(1);
    expect(player2Ship1.timesShot).toEqual(0);
});
});
