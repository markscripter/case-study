import Head from 'next/head'
import Layout from '../../components/layout'
import { PAGE_DATA } from '../../utils/constants'
import Routes from '../../components/routes'

export default function RoutesPage() {
    const title = `${PAGE_DATA.siteDescription}: Routes`
    return (
        <Layout title={title}>
            <Head>
                <title>{title}</title>
            </Head>
            <section className='routes-page'>
                <h2>{PAGE_DATA.findRouteText}</h2>
                <Routes />
            </section>
        </Layout>
    )
}