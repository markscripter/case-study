import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    panel: {
        margin: theme.spacing(3, 0)
    }
}))

type TabPanelProps = {
    id: number,
    children: JSX.Element|JSX.Element[],
    hidden: boolean
}

// A11Y: https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/tabs/tabs-2/tabs.html
export default function TabPanel({ id, children, hidden }: TabPanelProps) {
    const classes = useStyles()

    return (
        <div role='tabpanel' aria-labelledby={id.toString()} tabIndex={0} hidden={hidden} className={classes.panel}>
            {children}
        </div>
    )
}