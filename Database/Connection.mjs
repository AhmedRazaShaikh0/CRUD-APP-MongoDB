import { MongoClient } from 'mongodb';

const BaseURL = process.env.BASE_URL;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://ahmedraza:ahmedraza12345@cluster0.ykj1f2q.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access the database from the connection
    const db = client.db();

    console.log('Connected to MongoDB');

    // You can now use the 'db' variable to interact with your MongoDB database
    // For example, you can fetch collections, perform CRUD operations, etc.

    // Don't forget to close the connection when it's no longer needed
    // client.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

export default connectDB;
