import React from 'react'
import { getByText } from '@testing-library/dom'
import { render, fireEvent, isInaccessible } from '../../test-utils'
import Layout from './layout'
import { PAGE_DATA } from '../utils/constants'

describe('Layout', () => {
    const text = "hi"
    let props = {
        title: PAGE_DATA.homeTitle,
        children: <div>{text}</div>
    }

    it('the Layout renders', () => {
        const { container } = render(<Layout {...props} />)
        const footer = container.querySelector('.layout')
        expect(footer).toBeDefined()
    })

    it(`the Layout to match children text: ${text}`, () => {
        const { container } = render(<Layout {...props} />)
        expect(getByText(container, text)).toBeInTheDocument()
    })

    it('opens the menu when the menu-button is clicked', () => {
        const { container } = render(<Layout {...props} />)
        const menuButton = container.querySelector('.menu-button') as Element
        const menuCloseButton = container.querySelector('.menu-close-button') as Element
        expect(menuButton.getAttribute('aria-expanded')).toEqual("false")
        expect(isInaccessible(menuCloseButton)).toBeTruthy()
        fireEvent.click(menuButton)
        expect(isInaccessible(menuCloseButton)).toBeFalsy()
    })
})