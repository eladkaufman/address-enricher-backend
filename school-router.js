const express = require('express');
const router = express.Router();
const bl = require('./school-bl');


router.route('/')
    .post(async (req, res) => {
        return res.json(await bl.postSchoolRec(req.body).catch(err => console.log(err)));
    })

module.exports = router;