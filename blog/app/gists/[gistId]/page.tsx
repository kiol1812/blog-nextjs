import styles from './header.module.css'

import fs from 'fs';
import path from 'path';

import fetch from 'node-fetch';

import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ReactMarkdowm from 'react-markdown';
import Script from 'next/script';

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
            <div>{/* class="gist-meta" */}
                <ReactMarkdowm className={styles.doc} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {matterResult.content}
                </ReactMarkdowm>
                <Script
                    type='module'
                    strategy='afterInteractive'
                    dangerouslySetInnerHTML={{
                        __html: `
                            import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs";
                            mermaid.initialize({startOnLoad: true});
                            mermaid.contentLoaded();
                        `
                    }}
                />
                <div className={styles.referBar}>
                    <a className={styles.viewRaw} href={`https://gist.github.com/kiol1812/${gistsData[`${params.gistId}`].url}/raw/?file=${params.gistId}.md`} >view raw</a>{/* style="float:right" class="Link--inTextBlock" */}
                    <a href={`https://gist.github.com/kiol1812/${gistsData[`${params.gistId}`].url}#file-${params.gistId}-md`} >{params.gistId}.md</a>{/* class="Link--inTextBlock" */}
                    &nbsp; hosted with &#10084; by <a href="https://github.com">GitHub</a>{/* class="Link--inTextBlock" */}
                </div>
            </div>
        </div>
    );
}