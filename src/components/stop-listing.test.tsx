import React from 'react'
import { getByText } from '@testing-library/dom'
import { render } from '../../test-utils'
import StopListing from './stop-listing'
import { PAGE_DATA } from '../utils/constants'

describe('StopListing', () => {
    const props = {
        nexTripResult: {
            stops: [],
            alerts: [],
            departures: []
        }
    }
    it('the StopListing to render', () => {
        const { container } = render(<StopListing {...props} />)
        const stopsPanel = container.querySelector('.stop-listings')
        expect(stopsPanel).toBeDefined()
    })
})