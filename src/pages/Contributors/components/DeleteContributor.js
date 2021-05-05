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

const DeleteContributor = ({ handleClose, open, update, contributor }) => {
  const { enqueueSnackbar: message } = useSnackbar()

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteContributor = async () => {
    setIsDeleting(true)

    const responseDelete = await api.contributors.remove(contributor.id)
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
      <DialogTitle id='alert-dialog-title'>Deletar Colaborador</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Desejar excluir o coloborador {contributor.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={deleteContributor}
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
export default DeleteContributor
