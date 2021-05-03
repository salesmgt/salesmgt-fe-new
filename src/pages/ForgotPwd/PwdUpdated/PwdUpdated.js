import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import { RiRotateLockFill } from 'react-icons/ri'
import { Consts } from './ForgotPwdConfig'
import classes from './PwdUpdated.module.scss'

function PwdUpdated() {
    const { headers } = Consts

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Avatar className={classes.avatar}>
                    <RiRotateLockFill />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {headers.reset}
                </Typography>
                <Typography variant="body2" className={classes.msg}>
                    {headers.msg3}
                </Typography>
            </div>
        </div>
    )
}

export default PwdUpdated
