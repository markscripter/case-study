import { makeStyles } from '@material-ui/core/styles'
import { PAGE_DATA } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    footer: {
        flex: "0 0 auto",
        color: theme.palette.primary.light,
        fontSize: "0.6rem",
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