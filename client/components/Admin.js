import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-materialize';


/**
 * 
 */
class AddBook extends Component {
  render() {
    return (
      <div className="col s12 m6 admin-form center">
        <h5>Add Book To Library</h5>
        <form className="" action="" method="post" encType="multipart/form-data">
          <div className="input-field">
            <input id="title" type="text" name="" value="" placeholder="" />
            <label htmlFor="title">Book Title</label>
          </div>
          <div className="input-field">
            <textarea name="name" rows="20"></textarea>
            <label htmlFor="title">Book Description</label>
          </div>
          <div className="input-field">
            <input id="category" type="text" name="" value="" placeholder="" />
            <label htmlFor="category">Category</label>
          </div>
          <div className="input-field">
            <input type="number" name="" value="" min="0" />
            <label htmlFor="title">Number available</label>
          </div>
          <div className="">
            <div className="file-field input-field">
              <div className="btn">
                <span>Browse</span>
                <input type="file" accept="image/jpeg image/x-png" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload Book Cover" />
              </div>
            </div>
          </div>
          <div className="">
            <div className="file-field input-field">
              <div className="btn">
                <span>Browse</span>
                <input type="file" accept="application/pdf" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload Book file" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddBook;
