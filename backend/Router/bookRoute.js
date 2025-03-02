const express = require('express');
const router = express.Router();

const {test,createBook,getBook} = require('../controller/bookcontroler');
const { SignUp, testuser, SignIn, SignOut } = require('../controller/UserControler');

router.get('/test', test);  
router.post("/create",createBook)
router.get('/getbook', getBook);
router.get('/testuser', testuser);  //add this route when you have user authentication
router.post('/sign-up', SignUp);
router.post('/sign-in', SignIn);
router.post('/sign-out', SignOut);


module.exports = router;   