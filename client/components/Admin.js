import React, { Component } from 'react';
import { Row } from 'react-materialize';

import Header from './header/Header';


/**
 *
 */
class AddBook extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Header
          navLinks={['library']}
        />
        <main>
          <Row>
            <div className="container">
              <div className="col s12 m6 admin-form center">
                <h5>Add Book To Library</h5>
                <form className="" action=""
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="input-field">
                    <input id="title" type="text" name="title" value="" placeholder="Book Title" />
                  </div>
                  <div className="input-field">
                    <textarea name="description" rows="20" placeholder="Book Description" />
                  </div>
                  <div className="input-field">
                    <input id="" type="text" name="category" value="" placeholder="Category" />
                  </div>
                  <div className="input-field">
                    <input type="number" name="total" min="0" placeholder="Number available" />
                  </div>
                  <div className="">
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>Browse</span>
                        <input type="file" name="bookCover" accept="image/jpeg image/x-png" />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" name="bookFile"
                          type="text" placeholder="Upload Book Cover"
                        />
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
                        <input className="file-path validate"
                          type="text" placeholder="Upload Book file"
                        />
                      </div>
                    </div>
                  </div>
                  <div style={ { paddingTop: '10px' } }>
                    <input
                      type="submit"
                      className="btn center"
                      onClick={this.onSubmit}
                    >
                    </input>
                  </div>
                </form>
              </div>
            </div>
          </Row>
        </main>
      </div>
    );
  }
}

export default AddBook;
