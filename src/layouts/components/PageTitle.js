import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

function PageTitle(props) {
    const { className, children } = props
    return (
        <Typography
            component="h1"
            variant="h6"
            noWrap
            className={className}
        >
            {children}
        </Typography>
    )
}

export default PageTitle;

PageTitle.propTypes = {
    children: PropTypes.node,
}