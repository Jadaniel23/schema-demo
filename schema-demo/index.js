// Import Mongoose
const mongoose = require('mongoose');

// ==========================================
// Step 2: Create Database Connection
// Subtask 2.2: Connect to MongoDB
// ==========================================
mongoose.connect('mongodb://127.0.0.1:27017/schema-demo')
  .then(() => console.log('✅ Database Connected'))
  .catch(err => console.error('❌ Connection error:', err));

// ==========================================
// Step 3: Define Schema
// ==========================================

// Subtask 3.1: Create Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number }
});

// Subtask 3.2: Create Model
// This creates a "Users" collection in MongoDB based on the schema
const User = mongoose.model('User', userSchema);

// ==========================================
// Steps 4 & 5: Insert and Retrieve Data
// ==========================================
async function runDemo() {
  try {
    // (Optional) Clear the database first so we have a clean test every time
    await User.deleteMany({});

    // Subtask 4.1: Create Sample Data
    const newUser = new User({
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
      age: 24
    });
    
    // Save it to the database
    await newUser.save();
    console.log('\n✅ Data is inserted successfully!');

    // Subtask 5.1: Fetch Data
    // Find all users in the database
    const allUsers = await User.find({});
    
    console.log('\n📋 Retrieved Records:');
    console.log(allUsers);

  } catch (error) {
    console.error('❌ Runtime Error:', error);
  } finally {
    // Close the connection when we are done
    mongoose.connection.close();
  }
}

// Execute the function
runDemo();