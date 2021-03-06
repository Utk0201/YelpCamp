const express = require('express');
const router = express.Router();
const campgrounds=require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isAuthor,validateCampground } = require('../middleware');
const multer=require('multer');
const {storage} = require('../cloudinary'); //node automatically looks for index.js file
//by default in a folder so no need to write /index.js above
// const upload= multer({dest: 'uploads/'});
const upload= multer({storage});

const Campground = require('../models/campground');

router.route('/')
    .get( catchAsync(campgrounds.index))
    //What is the below line doing? 
    //1)  It looks for the form having enctype="multipart/form-data"
    //2) Every <input> tag having type="file"
    //3) Store all such inputs in req.file (in req.files in case of many such inputs) 
    // .post(upload.array('image'),(req,res)=>{
    //     //look for the file with name="image"
    //     console.log(req.body,req.files);
    //     res.send("works fine!!!");
    // })
    .post( isLoggedIn,upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))
//in the above line, upload.array('xxxxx') here xxxxx is the name="xxxxxx" in views/campgrounds/new.ejs

router.get('/new', isLoggedIn, campgrounds.renderNewForm);


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;