const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
