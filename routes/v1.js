'use strict';

const express = require('express');
const router = express.Router();
const v1Controller = require('../app/api/controllers/v1');

router.get('/next', v1Controller.getNextAndIncrement);
router.get('/current', v1Controller.getCurrent);
router.put('/current', v1Controller.setValue);

module.exports = router;
