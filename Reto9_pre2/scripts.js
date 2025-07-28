document.addEventListener ("DOMContentLoaded", function () {
    const numero1 = document.getElementById("numero1");
    const numero2 = document.getElementById("numero2");
    const resultText = document.getElementById ("resultText");

    window.calcular = function (operacion) {
        const num1 =parseFloat(numero1.value.trim());
        const num2 = parseFloat(numero2.value.trim());
        if (
            isNaN(num1) ||
            isNaN(num2)) {
                resultText.textContent = "Por favor, ingrese un numero valido";
                return;
        }

        let result;
        switch (operacion) {
            case 'Sumar':
            result = num1+num2;
                break;
            case 'Resta':
                result = num1-num2;
                break;
            case 'multiplicar':
                result = num1*num2;
                break;
            case 'dividir':
                if (num2 ===0) {
                    resultText.textContent = "No se puede dividir por cero"
                    return;
                }
                result =num1 / num2;
                break;
            default:
                result = "Operacion no valida"
        }
        resultText.textContent = result
    };
});