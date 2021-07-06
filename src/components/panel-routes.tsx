import Routes from './routes'
import { PAGE_DATA } from '../utils/constants'

export default function RoutesPanel() {
    return (
        <div className="routes-panel">
            <h3>{PAGE_DATA.findRouteText}</h3>
            <Routes />
        </div>
    )
}

