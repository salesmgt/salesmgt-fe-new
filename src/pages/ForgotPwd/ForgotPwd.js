import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import VerifyRoute from '../../routes/VerifyRoute'
import ResetLink from './ResetLink/ResetLink'
import VerifyCode from './VerifyCode/VerifyCode'
import PwdReset from './PwdReset/PwdReset'
import classes from './ForgotPwd.module.scss'

function ForgotPwdLayout() {
    const { url } = useRouteMatch()

    return (
        <div className={classes.bg}>
            <div className={classes.wrapper}>
                <Switch>
                    <Route exact path={`${url}/`} component={ResetLink} />
                    <Route path={`${url}/verify`} component={VerifyCode} />
                    <VerifyRoute path={`${url}/change`} component={PwdReset} />
                    <Redirect from="*" to="/errors" />
                </Switch>
            </div>
        </div>
    )
}

export default ForgotPwdLayout
