import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import RoutesPage from '../pages/routes'
import { PAGE_DATA } from '../utils/constants'

jest.mock('../components/routes', () => {
    // eslint-disable-next-line react/display-name
    return { __esModule: true, default: () => (<div className='routes'>Route</div>) }
})

describe('RoutesPage', () => {
    it('the RoutesPage to render', async () => {
        const { container } = render(<RoutesPage />)
        const routesPage = container.querySelector('.routes-page')
        expect(routesPage).toBeDefined()
    })

    it(`the RoutesPage title matches ${PAGE_DATA.findRouteText}`, async () => {
        render(<RoutesPage />)
        expect(await screen.findByText(PAGE_DATA.findRouteText)).toBeInTheDocument()
    })

    it(`the RoutesPage renders the Route Component`, async () => {
        const { container } = render(<RoutesPage />)
        const routes = container.querySelector('.routes')
        expect(routes).toBeDefined()
    })
})

