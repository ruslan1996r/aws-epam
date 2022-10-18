export const Responses = {
  _DefineResponse(statusCode = 500, data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode,
      body: JSON.stringify(data, null, 2),
    };
  },
  _200(data = {}) {
    return this._DefineResponse(200, data);
  },
  _400(error = {}) {
    return this._DefineResponse(400, { error: error.message });
  },
  _404(error = {}) {
    return this._DefineResponse(404, { error: error.message });
  },
  _500(error = {}) {
    return this._DefineResponse(500, { error: error.message });
  }
};
