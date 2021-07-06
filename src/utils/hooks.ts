import { useCallback, useState, useEffect, useReducer, Reducer } from 'react'
import { getRoutes, getDirections, getPlaceCodes, getStopByPlaceCode, getStop } from '../utils/endpoints'
import { updateIn } from './update-in'

export type State<T> = {
    loading: boolean,
    error: Error | null,
    data: T
}

export enum Actions {
    loading = 'LOADING',
    error = 'ERROR',
    update = 'UPDATE',
    default = 'DEFAULT'
}

export const initialState: State<[]> = {
    loading: true,
    error: null,
    data: []
}

export function dataReducer<S> (state: S, action: ActionPayload): S {
    let loadingState
    let errorState
    let updatedState

    switch (action.type) {
        case Actions.loading:
            errorState = updateIn(['error'], null, state)
            loadingState = updateIn(['loading'], action.payload, errorState)
            return loadingState as S
        case Actions.error:
            loadingState = updateIn(['loading'], false, state)
            errorState = updateIn(['error'], action.payload, loadingState)
            return errorState as S
        case Actions.update:
            loadingState = updateIn(['loading'], false, state)
            errorState = updateIn(['error'], null, loadingState)
            updatedState = updateIn(['data'], action.payload, errorState)
            return updatedState as S
        default:
            return state
    }
}

export function useRoutes(): State<Route[]> {
    const [state, dispatch] = useReducer<Reducer<State<Route[]>, ActionPayload>>(dataReducer, initialState)
    
    // fetch routes
    useEffect(() => {
        // fetch routes
        getRoutes()
            .then(data => {
                dispatch({
                    type: Actions.update,
                    payload: data
                })
            })
            .catch(reason => {
                dispatch({
                    type: Actions.error,
                    payload: reason
                })
            })
    }, [])


    return state
}

type DirectionHook = [State<Direction[]>, (id: string) => void]

export function useDirections(): DirectionHook {
    const [routeId, updateRouteId] = useState<string>('')
    const [state, dispatch] = useReducer<Reducer<State<Direction[]>, ActionPayload>>(dataReducer, initialState)
    
    const fetchData = useCallback((id: string) => {
        if (id !== '') {
            dispatch({
                type: Actions.loading,
                payload: true
            })
            updateRouteId(id)
        }
    }, [])

    // fetch directions
    useEffect(() => {
        if (routeId !== '') {
            getDirections(routeId)
                .then(data => {
                    dispatch({
                        type: Actions.update,
                        payload: data
                    })
                })
                .catch(reason => {
                    dispatch({
                        type: Actions.error,
                        payload: reason
                    })
                })
        }
    }, [routeId])

    return [
        state,
        fetchData
    ]
}

type PlaceCodesHook = [State<PlaceCode[]>, (arg: [routeId: string, directionId: number]) => void]

export function usePlaceCodes(): PlaceCodesHook {
    const [state, dispatch] = useReducer<Reducer<State<PlaceCode[]>, ActionPayload>>(dataReducer, initialState)
    const [args, updateArguments] = useState<[string, number] | []>([])

    const fetchData = useCallback((newArgs: [string, number]) => {
        if (newArgs.length === 2) {
            dispatch({
                type: Actions.loading,
                payload: true
            })
            updateArguments(newArgs)
        }
    }, [])

    // fetch place codes
    useEffect(() => {
        if (args.length === 2) {
            getPlaceCodes(...args)
                .then(data => {
                    dispatch({
                        type: Actions.update,
                        payload: data
                    })
                })
                .catch(reason => {
                    dispatch({
                        type: Actions.error,
                        payload: reason
                    })
                })
        }
    }, [args])

    return [
        state,
        fetchData
    ]
}

const initialNexTripState: State<NexTripResult> = {
    loading: true,
    error: null,
    data: {
        stops: [],
        alerts: [],
        departures: [],
    }
}

type StopByPlaceCodesHook = [State<NexTripResult>, (arg: [routeId: string, directionId: number, placeCode: string]) => void]

export function useStopByPlaceCodes(): StopByPlaceCodesHook{
    const [args, updateArguments] = useState<[string, number, string] | []>([])
    const [state, dispatch] = useReducer<Reducer<State<NexTripResult>, ActionPayload>>(dataReducer, initialNexTripState)

    const fetchData = useCallback((newArgs: [string, number, string]) => {
        if (newArgs.length === 3) {
            dispatch({
                type: Actions.loading,
                payload: true
            })
            updateArguments(newArgs)
        }
    }, [])

    // fetch place codes
    useEffect(() => {
        if (args.length === 3) {
            getStopByPlaceCode(...args)
                .then(data => {
                    dispatch({
                        type: Actions.update,
                        payload: data
                    })
                })
                .catch(reason => {
                    dispatch({
                        type: Actions.error,
                        payload: reason
                    })
                })
        }
    }, [args])

    return [
        state,
        fetchData
    ]
}

type StopHook= [State<NexTripResult>, (stopId: number) => void]

export function useStop(): StopHook {
    const [intervalSet, updateIntervalSet] = useState<boolean>(false)
    const [stop, updateStop] = useState<number>(-1)
    const [state, dispatch] = useReducer<Reducer<State<NexTripResult>, ActionPayload>>(dataReducer, initialNexTripState)

    const fetchData = useCallback((stopId: number) => {
        if (stopId !== null) {
            dispatch({
                type: Actions.loading,
                payload: true
            })
            updateStop(stopId)
        }
    }, [])

    // fetch stop
    useEffect(() => {
        if (stop >-1 && state.loading) {
            // fetch stop
            getStop(stop)
                .then(data => {
                    dispatch({
                        type: Actions.update,
                        payload: data
                    })
                })
                .catch(reason => {
                    dispatch({
                        type: Actions.error,
                        payload: reason
                    })
                })
        }
    }, [stop, state.loading])

    if (Object.keys(state.data).length && intervalSet === false) {
        updateIntervalSet(true)
        setInterval(() => {
            fetchData(stop)
        }, 30000)
    }

    return [
        state,
        fetchData
    ]
}