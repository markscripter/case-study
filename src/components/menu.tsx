import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { DRAWER_WIDTH } from '../styles/theme'
import { PAGE_DATA } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        ...theme.mixins.toolbar
    },
    title: {
        marginLeft: theme.spacing(3),
        fontSize: "1rem",
        color: theme.palette.primary.main,
    },
    content: {
        flexGrow: 1 
    },
    paper: {
        width: DRAWER_WIDTH
    },
}));

type MenuProps = {
    isOpen: boolean | null | undefined,
    onMenuChange: (isOpen: boolean) => void
}

export default function Menu({ isOpen, onMenuChange }: MenuProps) {
    const classes = useStyles()
    const drawerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLParagraphElement>(null)
    
    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event?.key === "Escape") {  
            if (drawerRef?.current?.contains(event?.target as Node)) { // assert event.target as Node for contains
                onMenuChange(false)
            }
        }
    }, [onMenuChange])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keyup', handleKeyUp, false)
        } else {
            document.removeEventListener('keyup', handleKeyUp, false)
        }
    }, [isOpen, handleKeyUp])

    useEffect(() => {
        if (isOpen) {
            headerRef?.current?.focus()
        }
    }, [isOpen])

    return (
        <div className='menu' ref={drawerRef}>
            <Drawer variant='persistent' anchor='left' open={isOpen || false} classes={{ paper: classes.paper}}>
                <div className={classes.header}>
                    <h2 ref={headerRef} tabIndex={-1} className={classes.title}>{PAGE_DATA.menuTitle}</h2>
                    <IconButton className="menu-close-button" onClick={() => onMenuChange(false)} color="primary">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <div className={classes.content}>
                    <ul>
                        <li>
                            <Link href='/routes'><a>Routes</a></Link>
                        </li>
                        <li>
                            <Link href='/stops'><a>Stops</a></Link>
                        </li>
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}