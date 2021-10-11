'use strict';

const { calculateCDBPosFixado } = require('../../utils/cdi-calculate.js');

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
        if (!checkInvestmentDate) {
            return res.status(400).send({ error: 'Verifique o inicio da data do investimento' });
        }

        if (!checkCurrentDate) {
            return res.status(400).send({ error: 'Verifique o inicio da data do investimento' });
        }

        if (typeof (cdbRate) !== 'number') {
            return res.status(400).send({ error: 'CDB Rate precisa ser um numero' });
        }

        // Funcao principal de calculo do CDB
        const cdiResponse = calculateCDBPosFixado({
            investmentDate: new Date(Number(investmentDateYear), Number(investmentDateMonth) - 1, Number(investmentDateDay)),
            cdbRate,
            currentDate: new Date(Number(currentDateYear), Number(currentDateMonth) - 1, Number(currentDateDay)),
        });

        function handleIncomeData(data) {
            const { investmentDate, cdbRate, currentDate } = data;
            let checkInvestmentDate = true;
            let checkCurrentDate = true;
            // Separação das variáveis recebidas no padrão yyyy-mm-dd
            const [investmentDateYear, investmentDateMonth, investmentDateDay] = investmentDate.split('-');
            const [currentDateYear, currentDateMonth, currentDateDay] = currentDate.split('-');
            // Checagem se as datas foram recebidas corretamente
            // - Todas sao numeros
            // - Dias entre 1 e 31
            // - Meses entre 1 e 12
            if (Number(investmentDateDay) < 1 || Number(investmentDateDay) > 31 ||
                Number(investmentDateMonth) < 1 || Number(investmentDateMonth) > 12 ||
                (!Number(investmentDateYear) || !Number(investmentDateMonth) || !Number(investmentDateDay))) {
                checkInvestmentDate = false;
            }
            if (Number(currentDateDay) < 1 || Number(currentDateDay) > 31 ||
                Number(currentDateMonth) < 1 || Number(currentDateMonth) > 12 ||
                (!Number(currentDateYear) || !Number(currentDateMonth) || !Number(currentDateDay))) {
                checkCurrentDate = false;
            }
            return {
                checkInvestmentDate,
                checkCurrentDate,
                investmentDateDay,
                investmentDateMonth,
                investmentDateYear,
                cdbRate,
                currentDateDay,
                currentDateMonth,
                currentDateYear
            };
        }

        res.status(200).send({
            cdiResponse
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    precosCDB
}