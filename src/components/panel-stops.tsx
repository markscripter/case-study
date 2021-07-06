import Search from './search'
import { PAGE_DATA } from '../utils/constants'

export default function StopPanel() {
    return (
        <div className='stops-panel'>
            <h3>{PAGE_DATA.findByStopText}</h3>
            <Search value={''} />
        </div>

    )
}