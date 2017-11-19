export const hasMore = (oldPagination, newPagination) => {
  if (oldPagination !== newPagination) {
    return newPagination.pageCount >= newPagination.pageNumber;
  }
  return false;
};


export const getOffset = (pageNumber, pageSize) => {
  let offset = 0;
  if (pageNumber && pageSize) {
    offset = pageSize * pageNumber;
  }
  return offset;
};
