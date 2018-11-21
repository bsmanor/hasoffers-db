const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handeling get requests for data_audits'
  });
});


router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  if (id > 10) {
    res.status(200).json({
      message: `ID is correct. Value is ${id}`
    });
  } else {
    res.status(200).json({
      message: `Id value ${id} is too low`
    });
  }
});

module.exports = router;