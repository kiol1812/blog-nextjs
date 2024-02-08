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
        <script src={`${url}/${filenameToURL[`${params.gistId}`]}`}></script>
    );
}