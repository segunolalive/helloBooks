let mockDelay;
let mockError;
let mockResponse = {
  status() {
    return 200;
  },
  ok: true,
  get: jest.genMockFunction(),
  toError: jest.genMockFunction(),
  data: { message: 'success' }
};

const request = {
  post: jest.genMockFunction().mockReturnThis(),
  get: jest.genMockFunction().mockReturnThis(),
  send: jest.genMockFunction().mockReturnThis(),
  query: jest.genMockFunction().mockReturnThis(),
  field: jest.genMockFunction().mockReturnThis(),
  set: jest.genMockFunction().mockReturnThis(),
  accept: jest.genMockFunction().mockReturnThis(),
  timeout: jest.genMockFunction().mockReturnThis(),
  end: jest.genMockFunction().mockImplementation(function cb(callback) {
    if (mockDelay) {
      this.delayTimer = setTimeout(callback, 0, mockError, mockResponse);
      return;
    }

    callback(mockError, mockResponse);
  }),

  __setMockDelay(boolValue) {
    mockDelay = boolValue;
  },
  __setMockResponse(mockRes) {
    mockResponse = mockRes;
  },
  __setMockError(mockErr) {
    mockError = mockErr;
  },
  __setMockResponseBody(body) {
    mockResponse.body = body;
  }
};

export default request;
