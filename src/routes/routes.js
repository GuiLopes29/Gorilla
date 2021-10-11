'use strict';

const express = require('express');
const router = express.Router();
const microsControll = require('../controllers/micros/microsController')
const cdbControll = require('../controllers/cdb/cdbController')

router.get('/', microsControll.home);
router.get('/cdb', cdbControll.precosCDB);

module.exports = {
    routes: router
}