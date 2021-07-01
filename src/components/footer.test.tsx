import React from 'react'
import { getByText } from '@testing-library/dom'
import { render, fireEvent } from '../../test-utils'
import Footer from './footer'
import { PAGE_DATA } from '../utils/constants'

describe('Footer', () => {
    it('the footer to render', () => {
        const { container } = render(<Footer/>)
        const footer = container.querySelector('footer')
        expect(footer).toBeDefined()
    })
    it(`the footer to match text ${PAGE_DATA.disclaimer}`, () => {
        const { container } = render(<Footer/>)
        expect(getByText(container, PAGE_DATA.disclaimer)).toBeInTheDocument()
    })
})