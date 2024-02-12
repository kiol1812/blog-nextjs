import Link from "next/link";

import fs from 'fs';
import path from 'path';

const toURL_links = fs.readFileSync(`${path.join(process.cwd(), 'src')}/tmp.json`, 'utf-8');
const gistsData:JSON = JSON.parse(toURL_links);

export function list(){
    const l = Object.keys(gistsData).map((title)=>{
        return (
            <li key={`${title}`}>
                <Link href={`/gists/${title}`}>{title}</Link>
            </li>
        );
    })
    return <ul>{l}</ul>
}