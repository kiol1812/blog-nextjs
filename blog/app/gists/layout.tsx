import Link from "next/link";

import fs from 'fs';
import path from 'path';

import styles from './[gistId]/header.module.css'

const toURL_links = fs.readFileSync(`${path.join(process.cwd(), 'src')}/tmp.json`, 'utf-8');
const gistsData:JSON = JSON.parse(toURL_links);

function list(){
    const l = Object.keys(gistsData).map((title)=>{
        return (
            <li key={`${title}`}>
                <Link href={`/gists/${title}`}>{title}</Link>
            </li>
        );
    })
    return <ul>{l}</ul>
}

export default function layout({
    children,
}:{
    children: React.ReactNode;
}){
    return (
        <section>
            <div>
                <header>
                    <nav>
                        <ul>
                            {list()}
                        </ul>
                    </nav>
                </header>
                <main className={styles.box}>{children}</main>
            </div>
        </section>
    );
}