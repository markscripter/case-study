import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import Search from './search'

jest.mock("next/router", () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    },
}))

describe('Search', () => {
    it('the Search component renders', () => {
        const { container } = render(<Search value=''/>)
        const footer = container.querySelector('.search')
        expect(footer).toBeDefined()
    })
    it(`finds text field`, async () => {
        render(<Search value=''/>)
        const inputNode = await screen.getByLabelText('Stop #')
        expect(inputNode).toBeInTheDocument()
    })

    it(`handles form submit`, async () => {
        render(<Search value='12' />)
        const inputNode = screen.getByLabelText('Stop #') as HTMLInputElement
        expect(inputNode).toBeInTheDocument()
        expect(inputNode.value).toEqual('12')
        fireEvent.change(inputNode, { target: { value: '123' }})
        const button = await screen.getByLabelText('search')
        fireEvent.click(button)
        const input = screen.getByLabelText('Stop #') as HTMLInputElement
        expect(input).toBeInTheDocument()
        expect(input.value).toEqual('123')
        
    })
})