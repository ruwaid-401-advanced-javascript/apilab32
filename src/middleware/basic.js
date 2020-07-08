'use strict';

/**
 * (Middleware) for Basic authorization
 * @module basic
 */

/**
* Input 
* @function errorHandler
* @param req - request
* @param res  - response
* @param next - next
* test if the header have an authorization then decode it and generate token
*/


const users = require('../../userModel');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  console.log('heeaaaader',req.headers);
  console.log('basic',basic);
  console.log('[user, pass]',user, pass);
  
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');  

    users.authenticate(user, pass)
      .then(validUser => {
        console.log('validUser',validUser);
        
        req.token = users.generateToken(validUser);
        req.data = validUser;
        next();
        return;
      })
      .catch(err => next('Invalid Login!!'));

};