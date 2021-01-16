const { json } = require('body-parser');
const { db } = require('../schema/blogs');
const blogs = require('../schema/blogs');
const Post = require('../schema/blogs')
//const category = require('../schema/category')


// get all posts
exports.getAllPosts = (req, res, next) => {
  let pageNumber = parseInt(req.query.pageNumber);
  let pageSize = parseInt(req.query.pageSize);
  var query = Post.find().skip((pageNumber - 1) * pageSize).limit(pageSize);
  query.exec()
    .then((posts) => {
      res.status(200).json({ posts });

    })
    .catch((err) => {
      res.status(500).json({ err });
    })
}
/* exports.getAllPosts = (req, res, next)=> {
  Post.find().populate('category')
  .then((posts) => {
    res.status(200).json({ posts });
  })
  .catch((err) => {
    res.status(500).json({ err });
  })
} */

// get one post by id
exports.getPostById = (req, res, next) => {
  const id = req.params.id;

  Post.findById(id)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      res.status(500).json({ err });
    })
}

// create post
exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const category = req.body.category || [];
  const thumbnail = req.body.thumbnail;
  const description = req.body.description;


  if (!title || !content || !author || !description || !thumbnail) {
    res.status(500).json({ error: 'All Fields Are Required.' });
  }

  const post = new Post({
    title,
    content,
    author,
    category,
    description,
    thumbnail
  });

  post.save()
    .then((post) => {
      return res.status(201).json({ post });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    })
}


// update post by id
exports.updatePost = (req, res, next) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body)
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((err) => {
      res.status(500).json({ err });
    })
}


// delete post by id
exports.deletePost = (req, res, next) => {
  const id = req.body.id;

  Post.findByIdAndRemove(id)
    .then((post) => {
      res.status(204).json({ post });
    })
    .catch((err) => {
      res.status(500).json({ err });
    })
}

//image upload
//  exports.documentUpload  = async (req, res) =>{

//    console.log(req.file.path);
//    var img = req.file.path
//    const url = 'http://localhost:3000/'+img
//     res.send('file uploaded succesfully'+ url)
//  }


/* exports.getpostByCategories = (req, res)=> {
  const _id = req.params._id;
  Post.find({category:_id}).populate('category')
  .then((posts) => {
    res.status(200).json({ posts });
  })
  .catch((err) => {
    res.status(500).json({ err });
  })
}
 */

exports.getPostsByCategories = (req, res) => {
  // const _id = req.params._id;
  let pageNumber = parseInt(req.query.pageNumber);
  let pageSize = parseInt(req.query.pageSize);
  console.log(pageSize + " " + pageNumber)

  Post.find({ 'category': req.query.category }).skip((pageNumber - 1) * pageSize).limit(pageSize)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      res.status(500).json({ err });
    })
}