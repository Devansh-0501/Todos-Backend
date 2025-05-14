const express = require('express');
const listModel = require('../models/listSchema');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();   






router.get('/read', authenticateUser, async (req, res) => {
  try {
    const lists = await listModel.find({ userId: req.user._id });
    res.json({
      message: 'Lists fetched successfully',
      data: lists
    });
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/create', authenticateUser, async (req, res) => {
  try {
    const { list, card } = req.body;
    const createdList = await listModel.create({
      list,
      card,
      userId: req.user._id // 🔑 Associate with user
    });
    res.json({
      message: 'List created successfully',
      data: createdList
    });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/update/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { list, card } = req.body;
  try {
    // Only update if it belongs to the logged-in user
    const updatedList = await listModel.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { list, card },
      { new: true }
    );

    if (!updatedList) return res.status(404).json({ message: 'List not found or access denied' });

    res.json({ message: 'List updated', data: updatedList });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/delete/:id', authenticateUser, async (req, res) => {
  try {
    const deletedList = await listModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deletedList) {
      return res.status(404).json({ message: 'List not found or access denied' });
    }

    res.json({ message: 'List deleted', data: deletedList });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/uniList/:id', async(req,res)=>{
  try{
    let id=req.params.id;
    let aList = await listModel.findById(id);
    res.json({data:aList});
  } catch(error){
     console.error('Error fetching updating list:', error);
    res.status(500).json({ message: 'Internal Server Error' });

  }
})
module.exports = router;