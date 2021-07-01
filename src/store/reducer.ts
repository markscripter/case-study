import { ActionPayload, MenuActions } from "./actions"

type State = {
    ui: {
        [key: string]: string
    }
}

export default function reducer(state: State, action: ActionPayload): State {
    switch(action.type) {
        case MenuActions.open:
            return state
        case MenuActions.close:
            return state
        default:
            return state
    }
}