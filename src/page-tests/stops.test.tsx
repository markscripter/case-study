import React from 'react'
import { getByText } from '@testing-library/dom'
import { render } from '../../test-utils'
import StopsPage from '../pages/stops'
import { PAGE_DATA } from '../utils/constants'

describe('StopsPage', () => {
    it('the StopsPage to render', () => {
        const { container } = render(<StopsPage />)
        const routesPage = container.querySelector('.stops-page')
        expect(routesPage).toBeDefined()
    })

    it(`the StopsPage title matches ${PAGE_DATA.findByStopText}`, () => {
        const { container } = render(<StopsPage />)
        expect(getByText(container, PAGE_DATA.findByStopText)).toBeInTheDocument()
    })

    it(`the StopsPage renders the Search Component`, () => {
        const { container } = render(<StopsPage />)
        const search = container.querySelector('.search')
        expect(search).toBeDefined()
    })
})

