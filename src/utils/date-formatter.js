'use strict';

const formatDateResponse = (date) => {
    const aux = new Date(date)
    const day = ("0" + aux.getDate()).slice(-2);
    const month = ("0" + (aux.getMonth() + 1)).slice(-2);
    const year = aux.getFullYear();
    return `${year}-${month}-${day}`
}

module.exports = { formatDateResponse };