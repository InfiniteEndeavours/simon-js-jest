/**
 * @jest-environment jsdom
 */

const { game } = require("../game")

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
});