import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-materialize';


const BookDetail = props => (
  <section className="col m6">
    <div className="row">
      <div className="col s12 m4 book-info">
        <div className="card">
          <div className="card-image">
            <img src={props.cover || "/templates/images/eloquentjs_cover.png"} />
          </div>
          <div className="card-action">
            <Button
              waves="light"
              onClick={props.onClick}
            >
              Borrow
            </Button>
          </div>
        </div>
      </div>
      <div className="col s12 m6 offset-m1">
        <div className="center">
          <h4>{props.title || ''}</h4>
          <h6>{props.shortDescription || ''}</h6>
        </div>
        <div className="">
          <p>
            {props.description || ''}
          </p>
        </div>
      </div>
    </div>
  </section>
);

BookDetail.propTypes = {
  cover: PropTypes.string,
  shortDescription: PropTypes.string,
  description: PropTypes.string
  onClick: PropTypes.func,
};


export default BookDetail;
