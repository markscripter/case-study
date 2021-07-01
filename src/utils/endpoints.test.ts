import {
    getAgencies,
    getRoutes,
    getDirections,
    getPlaceCodes,
    getStop,
    getStopByPlaceCode,
    getVehicles,
    Agency,
    Route,
    Direction,
    PlaceCodes,
    NexTripResult,
    Vehicle
} from './endpoints'

import agenciesData from '../../test-utils/test_data/agencies.json'
import routesData from '../../test-utils/test_data/routes.json'
import directionsData from '../../test-utils/test_data/directions.json'
import placeCodesData from '../../test-utils/test_data/place-codes.json'
import stopsData from '../../test-utils/test_data/stops.json'
import stopsByPlaceCodeData from '../../test-utils/test_data/stops-by-placecode.json'
import vehicleData from '../../test-utils/test_data/vehicles.json'

declare let global: { fetch: {} };

function mockFetch<T>(data: T) {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(data)
        })
    })
}

function mockFetchError() {
    global.fetch = jest.fn().mockImplementationOnce(() => {
        return Promise.resolve({
            ok: false,
            status: 500,
            statusText: 'Server Error'
        })
    })
}

describe('endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe('getAgencies', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getAgencies()
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<Agency[]>(agenciesData)
            const data = await getAgencies()
            expect(data).toEqual(agenciesData)
        })
    })
    describe('getRoutes', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getRoutes()
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<Route[]>(routesData)
            const data = await getRoutes()
            expect(data).toEqual(routesData)
        })
    })
    describe('getDirections', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getDirections("901")
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<Direction[]>(directionsData)
            const data = await getDirections("901")
            expect(data).toEqual(directionsData)
        })
    })
    describe('getPlaceCodes', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getPlaceCodes("901", 1)
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<PlaceCodes[]>(placeCodesData)
            const data = await getPlaceCodes("901", 1)
            expect(data).toEqual(placeCodesData)
        })
    })
    describe('getStop', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getStop(41215)
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<NexTripResult>(stopsData)
            const data = await getStop(41215)
            expect(data).toEqual(stopsData)
        })
    })
    describe('getStopByPlaceCode', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getStopByPlaceCode("901", 1, "AMMO")
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<NexTripResult>(stopsByPlaceCodeData)
            const data = await getStopByPlaceCode("901", 1, "AMMO")
            expect(data).toEqual(stopsByPlaceCodeData)
        })
    })
    describe('getVehicles', () => {
        it('throws an error if the server has a problem', async () => {
            mockFetchError()
            try {
                await getVehicles("901")
            } catch(error) {
                expect(error.message).toEqual('Server Error')
            }
        })
        it('returns expected data when successful fetch', async () => {
            mockFetch<Vehicle[]>(vehicleData)
            const data = await getVehicles("901")
            expect(data).toEqual(vehicleData)
        })
    })
})