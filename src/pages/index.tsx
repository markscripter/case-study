import Head from 'next/head'
import Layout from '../components/layout'
import TabController from '../components/tab-controller'
import RoutesPanel from '../components/panel-routes'
import StopPanel from '../components/panel-stops'
import { PAGE_DATA } from '../utils/constants'

export default function Home() {
  return (
    <Layout title={PAGE_DATA.siteDescription}>
      <Head>
        <title>{PAGE_DATA.siteDescription}</title>
      </Head>
      <section className='home-page'>
        <h2>{PAGE_DATA.homeTitle}</h2>
        <TabController
          panelObjects={
            [
              {id: 0, label: "Routes", panel: <RoutesPanel  />},
              {id: 1, label: "Stop", panel: <StopPanel  />},
            ]
          }
        />
      </section>
    </Layout>
  )
}
