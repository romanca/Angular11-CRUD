const express = require('express');
const app = express();

const router = express.Router();
const Todo = require('../model/Todo');


// add todo -API
router.route('/add-todo').post((req, res, next) => {
    Todo.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// get all the todos -API
router.route('/').get((req, res) => {
    Todo.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// get a single todo based on id -API
router.route('/read-todo/:id').get((req, res) => {
    Todo.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// updating todo based on id -API
router.route('/update-todo/:id').put((req, res, next) => {
    Todo.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
        }
    })
})

// delete todo based on id -API
router.route('/delete-todo/:id').delete((req, res, next) => {
    Todo.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;