import db from '../models';

db.BookCategory.sync()
  .then(() => {
    db.BookCategory.bulkCreate([{
      category: 'javascript',
    }, {
      category: 'ruby',
    }])
      .then(() => {
        process.stdout.write('Book Categories created \n');
      }).then(() => {
        process.exit();
      });
  });
