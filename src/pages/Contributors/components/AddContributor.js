import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Paper,
    TextField,
    Grid,
    AppBar,
    IconButton,
    Slide,
    Dialog,
    Button,
    Typography,
    Toolbar,
    CircularProgress,
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import utils from '../../../utils'
import api from '../../../api'

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    container: {
        padding: '20px',
    },
    buttons: {
        padding: '10px 0px',
        marginTop: '15px',
        '& button:first-of-type': {
            marginRight: '5px',
        },
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

export default function AddContributor({ open, handleClose, update }) {
    const classes = useStyles()

    const methods = useForm({
        validationSchema: utils.validations.contributors.CreateSchema,
    })
    const { enqueueSnackbar: message } = useSnackbar()
    const { handleSubmit, control, register, errors } = methods

    const [isSaving, setIsSaving] = useState(false)


    const sendData = async data => {
        setIsSaving(true)
        const responseSubmit = await api.contributors.create(data)
        if (responseSubmit && responseSubmit.status === 200) {
            message('Colaborador cadastrado com sucesso!', {
                variant: 'success',
                anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                autoHideDuration: 3000,
            })
            handleClose()
        } else {
            message('Verifique seus dados e tente novamente', {
                variant: 'error',
                anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                autoHideDuration: 3000,
            })
        }
        setIsSaving(false)
        update()
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <div></div>
                        <Typography variant='h6' className={classes.title}>
                            Adicionar Colaborador
                        </Typography>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <form onSubmit={handleSubmit(sendData)}>
                    <Grid container spacing={1} className={classes.container}>
                        <Grid item xs={12}>
                            <Controller
                                name='name'
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        error={errors && errors.name ? true : false}
                                        helperText={errors && errors.name && errors.name.message}
                                        variant='outlined'
                                        placeholder='Nome'
                                        label='Nome'
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                                innerRef={register}
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='email'
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        error={errors && errors.email ? true : false}
                                        helperText={errors && errors.email && errors.name.message}
                                        variant='outlined'
                                        placeholder='E-mail'
                                        label='E-mail'
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                                innerRef={register}
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name='password'
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        type='password'
                                        error={errors && errors.password ? true : false}
                                        helperText={errors && errors.password && errors.name.message}
                                        variant='outlined'
                                        placeholder='Senha'
                                        label='Senha'
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                                innerRef={register}
                                control={control}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.buttons}>
                            <Button variant='contained' color='primary' type='submit'>
                                {isSaving ? (
                                    <CircularProgress size={26} color='inherit' />
                                ) : (
                                    'Salvar'
                                )}
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={handleClose}>
                                Cancelar
              </Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </div>
    )
}
