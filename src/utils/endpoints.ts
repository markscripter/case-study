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

/**
 * Get a list of active Routes for the current service day.
 * Service returns 200 or 500
 * @returns Promise
 */
export async function getRoutes(): Promise<Route[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/routes`)
    if (!response.ok || response.status === 500) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
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

/**
 * Returns a list of PlaceCodes with descriptions
 * @param {string} routeId - The id of a route 
 * @param {number} directionId - The id for the direction of a route. IE: NB/SB or EB/WB
 * @returns Promise
 */
export async function getPlaceCodes(routeId: string, directionId: number): Promise<PlaceCode[]> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/stops/${routeId}/${directionId}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
}

/**
 * Get a result with stop information and real-time departures
 * @param {number} stopId - The id of a stop 
 * @returns Promise
 */
export async function getStop(stopId: number): Promise<NexTripResult> {
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
export async function getStopByPlaceCode(routeId: string, directionId: number, placeCode: string): Promise<NexTripResult> {
    const response: Response = await fetch(`https://svc.metrotransit.org/nextripv2/${routeId}/${directionId}/${placeCode}`)
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText)
    }
    const body = await response.json()
    return body
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

