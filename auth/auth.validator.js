const joi=require("joi")


const validation=joi.object({
    
    email:joi.string().email().trim(true).required(),
    password:joi.string().min(8).trim(true).required(),
    role:joi.string().email().trim(true).required(),

})


const authValidation = (req, res, next) => {
	const payload = {
		  
		email: req.body.email,
		password: req.body.password,
        role:req.body.role
	};

	const { error } = validation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			`Error in auth Data : ${error.message}`
		);
	} else {
		next();
	}
};
module.exports = authValidation;
