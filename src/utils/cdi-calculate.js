'use strict';

const { cdiPrices } = require('./file-reader');
const { formatDateResponse } = require('./date-formatter');
const { calculateTCDIacc, calculateTCDIk, roundFloor } = require('./math-functions');

function calculateCDBPosFixado({ investmentDate, cdbRate, currentDate }) {
    // Poderia usar um .map no array para fazer toda a lógica, porem gastará
    // processamento atoa sendo necessário percorrer o array inteiro em qualquer situação.
    // Nessa estratégia é poupado checagem do array em várias situações.
    // console.log(cdiPrices.findIndex(cdiData))
    const initialIndex = cdiPrices.findIndex((cdiData) => {
        return (new Date(cdiData.dtDate).getTime() >= investmentDate.getTime());
    });

    let cdiResponse = [];
    let cdiCumulator = 1;
    // For para fazer o processamento dos dados e calculo da evolucao
    for (let i = initialIndex; i < cdiPrices.length; i++) {
        // Caso a data seja maior (ou igual, ja que o dia precisa terminar para
        // constar a soma no investimento) ele pára a iteração.
        if (new Date(cdiPrices[i].dtDate).getTime() >= currentDate.getTime())
            break;
        // Calculo da Taxa do CDI diário considerando o CDI anualizado na data especifica
        const TCDIk = calculateTCDIk(cdiPrices[i].dLastTradePrice);
        // Atualização do acumulador do investimento com o valor anterior,
        // a taxa do dia calculada e o % relativa do investimento
        cdiCumulator = calculateTCDIacc(cdiCumulator, TCDIk, cdbRate);
        // Formatação da data para incluir no array de retorno
        const date = formatDateResponse(cdiPrices[i].dtDate);
        // Adição do elemento de evolução no array de retorno
        cdiResponse.push({
            date,
            unitPrice: roundFloor(cdiCumulator * 1000, 2)
        });
    }
    return cdiResponse;
}

module.exports = {
    calculateCDBPosFixado
}