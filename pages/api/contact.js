import { MongoClient } from 'mongodb';

import { isValidInput, isValidEmail } from '../../helper/validateInput';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (
            !isValidInput(email) ||
            !isValidInput(name) ||
            !isValidInput(message)
        ) {
            res.status(422).json({ message: 'Invalid Input' });
            return;
        }

        if (!isValidEmail(email)) {
            res.status(422).json({ message: 'Invalid Email' });
            return;
        }

        const newMessage = {
            email,
            name,
            message,
        };

        let client;

        const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.wbszx.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

        try {
            client = await MongoClient.connect(connectionString, {
                useUnifiedTopology: true,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to connect to database...',
            });
            return;
        }

        const db = client.db();

        try {
            await db.collection('messages').insertOne(newMessage);

            res.status(201).json({
                message: 'Successfully sent message!',
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to save message...' });
            client.close();
            return;
        }

        client.close();
    }
};

export default handler;
