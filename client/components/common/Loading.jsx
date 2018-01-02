import React from 'react';
import PropTypes from 'prop-types';
import { Col, ProgressBar, Row } from 'react-materialize';

/**
 * displays a loading progress bar
 *
 * @param {Object} props object with property, text
 *
 * @returns {JSX} JSX element
 */
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
