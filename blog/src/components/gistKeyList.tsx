import Link from "next/link";
import fs from 'fs';
import path from 'path';

import styles from "./gists.module.css";

const toURL_links = fs.readFileSync(`${path.join(process.cwd(), 'src')}/tmp.json`, 'utf-8');
const gistsData = JSON.parse(toURL_links);

export function List(){
    const l = Object.keys(gistsData).map((title)=>{
        return (
            <li className={styles.gistCard} key={`${title}`}>
                <Link id={title} className={styles.gistTitle} href={`/gists/${title}`}>{title.replace('_', ' ')}</Link>
                <div className={styles.flexInfo}>
                    <p className={styles.key}>Tags</p>
                    <p>{`${gistsData[`${title}`].tag}`}</p>
                </div>
                <div className={styles.flexInfo}>
                    <p className={styles.key}>Date</p>
                    <p>{`${gistsData[`${title}`].date}`}</p>
                </div>
                <div className={styles.flexInfo}>
                    <p className={styles.key}>Reference</p>
                    <p>{`${gistsData[`${title}`].reference}`}</p>
                </div>
            </li>
        );
    })
    return <ul>{l}</ul>;
}