import { hasMore, getOffset } from '../../utils/paginationUtils';

const mock1 = {
  oldPagination: {
    pageSize: 5,
    pageNumber: 2,
    pageCount: 5
  },
  newPagination: {
    pageSize: 5,
    pageNumber: 3,
    pageCount: 5
  }
};

const mock2 = {
  oldPagination: {
    pageSize: 5,
    pageNumber: 5,
    pageCount: 5
  },
  newPagination: {
    pageSize: 5,
    pageNumber: 5,
    pageCount: 5
  }
};

const mockComponent = {
  setState(){}
}

describe('hasMore', () => {
  it('returns true if there is more data to be fetched', () => {
    const result = hasMore(mock1.oldPagination, mock1.newPagination);
    expect(result).toEqual(true);
  });

  it('returns false if there is no more data to be fetched', () => {
    const result = hasMore(mock2.oldPagination, mock2.oldPagination);
    expect(result).toEqual(false);
  });
});

describe('getOffset', () => {
  it('returns offset', () => {
    const result = getOffset.bind(mockComponent)(mock1.oldPagination.pageNumber,
      mock1.oldPagination.pageSize);
    expect(result).toBe(10);
  });
});
