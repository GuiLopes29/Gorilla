'use strict';

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

module.exports = {
    handleIncomeData
}