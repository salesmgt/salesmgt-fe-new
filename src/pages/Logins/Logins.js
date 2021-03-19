import React from 'react'
import { MajorBanner } from '../../img'
import { Container, Button, TextField, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import * as LoginsConfig from './LoginsConfig'
import * as LoginsServices from './LoginsServices'
import * as Cookies from '../../utils/Cookies'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
import classes from './Logins.module.scss'

const validationSchema = yup.object().shape({
    username: yup.string().required('Incorrect entry'),
    password: yup.string().required('Incorrect entry'),
})

function Logins() {
    const { register, handleSubmit, getValues, errors } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const history = useHistory()

    const { setUser } = useAuth()

    const onSubmit = (data) => {
        login()
        // const me = JSON.parse(localStorage.getItem('notMe'))
        // console.log('me', me.username)
        // console.log('me', me.roles)
    }

    // React.useEffect(() => {
    //     console.log('rerender')
    // }, [])

    // const getUserObj = (username, roles) => {
    //     return {
    //         username: username,
    //         roles: roles,
    //     }
    // }

    const getUser = (username, password) => {
        const userObj = (username, roles) => {
            return {
                username: username,
                roles: roles,
            }
        }

        LoginsServices.checkUser(username, password)
            .then((data) => {
                Cookies.setCookie('accessToken', data.token, 7)
                localStorage.setItem(
                    'notMe',
                    JSON.stringify(userObj(data.username, data.roles))
                )

                // setUser({ username: data.username, roles: data.roles })
                setUser(userObj(data.username, data.roles))
                history.push('/apps/dashboards')
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    history.push({
                        pathname: '/errors',
                        state: { error: error.response.status },
                    })
                }
            })
    }

    const login = () => {
        getUser(getValues('username'), getValues('password'))
        // getAccessToken(getValues('username'), getValues('password'))
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.wrapper}>
                <Paper className={classes.logo} variant="outlined">
                    <img src={MajorBanner} alt="major logo" />
                </Paper>

                <form
                    className={classes.form}
                    // method="post"
                    onSubmit={handleSubmit(onSubmit)}
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
                        inputRef={register}
                        error={errors.username ? true : false}
                        helperText={errors.username?.message}
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
                        inputRef={register}
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
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
