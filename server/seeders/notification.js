import db from '../models';

db.Notification.sync()
  .then(() => {
    db.Notification.bulkCreate([{
      type: 'borrow',
      bookTitle: 'eloquent javascript',
      username: 'debo',
    }])
      .then(() => {
        process.stdout.write('Test Notifications created \n');
      }).then(() => {
        process.exit();
      });
  });
