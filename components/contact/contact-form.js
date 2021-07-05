import { useRef } from 'react';
import classes from './contact-form.module.css';

const ContactForm = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const reqBody = {
            email: emailRef.current.value,
            name: nameRef.current.value,
            message: messageRef.current.value,
        };

        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong...');
                });
            })
            .then((data) => {
                console.log(data.message);
            })
            .catch((error) => {
                console.log(error.message || 'Something went wrong...');
            });
    };

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
        </section>
    );
};

export default ContactForm;
