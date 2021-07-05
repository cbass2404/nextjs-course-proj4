import { useRef, useState, useEffect } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';

const sendContactData = async (contactDetails) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(response.message || 'Something went wrong!');
    }

    return result;
};

const ContactForm = () => {
    const [requestStatus, setRequestStatus] = useState();
    const [requestMessage, setRequestMessage] = useState();

    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setRequestStatus('pending');

        const reqBody = {
            email: emailRef.current.value,
            name: nameRef.current.value,
            message: messageRef.current.value,
        };

        try {
            const result = await sendContactData(reqBody);

            console.log(result);

            setRequestStatus('success');
            setRequestMessage(result.message);

            emailRef.current.value = '';
            nameRef.current.value = '';
            messageRef.current.value = '';
        } catch (error) {
            console.log(error);
            setRequestStatus('error');
            setRequestMessage(error.message || 'Something went wrong...');
        }
    };

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success',
            message: requestMessage,
        };
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestMessage,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label>
                            Your Email
                            <input type="email" ref={emailRef} required />
                        </label>
                    </div>
                    <div className={classes.control}>
                        <label>
                            Your Name
                            <input type="text" ref={nameRef} required />
                        </label>
                    </div>
                </div>
                <div className={classes.control}>
                    <label>
                        Your Message
                        <textarea ref={messageRef} rows="5"></textarea>
                    </label>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
};

export default ContactForm;
