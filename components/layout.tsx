import { useState, MouseEvent, KeyboardEvent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles';
import Header from './header'
import Menu from './menu'
import { DRAWER_WIDTH } from '../styles/theme'

export const siteDescription = 'Cast Study: NexTrip'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    disclaimer: {
        fontSize: '1em'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '100%',
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
}));

type LayoutProps = {
    children: JSX.Element|JSX.Element[],
    title: string
}

export default function Layout({ children, title }: LayoutProps) {
    const classes = useStyles();
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
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={siteDescription} />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <Header key='header' title={title} isOpen={isOpen} onMenuOpen={handleOpenMenu} />
            <Menu key='menu' isOpen={isOpen} onMenuClose={handleCloseMenu} />
            <div className={`${classes.content} ${isOpen ? classes.contentShift : ''}`}>
                <main>{children}</main>
                <footer>
                    <p className={classes.disclaimer}>&copy; 2021 / Mark Scripter</p>
                </footer>
            </div>
        </div>
    )
}