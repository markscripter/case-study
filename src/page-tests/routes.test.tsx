import React from 'react'
import { getByText } from '@testing-library/dom'
import { render, screen, fireEvent } from '../../test-utils'
import RoutesPage from '../pages/routes'
import { PAGE_DATA } from '../utils/constants'

describe('RoutesPage', () => {
    it('the RoutesPage to render', async () => {
        const { container } = render(<RoutesPage />)
        const routesPage = await container.querySelector('.routes-page')
        expect(routesPage).toBeDefined()
    })

    it(`the RoutesPage title matches ${PAGE_DATA.findRouteText}`, async () => {
        render(<RoutesPage />)
        expect(await screen.findByText(PAGE_DATA.findRouteText)).toBeInTheDocument()
    })

    it(`the RoutesPage renders the Route Component`, async () => {
        const { container } = render(<RoutesPage />)
        const routes = await container.querySelector('.routes')
        expect(routes).toBeDefined()
    })
})

