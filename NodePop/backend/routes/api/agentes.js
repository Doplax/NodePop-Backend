//Middlewares

const express = require('express');
const router = express.Router(); // Un router es un grupo de middlewares

router.get('/', (req,res,next) => {
    res.json({
        results: [
            {
                name : 'Smith',
                age: 30
            }
        ]
    })
})

module.exports = router
