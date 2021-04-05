import React from 'react'
import { MajorBanner } from '../../assets/images'
import {
    Container,
    Button,
    TextField,
    Paper,
    Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Consts } from './LoginsConfig'
import * as LoginsServices from './LoginsServices'
import * as Cookies from '../../utils/Cookies'
import * as Milks from '../../utils/Milks'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
import classes from './Logins.module.scss'

const clientSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
})

const serverSchema = [
    {
        type: 'server',
        name: 'username',
        message: null,
    },
    {
        type: 'server',
        name: 'password',
        message: null,
    },
    {
        type: 'server',
        name: 'credential',
        message: 'Invalid username or password',
    },
]

function Logins() {
    const {
        register,
        handleSubmit,
        getValues,
        errors,
        setError,
        clearErrors,
    } = useForm({
        resolver: yupResolver(clientSchema),
    })

    const history = useHistory()

    const { setUser } = useAuth()

    const handleLogin = (username, password) => {
        const userObj = (username, roles) => {
            return {
                username: username,
                roles: roles,
            }
        }

        LoginsServices.checkUser(username, password)
            .then((res) => {
                Cookies.setCookie('accessToken', res.token, 7)
                // localStorage.setItem(
                //     'notMe',
                //     JSON.stringify(userObj(data.username, data.roles))
                // )
                Milks.setWithExpiry(
                    'notMe',
                    userObj(res.username, res.roles),
                    2
                )

                setUser(Milks.getWithExpiry('notMe'))
                // user.roles[0] !== 'ADMIN'
                //     ? history.push('/apps/dashboards')
                //     : history.push('/apps/accounts')
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (error.response.status === 500) {
                        serverSchema.forEach(({ name, type, message }) =>
                            setError(name, { type, message })
                        )
                    } else {
                        history.push({
                            pathname: '/errors',
                            state: { error: error.response.status },
                        })
                    }
                }
            })
    }

    const onSubmit = () => {
        handleLogin(getValues('username'), getValues('password'))
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.wrapper}>
                <Paper className={classes.logo} variant="outlined">
                    <img src={MajorBanner} alt="major logo" />
                </Paper>

                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    {errors.credential && (
                        <Typography color="error">
                            {errors.credential.message}
                        </Typography>
                    )}
                    <TextField
                        id="username"
                        name="username"
                        label={Consts.username}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        autoComplete="username"
                        inputRef={register}
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        onClick={() => clearErrors(['username', 'credential'])}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label={Consts.password}
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="current-password"
                        inputRef={register}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        onClick={() => clearErrors(['password', 'credential'])}
                    />

                    <Button
                        className={classes.submit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        {Consts.login}
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default Logins
