import React from 'react';
import { Col, ProgressBar, Row } from 'react-materialize';

const BookLoader = () => (
  <section className="loading-wrapper center">
    <Row>
      <Col s={12}>
        <strong>Fetching more awesome books . . .</strong>
        <ProgressBar />
      </Col>
    </Row>
  </section>
);

export default BookLoader;
