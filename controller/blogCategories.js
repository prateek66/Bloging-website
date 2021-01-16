
const Category = require('../schema/categories')
//const category = require('../schema/category')

exports.demo = (req,res,next) => {
    res.status(200).json({ msg:'hello'});
}


// get all posts
exports.getAllCategories = (req, res, next)=> {
  Category.find({})
  .then((data) => {
    res.status(200).json({ data });
  })
  .catch((err) => {
    res.status(500).json({ err });
  })
}



// create new category
exports.createNewCategory= (req, res, next) => {
  const cat = req.body.category;
  
  if (!cat) {
    return res.status(500).json({ error: 'category fileld required !' });
  }


  const post = new Category({
    data:cat
  });

  post.save()
  .then((post) => {
    res.status(201).json({ post });
  })
  .catch((err) => {
    res.status(500).json({ err });
  })
}



// update post by id
exports.updatePost= (req, res, next) => {
  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body)
  .then((post) => {
    res.status(200).json({ post });
  })
  .catch((err) => {
    res.status(500).json({ err });
  })
}


// delete post by id
exports.deletePost = (req, res, next)=> {
  const id = req.params.id;

  Category.findByIdAndRemove(id)
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


exports.getpostByCategories = (req, res)=> {
  const _id = req.params._id;
  Category.find({category:_id}).populate('category')
  .then((posts) => {
    res.status(200).json({ posts });
  })
  .catch((err) => {
    res.status(500).json({ err });
  })
}
