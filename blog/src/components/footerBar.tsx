import styles from "./footer.module.css";
import SocialMediaLinks from "./socialMediaLinks";
export default function Footer(){
    return (
        <div className={styles.footerBar}>
            <SocialMediaLinks />
        </div>
    );
}