const form = document.getElementById('form');

form.addEventListener('submit', function(event){
    event.preventDefault();
})

function calcularIMC() {
    let altura = document.getElementById("altura").value;
    let peso = document.getElementById("peso").value;
    let resultado = document.getElementById("resultado");

    let imc = (peso / (altura ** 2)).toFixed(2);
    resultado.textContent = 'Seu IMC é ' + imc;
    console.log(imc);
}