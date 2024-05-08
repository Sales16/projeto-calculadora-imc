document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        toggleDisplay();
    }
});

function toggleDisplay() {
    var calcElement = document.querySelector('.main-calc');
    var resultElement = document.querySelector('.main-result');

    // Verifica o estado atual da exibição e alterna
    if (calcElement.style.display === 'block') {
        calcElement.style.display = 'none';
        resultElement.style.display = 'block';
    } else {
        calcElement.style.display = 'block';
        resultElement.style.display = 'none';
    }
}

function calcular(){
    let altura = document.getElementById("ialtura").value;
    let peso = document.getElementById("ipeso").value;
    // altura = altura.replace(/,/g, '');
    // altura = altura.replace(/./g, '');
    altura = altura / 100;
    console.log(altura);
    console.log(peso);
    imc = peso / (altura * altura);
    console.log(imc);
}