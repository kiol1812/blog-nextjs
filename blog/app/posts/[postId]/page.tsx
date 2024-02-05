import fs from 'fs';
import path from "path";

import matter from 'gray-matter';
import { remark } from 'remark'
import html from 'remark-html'

import type { InferGetStaticPropsType, GetStaticProps } from 'next'

const postsDirectory = path.join(process.cwd(), 'src/posts');

function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName)=>{
        return {
            params: {
                postId: fileName.replace(/\.md$/, ''),
            },
        }
    });
}

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function blog({
    params,
}:{
    params: {
        postId:string,
        contentHtml: string,
        data: string,
    };
}){
    const fileNames = fs.readdirSync(postsDirectory);
    // console.log(fileNames);
    var postDatas: string[] = [];
    fileNames.map(async (fileName) => {
        const fullpath = path.join(postsDirectory, `${fileName}`);
        const fileContents = fs.readFileSync(fullpath, 'utf8');
        // const matterResult = matter(fileContents);
        // const processedContent = await remark()
        //     .use(html)
        //     .process(matterResult.content);
        // const contentHtml = processedContent.toString();
        postDatas.push(fileContents);
    });
    console.log(postDatas);
    return (
        <div>
            <h1>{params.postId}</h1>
            {/* <p>{params.data}</p> */}
            <br></br>
            {/* <p>{params.contentHtml}</p> */}
            <p>{postDatas[0]}</p>
        </div>
    );
}