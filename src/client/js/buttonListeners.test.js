import {postUI} from "./buttonListeners"

const regeneratorRuntime = require("regenerator-runtime");
test ("Is this true?", async() => {
    expect(postUI).toBeDefined();
});
test ("Is this a function?", async() => {
    expect(typeof postUI).toBe("function");
});