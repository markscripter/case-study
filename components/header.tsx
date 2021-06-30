import { useRef, MouseEvent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton, { IconButtonTypeMap,  } from '@material-ui/core/IconButton'
import { ExtendButtonBase } from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 'auto',
        display: 'none',
        fontSize: '1.5rem',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '20%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            '&:focus': {
                width: '20ch',
            },
        },
    },
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        onClick={() => onMenuOpen(true)}
                        aria-label="open drawer"
                        aria-haspopup="true"
                        aria-expanded={isOpen ? true : false}
                        ref={menuIconRef}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h1" noWrap>
                        {title}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search by Stop or Route"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}