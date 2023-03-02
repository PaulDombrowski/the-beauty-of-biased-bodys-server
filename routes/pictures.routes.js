const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const Pictures = require("../models/Pictures.model")

// add a picture + information to the database // 

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ imageUrl: req.file.path });
});

router.post("/pictures", (req, res, next) => {
    Pictures.create(req.body)
      .then(response => {
        res.status(201).json({message: "Picture created"})
      })
      .catch(err => console.log(err))
  })

  module.exports = router;