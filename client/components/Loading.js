import React from 'react';
import PropTypes from 'prop-types';
import { Col, ProgressBar, Row } from 'react-materialize';

const Loading = props => (
  <section className="loading-wrapper center">
    <Row>
      <Col s={12}>
        <strong>{props.text}</strong>
        <ProgressBar />
      </Col>
    </Row>
  </section>
);

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
