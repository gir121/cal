const display = document.getElementById("display");
let currentInput = "";
let operator = null;
let previousInput = "";

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.getAttribute("data-action");
        const value = button.innerText;

        if (action === "number") handleNumber(value);
        if (action === "operator") handleOperator(button.getAttribute("data-operator"));
        if (action === "equals") calculate();
        if (action === "clear") clearDisplay();
        if (action === "delete") deleteLast();
    });
});

function handleNumber(number) {
    if (number === "." && currentInput.includes(".")) return;
    currentInput += number;
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    if (!operator || currentInput === "") return;

    const result = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => b !== 0 ? a / b : "Error",
    }[operator](parseFloat(previousInput), parseFloat(currentInput));

    updateDisplay(result);
    currentInput = result.toString();
    operator = null;
    previousInput = "";
}

function updateDisplay(value) {
    display.innerText = value;
}


function clearDisplay() {
    currentInput = "";
    operator = null;
    previousInput = "";
    updateDisplay("0");
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
}
