const blogPost = require('../controller/blog-post')
const express = require('express')
const multer = require('multer')
const fs = require('fs')
var path = require("path");
//const upload = require('../middleware/file_upload')
const bodyparser = require('body-parser')

module.exports = app => {

  // api routes
  const apiRoutes = express.Router();
  //const app = express.Router();


   
  /********************************
  === post endpoints
  ********************************/

  // append user routes to api routes
  //apiRoutes.use('/posts', app);

  // get all posts
  app.get('/getPost', blogPost.getAllPosts);

  // get user by id
  app.get('/user/:id', blogPost.getPostById);

  // create user
  app.post('/create', blogPost.createPost);

  // update user by id
  app.put('/update/:id', blogPost.updatePost);

  // delete user by id
  app.delete('/delete', blogPost.deletePost);

  app.get('/getPostByCategories', blogPost.getPostsByCategories);

  //category

  // app.get('/all', async(req,res) => {
  //   const category = blogPost.createPost.category
  //   res.send(category)
  // })


  //img

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  var upload = multer({
    storage: storage
  })
   app.post('/upload', upload.single('upload'),async (req, res) =>{

      console.log(req.file.path);
      var img = req.file.filename
      const url = 'http://localhost:3000/img/'+img
        res.send('file uploaded succesfully'+ url)
    } )

  /********************************
  === append apiRoutes to app
  ********************************/

  app.use('/api', apiRoutes);
  app.use(bodyparser.urlencoded({
    extended:true
  }))

};

