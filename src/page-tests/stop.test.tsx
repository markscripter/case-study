import React from 'react'
import { getByText } from '@testing-library/dom'
import { render } from '../../test-utils'
import StopsIdPage from '../pages/stops/[id]'

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/1212",
            pathname: "",
            query: {
                id: '1212'
            },
            asPath: "",
        }
    },
}))

jest.mock('../utils/hooks', () => ({
    useStop: () => {
        return [
            { loading: true, data: [], error: null },
            jest.fn()
        ]
    }
}))

describe('StopsIdPage', () => {
    it('the StopsIdPage to render', () => {
        const { container } = render(<StopsIdPage />)
        const routesPage = container.querySelector('.stops-id-page')
        expect(routesPage).toBeInTheDocument()
    })

    it(`the StopsPage renders the Search Component`, () => {
        const { container } = render(<StopsIdPage />)
        const search = container.querySelector('.search')
        expect(search).toBeInTheDocument()
    })
    describe('loading state', () => {
        beforeEach(() => {
            jest.clearAllMocks()
            jest.mock('../utils/hooks', () => ({
                useStop: () => {
                    return [
                        { loading: true, data: [], error: null },
                        jest.fn()
                    ]
                }
            }))
        })
        it(`the StopsPage renders skeleton if loading`, () => {
            const { container } = render(<StopsIdPage />)
            const skeleton = container.querySelector('.skeleton')
            expect(skeleton).toBeInTheDocument()
        })
    })
})

