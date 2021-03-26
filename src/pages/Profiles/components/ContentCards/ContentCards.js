import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Typography } from '@material-ui/core'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import classes from './ContentCards.module.scss'

function ContentCards(props) {
    const { title, detail, icon } = props
    console.log(detail)
    console.log(typeof detail)

    const configElement = (icon, detail) => {
        if (icon === 'none') {
            return (
                <div className={classes.detailZone}>
                    <Typography className={classes.details}>
                        {detail}
                    </Typography>
                    <Icon style={{ display: icon }}>{detail}</Icon>
                </div>
            )
        } else {
            return (
                <div className={classes.detailZone}>
                    <Typography className={classes.details}>
                        {detail ? 'Male' : 'Female'}
                    </Typography>
                    <Icon style={{ display: icon }}>
                        {detail === true ? (
                            <AiOutlineMan color="#005BB5" />
                        ) : (
                            <AiOutlineWoman color="#E26A89" />
                        )}
                    </Icon>
                </div>
            )
        }
    }

    return (
        <div className={classes.cardText}>
            <Grid container spacing={2}>
                <Grid item sm={3} md={3} lg={3}>
                    <Typography className={classes.titles}>{title}</Typography>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                    {/* <div className={classes.detailZone}>
                        <Typography className={classes.details}>
                            {detail}
                        </Typography>
                        <Icon style={{ display: icon }}>
                            {detail}
                        </Icon>
                    </div> */}

                    {configElement(icon, detail)}
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
    // detail: PropTypes.string.isRequired,
    icon: PropTypes.string,
}
