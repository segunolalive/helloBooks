import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../../app';
import mock from '../mock/mock';
import { Book, BookCategory, BorrowedBook } from '../../models';


const server = supertest.agent(app);
let jwtToken;


describe('validateInput', () => {
  
});
