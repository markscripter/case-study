import { makeStyles } from '@material-ui/core/styles'
import { PAGE_DATA } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(4, 3),
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        flex: "0 0 auto",
        fontSize: "1rem",
        textAlign: "right"
    }
}))

type FooterProps = {
    children?: JSX.Element | JSX.Element[]
}

export default function Footer({ }: FooterProps) {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            {PAGE_DATA.disclaimer}
        </footer>
    )
}