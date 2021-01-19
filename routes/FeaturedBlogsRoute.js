const express = require('express')
const FeaturedBlogsRouter = express.Router();
const featuredBlogsSchema = require('../schema/featuredBlogs');
const blogsSchema = require('../schema/blogs')

//const category = require('../controller/blogCategories')
//const bodyparser = require('body-parser')

FeaturedBlogsRouter.get('/featured_blogs', (req, res, next) => {

    async function getFeaturedBlogs() {
        try {

            let featuredBlogs = await featuredBlogsSchema.find({});
           
            if (featuredBlogs) {
                console.log({ success: true, groups: featuredBlogs })
                return res.status(200).send({ success: true, blogs: featuredBlogs[0].blogs });
            } else {
                return res.status(200).send({ success: false, status: 'featured blogs not found' })
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }
    }

    getFeaturedBlogs();

});

//run this api only once.
FeaturedBlogsRouter.post('/create_featured_blogs_document', (req, res, next) => {

    async function createFeaturedBlogsDocument() {
        let newDocument = new featuredBlogsSchema({
            blogs: [],
        });

        try {
            const saveToDb = await newDocument.save();
            return res.status(200).send({ success: true, status: 'featured blogs document created successfully' });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }

    }

    createFeaturedBlogsDocument();

});

FeaturedBlogsRouter.post('/add_blog', (req, res, next) => {

    async function addBlog() {

        let _id = req.body._id;
        let thumbnail = req.body.thumbnail;
        let title = req.body.title;
       // console.log(req.body.title+" --"+req.body._id)


        if (!_id || !thumbnail || !title) {
            return res.status(400).send({ success: false, status: '_id, thumbnail and title parameters are required' });
        }


        try {

            let fetchFeaturedBlogs = await featuredBlogsSchema.find({});
            if (fetchFeaturedBlogs) {
                //console.log({success:true, groups:fetchFeaturedBlogs})
                let hold = fetchFeaturedBlogs[0].blogs;

                //check for dublicate entry
                if (hold.find((item) => item._id === _id)) {
                    return res.status(200).send({ success: false, status: 'This blog is already added to featured blogs !' });
                }

                    if(hold.length >=3){
                        hold.unshift({_id:_id, thumbnail:thumbnail,title:title});
                        hold.pop();
                    } else  hold.unshift({_id:_id, thumbnail:thumbnail,title:title});

             
                let updateToDb = await featuredBlogsSchema.findByIdAndUpdate(fetchFeaturedBlogs[0]._id, { blogs: hold });
                let updateBlog = await blogsSchema.findByIdAndUpdate(_id, {isFeatured:true})
                return res.status(200).send({ success: true, status: 'Added to featured blogs successfully' });
            } else {
                return res.status(200).send({ success: false, status: 'featured blogs document is not found' })
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }
    }

    addBlog();

});


FeaturedBlogsRouter.delete('/remove_blog', (req, res, next) => {

    async function removeBlog() {

        let _id = req.body._id;


        if (!_id) {
            return res.status(400).send({ success: false, status: '_id is required' });
        }


        try {

            let fetchFeaturedBlogs = await featuredBlogsSchema.find({});
            if (fetchFeaturedBlogs) {
                //console.log({success:true, groups:fetchFeaturedBlogs})
                let hold = fetchFeaturedBlogs[0].blogs;

                //find and remove form array
                if (hold.find((item) => item._id === _id)) {
                    let newArr = hold.filter((item, index) => {
                        return item._id !== _id
                    })

                    let updateToDb = await featuredBlogsSchema.findByIdAndUpdate(fetchFeaturedBlogs[0]._id, { blogs: newArr });
                    let updateBlog = await blogsSchema.findByIdAndUpdate(_id, {isFeatured:false})
                    return res.status(200).send({ success: true, status: 'Removed from featured blogs successfully' });
                } else {
                    return res.status(200).send({ success: false, status: 'Featured blog not found ' });
                }

               
            } else {
                return res.status(200).send({ success: false, status: 'featured blogs document is not found' })
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }
    }

    removeBlog();

});


module.exports = FeaturedBlogsRouter;

