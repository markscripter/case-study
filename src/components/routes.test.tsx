import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import Routes from './routes'

describe('Routes', () => {
    it('The Routes dropdown is rendered', async () => {
        render(<Routes />)
        const routeInput = await screen.findByLabelText('Routes')
        expect(routeInput).toBeInTheDocument()
    })
    // it('The direction dropdown is rendered when a route is selected', async () => {
    //     render(<Routes />)
    //     const routeInput = await screen.findByTestId('routes')
    //     expect(routeInput).toBeInTheDocument()
    //     fireEvent.change(routeInput, { target: { value : "18" }})
    //     const directionInput = await screen.findByTestId('directions')
    //     expect(directionInput).toBeInTheDocument()
    // })
    // it('populates with a query string', async () => {
        // jest.mock("next/router", () => ({
        //     useRouter() {
        //         return {
        //             query: {
        //                 route: '18',
        //                 direction: 0,
        //                 placeCode: '46NI'
        //             }
        //         }
        //     },
        // }))
    //     render(<Routes />)
    //     const routeInput = await screen.findByLabelText('Routes')
    //     expect(routeInput).toBeInTheDocument()
    // })
})