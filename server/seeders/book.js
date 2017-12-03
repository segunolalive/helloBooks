import db from '../models';

db.Book.sync()
  .then(() => {
    db.Book.bulkCreate([{
      title: 'eloquent javascript',
      authors: 'marijn haverbeke',
      total: 20,
      description: 'a modern introduction to programming',
      categoryId: 1,
    },
    {
      title: 'eloquent ruby',
      authors: 'flo harrison',
      total: 10,
      description: 'ruby destruction',
      categoryId: 2,
    },
    {
      title: 'eloquent python',
      authors: 'flo harrison, dan moss',
      total: 0,
      description: 'feel the snake',
      categoryId: 1,
    },
    {
      title: 'eloquent fish',
      authors: 'flo harrison, dan fish',
      total: 10,
      description: 'feel the fish',
      categoryId: 1,
    }
    ])
      .then(() => {
        process.stdout.write('Test Books created \n');
      }).then(() => {
        process.exit();
      });
  });
