import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';


const Notifications = (props) => {
  const notifications = props.notifications && props.notifications.map(
    notification => (
      <Col s={12}
        key={notification.createdAt}
        className="admin-notification"
      >
        <p>
          {notification.bookTitle} {notification.type}ed
          by {notification.username}
        </p>
      </Col>
    )
  );
  return (
    <Row>
      {notifications}
    </Row>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
};


export default Notifications;
