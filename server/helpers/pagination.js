import constants from '../constants';

/**
 * extracts query from request object
 *
 * @param {Object} req
 *
 * @returns {Object}   condition with which to query database
 */
export const getQuery = (req) => {
  const query = {};
  if (req.query.categoryId) {
    query.categoryId = req.query.categoryId;
  }
  if (req.query.search) {
    query.$or = [{
      title: {
        $ilike: `%${req.query.search}%`
      } },
    {
      authors: {
        $ilike: `%${req.query.search}%`
      }
    }];
  }
  return query;
};

/**
 * extracts limit and offset options from request query
 *
 * @param {Object} req
 * 
 * @returns {Object}   options for paginating database query
 */
export const getOptions = (req) => {
  const { DEFAULT_LIMIT: limit, DEFAULT_OFFSET: offset } = constants;
  const options = { limit, offset };
  options.limit = req.query.limit ? req.query.limit : options.limit;
  options.offset = req.query.offset ? req.query.offset : options.offset;
  return options;
};

/**
 * formats pagination metadata
 * 
 * @param {integer} total
 * @param {integer} pageSize
 * @param {integer} offset
 *
 * @returns {Object}       pagination metadata
 */
export const paginate = (total, pageSize, offset) => ({
  pageNumber: Math.floor(offset / pageSize) + 1,
  pageCount: Math.ceil(total / pageSize),
  pageSize,
  total
});
