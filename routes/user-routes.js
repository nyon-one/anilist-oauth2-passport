const router = require('express').Router();
const authCheck = (req, res, next)=>{
	if(!req.user){
		res.redirect('connect')
	}else{
		next()
	}
}
// user of anilist
router.get('/', authCheck, (req, res)=>{
	res.send('you are '+req.user.id)
})

module.exports = router;