import db from '../models';

db.BorrowedBook.sync({ force: true })
  .then(() => {
    db.BorrowedBook.bulkCreate([{
      userId: 1,
      bookId: 1,
      returned: false,
    },
    {
      userId: 1,
      bookId: 2,
      returned: true,
    },
    ])
      .then(() => {
        process.stdout.write('Test borrowed Books created \n');
      }).then(() => {
        process.exit();
      });
  });
