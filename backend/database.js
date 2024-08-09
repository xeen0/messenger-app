const mongoose = require('mongoose');

const connectDB = async () => {
	let URI =
		'mongodb+srv://sahith:sahith@messenger-app.wxjqj.mongodb.net/?retryWrites=true&w=majority&appName=messenger-app';
	try {
		await mongoose.connect(URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.error('MongoDB connection error:', err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
