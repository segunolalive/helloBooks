import { Notification } from '../models';
import { getOptions, paginate } from '../helpers/pagination';


/**
 * fetch all notifications for admin
 * 
 * @param  {object} req             - express http request object
 * @param  {object} res             - express http response object
 * @param  {Object} options         - optional arguement with keys history and
 * admin
 * @param  {Bool} options.history   - return user transaction history if true
 * @param  {Bool} options.admin     - return site transactions if true
 *
 * @return {object}                 - express http response object
 */
export default (req, res, options) => {
  const paginationOptions = getOptions(req);
  let query = { order: [['id', 'DESC']] };
  if (options.history) {
    query.where = { username: req.user.username };
  }
  if (options.admin) {
    delete query.where;
  }
  query = { ...query, ...paginationOptions };
  Notification.findAndCountAll(query)
    .then(notifications => (
      res.status(200).send({
        notifications: notifications.rows,
        metadata: paginate(notifications.count,
          Number(paginationOptions.limit), paginationOptions.offset)
      })
    ))
    .catch(error => (
      res.status(500).send({
        error,
      })
    ));
};
