import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import {  makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { DRAWER_WIDTH } from '../styles/theme'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar
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
    onMenuClose: (isClosed: boolean) => void,
    children?: JSX.Element | JSX.Element[]
}

export default function Menu({ isOpen, onMenuClose }: MenuProps) {
    const classes = useStyles()
    const drawerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLParagraphElement>(null)
    
    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event?.key === "Escape") {  
            if (drawerRef?.current?.contains(event?.target as Node)) { // assert event.target as Node for contains
                onMenuClose(true)
            }
        }
    }, [onMenuClose])

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
        <div ref={drawerRef}>
            <Drawer variant='persistent' anchor='left' open={isOpen || false} classes={{ paper: classes.paper}}>
                <div className={classes.header}>
                    <p ref={headerRef} tabIndex={-1}>Navigation</p>
                    <IconButton onClick={() => onMenuClose(true)}>
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