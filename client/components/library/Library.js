import React from 'react';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import BooksTable from './BooksTable';
import Categories from './Categories';
import Search from './Search';
import BookLoader from './BookLoader';

import mock from '../mock'; // FIXME: Load this over the wire in lifecycle hooks

/**
 *
 */
const Library = props => (
  <div>
    <Header
      navLinks={['dashboard', 'history', 'library']}
      activeLink='library'
    />
    <main className="white-area">
      <Row>
        <div className="container">
          <Col s={12} className="center">
            <h3 className="">All Books</h3>
            <p>Click on a title to see book details</p>
          </Col>
          <Categories categories={mock.categories} /> {/** FIXME: */}
          <Search />
          <BooksTable
            // books={props.books}
            books={mock.books}
            headers={[
              'Cover',
              'Title',
              'Author(s)',
              'Copies Available',
              'Action'
            ]}
          />
          <BookLoader />
        </div>
      </Row>
    </main>
  </div>
);



export default Library;
