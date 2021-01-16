//const Category = require('../schema/category')
const categoriesSchema = require('../schema/categories')

exports.createCategory = async(req,res,next)=>{
  async function getAllCategories() {
    try {
        let fetchCategories = await categoriesSchema.find({});
        if(fetchCategories) {
            console.log({success:true, groups:fetchGroups})
            return res.status(200).send({success:true, categories:fetchCategories});
        } else {
            return res.status(200).send({success:false, status:'categories not found'})
        }
       
       }
       catch(err) {
           console.log(err);
           return res.status(500).send({status:"something went wrong, try again", success:false});
       }
}

getAllCategories();

}