document.addEventListener ("DOMContentLoaded", function () {
    const number1 = document.getElementById("number1");
    const number2 = document.getElementById("number2");
    const addButton = document.getElementById ("addButton");
    const resultText = document.getElementById ("resultText");

    addButton.addEventListener("click", function () {
        const num1 =Number(number1.value);
        const num2 =Number(number2.value);
        let result =num1 + num2;
        resultText.textContent = result
    });

});