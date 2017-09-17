import { Notification } from '../models';

const notifyAdmin = (type, bookTitle, username) => (
  Notification.create({
    type,
    bookTitle,
    username,
  })
);

export default notifyAdmin;
