/**
 * Validation on register request
 */


// import request body from register endpoint
import { body } from 'express-validator';

export const checkSchema = [
  // email must be a valid email
  body('user[0].email').isEmail().withMessage('Email is not valid!'),
  // name must be filled in
  body('user[0].name').exists({ checkFalsy: true }).withMessage('Fill in your name!'),
  // admin must be filled in
  body('user[0].admin').exists({ checkFalsy: true }).withMessage('fill in checkbox: Just listening or artist?'),
  // password must be at least 5 chars long
  body('user[0].password').isLength({ min: 5 }).withMessage('Password must contain min. 5 characters !'),
  // username must be at least 5 chars long
  body('user[0].username').isLength({ min: 5 }).withMessage('Username must contain min. 5 characters !'),
];
