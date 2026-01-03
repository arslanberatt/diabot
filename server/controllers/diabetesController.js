const { exec } = require('child_process');
const path = require('path');
const { success, error } = require('../utils/response');
const { asyncHandler } = require('../middleware/validation');

/**
 * Diyabet tahmini yap
 */
const predictDiabetes = asyncHandler(async (req, res) => {
  const userData = req.body;

  // Gerekli alanları kontrol et
  const requiredFields = ['gender', 'age', 'hypertension', 'heart_disease', 
                          'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level'];
  
  for (const field of requiredFields) {
    if (userData[field] === undefined || userData[field] === null || userData[field] === '') {
      return error.badRequest(res, `${field} alanı gereklidir`);
    }
  }

  // Python script path
  const scriptPath = path.join(__dirname, '../../data_analys/predict_diabetes.py');
  const jsonData = JSON.stringify(userData);
  // Base64 encode to avoid shell escaping issues on Windows
  const encodedData = Buffer.from(jsonData).toString('base64');

  // Python scriptini çalıştır
  return new Promise((resolve, reject) => {
    exec(
      `python "${scriptPath}" "${encodedData}"`,
      { cwd: path.join(__dirname, '../../data_analys') },
      (err, stdout, stderr) => {
        if (err) {
          console.error('Python script error:', err);
          console.error('stderr:', stderr);
          return reject(error.serverError(res, 'Tahmin yapılırken bir hata oluştu: ' + err.message));
        }

        try {
          // Python script JSON output döndürüyor
          const result = JSON.parse(stdout.trim());
          success.ok(res, 'Tahmin başarıyla tamamlandı', result);
          resolve();
        } catch (parseErr) {
          console.error('JSON parse error:', parseErr);
          console.error('stdout:', stdout);
          console.error('stderr:', stderr);
          return reject(error.serverError(res, 'Sonuç parse edilemedi'));
        }
      }
    );
  });
});

module.exports = {
  predictDiabetes,
};

