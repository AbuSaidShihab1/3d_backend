
const { signup, login, profile_update } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.put("/update-profile",ensureAuthenticated,profile_update)
module.exports = router;