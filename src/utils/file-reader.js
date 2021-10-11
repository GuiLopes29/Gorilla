'use strict';

const fs = require('fs')
const path = require('path')
const csv = require('fast-csv');
const { formatDateResponse } = require('./date-formatter');

let cdiPrices = [];
const cdi = () =>
    //Lê o arquivo CSV ao iniciar para otimizar o desempenho da API
    fs.createReadStream(path.resolve(__dirname, '..', 'csv', 'CDI_Prices.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', ({ dtDate, dLastTradePrice }) => {
            const [dtDateDay, dtDateMoth, dtDateYear] = dtDate.split('/');
            const date = new Date(Number(dtDateYear), Number(dtDateMoth) - 1, Number(dtDateDay));

            cdiPrices.unshift({
                dtDate: formatDateResponse(date),
                dLastTradePrice: Number(dLastTradePrice)
            });
        })
        .on('end', () => {
            cdiPrices = cdiPrices.sort((a, b) => a.dtDate > b.dtDate ? 1 : -1);
        });

module.exports = {
    cdi,
    cdiPrices
}