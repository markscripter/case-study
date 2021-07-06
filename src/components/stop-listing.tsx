import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    container: {},
    stopHeading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        margin: theme.spacing(4, 0)
    },
    heading: {
        margin: theme.spacing(2, 0)
    },
    alert: {
        color: theme.palette.error.dark,
        border: `1px solid ${theme.palette.error.dark}`,
        padding: theme.spacing(2),
        margin: theme.spacing(2, 0)
    },
    alertHeading: {
        color: theme.palette.error.dark,
        fontWeight: 'bold',
        margin: theme.spacing(2, 0),
    },
    table: {
        width: '100%',
        border: `1px solid ${theme.palette.primary.main}`,
        borderCollapse: 'collapse'
    },
    tableHead: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    tableCell: {
        textAlign: 'left',
        padding: theme.spacing(3, 2),
        fontSize: '1rem'
    },
    tableRow: {
        '&:nth-child(even)' : {
            backgroundColor: 'rgba(89, 50, 230, 0.075)'
        }
    }
}))

type StopListingsProps = {
    nexTripResult: NexTripResult
}

export default function StopListings({ nexTripResult } : StopListingsProps) {
    const classes = useStyles()
    const { alerts, stops, departures } = nexTripResult

    return (
        <div className={`stop-listings ${classes.container}`}>
            <div className={classes.stopHeading}>
                <h3 className={classes.heading}>{stops.map(stop => stop.description).join(', ')}</h3>
                { stops.length > 0 && <span>Stop #: {stops.map(stop => `${stop.stop_id}`).join(', ')}</span>}
            </div>
            {
                alerts.length > 0 && (
                    <div>
                        <p className={classes.alertHeading}>Alerts:</p>
                        {
                            alerts.map((alert: AlertMessage, index: number) => (
                                <div key={index} className={classes.alert}>
                                    <strong>{alert.stop_closed ? 'Stop closed': 'Stop open'}</strong>: {alert.alert_text}
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <table className={classes.table}>
                <caption className='MuiTypography-srOnly'>Departures table</caption>
                <thead className={classes.tableHead}>
                    <tr className={classes.tableRow}>
                        <th className={classes.tableCell}>Route</th>
                        <th className={classes.tableCell}>Destination</th>
                        <th className={classes.tableCell}>Departs</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departures.map(departure => (
                            <tr key={departure.trip_id} className={classes.tableRow}>
                                <td className={classes.tableCell}>{departure.route_short_name}</td>
                                <td className={classes.tableCell}>{departure.description}</td>
                                <td className={classes.tableCell}>{departure.departure_text}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}