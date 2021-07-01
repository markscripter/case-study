import { useState, MouseEvent, KeyboardEvent } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import Header from './header'
import Menu from './menu'
import Footer from './footer'
import { DRAWER_WIDTH } from '../styles/theme'
import { PAGE_DATA } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100vh'
    },
    disclaimer: {
        fontSize: '1em'
    },
    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(3),
        width: '100%',
        height: '100%',
        margin: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        width: `calc(100% - ${DRAWER_WIDTH})`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    mainContent: {
        marginBottom: 'auto'
    }
}))

type LayoutProps = {
    children: JSX.Element|JSX.Element[],
    title: string
}

export default function Layout({ children, title }: LayoutProps) {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState<boolean|null>(null)

    const handleOpenMenu = (state: boolean) => {
        setIsOpen(true)
    }

    const handleCloseMenu = (state: boolean) => {
        setIsOpen(false)
    }

    return (
        <div className={classes.container}>
            <Head>
                <title>{PAGE_DATA.siteDescription}</title>
                <meta name="description" content={PAGE_DATA.siteDescription} />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Header key='header' title={title} isOpen={isOpen} onMenuOpen={handleOpenMenu} />
            <Menu key='menu' isOpen={isOpen} onMenuClose={handleCloseMenu} />
            <div className={`${classes.content} ${isOpen ? classes.contentShift : ''}`}>
                <main className={classes.mainContent}>{children}</main>
                <Footer />
            </div>
        </div>
    )
}