"use strict";

// Funcao de arredondamento padrao com definição de número de casas decimais.
function round(number, decimalPlaces) {
    var factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

// Funcao de truncamento com definição de número de casas decimais.
function roundFloor(number, decimalPlaces) {
    var factor = Math.pow(10, decimalPlaces);
    return Math.floor(number * factor) / factor;
}

// Funcao de cálculo da Taxa CDI diária conforme valor anualizado.
function calculateTCDIk(CDIk) {
    return round(Math.pow((CDIk / 100) + 1, (1 / 252)) - 1, 8);
}

// Funcao de do TCDI acumulado
function calculateTCDIacc(accumulated, TCDIk, cdbRate) {
    return round(accumulated * (1 + TCDIk * cdbRate / 100), 16);
}

module.exports = {
    round,
    roundFloor,
    calculateTCDIk,
    calculateTCDIacc
}
