import React from 'react'
import { MajorLogo } from '../../assets/images'
import {
    Button,
    TextField,
    Paper,
    Typography,
    Link,
    Avatar,
} from '@material-ui/core'
import { MdLockOutline } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { Consts } from './LoginsConfig'
import * as LoginsServices from './LoginsServices'
import * as Cookies from '../../utils/Cookies'
import * as Milk from '../../utils/Milk'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
import { milkNames, cookieNames } from '../../constants/Generals'
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
    const { setUser } = useAuth()

    const history = useHistory()

    const { register, handleSubmit, errors, setError, clearErrors } = useForm({
        resolver: yupResolver(clientSchema),
    })

    const onSubmit = (data) => {
        const userObj = (username, roles) => {
            return {
                username: username,
                roles: roles,
            }
        }

        LoginsServices.checkUser(data.username, data.password)
            .then((data) => {
                Cookies.setCookie(cookieNames.accessToken, data.token, 7)
                Milk.setMilkExpiry(
                    milkNames.token,
                    userObj(data.username, data.roles),
                    2
                )
                setUser(Milk.getMilkExpiry(milkNames.token))
                // getFiltersData()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error)
                    if (
                        error.response.status === 403 ||
                        error.response.status === 500
                    ) {
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

    return (
        <div className={classes.bg}>
            <div className={classes.wrapper}>
                <div className={classes.leftSection}>
                    <Paper className={classes.logo} variant="outlined">
                        <img
                            src={MajorLogo}
                            alt="major logo"
                            className={classes.majorImg}
                        />
                    </Paper>
                </div>
                <div className={classes.rightSection}>
                    <div className={classes.header}>
                        <Avatar className={classes.avatar}>
                            <MdLockOutline />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {Consts.header}
                        </Typography>
                    </div>
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
                            onClick={() =>
                                clearErrors(['username', 'credential'])
                            }
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
                            onClick={() =>
                                clearErrors(['password', 'credential'])
                            }
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
                    <Link className={classes.forgetPwd} to="" variant="body2">
                        {Consts.forgetPwd}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Logins
