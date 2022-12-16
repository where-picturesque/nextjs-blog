import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
    <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          Back to home
        </Link>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </h2>
    </Layout>
  )
}
