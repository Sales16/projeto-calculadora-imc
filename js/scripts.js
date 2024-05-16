// Ações dos eventos do botão
let btCalc = document.getElementById("botao-calcular");
btCalc.addEventListener("click", calcular);

let btLimpar = document.getElementById("botao-limpar");
btLimpar.addEventListener("click", limpar);

let btVoltar = document.getElementById("botao-voltar");
btVoltar.addEventListener("click", toggleDisplay);

// Evento para a troca de tela com enter
document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        var calculadora = document.querySelector('.main-calc');
        if (calculadora.style.display === 'block') {
            calcular()
        }
        else {
            toggleDisplay()
        }
    }
});

// Função para a troca de tela
function toggleDisplay() {
    var calculadora = document.querySelector('.main-calc');
    var resultado = document.querySelector('.main-result');

    if (calculadora.style.display === 'block') {
        calculadora.style.display = 'none';
        resultado.style.display = 'block';
    } else {
        calculadora.style.display = 'block';
        resultado.style.display = 'none';
    }
}

// Função para calcular O IMC
function calcular() {
    let dataCalc = new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    let altura = document.getElementById("ialtura").value;
    if (altura == '') {
        alert('A altura é obrigatória')
        return;
    }
    let peso = document.getElementById("ipeso").value;
    if (peso == '') {
        alert('O peso é obrigatório')
        return;
    }

    alturaFormatada = validarAltura(altura);
    pesoFormatado = validarPeso(peso);

    imc = pesoFormatado / (alturaFormatada ** 2);
    imc = imc.toFixed(2);

    let situ = situacao(imc)

    let resultDoCalc = {
        data: dataCalc,
        peso: pesoFormatado,
        altura: alturaFormatada,
        imc: imc,
        situacao: situ
    }

    historicoCalc(resultDoCalc)

    toggleDisplay()
    mostrarResultado(imc, situ)
}

// Função para validar a altura (Tratamento para deixar em metros)
function validarAltura(altura) {
    let alturaLimpa = altura.replace(/[.,]/g, '');
    while (alturaLimpa.length < 3) {
        alturaLimpa += '0';
    }
    if (alturaLimpa.length > 3) {
        alturaLimpa = alturaLimpa.substring(0, 3);
    }
    let alturaNumerica = parseInt(alturaLimpa, 10);
    if (alturaNumerica < 0) {
        alert("A altura não pode ser negativa.");
        return;
    }
    else {
        let alturaEmMetros = alturaNumerica / 100;
        return alturaEmMetros
    }
}

// Função para validar o peso (Tratamento para deixar em kg)
function validarPeso(peso) {
    let pesoLimpo = peso.replace(/[,]/g, '.');
    let pesoNumerico = parseFloat(pesoLimpo, 10);
    if (pesoNumerico < 0) {
        alert("O peso não pode ser negativa.");
        return;
    }
    return pesoNumerico;
}

// Função para mostrar o resultado na tabela
function mostrarResultado(imc, situacao) {
    pImc = document.getElementById("imc");
    pSituacao = document.getElementById("situacao");
    pImc.textContent = `Seu IMC é: ${imc}`
    pSituacao.textContent = `Situação ${situacao}`
}

// Função para mostrar a situação do IMC (7 casos)
function situacao(imc) {
    pImc = document.getElementById("imc");
    pSituacao = document.getElementById("situacao");
    if (imc < 17) {
        pImc.style.color = 'var(--corA)'
        pSituacao.style.color = 'var(--corA)'
        return "Muito abaixo do peso";
    }
    else if (imc >= 17 && imc <= 18.49) {
        pImc.style.color = 'var(--corB)'
        pSituacao.style.color = 'var(--corB)'
        return "Abaixo do peso";
    }
    else if (imc >= 18.5 && imc <= 24.99) {
        pImc.style.color = 'var(--corC)'
        pSituacao.style.color = 'var(--corC)'
        return "Peso normal";
    }
    else if (imc >= 25 && imc <= 29.99) {
        pImc.style.color = 'var(--corB)'
        pSituacao.style.color = 'var(--corB)'
        return "Acima do peso";
    }
    else if (imc >= 30 && imc <= 34.99) {
        pImc.style.color = 'var(--corA)'
        pSituacao.style.color = 'var(--corA)'
        return "Obesidade I";
    }
    else if (imc >= 35 && imc <= 39.99) {
        pImc.style.color = 'var(--corD)'
        pSituacao.style.color = 'var(--corD)'
        return "Obesidade II (severa)";
    }
    else {
        pImc.style.color = 'var(--corE)'
        pSituacao.style.color = 'var(--corE)'
        return "Obesidade III (mórbida)";
    }
}

// Função para salvar o resultado no histórico
function historicoCalc(resultado) {
    let historico = recuperarHistoricoCalc();

    historico.push(resultado);

    historico = JSON.stringify(historico)
    localStorage.setItem("historico", historico)
}

// Função para recuperar o resultado do histórico
function recuperarHistoricoCalc() {
    let historico = localStorage.getItem("historico")

    if (!historico) {
        return [];
    }
    let historicoConvertido = JSON.parse(historico)
    return historicoConvertido;
}

// Função para limpar os valores da calculadora
function limpar() {
    let altura = document.getElementById("ialtura");
    let peso = document.getElementById("ipeso");

    altura.value = '';
    peso.value = '';
}