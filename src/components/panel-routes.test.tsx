import React from 'react'
import { render, screen } from '../../test-utils'
import RoutesPanel from './panel-routes'
import { PAGE_DATA } from '../utils/constants'

jest.mock('./routes', () => {
    // eslint-disable-next-line react/display-name
    return { __esModule: true, default: () => (<div>Route</div>) }
})

describe('RoutesPanel', () => {
    it('the RoutesPanel to render', () => {
        const { container } = render(<RoutesPanel />)
        const routesPanel = container.querySelector('.routes-panel')
        expect(routesPanel).toBeDefined()
    })

    it(`the title matches the text ${PAGE_DATA.findRouteText}`, async () => {
        render(<RoutesPanel />)
        expect(await screen.findByText(PAGE_DATA.findRouteText)).toBeInTheDocument()
    })

    it('renders the routes component', () => {
        const { container } = render(<RoutesPanel />)
        const route = container.querySelector('.routes')
        expect(route).toBeDefined()
    })
})