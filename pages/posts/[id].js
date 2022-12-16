import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData={} }) {
    console.log('postData:', postData);
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    {
                        postData.date?
                        <Date dateString={postData.date} />
                        :null
                    }
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    console.log('getStaticPaths');
    const paths = getAllPostIds()
    console.log('paths:', paths);//[{params:{id:'ssg-ssr'}}]
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    console.log('getStaticProps:', params);
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
