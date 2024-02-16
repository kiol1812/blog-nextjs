import styles from './headerBar.module.css';
import Image from 'next/image';

export default function SocialMediaLinks(){
    return (
        <>
            <li key={"github icon"} className={styles.burger_li_icon}>
                <a href="https://github.io">
                    <Image src={"/images/github.png"} width={24} height={24} className={styles.Icons} alt="github icon"></Image>
                </a>
            </li>
            <li key={"pinterest icon"} className={styles.burger_li_icon}>
                <a href="https://pinterest.com">
                    <Image src={"/images/pinterest.png"} width={24} height={24} className={styles.Icons} alt="pinterest icon"></Image>
                </a>
            </li>
            <li key={"twitter icon"} className={styles.burger_li_icon}>
                <a href="https://twitter.com">
                    <Image src={"/images/twitter-sign.png"} width={24} height={24} className={styles.Icons} alt="twitter icon"></Image>
                </a>
            </li>
        </>
    );
}