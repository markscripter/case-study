import React from 'react'
import { getByText } from '@testing-library/dom'
import { render } from '../../test-utils'
import StopPanel from './panel-stops'
import { PAGE_DATA } from '../utils/constants'

describe('StopPanel', () => {
    it('the StopPanel to render', () => {
        const { container } = render(<StopPanel />)
        const stopsPanel = container.querySelector('.stops-panel')
        expect(stopsPanel).toBeDefined()
    })

    it(`the title matches text ${PAGE_DATA.findByStopText}`, () => {
        const { container } = render(<StopPanel />)
        expect(getByText(container, PAGE_DATA.findByStopText)).toBeInTheDocument()
    })

    it('renders the search component', () => {
        const { container } = render(<StopPanel />)
        const search = container.querySelector('.search')
        expect(search).toBeDefined()
    })
})