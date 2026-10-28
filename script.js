
const display = document.getElementById("display");

let expression = "";
let resultShown = false;

function appendValue(value) {
    if (resultShown) {
        if ("0123456789.".includes(value)) {
            expression = "";
        }
        resultShown = false;
    }

    expression += value;
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "0";
    resultShown = false;
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression || "0";
    resultShown = false;
}

function calculate() {
    try {
        if (!expression ||
            !/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(Number(result.toPrecision(12)));
        display.value = expression;
        resultShown = true;

    } catch (error) {
        display.value = "Error";
        expression = "";
        resultShown = true;
    }
}
