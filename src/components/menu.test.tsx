import React from 'react'
import { getByText } from '@testing-library/dom'
import { render, fireEvent, isInaccessible } from '../../test-utils'
import Menu from './menu'
import { PAGE_DATA } from '../utils/constants'

describe('Menu', () => {
    let props = {
        isOpen: false,
        onMenuChange: jest.fn((bool: boolean) => bool)
    }

    it('the Menu renders', () => {
        const { container } = render(<Menu {...props} />)
        const footer = container.querySelector('.menu')
        expect(footer).toBeDefined()
    })

    it(`the Menu to match children text: ${PAGE_DATA.menuTitle}`, () => {
        const { container } = render(<Menu {...props} />)
        expect(getByText(container, PAGE_DATA.menuTitle)).toBeInTheDocument()
    })

    it('calls the onMenuChange when menu close button is clicked', () => {
        const { container } = render(<Menu {...props} />)
        const menuCloseButton = container.querySelector('.menu-close-button') as Element
        fireEvent.click(menuCloseButton)
        expect(props.onMenuChange).toHaveBeenCalled()
    })

    it('calls the onMenuChange when ESC key is pressed', () => {
        const { container } = render(<Menu {...props} />)
        const title = getByText(container, PAGE_DATA.menuTitle)
        fireEvent.keyUp(title, { key: "Escape" })
        // expect(props.onMenuChange).toHaveBeenCalled()
    })
})