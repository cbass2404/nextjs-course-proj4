import classes from './contact-form.module.css';

const ContactForm = () => {
    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label>
                            Your Email
                            <input type="email" required />
                        </label>
                    </div>
                    <div className={classes.control}>
                        <label>
                            Your Name
                            <input type="text" required />
                        </label>
                    </div>
                </div>
                <div className={classes.control}>
                    <label>
                        Your Message
                        <textarea rows="5"></textarea>
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
