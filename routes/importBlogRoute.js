const express = require('express');
var axios = require("axios");
var cheerio = require("cheerio");

const fetchBlogsRouter = express.Router();


fetchBlogsRouter.post('/', (req, res) => {

    console.log(req.body);

        async function fetchBlog() {
            if(!req.body.url) {
                return  res.send({success:false, info:'url parameter is not available'})
            }
            try {
                let response = await axios.get(req.body.url);
               // let response = true;
                if (response) {
                    let hobbies = [];
                    
                    const $ = cheerio.load(response.data);
                    $('p, h1, img').each(function (i, e) {
                        if(e.name === 'img') {
                            hobbies[i] = {key:i,tag:e.name, data:$(this).attr('src'), html:`<${e.name} src='${$(this).attr('src')}'/>`};
                        } else {
                            hobbies[i] = {key:i,tag:e.name, data:$(this).html(), html:`<${e.name}>${$(this).html()}</${e.name}>`};
                        }
                       
                    });
                    console.log(hobbies);
                    return res.send({success:true, data:hobbies})
    
                    //return console.log(response.data);
                }
            } catch (err) {
                res.send({success:false})
                return console.log(err);
            }
            
        }
        fetchBlog();

});

module.exports = fetchBlogsRouter;