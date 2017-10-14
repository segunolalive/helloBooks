import { Notification } from '../models';

export default {
  adminTransactionNotification(req, res) {
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
  },

  userTransactions(req, res) {
    Notification.findAll({
      where: { username: req.user.username },
      order: [['id', 'DESC']]
    })
      .then((transactions) => {
        res.status(200).send({
          success: true,
          data: transactions,
        });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          error,
        });
      });
  },
};
