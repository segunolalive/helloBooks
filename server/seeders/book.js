import db from '../models';

db.Book.sync({ force: true })
  .then(() => {
    db.Book.bulkCreate([{
      title: 'eloquent javascript',
      authors: 'marijn haverbeke',
      total: 20,
      description: 'a modern introduction to programming',
    },
    {
      title: 'eloquent ruby',
      authors: 'flo harrison',
      total: 10,
      description: 'ruby destruction',
    },
    {
      title: 'eloquent python',
      authors: 'flo harrison, dan moss',
      total: 0,
      description: 'feeel the snake',
    },
    ])
      .then(() => {
        process.stdout.write('Test Books created \n');
      });
  });
