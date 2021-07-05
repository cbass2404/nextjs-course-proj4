import { isValidInput, isValidEmail } from '../../helper/validateInput';

const handler = (req, res) => {
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

        console.log(newMessage);

        res.status(201).json({
            message: 'Successfully stored message',
        });
    }
};

export default handler;
