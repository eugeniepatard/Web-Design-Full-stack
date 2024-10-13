import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'You did a POST request on the root page' });
});

export default router;
