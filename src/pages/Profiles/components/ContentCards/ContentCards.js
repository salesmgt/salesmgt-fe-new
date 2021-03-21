import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Typography } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import classes from './ContentCards.module.scss'

function ContentCards(props) {
    const { title, detail, icon } = props

    const checkGender = (gender) => {
        if (gender === 'Male') {
            return <AiOutlineMan />
        } else if (gender === 'Female') {
            return <AiOutlineWoman />
        }
    }

    return (
        <div className={classes.cardText}>
            <Grid container spacing={2}>
                <Grid item sm={3} md={3} lg={3}>
                    <Typography className={classes.titles}>{title}</Typography>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                    <div className={classes.detailZone}>
                        <Typography className={classes.details}>
                            {detail}
                        </Typography>
                        <Icon style={{ display: icon }}>
                            {checkGender(detail)}
                        </Icon>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default React.memo(ContentCards)

ContentCards.defaultProps = {
    icon: 'none',
}

ContentCards.propTypes = {
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    icon: PropTypes.string,
}
