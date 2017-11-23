import queryStringFromObject from '../../utils/queryStringFromObject';


describe('queryStringFromObject', () => {
  it('returns a query string', () => {
    const queryObj = { offset: 5, limit: 2 };
    const queryString = queryStringFromObject(queryObj);
    expect(queryString).toBe('?offset=5&limit=2&');
  });
});
