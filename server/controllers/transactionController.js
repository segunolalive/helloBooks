import { Notification } from '../models';


/**
 * fetch all notifications for admin
 * @param  {object} req   - express http request object
 * @param  {object} res   - express http response object
 * @param  {Bool} history - optional arguement indicating user history
 * @return {object}       - express http response object
 */
export default (req, res, history) => {
  const options = { order: [['id', 'DESC']] };
  if (history) {
    options.where = { username: req.user.username };
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
