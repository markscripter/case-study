import React from 'react'
import { getByText } from '@testing-library/dom'
import { render } from '../../test-utils'
import HomePage from '../pages/'
import { PAGE_DATA } from '../utils/constants'

describe('HomePage', () => {
    it('the HomePage to render', () => {
        const { container } = render(<HomePage />)
        const page = container.querySelector('.home-page')
        expect(page).toBeInTheDocument()
    })

    it(`the HomePage title matches ${PAGE_DATA.homeTitle}`, () => {
        const { container } = render(<HomePage />)
        expect(getByText(container, PAGE_DATA.homeTitle)).toBeInTheDocument()
    })

    it('the HomePage renders the TabController', () => {
        const { container } = render(<HomePage />)
        const tabController = container.querySelector('.tab-controller')
        expect(tabController).toBeInTheDocument()
    })
})

