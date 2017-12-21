import requestImageUrl from '../../utils/requestImageUrl';

describe('requestImageUrl', () => {
  it('returns the url if no configuration object is passed', () => {
    const baseUrl = "localhost:300";
    const result = requestImageUrl(baseUrl);
    expect(result).toEqual(baseUrl);
  });

  it('adds width and height configuration the url', () => {
    const baseUrl = "localhost:300";
    const result = requestImageUrl(baseUrl, {width: 10, height: 10 });
    expect(result).not.toEqual(baseUrl);
    expect(result).toContain('w_10');
    expect(result).toContain("h_10");
  });
});

