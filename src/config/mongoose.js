import mongoose from 'mongoose';

mongoose.connect("mongodb://127.0.0.1:27017/mongodb", { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => console.info('connection error: ', err.message));
db.on('open', () => console.info('Connection to MongoDB established...'));
db.on('disconnected', () => console.info("MongoDB connection disconnected..."));

export default mongoose;