'use strict';

const { calculateCDBPosFixado } = require('../../utils/cdi-calculate.js');
const { handleIncomeData } = require('../../utils/income-data.js');

const precosCDB = async (req, res, next) => {
    try {
        const {
            checkInvestmentDate,
            checkCurrentDate,
            currentDateDay,
            currentDateMonth,
            currentDateYear,
            cdbRate,
            investmentDateDay,
            investmentDateMonth,
            investmentDateYear
        } = handleIncomeData(req.body);


        // Checagem se houve alguma variavel recebida invalida
        if (!checkInvestmentDate)
            return res.status(400).send({ error: 'Verifique o inicio da data do investimento' });

        if (!checkCurrentDate)
            return res.status(400).send({ error: 'Verifique a data atual' });

        if (typeof (cdbRate) !== 'number')
            return res.status(400).send({ error: 'CDB Rate precisa ser um numero' });

        // Funcao principal de calculo do CDB
        const cdiResponse = calculateCDBPosFixado({
            investmentDate: new Date(Number(investmentDateYear), Number(investmentDateMonth) - 1, Number(investmentDateDay)),
            cdbRate,
            currentDate: new Date(Number(currentDateYear), Number(currentDateMonth) - 1, Number(currentDateDay))
        });

        return res.status(200).send({ ValoresCdi: cdiResponse });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    precosCDB
}