import { isEmpty } from './auth';

const validateBookData = (state) => {
  const errors = {};
  if (!state.book.title.trim()) {
    errors.title = 'Book must have a title';
  }
  if (!state.book.authors.trim()) {
    errors.authors = 'Book must have at least one author';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateBookData;
