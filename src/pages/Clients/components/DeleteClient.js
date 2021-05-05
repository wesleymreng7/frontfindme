import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import api from '../../../api'

const DeleteClient = ({ handleClose, open, update, client }) => {
  const { enqueueSnackbar: message } = useSnackbar()

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteClient = async () => {
    setIsDeleting(true)

    const responseDelete = await api.clients.remove(client.id)
    if (responseDelete && responseDelete.status === 200) {
      message('Cliente deletado com sucesso!', {
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
    setIsDeleting(false)
    update()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>Deletar Cliente</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Desejar excluir o cliente {client.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={deleteClient}
          color='primary'
          autoFocus
          on
          variant='contained'>
          {isDeleting ? (
            <CircularProgress size={26} color='primary' />
          ) : (
            'Deletar'
          )}
        </Button>
        <Button onClick={handleClose} color='secondary' variant='contained'>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default DeleteClient
