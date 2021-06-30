// export type ProblemDetails = {
//?     type: string | null | undefined,
//?     title: string | null | undefined,
//?     status: number | null | undefined,
//?     detail: string | null | undefined,
//?     instance: string | null | undefined
// }


export type AlertMessage = {
    stop_closed: boolean,
    alert_text?: string | null | undefined
}

export type Departure = {
    actual: boolean,
    trip_id?: string | null | undefined,
    stop_id: number,
    departure_text?:	string | null | undefined,
    departure_time: number,
    description?: string | null | undefined,
    gate?: string | null | undefined,
    route_id?: string | null | undefined,
    route_short_name?: string | null | undefined,
    direction_id: number,
    direction_text?: string | null | undefined,
    terminal?: string | null | undefined,
    schedule_relationship?: string | null | undefined
}

export type Stop = {
    stop_id: number,
    latitude: number,
    longitude: number,
    description?: string | null | undefined
}

export type Agency = {
    agency_id: number,
    agency_name?: string | null | undefined
}

/**
 * Get the full list of regional transit providers.
 * @returns Promise
 */
export async function getAgencies(): Promise<Agency[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/agencies`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

export type Route = {
    route_id?: string | null | undefined,
    agency_id: number,
    route_label?: string | null | undefined
}

/**
 * Get a list of active Routes for the current service day.
 * @returns Promise
 */
export async function getRoutes(): Promise<Route[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/routes`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

export type Direction = {
    direction_id: number,
    direction_name?: string | null | undefined
}

/**
 * Get two Directions for the given Route, NB/SB or EB/WB
 * @param {string} routeId - The id of a route
 * @returns Promise
 */
export async function getDirections(routeId: string): Promise<Direction[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/directions/${routeId}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

export type PlaceCodes = {
    place_code: string,
    description?: string | null | undefined
}

/**
 * Returns a list of PlaceCodes with descriptions
 * @param {string} routeId - The id of a route 
 * @param {number} directionId - The id for the direction of a route. IE: NB/SB or EB/WB
 * @returns Promise
 */
export async function getPlaceCodes(routeId: string, directionId: number): Promise<PlaceCodes[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/stops/${routeId}/${directionId}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

export type NexTripResult = {
    stops: Stop[],
    alerts:AlertMessage[],
    departures:Departure[],
}

/**
 * Get a result with stop information and real-time departures
 * @param {number} stopId - The id of a stop 
 * @returns Promise
 */
export async function getStop(stopId: number): Promise<NexTripResult[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/${stopId}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

/**
 * Get a result with stop information and real-time departures
 * @param {string} routeId - The id of a route 
 * @param {number} directionId - The direction for a route. IE: North, South
 * @param {string} placeCode - PlaceCode for the Timepoint stop place name
 * @returns Promise
 */
export async function getStopByPlaceCode(routeId: string, directionId: number, placeCode: string): Promise<NexTripResult[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${placeCode}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

export type Vehicle = {
    trip_id?: string | null | undefined,
    direction_id: number,
    direction?: string | null | undefined,
    location_time: number,
    route_id?: string | null | undefined,
    terminal?: string | null | undefined,
    latitude: number,
    longitude: number,
    bearing: number,
    odometer: number,
    speed: number
}

/**
 * Get an array of Vehicles in service for a Route
 * @param {string} routeId - The id of a route  
 * @returns Array of Vehicles
 */
export async function getVehicles(routeId: string): Promise<Vehicle[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/vehicles/${routeId}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

