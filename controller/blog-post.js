const { json } = require('body-parser');
const { db } = require('../schema/blogs');
const blogs = require('../schema/blogs');
const Post = require('../schema/blogs')
const featuredBlogsSchema = require('../schema/featuredBlogs')
//const category = require('../schema/category')


// get all posts
exports.getAllPosts = (req, res, next) => {
  let pageNumber = parseInt(req.query.pageNumber);
  let pageSize = parseInt(req.query.pageSize);
  var query = Post.find().skip((pageNumber - 1) * pageSize).limit(pageSize).sort({timestamp:'desc'});
  query.exec()
    .then((posts) => {
      res.status(200).json({ posts : posts});

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
exports.createPost = async (req, res, next) => {

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

     const newPost = await post.save()
     if(!post){
       return res.status(200).json({message : 'can not create post'})
     }

     if(req.body.isFeatured){
      let fetchFeaturedBlogs = await featuredBlogsSchema.find({});
      if (fetchFeaturedBlogs) {
          //console.log({success:true, groups:fetchFeaturedBlogs})
          let hold = fetchFeaturedBlogs[0].blogs;

          //check for dublicate entry
     const newPost = await post.save()
     if (hold.find((item) => item._id === newPost._id)) {
              return res.status(200).send({ success: false, status: 'This blog is already added to featured blogs !' });
          }

          if(hold.length >=3){
            hold.unshift({_id:newPost._id, thumbnail:thumbnail,title:title});
            hold.pop();
        } else  hold.unshift({_id:newPost._id, thumbnail:thumbnail,title:title}); // 
          //console.log(hold);
          let updateToDb = await featuredBlogsSchema.findByIdAndUpdate(fetchFeaturedBlogs[0]._id, { blogs: hold });
          let updateBlog = await Post.findByIdAndUpdate(newPost._id, {isFeatured:true},{new:true})
          return res.status(200).json({message : updateBlog})

    
     }
     
     } 
     return res.status(200).json({message : newPost})

  
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