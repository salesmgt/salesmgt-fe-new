import React, { useState } from 'react'
import { MajorBanner } from '../../img'
import { Container, Button, TextField, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import * as LoginsConfig from './LoginsConfig'
import * as LoginsServices from './LoginsServices'
import * as Cookies from '../../utils/Cookies'
import classes from './Logins.module.scss'

// For sign in API
/* async function onSignIn(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json())
} */

function Logins({ errors }) {
    const history = useHistory()

    const [usr, setUsr] = useState('')
    const [pwd, setPwd] = useState('')
    // const [authTokens, setAuthTokens] = useState('')

    // For validate usr filed
    // const [usrError, setUsrError] = useState(false)
    // const [usrHelper, setUsrHelper] = useState('')

    const handleUsrChange = (e) => {
        setUsr(e.target.value)
        // if (e.target.value.match('gia')) {
        //     setUsrError(true)
        //     setUsrHelper('Incorrect entry.')
        // } else {
        //     setUsrError(false)
        //     setUsrHelper('')
        // }
    }

    // For validate pwd filed
    // const [pwdError, setPwdError] = useState(false)
    // const [pwdHelper, setPwdHelper] = useState('')

    const handlePwdChange = (e) => {
        setPwd(e.target.value)
        // if (e.target.value.match('gia')) {
        //     setPwdError(true)
        //     setPwdHelper('Incorrect entry.')
        // } else {
        //     setPwdError(false)
        //     setPwdHelper('')
        // }
    }

    //For sign in API
    /* const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await onSignIn({
            username,
            password,
        })
        setToken(token)
    } */

    // React.useEffect(() => {
    //     console.log('has changed')
    // }, [usr])

    const checkLogins = () => {
        LoginsServices.getUser(usr, pwd)
            .then((data) => {
                // console.log(response.data.token)
                // Cookies.saveTokens(data.token)
                Cookies.setCookie('accessToken', data.token, 30)

                // console.log('check cookie', Cookies.getCookie('accessToken'))
                // setAuthTokens(response.data.token)

                return data.role
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    console.log(error.response.status)
                    // errors = error.response.status
                    history.push('/errors')
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        checkLogins()
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.wrapper}>
                <Paper className={classes.logo} variant="outlined">
                    <img src={MajorBanner} alt="major logo" />
                </Paper>

                <form
                    className={classes.form}
                    method="get"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        id="username"
                        name="username"
                        label={LoginsConfig.SIGN_IN_LB}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        autoComplete="username"
                        value={usr}
                        onChange={handleUsrChange}
                        // error={usrError}
                        // helperText={usrHelper}
                        // onChange={(e) => setUsr(e.target.value)}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label={LoginsConfig.PWD_LB}
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="current-password"
                        value={pwd}
                        onChange={handlePwdChange}
                        // error={pwdError}
                        // helperText={pwdHelper}
                        // onChange={(e) => setPwd(e.target.value)}
                    />
                    <Button
                        className={classes.submit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        {LoginsConfig.SIGN_IN_LB}
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default Logins

// Logins.propTypes = {
//     setToken: PropTypes.func.isRequired,
// }
