import styles from './header.module.css'

import fs from 'fs';
import path from 'path';

const toURL_links = fs.readFileSync(`${path.join(process.cwd(), 'src')}/tmp.json`, 'utf-8');
const {filenameToURL} = JSON.parse(toURL_links);

export default async function Gist({
    params,
}:{
    params:{
        gistId: string,
    }
}){
    const url: string = "https://gist.github.com/kiol1812";
    return (
        <>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Chapter</p>
                <p className={styles.values}>Selection Trees</p>
            </div>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Reference</p>
                <p className={styles.values}>urltestestestestestestest</p>
            </div>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Tags</p>
                <p className={styles.values}>data structure</p>
            </div>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Date</p>
                <p className={styles.values}>2024/02/03</p>
            </div>
            <hr className={styles.hr} />
            <script src={`${url}/${filenameToURL[`${params.gistId}`]}`}></script>
        </>
    );
}