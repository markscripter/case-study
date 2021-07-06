import React from 'react'
import { dataReducer, useRoutes, useDirections, usePlaceCodes, useStopByPlaceCodes, useStop, Actions, State } from './hooks'
import { render, screen, fireEvent } from '../../test-utils'
import { mockFetch, mockFetchError } from '../../test-utils/mocks'

import routesData from '../../test-utils/test_data/routes.json'
import directionsData from '../../test-utils/test_data/directions.json'
import placeCodesData from '../../test-utils/test_data/place-codes.json'
import stopsByPlaceCodeData from '../../test-utils/test_data/stops-by-placecode.json'
import stopsData from '../../test-utils/test_data/stops.json'

describe('dataReducer', () => {
    it('returns default state', () => {
        const state: State<ObjType[]> = {
            loading: false,
            error: null,
            data: []
        }
        const initialState = dataReducer<State<ObjType[]>>(state, { type: Actions.default, payload: true })
        expect(state).toEqual(initialState)
    })
    it('returns updated state', () => {
        const state: State<ObjType[]> = {
            loading: false,
            error: null,
            data: []
        }
        const initialState = dataReducer<State<ObjType[]>>(state, { type: Actions.update, payload:  [ {test: 'test'} ]})
        expect(state).not.toEqual(initialState)
        expect(initialState.data[0].test).toEqual('test')
    })
    it('returns loading state', () => {
        const state: State<ObjType[]> = {
            loading: false,
            error: null,
            data: []
        }
        const initialState = dataReducer<State<ObjType[]>>(state, { type: Actions.loading, payload: true })
        expect(state).not.toEqual(initialState)
        expect(initialState.loading).toEqual(true)
    })
})

describe('useRoutes', () => {
    it('returns expected success state', async () => {
        mockFetch<Route[]>(routesData)

        const Component = () => {
            const state = useRoutes()
            const { loading, error, data } = state
            return (
                <div>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('data')).toBeInTheDocument()
    })

    it('returns expected error state', async () => {
        mockFetchError()

        const Component = () => {
            const state = useRoutes()
            const { loading, error, data } = state
            return (
                <div>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('error')).toBeInTheDocument()
    })
})

describe('useDirections', () => {
    it('returns expected success state', async () => {
        mockFetch<Direction[]>(directionsData)

        const Component = () => {
            const [state, fetchData] = useDirections()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData("901")}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('data')).toBeInTheDocument()
    })

    it('returns expected error state', async () => {
        mockFetchError()

        const Component = () => {
            const [state, fetchData]  = useDirections()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData("901")}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('error')).toBeInTheDocument()
    })
})

describe('usePlaceCodes', () => {
    it('returns expected success state', async () => {
        mockFetch<PlaceCode[]>(placeCodesData)

        const Component = () => {
            const [state, fetchData] = usePlaceCodes()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData(["901", 0])}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('data')).toBeInTheDocument()
    })

    it('returns expected error state', async () => {
        mockFetchError()

        const Component = () => {
            const [state, fetchData] = usePlaceCodes()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData(["901", 0])}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('error')).toBeInTheDocument()
    })
})

describe('useStopByPlaceCodes', () => {
    it('returns expected success state', async () => {
        mockFetch<NexTripResult>(stopsByPlaceCodeData)

        const Component = () => {
            const [state, fetchData] = useStopByPlaceCodes()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData(["901", 0, "12"])}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.stops.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('data')).toBeInTheDocument()
    })

    it('returns expected error state', async () => {
        mockFetchError()

        const Component = () => {
            const [state, fetchData] = useStopByPlaceCodes()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData(["901", 0, "12"])}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.stops.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('error')).toBeInTheDocument()
    })
})

describe('useStop', () => {
    it('returns expected success state', async () => {
        mockFetch<NexTripResult>(stopsData)

        const Component = () => {
            const [state, fetchData] = useStop()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData(122)}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.stops.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('data')).toBeInTheDocument()
    })

    it('returns expected error state', async () => {
        mockFetchError()

        const Component = () => {
            const [state, fetchData] = useStop()
            const { loading, error, data } = state
            return (
                <div>
                    <button onClick={() => fetchData(122)}>fetch</button>
                    {loading && <div>loading</div>}
                    {error && <div>error</div>}
                    {data.stops.length > 0 && <div>data</div>}
                </div>
            )
        }
        
        render(<Component />)

        expect(await screen.findByText('loading')).toBeInTheDocument()
        const button = await screen.findByText('fetch')
        fireEvent.click(button)
        expect(await screen.findByText('error')).toBeInTheDocument()
    })
})