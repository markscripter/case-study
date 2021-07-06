import { useState, ChangeEvent } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './tab-panel'

type PanelObject = {
    id: number,
    label: string,
    panel: JSX.Element,
}

type TabControllerProps = {
    panelObjects: PanelObject[]
}

export default function TabController({ panelObjects }: TabControllerProps) {
    const [value, setValue] = useState(0)

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div className="tab-controller">
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                {
                    panelObjects.map(panel => (
                        <Tab key={panel.id} label={panel.label} />
                    ))
                }
            </Tabs>
            {
                panelObjects.map((panel, index) => (
                    <TabPanel key={panel.id} id={panel.id} hidden={value !== index}>
                        {panel.panel}
                    </TabPanel>
                ))
            }
        </div>
    )
}
