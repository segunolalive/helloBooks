import { User, Book } from '../models';
import { maximumBorrrow } from '../helpers/borrowingLimits';


/**
 * checks if a user can borrow more books
 *
 * @param {integer} numberBorrowed
 * @param {string} membershipType
 *
 * @returns {boolean} true or false
 */
export const canBorrowBook = (numberBorrowed, membershipType) => {
  switch (membershipType) {
    case 'bronze':
      return numberBorrowed < maximumBorrrow.bronze;
    case 'silver':
      return numberBorrowed < maximumBorrrow.silver;
    case 'gold':
      return numberBorrowed < maximumBorrrow.gold;
    default:
      return false;
  }
};

/**
 * check if user should be allowed to borrow a new book
 *
 * @param  {Object}            req  express http request object
 * @param  {Object}            res  express http response object
 * @param  {Function}          next calls the next middleware in the stack
 *
 * @return {Function|Object}   http response object or calls the next
 * middleware function
 */
const shouldBorrowBook = (req, res, next) => User.findOne({
  where: { id: req.user.id },
  include: [{ model: Book }]
})
  .then((user) => {
    const unreturnedBooks = user.Books.filter(
      book => book.BorrowedBook.returned === false
    );
    const canBorrow = canBorrowBook(unreturnedBooks.length,
      user.membershipType);

    return canBorrow ? next() :
      res.status(403).send({
        message: `You have reached your borrowing limit.
            Return some books or upgrade your account type to borrow more`,
      });
  })
  .catch(error => next(error));


export default shouldBorrowBook;
