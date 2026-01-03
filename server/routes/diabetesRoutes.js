const express = require('express');
const router = express.Router();
const { predictDiabetes } = require('../controllers/diabetesController');

// Diyabet tahmini endpoint
router.post('/predict', predictDiabetes);

module.exports = router;

