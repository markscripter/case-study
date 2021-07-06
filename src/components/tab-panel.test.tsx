import React from 'react'
import { getByText, isInaccessible, getRoles } from '@testing-library/dom'
import { render } from '../../test-utils'
import TabPanel from './tab-panel'

describe('TabPanel', () => {
    const text = 'test'
    const props = {
        id: 100,
        children: <div>{text}</div>,
        hidden: false
    }

    it('the TabPanel to render', () => {
        const { container } = render(<TabPanel {...props} />)
        const tabPanel = container.querySelector('.tab-panel') as Element
        expect(tabPanel).toBeDefined()
        expect(tabPanel.getAttribute('role')).toEqual('tabpanel')
        expect(tabPanel.getAttribute('aria-labelledby')).toEqual(props.id.toString())
        expect(tabPanel.getAttribute('hidden')).toBeFalsy()
    })

    it(`the title matches text ${text}`, () => {
        const { container } = render(<TabPanel {...props} />)
        expect(getByText(container, text)).toBeInTheDocument()
    })

    it('the TabPanel to render hidden', () => {
        const { container } = render(<div><TabPanel {...props} hidden={true} /></div>)
        const tabPanel = container.querySelector('.tab-panel') as Element
        expect(tabPanel).toBeDefined()
        expect(tabPanel.getAttribute('hidden')).toEqual("") // boolean attribute
    })
})