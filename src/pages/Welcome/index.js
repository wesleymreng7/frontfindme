import { Grid, Button, Typography } from '@material-ui/core'
import useStyles from './style'
import { useHistory } from 'react-router-dom'


const Welcome = () => {

    const classes = useStyles()
    const history = useHistory()


    const goToDashBoard = () => {
        history.replace('/dashboard')
    }
    return (
        <Grid container justify='center' alignItems='center' direction='column' className={classes.container}>
            <Typography variant='h1' align='center'>Seja bem vindo a findme!</Typography>
            <Typography variant='h2' align='enter'>Clique abaixo para continuar.</Typography>
            <Button
            className={classes.buttonGo}
                variant='contained'
                color='primary'
                onClick={goToDashBoard}>
                Ir para Dashboard
        </Button>
        </Grid>
    )
}

export default Welcome