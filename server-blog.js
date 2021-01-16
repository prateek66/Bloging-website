const express = require ('express')
const mongoose =require ('mongoose')
const bodyParser = require ('body-parser')
const router = require('./routes/post')
const config = require('./config');
const cors = require('cors');

const app = express();
const category = require('./routes/category');
const categoriesRouter = require('./routes/blogCategory');
const featuredBlogsRouter = require('./routes/FeaturedBlogsRoute');
const importBlogRouter = require('./routes/importBlogRoute');
require('dotenv').config();

app.use(cors());


// init mongoose
mongoose.connect( `${process.env.MONGO_URI}`, {useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log("connected successfully"))
.catch((err) => {return console.error("Could not connect:", err)} );


// express middleware
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '5000kb'}));
let server;
if (process.env.NODE_ENV !== config.test_env) {
  server = app.listen(config.port);
  console.log(`Server listening on port ${config.port}`);
} else {
  server = app.listen(config.test_port);
  console.log(`Server listening on port ${config.test_port}`);
}

//app.use('/',router)
app.use('/category', categoriesRouter);
app.use('/featured', featuredBlogsRouter);
app.use('/import',importBlogRouter);
// router
router(app);
//category(app);
//app.use('/category',category)

// export
module.exports = server;