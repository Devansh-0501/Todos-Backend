const express = require('express');
const listModel = require('../models/listSchema');

const router = express.Router();   






router.get('/read', async (req, res) => {
  try {
    const lists = await listModel.find({});
    res.json({
      message: 'Lists fetched successfully',
      data: lists
    });
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { list, card } = req.body;
    let createdList = await listModel.create({ list, card });
    console.log(createdList);
    res.json({
      message: 'List created successfully',
      data: createdList
    });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}); 

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { list, card } = req.body;
    let updatedList = await listModel.findByIdAndUpdate(id, { list, card }, { new: true });
    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({
      message: 'List updated successfully',
      data: updatedList
    });
    } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ message: 'Internal Server Error' }); 
    }
}
);

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let deletedList = await listModel.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({
      message: 'List deleted successfully',
      data: deletedList
    });
  } catch (error) {
    console.error('Error deleting list:', error);
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