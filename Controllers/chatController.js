const chatModel = require("../Model/chatModel");
const User = require("../Model/User"); 

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    // check if a chat already exist
    const chat = await chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [senderId, receiverId],
    });

    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  const email = req.params.email;

  try {
    // Find the user based on the email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve chats for the found user
    const chats = await chatModel.find({ members: { $in: [user._id] } });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createChat, userChats, findChat };
