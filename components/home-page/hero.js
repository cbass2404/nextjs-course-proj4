import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/cory.jpg"
                    alt="An image showing Cory"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I'm Cory</h1>
            <p>
                I blog about web development - especially frontend frameworks
                like Angular or React.
            </p>
        </section>
    );
};

export default Hero;
