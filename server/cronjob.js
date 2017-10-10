import moment from 'moment';
import { BorrowedBook, User } from './models';
import { borrowingDuration } from './helpers/borrowingLimits';
import { transporter, mailOptions } from './config/mail';

const defaulters = () => {
  BorrowedBook.find({
    where: { returned: false }
  })
    .then((rows) => {
      const defaultersList = rows.filter((row) => {
        const timeBorrowed = new Date(row.createdAt);
        const daysElapsed = Date.now() - timeBorrowed;
        return daysElapsed >= borrowingDuration * 1000 * 60 * 60 * 24;
      });
      return defaultersList;
    });
};

const defaulterEmails = defaulters.map((defaulter) => {
  User.find
})

const notifyDefaulters = () => {
  const receipients = defaulters();
  transporter.sendMail(mailOptions())
};
