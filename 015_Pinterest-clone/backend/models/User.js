// User.js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: String,
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }]
});

// Pin.js
const pinSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,  // Cloudinary URL
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Board.js
const boardSchema = new mongoose.Schema({
  name: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }]
});