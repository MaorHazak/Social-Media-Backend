const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
