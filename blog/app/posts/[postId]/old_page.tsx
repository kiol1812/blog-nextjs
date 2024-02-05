// import fs from 'fs';
// import path from "path";

// import matter from 'gray-matter';
// import { remark } from 'remark'
// import html from 'remark-html'

// import type { InferGetStaticPropsType, GetStaticProps } from 'next'

// const postsDirectory = path.join(process.cwd(), 'posts');

// function getAllPostIds(){
//     const fileNames = fs.readdirSync(postsDirectory);
//     return fileNames.map((fileName)=>{
//         return {
//             params: {
//                 id: fileName.replace(/\.md$/, ''),
//             },
//         }
//     });
// }

// export async function getStaticPaths(){
//     const paths = getAllPostIds();
//     return {
//         paths,
//         fallback: false,
//     };
// }
// type PostData={
//     fileName: string,
//     contentHtml: string,
//     data: string,
// };
// export const getStaticProps( async () => {
//     const fileNames = await fs.readdirSync(postsDirectory);
//     const postData = fileNames.map(async (fileName) => {
//         const fullpath = path.join(postsDirectory, `${fileName}`);
//         const fileContents = fs.readFileSync(fullpath, 'utf8');
//         const matterResult = matter(fileContents);
//         const processedContent = await remark()
//             .use(html)
//             .process(matterResult.content);
//         const contentHtml = processedContent.toString();
//         return {
//             fileName,
//             contentHtml,
//             ...matterResult.data,
//         };
//     });
//     return {
//         props: {
//             postData,
//         },
//     };
// }) satisfies GetStaticProps<{ postData: PostData }>

// // export default function Page({ params }: { params: { slug: string } }){
// //     return <div>My Post: {params.slug}</div>
// // }

// export default function Page({
//     postData,
// }: InferGetStaticPropsType<typeof getStaticProps>){
//     return (
//         <ul>
//             {postData.map((post)=>{
//                 <li>
//                     <h3>{post.id}</h3>
//                     <p>{post.contentHtml}</p>
//                 </li>
//             })}
//         </ul>
//     );
// };