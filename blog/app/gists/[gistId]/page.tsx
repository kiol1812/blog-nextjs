import styles from './header.module.css'

import fs from 'fs';
import path from 'path';

import fetch from 'node-fetch';

import matter from 'gray-matter';
import { remark } from 'remark'
import html from 'remark-html'

const toURL_links = fs.readFileSync(`${path.join(process.cwd(), 'src')}/tmp.json`, 'utf-8');
const gistsData = JSON.parse(toURL_links);

export default async function Gist({
    params,
}:{
    params:{
        gistId: string,
    }
}){
    const url: string = `https://gist.github.com/kiol1812/${gistsData[`${params.gistId}`].url}`;
    const doc = await fetch(`${url}/raw/?file="${(params.gistId).replace('_', ' ')}.md"`)
        .then((test)=>test.text());
    const matterResult = matter(doc);
    const contentHtml = (await remark().use(html).process(matterResult.content)).toString();
    return (
        <div className={styles.card}>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Chapter</p>
                <p className={styles.values}>{(params.gistId).replace('_', ' ')}</p>
            </div>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Reference</p>
                <p className={styles.values}>{`${gistsData[`${params.gistId}`].reference}`}</p>
            </div>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Tags</p>
                <p className={styles.values}>{`${gistsData[`${params.gistId}`].tag}`}</p>
            </div>
            <div className={styles.flexTest}>
                <p className={styles.keys}>Date</p>
                <p className={styles.values}>{`${gistsData[`${params.gistId}`].date}`}</p>
            </div>
            <hr className={styles.hr} />
            <div className={styles.doc} dangerouslySetInnerHTML={{__html: contentHtml}} />
        </div>
    );
}