import { useState, SyntheticEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { TextField } from '@material-ui/core'
import IconButton  from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect } from 'react'


const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        flex: '1 1 240px',
        color: theme.palette.primary.dark
    },
    searchButton: {
        color: theme.palette.primary.dark
    },
}))

type SearchProps = {
    value: string | string[]
}

export default function Search({value}: SearchProps) {
    const classes = useStyles()
    const router = useRouter()
    const [inputValue, updateInputValue] = useState(value)
    
    useEffect(() => {
        updateInputValue(value)
    }, [value])

    const handleStopChange = (event: SyntheticEvent) => {
        event.preventDefault()
        if (inputValue) {
            router.push(`/stops/${inputValue}`)
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateInputValue(event?.target?.value)
    }

    return (
        <div className='search'>
            <form onSubmit={handleStopChange} className={classes.form}>
                <TextField id="stop" className={classes.input} variant="outlined" label="Stop #" value={inputValue} onChange={handleInputChange} />
                <IconButton type="submit" className={classes.searchButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </form>
        </div>

    )
}