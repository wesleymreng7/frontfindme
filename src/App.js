import React, { useRef } from 'react'
import { ThemeProvider, IconButton } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import { SnackbarProvider } from 'notistack'
import Router from './common/Router'

function App() {
  const notistackRef = useRef()
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key)
  }
  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        action={key => (
          <IconButton onClick={onClickDismiss(key)}>
            <CloseOutlined style={{ color: '#FFF' }} />
          </IconButton>
        )}>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
