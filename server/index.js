const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const port = 4000;

const app = express();

const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://admin:admin1234@wdc028-course-booking.lvsic.mongodb.net/b460-s86-s88-blog-application?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'))

const corsOptions = {
    origin: true, 
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

if(require.main === module){
	app.listen(port, () => {
	    console.log(`API is now online on port ${ port }`)
	});
}

module.exports = {app,mongoose};