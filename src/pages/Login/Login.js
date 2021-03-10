import React from 'react'
// import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
import { MajorBanner } from '../../img'
import classes from './Login.module.scss'
import * as Const from './LoginConfig'
import {
    Container,
    Button,
    TextField,
    // FormControlLabel,
    // Checkbox,
    Paper,
} from '@material-ui/core'

// const useStyles = makeStyles((theme) => ({
//     wrapper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     logo: {
//         backgroundColor: '#fafafa',
//         borderStyle: 'none',
//         padding: theme.spacing(1),
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }))

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

function SignIn({ setToken }) {
    // const classes = useStyles()

    // const [usr, setUsr] = useState('')

    // For validate usr filed
    /* const [usrError, setUsrError] = useState(false)
    const [usrHelper, setUsrHelper] = useState('')

    const handleUsrChange = (e) => {
        console.log(e.target.value)
        setUsr(e.target.value)
        if (e.target.value.match('gia')) {
            setUsrError(true)
            setUsrHelper('Incorrect entry.')
        } else {
            setUsrError(false)
            setUsrHelper('')
        }
    } */

    // const [pwd, setPwd] = useState('')

    // For validate pwd filed
    /* const [pwdError, setPwdError] = useState(false)
    const [pwdHelper, setPwdHelper] = useState('')

    const handlePwdChange = (e) => {
        console.log(e.target.value)
        setPwd(e.target.value)
        if (e.target.value.match('gia')) {
            setPwdError(true)
            setPwdHelper('Incorrect entry.')
        } else {
            setPwdError(false)
            setPwdHelper('')
        }
    } */

    //For sign in API
    /* const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await onSignIn({
            username,
            password,
        })
        setToken(token)
    } */

    const handleSubmit = (e) => {
        e.preventDefault()
        // setToken({ usr, pwd })
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
                >
                    <TextField
                        id="username"
                        name="username"
                        label={Const.USERNAME_LB}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        autoComplete="username"
                        // value={usr}
                        // onChange={handleUsrChange}
                        // error={usrError}
                        // helperText={usrHelper}
                        // onChange={(e) => setUsr(e.target.value)}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label={Const.PWD_LB}
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="current-password"
                        // value={pwd}
                        // onChange={handlePwdChange}
                        // error={pwdError}
                        // helperText={pwdHelper}
                        // onChange={(e) => setPwd(e.target.value)}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={Const.CKB_LB}
                    /> */}
                    <Button
                        className={classes.submit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        {Const.SIGN_IN_LB}
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default SignIn

// SignIn.propTypes = {
//     setToken: PropTypes.func.isRequired,
// }
