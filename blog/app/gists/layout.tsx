import styles from './[gistId]/header.module.css'

import {list} from '../../src/components/gistKeyList'

export default function layout({
    children,
}:{
    children: React.ReactNode;
}){
    return (
        <section>
            <div>
                {list()}
                <main className={styles.box}>{children}</main>
            </div>
        </section>
    );
}