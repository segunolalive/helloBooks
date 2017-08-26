import React from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Row } from 'react-materialize';


const Borrowed = (props) => {
  const books = props.borrowedBooks ? props.borrowedBooks.map(book =>
    <Col key={book.title} s={12} className="book-info">
      <div className="card horizontal">
        <div className="card-image">
          <img src={book.cover || "N/A"} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>A modern introduction to programming using Javascript.</p>
          </div>
          <div className="card-action center">
            <a href="#" className="btn waves-effect`">Read Book</a>
          </div>
          <div className="card-action center">
            <a href="#" className="btn waves-effect">Return</a>
          </div>
        </div>
      </div>
    </Col>
  )
    : <h5 className="center">Nothing here</h5>;
  return (
    <section className="col s12 m6 borrowed">
      <Col s={12}>
        <h4 className="center">Recently Borrowed</h4>
      </Col>
      {books}
    </section>
  );
};


export default Borrowed;
