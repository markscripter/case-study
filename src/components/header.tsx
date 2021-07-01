import { useRef } from 'react'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton, { IconButtonTypeMap,  } from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit'
import { DRAWER_WIDTH } from '../styles/theme'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    homeButton: {
        display: "flex",
        flex: "0 0 auto",
        padding: theme.spacing(3)
    },
    text: {
        overflow: "hidden",
        flexBasis: 'auto',
    },
    title: {
        fontSize: '1rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.6rem',
        },
        textOverflow: 'ellipsis',
        whiteSpace: "nowrap",
        overflow: "hidden"
    }
}))  

type HeaderProps = {
    title: string,
    isOpen: boolean | null | undefined,
    onMenuOpen: (isOpen: boolean) => void,
    children?: JSX.Element | JSX.Element[]
}

export default function Header({ title, onMenuOpen, isOpen }: HeaderProps) {
    const classes = useStyles()
    const menuIconRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        // initial render will be null(object) or undefined
        if(typeof isOpen !== "boolean") return
        
        // if we got passed the initial isOpen check, it's been set w/ a boolean
        // if we are closed, then put focus back on the IconButton which triggered the opening of the menu
        if (isOpen === false) {
            menuIconRef?.current?.focus()
        }
    }, [isOpen])
    
    return (
        <div className={`${classes.appBar} ${isOpen ? classes.appBarShift : ''}`}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => onMenuOpen(true)}
                        aria-label="Menu"
                        aria-haspopup="true"
                        aria-expanded={isOpen ? true : false}
                        ref={menuIconRef}
                    >
                        <MenuIcon color="inherit" />
                    </IconButton>
                    <Link href='/'>
                        <a className={classes.homeButton}>
                            <span className="MuiTypography-srOnly">Go Home</span>
                            <DirectionsTransitIcon />
                        </a>
                    </Link>
                    <div className={classes.text}>
                        <Typography className={classes.title} variant="h1" noWrap>
                            {title}
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}