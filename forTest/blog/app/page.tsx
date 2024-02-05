import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

import Link from 'next/link';
import Date from '../app/components/date';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home() { //{ allPostsData }
  return (
    <main>
      <Head>
        <title>title</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>test</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        {/* <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul> */}
      </section>
    </main>
  );
}
