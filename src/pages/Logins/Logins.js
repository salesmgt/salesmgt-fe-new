import React, { useState, useEffect } from 'react'
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
import * as Milk from '../../utils/Milk'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
// import { useApp } from '../../hooks/AppContext'
import { milkNames, cookieNames } from '../../constants/Generals'
// import * as FiltersServices from '../../services/FiltersServices'
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
    // const {
    //     setDists,
    //     setSchEduLvls,
    //     setSchTypes,
    //     setSchScales,
    //     setSchStatus,
    //     setRoles,
    //     setSchYears,
    //     setSalesPurps,
    // } = useApp()

    const history = useHistory()

    const { register, handleSubmit, errors, setError, clearErrors } = useForm({
        resolver: yupResolver(clientSchema),
    })

    // const getFiltersData = () => {
    //     FiltersServices.getDistricts()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.dists, data)
    //             setDists(Milk.getMilk(milkNames.dists))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getEducationalLevels()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.eduLvls, data)
    //             setSchEduLvls(Milk.getMilk(milkNames.eduLvls))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getSchoolTypes()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.types, data)
    //             setSchTypes(Milk.getMilk(milkNames.types))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getSchoolScales()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.scales, data)
    //             setSchScales(Milk.getMilk(milkNames.scales))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getSchoolStatus()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.status, data)
    //             setSchStatus(Milk.getMilk(milkNames.status))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getRoles()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.roles, data)
    //             setRoles(Milk.getMilk(milkNames.roles))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getPurposes()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.salesPurps, data)
    //             setSalesPurps(Milk.getMilk(milkNames.salesPurps))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })

    //     FiltersServices.getSchoolYears()
    //         .then((data) => {
    //             Milk.setMilk(milkNames.schYears, data)
    //             setSchYears(Milk.getMilk(milkNames.schYears))
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error)
    //             }
    //         })
    // }

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
