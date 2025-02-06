const { ship } = require('../logic');  // Importing the ship function from the logic file

describe('Ship Functionality', () => {
  test('should create a ship with correct length and timesShot initialized to 0', () => {
    const ship1 = ship(3);
    expect(ship1.length).toBe(3);
    expect(ship1.timesShot).toBe(0);
  });

  test('should increment timesShot when hit', () => {
    const ship1 = ship(3);
    ship1.hit();
    expect(ship1.timesShot).toBe(1);  // Should be 1 after the first hit
  });

  test('should return true when the ship is sunk', () => {
    const ship1 = ship(2);
    ship1.hit();  // 1st shot
    const result = ship1.hit();  // 2nd shot, ship should be sunk
    expect(result).toBe("Ship has been sunk!");
  });

  test('should not allow more shots once the ship is sunk', () => {
    const ship1 = ship(2);
    ship1.hit();  // 1st shot
    ship1.hit();  // 2nd shot, ship should be sunk
    const result = ship1.hit();  // 3rd shot, should return that the ship is already sunk
    expect(result).toBe("Ship has already been destroyed.");
  });

  test('should throw error if length is zero or negative', () => {
    expect(() => {
      ship(0);
    }).toThrow("Ship length must be greater than zero.");

    expect(() => {
      ship(-5);
    }).toThrow("Ship length must be greater than zero.");
  });
});
