import styles from './[gistId]/header.module.css'
export default function layout({
    children,
}:{
    children: React.ReactNode;
}){
    return (
        <section>
            <div>
                <main className={styles.box}>{children}</main>
            </div>
        </section>
    );
}