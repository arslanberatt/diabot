// Standardized response helper
const sendResponse = (res, statusCode, success, message, data = null, meta = null) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

// Success responses
const success = {
  ok: (res, message, data = null) => {
    return sendResponse(res, 200, true, message, data);
  },

  created: (res, message, data = null) => {
    return sendResponse(res, 201, true, message, data);
  },

  noContent: (res, message = 'İşlem başarılı') => {
    return sendResponse(res, 204, true, message);
  },
};

// Error responses
const error = {
  badRequest: (res, message, errors = null) => {
    return sendResponse(res, 400, false, message, null, errors ? { errors } : null);
  },

  unauthorized: (res, message = 'Yetkisiz erişim') => {
    return sendResponse(res, 401, false, message);
  },

  forbidden: (res, message = 'Erişim reddedildi') => {
    return sendResponse(res, 403, false, message);
  },

  notFound: (res, message = 'Kayıt bulunamadı') => {
    return sendResponse(res, 404, false, message);
  },

  conflict: (res, message = 'Çakışma hatası') => {
    return sendResponse(res, 409, false, message);
  },

  serverError: (res, message = 'Sunucu hatası') => {
    return sendResponse(res, 500, false, message);
  },
};

module.exports = {
  success,
  error,
  sendResponse,
};

