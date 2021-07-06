import {
    createMuiTheme
} from '@material-ui/core/styles';

export const DRAWER_WIDTH = '224px'

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
                body: {
                    color: '#020314'
                }
            },
        },
    },
    palette: {
        primary: {
            light: "#8632E6",
            main: '#5932E6',
            dark: '#020314',
        },
        secondary: {
            light: "#BEF202",
            main: '#88C425',
        },
        error: {
            main: "#e33371",
            dark: "#dc004e"
        },
        background: {
            default: '#fff'
        },
    },
    spacing: 4
});

export default theme;