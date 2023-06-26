// define as unidades para cada categoria
var unidades = {
    comprimento: ['Metros', 'Centímetros', 'Polegadas'],
    peso: ['Quilogramas', 'Gramas', 'Libras'],
    temperatura: ['Celsius', 'Fahrenheit', 'Kelvin']
};

// função que atualiza as unidades de origem com base na categoria selecionada
function atualizarUnidadesOrigem() {
    var categoria = document.getElementById('categoria').value;
    var unidadeOrigem = document.getElementById('unidadeOrigem');

    // para aparecer as unidades certas depois de cada troca de categoria
    unidadeOrigem.innerHTML = '';

    // adiciona as opções de unidades de origem para a categoria selecionada
    unidades[categoria].forEach(function (unidade) {
        var option = document.createElement('option'); /*cria um novo elemento*/
        option.value = unidade;
        option.textContent = unidade;
        unidadeOrigem.appendChild(option); /*adiciona um elemento filho a outro elemento*/
    });

    // atualiza as unidades de destino também
    atualizarUnidadesDestino();
}

// mesma coisa da função atualizarUnidadesOrigem, mas para a de destino desta vez
function atualizarUnidadesDestino() {
    var categoria = document.getElementById('categoria').value;
    var unidadeDestino = document.getElementById('unidadeDestino');

    unidadeDestino.innerHTML = '';

    unidades[categoria].forEach(function (unidade) {
        var option = document.createElement('option'); /*cria um novo elemento*/
        option.value = unidade;
        option.textContent = unidade;
        unidadeDestino.appendChild(option); /*adiciona um elemento filho a outro elemento*/
    });
}

// Função para converter o valor da unidade de origem para a unidade de destino com base na categoria selecionada
function converter(evento) {
    evento.preventDefault();

    var valor = parseFloat(document.getElementById('valor').value);
    var categoria = document.getElementById('categoria').value;
    var unidadeOrigem = document.getElementById('unidadeOrigem').value;
    var unidadeDestino = document.getElementById('unidadeDestino').value;
    var resultado;

    // seleciona a função de conversão com base na categoria selecionada
    switch (categoria) { /*switch e case é uma estrutura condicional, parecido com if else, usado quando há multiplas condições*/
        case 'comprimento':
            resultado = converterComprimento(valor, unidadeOrigem, unidadeDestino);
            break;
        case 'peso':
            resultado = converterPeso(valor, unidadeOrigem, unidadeDestino);
            break;
        case 'temperatura':
            resultado = converterTemperatura(valor, unidadeOrigem, unidadeDestino);
            break;
    }

    document.getElementById('resultado').textContent = `${valor} ${unidadeOrigem} é igual a ${resultado} ${unidadeDestino}`;
}

// Função para converter unidades de comprimento
function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
    var valorEmMetros;

    // converte o valor de unidade de origem para metros
    switch (unidadeOrigem) {
        case 'Metros':
            valorEmMetros = valor;
            break;
        case 'Centímetros':
            valorEmMetros = valor / 100;
            break;
        case 'Polegadas':
            valorEmMetros = valor * 0.0254;
            break;
    }

    var resultado;

    // converte o valor em metros para a unidade de destino
    switch (unidadeDestino) {
        case 'Metros':
            resultado = valorEmMetros;
            break;
        case 'Centímetros':
            resultado = valorEmMetros * 100;
            break;
        case 'Polegadas':
            resultado = valorEmMetros / 0.0254;
            break;
    }

    return resultado;
}

// Função para converter unidades de peso
function converterPeso(valor, unidadeOrigem, unidadeDestino) {
    var valorEmQuilogramas;

    // converte o valor de unidade de origem para quilogramas
    switch (unidadeOrigem) {
        case 'Quilogramas':
            valorEmQuilogramas = valor;
            break;
        case 'Gramas':
            valorEmQuilogramas = valor / 1000;
            break;
        case 'Libras':
            valorEmQuilogramas = valor * 0.45359237;
            break;
    }

    var resultado;

    // Converter o valor em quilogramas para a unidade de destino
    switch (unidadeDestino) {
        case 'Quilogramas':
            resultado = valorEmQuilogramas;
            break;
        case 'Gramas':
            resultado = valorEmQuilogramas * 1000;
            break;
        case 'Libras':
            resultado = valorEmQuilogramas / 0.45359237;
            break;
    }

    return resultado;
}

// Função para converter unidades de temperatura
function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
    var resultado;

    // converte a temperatura da unidade de origem para Celsius
    switch (unidadeOrigem) {
        case 'Celsius':
            resultado = valor;
            break;
        case 'Fahrenheit':
            resultado = (valor - 32) * 5 / 9;
            break;
        case 'Kelvin':
            resultado = valor - 273.15;
            break;
    }

    // converte a temperatura de Celsius para a unidade de destino
    switch (unidadeDestino) {
        case 'Celsius':
            return resultado;
        case 'Fahrenheit':
            return resultado * 9 / 5 + 32;
        case 'Kelvin':
            return resultado + 273.15;
    }
}

// Event listener para atualizar as unidades de origem quando a categoria é alterada
document.getElementById('categoria').addEventListener('change', atualizarUnidadesOrigem);
// Event listener para converter as unidades quando o formulário é enviado
document.getElementById('formConversao').addEventListener('submit', converter);

// chama a função para atualizar as unidades de origem ao carregar a página
atualizarUnidadesOrigem();