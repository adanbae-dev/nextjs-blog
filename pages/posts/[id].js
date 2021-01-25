import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';



export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}></Date>          
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>)
}
// In development('npm run dev' or 'yarn dev'), 'getStaticPaths' runs on every request
// in production, 'getStaticPaths' runs at build time
export async function getStaticPaths() {
    // Return a list of possible value for id   
    const paths = getAllPostIds();

    // Catch-all Routes
    // 'pages/posts/[...id].js' matches '/posts/a', but also '/posts/a/b', '/posts/a/b/c' and so on
    
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    // Fetch necessary data for the blog post using params.id

    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}