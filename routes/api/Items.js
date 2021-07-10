const express =require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Items');

//@route    GET api/items
//@desc     Get all items
//@access   Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))

});

//@route    post api/items
//@desc      create a post
//@access   Public
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
    
});

//@route    post api/items/:id
//@desc      delete an item
//@access   Public
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({ error: "no item exists"}));
   
    
});


module.exports = router;