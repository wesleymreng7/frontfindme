import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
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

export default function EditContributor({ open, handleClose, update, contributor }) {
  const classes = useStyles()

  const methods = useForm({
    validationSchema: utils.validations.contributors.UpdateSchema,
  })
  const { enqueueSnackbar: message } = useSnackbar()
  const { handleSubmit, control, register, errors } = methods

  const [isSaving, setIsSaving] = useState(false)


  const sendData = async data => {
    setIsSaving(true)
    const responseSubmit = await api.contributors.update(data, contributor.id)
    if (responseSubmit && responseSubmit.status === 200) {
      message('Colaborador alterado com sucesso!', {
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
              Editar Cliente
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
                        defaultValue={contributor.name ? contributor.name : ''}
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
