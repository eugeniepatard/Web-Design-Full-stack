import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const connRouter = express.Router();

connRouter.post('/', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const checkUser = userRepository.create({
    email: req.body.email,
    password: req.body.password,
  });


  

  userRepository
    .findOneBy({ email: checkUser.email })
    .then((existingUser) => {
      if (existingUser) {
        if (existingUser.password === checkUser.password) {
          res.json(existingUser.user_id);
        } else {
          res.json('The password is incorrect');
        }
      } else {
        res.json("This email address doesn't correspond to any user");
      }
    })
    .catch((error) => {
      console.error('An error occured :', error);
      res.status(500).json('An error occured while checking password');
    });
});

export default connRouter;
