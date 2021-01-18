const express = require('express')
const { split } = require('lodash')
const blog = require('./rss-json')
const BlogPost = require('./schema/blogs')
const app = express()
var url = require('url')

app.post('/json' , async(req,res) => {
    const item = await blog.blog()
    //res.send(item)
   const link = 'https://medium.com/andwemet/embracing-each-others-perspective-7b588fedcc5c'
   const path = url.parse(link,true)
   console.log(path)
    const filterBlog = item.filter((e,i) => {
       
        var adr = e.link
        var q = url.parse(adr, true)
        console.log(q.pathname)
        if(q.pathname === path.pathname){
            res.send({...e,categories:null})
        }
    
    })
    res.send(filterBlog)
    
})

// app.post('/blog',(res,req)=> {
//     const theURL = req.body.title.toLowerCase().split(' ').join('-');
//     req.body['url'] = theURL;
//     const NewBlogPost = new BlogPost(req.body);
//     NewBlogPost.save((err, blogPost) => {
//       if(err) {
//         return res.status(422).json({
//           msg: 'Server encountered an error publishing blog post.',
//           error: err
//         });
//       }
//       else {
//         return res.status(200).json({
//           msg: 'Successfully published blog post.',
//           blogPost: blogPost
//         });
//       }
//     });
// })

app.listen(3000 , () => {
    console.log('server is running')
})