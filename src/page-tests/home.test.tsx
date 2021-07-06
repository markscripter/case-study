import React from 'react'
import { render, screen } from '../../test-utils'
import HomePage from '../pages/'
import { PAGE_DATA } from '../utils/constants'

jest.mock('../components/routes', () => {
    // eslint-disable-next-line react/display-name
    return { __esModule: true, default: () => (<div className='routes'>Route</div>) }
})

describe('HomePage', () => {
    it('the HomePage to render', () => {
        const { container } = render(<HomePage />)
        const page = container.querySelector('.home-page')
        expect(page).toBeInTheDocument()
    })

    it(`the HomePage title matches ${PAGE_DATA.homeTitle}`, async () => {
        render(<HomePage />)
        expect(await screen.findByText(PAGE_DATA.homeTitle)).toBeInTheDocument()
    })

    it('the HomePage renders the TabController', () => {
        const { container } = render(<HomePage />)
        const tabController = container.querySelector('.tab-controller')
        expect(tabController).toBeInTheDocument()
    })
})

