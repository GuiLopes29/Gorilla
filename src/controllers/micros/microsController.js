'use strict';

//Informa que a API está sendo executada
const home = async (req, res, next) => {
    try {
        return res.status(200).send({
            message: 'Gorila-api executando com sucesso.'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    home
}