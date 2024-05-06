const form = document.getElementById('form');
form.addEventListener('submit', function(event){
    event.preventDefault();
})

let botaoCalcular = document.getElementById("calcular");
botaoCalcular.addEventListener("click", calcularIMC);

let botaoReset = document.getElementById("resetar");
botaoReset.addEventListener("click", reset);

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        calcularIMC();
    }
});

function calcularIMC() {
    let altura = document.getElementById("altura").value
    let peso = document.getElementById("peso").value;
    let resultado = document.getElementById("resultado");

    let imc = (peso / ((altura / 100) ** 2)).toFixed(2);
    resultado.textContent = 'Seu IMC é ' + imc;
    console.log(imc);
}

function reset() {
    let resultado = document.getElementById("resultado");
    resultado.textContent = '';    
}