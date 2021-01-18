const express = require('express')
const categoriesRouter = express.Router();
const categoriesSchema = require('../schema/categories')
const blogSchema = require('../schema/blogs')

//const category = require('../controller/blogCategories')
//const bodyparser = require('body-parser')

categoriesRouter.get('/all_categories', (req, res, next) => {

    async function getAllCategories() {
        try {
            let fetchCategories = await categoriesSchema.find({});
            if (fetchCategories) {
                console.log({ success: true, groups: fetchCategories })
                return res.status(200).send({ success: true, fetchCategories});  //categories: fetchCategories[0].data
            } else {
                return res.status(200).send({ success: false, status: 'categories not found' })
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }
    }

    getAllCategories();

});

//run this api only once.
categoriesRouter.post('/create_category_document', (req, res, next) => {
    async function createCategory() {

        let newDocument = new categoriesSchema({
            categories: [],
        });

        try {
            //check code>>>>
            const saveToDb = await newDocument.save();
            return res.status(200).send({ success: true, status: 'categories document created successfully',saveToDb});
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }

    }

    createCategory();

});

categoriesRouter.put('/add_category', (req, res, next) => {

    async function addCategory() {

        if (!req.body.category) {
            return res.status(200).send({ success: false, status: 'category parameter is needed!' });
        }


        try {

            let fetchCategories = await categoriesSchema.find({});
            if (fetchCategories) {
                //console.log({success:true, groups:fetchCategories})
                let hold = fetchCategories[0].data;

                //check for dublicate entry
                if (hold.find((item) => item === req.body.category)) {
                    return res.status(200).send({ success: false, status: 'category already exists' });
                }

                hold.push(req.body.category);
                console.log(req.body.category);
                console.log(hold)
                let updateToDb = await categoriesSchema.findByIdAndUpdate(fetchCategories[0]._id, { data: hold },{new: true});
                //console.log()
                return res.status(200).send({ success: true, status: 'category added successfully', categories:updateToDb.data });
            } else {
                return res.status(200).send({ success: false, status: 'category not added' })
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ status: "something went wrong, try again", success: false });
        }
    }

    addCategory();

});

//api to delete a category

categoriesRouter.delete('/delete_category/:title', async(req,res) => {

    const title = req.params.title
   async function deleteCategory(){
       //const deleteCat = await categoriesSchema.findByIdAndDelete(_id)
    //    if(!deleteCat){
    //        res.status(404).send("error")

    //    }
       try{

          
           const check = await blogSchema.find({category:title})
           console.log(check)
           if(check.length===0){

            const deleteCat = await categoriesSchema.find({})
            console.log( 'test....' , deleteCat);

            let newCategory = deleteCat[0].data.filter(x=> x !== title)
             await categoriesSchema.findByIdAndUpdate(deleteCat[0]._id ,{data:newCategory} ,{new:true})
           res.status(201).send({success: true, status:'category deleted'},newCategory)
           }else{
           return res.send({success:false,status:'blogs are there in this category'})
           }
       }catch(e){
           res.send({success:false,status:'something went wrong'});
       }

    }
    deleteCategory();
});


module.exports = categoriesRouter;

