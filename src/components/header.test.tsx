import React from 'react'
import { getByText } from '@testing-library/dom'
import { render, fireEvent } from '../../test-utils'
import Header from './header'
import { PAGE_DATA } from '../utils/constants'

describe('Header', () => {
    let isOpen = null
    let props = {
        title: PAGE_DATA.homeTitle,
        onMenuChange: jest.fn((bool: boolean) => {isOpen = bool}),
        isOpen: isOpen
    }

    it('the header renders', () => {
        const { container } = render(<Header {...props} />)
        const footer = container.querySelector('.header')
        expect(footer).toBeDefined()
    })

    it(`the header to match text ${PAGE_DATA.homeTitle}`, () => {
        const { container } = render(<Header {...props} />)
        expect(getByText(container, PAGE_DATA.homeTitle)).toBeInTheDocument()
    })

    it(`the header renders with menu closed`, () => {
        const { container } = render(<Header {...props} isOpen={false} />)
        const menuButton = container.querySelector('.menu-button') as Element
        expect(menuButton.getAttribute('aria-expanded')).toEqual("false")
    })

    it(`the header renders with menu open`, () => {
        const { container } = render(<Header {...props} isOpen={true} />)
        const menuButton = container.querySelector('.menu-button') as Element
        expect(menuButton.getAttribute('aria-expanded')).toEqual("true")
    })


    it(`on menu button click, onMenuChange is called`, () => {
        const { container } = render(<Header {...props} isOpen={false} />)
        const menuButton = container.querySelector('.menu-button') as Element
        expect(menuButton.getAttribute('aria-expanded')).toEqual("false")
        fireEvent.click(menuButton)
        expect(props.onMenuChange).toHaveBeenCalled()
    })
})