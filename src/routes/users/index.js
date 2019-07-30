import express from 'express';
const router = express.Router();

router.use((req, res, next) => {
  req.users = [
    { id: 1, name: "U1" },
    { id: 2, name: "U2" },
    { id: 3, name: "U3" }
  ];
  next();
});

router.get('/', (req, res) => {
  if (req.users) {
    res.json(req.users);
  }
  else {
    res.status(404);
    res.json({ msg: "No users found" });
  }
});

export { router };
