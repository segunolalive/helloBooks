import { Notification } from '../models';


/**
 * fetch all notifications for admin
 * @param  {object} req   - express http request object
 * @param  {object} res   - express http response object
 * @param  {Bool} history - optional arguement indicating user history
 * @param  {Bool} admin   - optional arguement indicating admin status
 * @return {object}       - express http response object
 */
export default (req, res, history, admin) => {
  const options = { order: [['id', 'DESC']] };
  if (history) {
    options.where = { username: req.user.username };
  }
  if (admin) {
    delete options.where;
  }
  Notification.findAll(options)
    .then(notifications => (
      res.status(200).send({
        notifications
      })
    ))
    .catch(error => (
      res.status(500).send({
        error,
      })
    ));
};
