const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const Pictures = require("../models/Pictures.model");


// uploading an image + for every image doing an entry in database //

router.post("/upload", fileUploader.array("imageUrl"), (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    next(new Error("No files uploaded!"));
    return;
  }

  const imageUrls = req.files.map((file) => file.path);
  res.json({ imageUrls: imageUrls });
});

router.post("/pictures", (req, res, next) => {
  Pictures.create(req.body)
    .then((response) => {
      res.status(201).json({ message: "Picture created" });
    })
    .catch((err) => console.log(err));
});


// get all pictures //
router.get("/allPictures", (req, res, next) => {
    Pictures.find()
    .then((response) => {
        res.status(201).json(response)
    })
    .catch((err) => console.log(err))
})


// get pictures by id// 
router.get("/pictures/:id", (req, res, next) => {
  const id = req.params.id

  Pictures.findById(id)
    .then(picturesDetail => {
      res.status(201).json(picturesDetail)
    })
    .catch(err => next(err))
});


// delete by id// 


router.delete("/deletepicture/:id", (req, res, next) => {
  const id = req.params.id;

  Pictures.findByIdAndDelete(id)
    .then((deletedPicture) => {
      if (!deletedPicture) {
        res.status(404).json({ message: "Picture not found" });
      } else {
        res.status(200).json({ message: "Picture deleted" });
      }
    })
    .catch((err) => next(err));
});



module.exports = router;