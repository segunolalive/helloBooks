/**
 * checks if there are more pages to fetching
 *
 * @param  {Object}  oldPagination last pagination Object
 * @param  {Object}  newPagination current pagination Object
 *
 * @return {Boolean}               true if there are more pages
 */
export const hasMore = (oldPagination, newPagination) => {
  if (oldPagination !== newPagination) {
    return newPagination.pageCount >= newPagination.pageNumber;
  }
  return false;
};

/**
 * gets offset for fetching rrequest
 *
 * @param {Integer} pageNumber current page pageNumber
 * @param {Integer} pageSize   page size
 *
 * @return {Integer}           offset for next fetch.
 */
export function getOffset(pageNumber, pageSize) {
  let offset = 0;
  if (pageNumber && pageSize) {
    offset = pageNumber * pageSize;
  }
  this.setState({
    hasMore: false
  });
  return offset;
}
