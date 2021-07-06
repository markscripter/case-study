import { useState, useEffect, ChangeEvent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'
import { useRoutes, useDirections, usePlaceCodes, useStopByPlaceCodes } from '../utils/hooks'
import StopListings from './stop-listing'
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router'
const useStyles = makeStyles((theme) => ({
    skeleton: {
        margin: theme.spacing(4, 0),
        height: '48px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        margin: theme.spacing(0, 0, 4, 0)
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

type RouteQuery = {
    route: string | null | undefined,
    direction: string | null | undefined,
    placeCode: string | null | undefined
}

export default function Routes() {
    const router = useRouter()
    const query = router?.query as RouteQuery
    const routesData = useRoutes()
    const [directionsData, getDirections] = useDirections()
    const [placeCodesData, getPlaceCodes] = usePlaceCodes()
    const [stopsData, getStopsByPlaceCode] = useStopByPlaceCodes()
    const [selectedRoute, updateSelectedRoute] = useState<string>('')
    const [selectedDirection, updateSelectedDirection] = useState<string>('')
    const [selectedPlaceCode, updateSelectedPlaceCode] = useState<string>('')

    useEffect(() => {
        if (query?.route) {
            updateSelectedRoute(query.route)
        } else {
            updateSelectedRoute('')
        }
        if (query?.direction) {
            updateSelectedDirection(query.direction)
        } else {
            updateSelectedDirection('')
        }
        if (query?.placeCode) {
            updateSelectedPlaceCode(query.placeCode)
        } else {
            updateSelectedPlaceCode('')
        }
    }, [query])

    useEffect(() => {
        if (selectedRoute !== '') {
            getDirections(selectedRoute)
        }
    }, [selectedRoute, getDirections])

    useEffect(() => {
        if (selectedRoute !== '' && selectedDirection !== '') {
            getPlaceCodes([selectedRoute, Number(selectedDirection)])
        }
    }, [selectedRoute, selectedDirection, getPlaceCodes])

    useEffect(() => {
        if (selectedRoute !== '' && selectedDirection !== '' && selectedPlaceCode !== '') {
            getStopsByPlaceCode([selectedRoute, Number(selectedDirection), selectedPlaceCode])
        }
    }, [selectedRoute, selectedDirection, selectedPlaceCode, getStopsByPlaceCode])

    const handleRouteChange = (event: ChangeEvent<{value: unknown}>) => {
        const routeId = event.target.value as string
        updateSelectedRoute(routeId)
        updateSelectedDirection('')
        updateSelectedPlaceCode('')
        router.push(`${router.pathname}?route=${routeId}`)
    }

    const handleDirectionChange = (event: ChangeEvent<{value: unknown}>) => {
        const directionId = event.target.value as string
        updateSelectedDirection(directionId)
        updateSelectedPlaceCode('')
        router.push(`${router.pathname}?route=${selectedRoute}&direction=${directionId}`)
    }

    const handlePlaceCodeChange = (event: ChangeEvent<{value: unknown}>) => {
        const placeCode = event.target.value as string
        updateSelectedPlaceCode(placeCode)
        router.push(`${router.pathname}?route=${selectedRoute}&direction=${selectedDirection}&placeCode=${placeCode}`)
    }

    const classes = useStyles()

    return (
        <div className={`routes ${classes.form}`}>
            {
            routesData.loading
                ? <Skeleton className={classes.skeleton} variant="text" />
                : <FormControl className={classes.formControl} variant="outlined">
                    <InputLabel id="routes-label">Routes</InputLabel>
                    <Select
                        labelId="routes-label"
                        id="route-select"
                        value={selectedRoute}
                        onChange={handleRouteChange}
                        label="Routes"
                    >
                    {
                        routesData.data.length > 0 && routesData.data.map(({route_id, route_label}: Route) => {
                            return <MenuItem key={route_id} value={route_id || -1}>{route_label}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
            }
            {
                selectedRoute !== '' && directionsData.loading && <Skeleton className={classes.skeleton} variant="text" />
            }
            {
                selectedRoute !== '' && directionsData?.data.length > 0 && (
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="directions-label">Direction</InputLabel>
                        <Select
                            labelId="directions-label"
                            id="directions-select"
                            value={selectedDirection}
                            onChange={handleDirectionChange}
                            label="Direction"
                        >
                        {
                            directionsData.data.map(({direction_id, direction_name}: Direction) => {
                                return <MenuItem key={direction_id} value={direction_id.toString()}>{direction_name}</MenuItem>
                            })
                        }
                        </Select>
                    </FormControl>
                )
            }
            {
                selectedDirection !== '' && placeCodesData.loading && <Skeleton className={classes.skeleton} variant="text" />
            }
            {
                selectedDirection !== '' && placeCodesData?.data.length > 0 && (
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel id="placeCodes-label">Places</InputLabel>
                        <Select
                            labelId="placeCodes-label"
                            id="placeCodes-select"
                            value={selectedPlaceCode}
                            onChange={handlePlaceCodeChange}
                            label="Places"
                        >
                        {
                            placeCodesData.data.map(({place_code, description}: PlaceCode) => {
                                return <MenuItem key={place_code} value={place_code}>{description}</MenuItem>
                            })
                        }
                        </Select>
                    </FormControl>
                )
            }
            {
                selectedRoute !== '' &&
                selectedDirection !== '' &&
                selectedPlaceCode !== '' &&
                stopsData?.data?.stops.length > 0 &&
                <StopListings nexTripResult={stopsData.data as NexTripResult} />
            }
        </div>
    )
}

