import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  });
  
  // @desc    Create new user
  // @route   POST /api/users
  // @access  Public
  const createUser = asyncHandler(async (req, res) => {
    const { name, email, company } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      company,
    });
  
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
  
  // @desc    Update user
  // @route   PUT /api/users/:id
  // @access  Public
  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.json(updatedUser);
  });
  
  // @desc    Delete user
  // @route   DELETE /api/users/:id
  // @access  Public
  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    await user.deleteOne();
    res.json({ message: 'User removed' });
  });
  
  export { getUsers, createUser, updateUser, deleteUser };