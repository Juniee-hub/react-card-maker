import React,{memo}  from 'react';
import styles from './footer.module.css';

const Footer = memo((props) => {
    return (
        <footer className={styles.footer}>
            <p className={styles.title}>June's React Application</p>
        </footer>
    );
});

export default Footer;
