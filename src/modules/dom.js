const {player, ship, gameboard} = require('./logic');

function gameControl() {

    // Player 1 ships and gameboard
    const player1 = player();
    const player1_ship1 = ship(4);
    const player1_ship2 = ship(3);
    const player1_ship3 = ship(3);
    const player1_ship4 = ship(2);
    const player1_ship5 = ship(2);
    const player1_ship6 = ship(2);
    const player1_ship7 = ship(1);
    const player1_ship8 = ship(1);
    const player1_ship9 = ship(1);
    const player1_ship10 = ship(1);

    // (horizontal, vertical)
    // Place ships on predetermined coordinates on the gameboard for now
    player1.gameboard.placeShip(player1_ship1, 1, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship2, 2, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship3, 3, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship4, 4, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship5, 5, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship6, 6, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship7, 7, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship8, 8, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship9, 9, 1, true); // Place horizontally
    player1.gameboard.placeShip(player1_ship10, 10, 1, true); // Place horizontally
}

function header() {
    const header = document.createElement("header");
    header.setAttribute("id", "header");

    const gameName = document.createElement("div");
    gameName.setAttribute("id", "gameName");
    gameName.textContent = "Battleship";

    const gameStatus = document.createElement("div");
    gameStatus.setAttribute("id", "gameStatus");
    gameStatus.textContent = "Place the ships";

    header.append(
        gameName,
        gameStatus
    );

    return header;
}

export const test = "Test!";
export default function render() {
    const body = document.querySelector("body");
    const headerElement = header();

    body.append(headerElement);

    return body;
}