declare let global: { fetch: {} };

declare type KeyTypes = number | string

declare type ObjType = {
    [key in KeyTypes]: any
}

declare type KeyTypeArray = number[] | string[]

declare type ActionPayload = {
    type: string,
    payload?: any
}

declare type Dispatch = (payload: ActionPayload) => void

declare type Route = {
    route_id?: string | null | undefined,
    agency_id: number,
    route_label?: string | null | undefined
}

declare type Direction = {
    direction_id: number,
    direction_name?: string | null | undefined
}

declare type PlaceCode = {
    place_code: string,
    description?: string | null | undefined
}

declare type ProblemDetails = {
    type: string | null | undefined,
    title: string | null | undefined,
    status: number | null | undefined,
    detail: string | null | undefined,
    instance: string | null | undefined
}

declare type AlertMessage = {
    stop_closed: boolean,
    alert_text?: string | null | undefined
}

declare type Departure = {
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

declare type Stop = {
    stop_id: number,
    latitude: number,
    longitude: number,
    description?: string | null | undefined
}

declare type Agency = {
    agency_id: number,
    agency_name?: string | null | undefined
}

declare type Vehicle = {
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

declare type NexTripResult = {
    stops: Stop[],
    alerts:AlertMessage[],
    departures:Departure[],
}

declare type StopResults = {
    stops: NexTripResult | null
}

declare type Error = {
    name: string,
    message: string
}
