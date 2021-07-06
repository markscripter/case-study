import { render, getByText, isInaccessible, fireEvent, waitFor } from '../../test-utils'
import TabController from './tab-controller'

describe('TabController', () => {
    const props = {
        panelObjects: [
            {
                id: 0,
                label: 'First Tab',
                panel: <div>Panel 0</div>
            },
            {
                id: 1,
                label: 'Second Tab',
                panel: <div>Panel 1</div>
            }
        ]
    }

    it('the TabController renders', () => {
        const { container } = render(<TabController {...props} />)
        const routesPanel = container.querySelector('.tab-controller')
        expect(routesPanel).toBeDefined()
    })

    it('the TabController renders two tabs', () => {
        const { container } = render(<TabController {...props} />)
        const tabOne = getByText(container, props.panelObjects[0].label)
        const tabTwo = getByText(container, props.panelObjects[0].label)
        expect(tabOne).toBeDefined()
        expect(tabTwo).toBeDefined()
    })

    it('the TabController renders the first of two panels', () => {
        const { container } = render(<TabController {...props} />)
        const panelOne = getByText(container, "Panel 0")
        const panelTwo = getByText(container, "Panel 1")
        expect(panelOne).toBeDefined()
        expect(isInaccessible(panelOne)).toBeFalsy()
        expect(panelTwo).toBeDefined()
        expect(isInaccessible(panelTwo)).toBeTruthy()
    })


    // it('the TabController switches panels when tab is clicked', async () => {
    //     const { container } = render(<TabController {...props} />)
    //     const tabTwo = getByText(container, props.panelObjects[0].label)
    //     const panelOne = getByText(container, "Panel 0")
    //     const panelTwo = getByText(container, "Panel 1")
    //     expect(isInaccessible(panelOne)).toBeFalsy()
    //     expect(isInaccessible(panelTwo)).toBeTruthy()
    //     fireEvent.click(tabTwo)
    // })
})