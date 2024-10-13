import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const userRouter = express.Router();

userRouter.post('/', function (req, res) {
  // console.log(req.body.email);
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    // icon_id: req.body.icon_id,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });

  userRepository
    .findOneBy({ email: newUser.email })
    .then((existingUser) => {
      if (existingUser) {
        res.json('This email address is already used');
      } else {
        userRepository.insert(newUser).then((insertedUser) => {
          res.json(insertedUser.identifiers[0].user_id);
        });
      }
    })
    .catch((error) => {
      console.error('Something wrong has happened :', error);
    });
});

export default userRouter;
