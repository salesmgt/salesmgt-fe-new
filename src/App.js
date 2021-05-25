import React, { createRef } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Logins, Errors, getError, ForgotPwd } from './pages'
import { AppLayouts } from './layouts'
import { SnackbarProvider } from 'notistack'
import AuthProvider from './hooks/AuthContext'
import AppProvider from './hooks/AppContext'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import { Button, Slide, makeStyles, IconButton } from '@material-ui/core'
import {
    MdCheckCircle,
    MdInfoOutline,
    MdWarning,
    MdErrorOutline,
    MdClose,
} from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
    snackbarIcon: {
        marginRight: '0.5rem',
        height: '1.2rem',
        width: '1.2rem',
    },
    optBtn: {
        color: '#fff',
    },
}))

function App() {
    const classes = useStyles()

    const notistackRef = createRef()
    const onClickDismiss = (key) => () => {
        notistackRef.current.closeSnackbar(key)
    }

    return (
        <AuthProvider>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                // preventDuplicate
                iconVariant={{
                    success: <MdCheckCircle className={classes.snackbarIcon} />,
                    error: <MdErrorOutline className={classes.snackbarIcon} />,
                    warning: <MdWarning className={classes.snackbarIcon} />,
                    info: <MdInfoOutline className={classes.snackbarIcon} />,
                }}
                TransitionComponent={Slide}
                autoHideDuration={3000}
                ref={notistackRef}
                action={(key) => (
                    <IconButton
                        component="span"
                        className={classes.optBtn}
                        onClick={onClickDismiss(key)}
                    >
                        <MdClose />
                    </IconButton>
                )}
            >
                <Switch>
                    <PublicRoute
                        exact
                        path="/"
                        restricted={true}
                        component={Logins}
                    />
                    <PublicRoute
                        path="/password-reset"
                        restricted={false}
                        component={ForgotPwd}
                    />
                    <PrivateRoute
                        path="/apps"
                        component={() => (
                            <AppProvider>
                                <AppLayouts />
                            </AppProvider>
                        )}
                    />
                    <Route
                        path="/errors"
                        component={() => (
                            <Errors defaultError={getError(404)} />
                        )}
                    />
                    <Redirect from="*" to="/errors" />
                </Switch>
            </SnackbarProvider>
        </AuthProvider>
    )
}

export default App
