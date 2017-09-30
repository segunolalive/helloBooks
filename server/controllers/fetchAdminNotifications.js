import { Notification } from '../models';

export default (req, res) => {
  Notification.findAll({ order: [['id', 'DESC']] })
    .then((notifications) => {
      res.status(200).send({
        success: true,
        notifications
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        error,
      });
    });
};
