import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Backdrop } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#FFF',
  },
}))

const FirstRenderLoading = () => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color='primary' />
    </Backdrop>
  )
}

export default FirstRenderLoading
