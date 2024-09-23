const bcrypt = require('bcrypt');
const User = require("../models/User");

const auth = require("../auth");


// register user

	module.exports.registerUser = (req, res) => {

	  if (!req.body.email.includes("@")) {
	    return res.status(400).send({ error: "Email invalid" });
	  }
	  
	  else if (req.body.password.length < 8) {
	    return res.status(400).send({ error: "Password must be at least 8 characters" });
	  }
	  
	  else if (!req.body.username || req.body.username.trim() === "") {
	    return res.status(400).send({ error: "Username is required" });
	  } else {
	    
	    let newUser = new User({
	      email: req.body.email,
	      username: req.body.username,
	      password: bcrypt.hashSync(req.body.password, 10)
	    });

	    return newUser
	      .save()
	      .then((user) => res.status(201).send({ message: "Registered Successfully" }))
	      .catch((err) => {
	        console.error("Error in saving: ", err);
	        return res.status(500).send({ error: "Error in save" });
	      });
	  }
	};


// log in user

	module.exports.loginUser = (req,res) => {

		if(req.body.email.includes("@")){
			return User.findOne({ email : req.body.email })
			.then(result => {


				if(result == null){
					return res.status(404).send({ error: "No Email Found" });
				} else {

					const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
					if (isPasswordCorrect) {

						return res.status(200).send({ access : auth.createAccessToken(result)})

					} else {

						return res.status(401).send({ message: "Email and password do not match" });

					}

				}

			})
			.catch(err => err);
		} else {
		    return res.status(400).send(false)
		}
	};
