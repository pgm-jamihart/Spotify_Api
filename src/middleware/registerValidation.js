/**
 * Finds the validation errors in the register request
 */


// import
import { validationResult } from 'express-validator';

export default (req, res, next) => {
  // Finds the validation errors in the register request
  // returns de errors in response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
