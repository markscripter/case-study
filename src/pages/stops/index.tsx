import Head from 'next/head'
import Layout from '../../components/layout'
import { PAGE_DATA } from '../../utils/constants'
import Search from '../../components/search'

export default function Stops() {
    const title = `${PAGE_DATA.siteDescription}: Stop`
    return (
        <Layout title={title}>
            <Head>
                <title>{title}</title>
            </Head>
            <section className="stops-page">
                <h2>{PAGE_DATA.findByStopText}</h2>
                <Search value='' />
            </section>
        </Layout>
    )
}