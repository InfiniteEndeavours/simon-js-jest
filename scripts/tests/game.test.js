/**
 * @jest-environment jsdom
 */
const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
} = require("../game")

jest.spyOn(window, "alert").mockImplementation (() => { });

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Game Object Contains Correct Keys", () => {
    test("Score Key Exists", () => {
        expect("score" in game).toBe(true);
    });
    test("CurrentGame Key Exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves Key Exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices Key Exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains correct ID's", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber Key Exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("turnInProgress Key Exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("lastButton Key Exists", () => {
        expect("lastButton" in game).toBe(true);
    });

});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ['button1', 'button2'];
        game.playerMoves = ['button1', 'button2'];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("Should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("Should be one element in the computers game array", () => {
        expect(game.currentGame.length).toBe(1)
    });
    test("Should clear playerMoves array", () => {
        // Use .length on the Array to check if it has been cleared;
        expect(game.playerMoves.length).toBe(0);
    });
    test("Should display 0 for element with ID of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("Expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toBe("true");
        }
    })
});

describe("Gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("Make sure addTurn works correctly", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("Should add correct class to light up the buttons (circles)", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("Should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("Test should call alert if move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!")
    });
    test("Check if turn is in progress and prevent input", () => {
        showTurns();
        expect(game.turnInProgress).toEqual(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});