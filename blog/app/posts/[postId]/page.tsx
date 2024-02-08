import fs from 'fs';
import path from "path";

import matter from 'gray-matter';
import { remark } from 'remark'
import html from 'remark-html'

import type { InferGetStaticPropsType, GetStaticProps } from 'next'

const postsDirectory = path.join(process.cwd(), 'src/posts');
const fileNames = fs.readdirSync(postsDirectory);

function getAllPostIds(){
    return fileNames.map((fileName)=>{
        return {
            params: {
                postId: fileName.replace(/\.md$/, '')
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

export async function getData(fileName: string) {
    const fullpath = path.join(postsDirectory, `${fileName}.md`);
    const fileContents = fs.readFileSync(fullpath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return{
        fileName,
        contentHtml,
        ...matterResult.data,
    };
}

export async function getDatas({params}:{
    params:{
        postId: string,
    },
}) {
    const postData = await getData(params.postId);
    return {
        postData,
    }
}

export default async function blog({
    params
}:{
    params:{
        postId: string,
    },
}){
    const {postData} = await getDatas({params});
    return (
        <div>
            <h1>{postData.fileName}</h1>
            <br></br>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </div>
    );
}