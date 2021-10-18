const joi=require("joi")


const validation=joi.object({
    fname:joi.string().alphanum().min(3).max(25).trim(true).required(),
	lname:joi.string().alphanum().min(3).max(25).trim(true).required(),
    email:joi.string().email().trim(true).required(),
	role:joi.string().alphanum().min(2).max(25).trim(true).required(),
    phone:joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    password:joi.string().min(8).trim(true).required()

})


const userValidation = (req, res, next) => {
	const payload = {
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		role:req.body.role,
		phone: req.body.phone,
		password: req.body.password,

	};

	const { error } = validation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			`Error in User Data : ${error.message}`
		);
	} else {
		next();
	}
};
module.exports = userValidation;
