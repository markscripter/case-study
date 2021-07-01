export type ActionPayload = {
    type: string,
    payload: {
        [key: string]: any
    }
}

export type Dispatch = (payload: ActionPayload) => void

export enum MenuActions {
    open = "OPEN_MENU",
    close = "CLOSE_MENU",
}

export const OPEN_MENU = MenuActions.open
export const CLOSE_MENU = MenuActions.close

export function openMenuAction(dispatch: Dispatch) {
    dispatch({
        type: OPEN_MENU,
        payload: {
            
        }
    })
}