import { isValidInput, isValidEmail } from '../../helper/validateInput';
import { keys } from '../../config/keys';

import { MongoClient } from 'mongodb';

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

        try {
            client = await MongoClient.connect(keys.MONGO_URI);
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
