// import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core'
import { DetailLayouts } from '../../layouts'
import React, { useState } from 'react'
import clsx from 'clsx'
import {
    Tab,
    Tabs,
    Typography,
    makeStyles,
    Grid,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    AccordionActions,
    Button,
    Divider,
} from '@material-ui/core'
import { MdEdit } from 'react-icons/md'
import { CardHeaders } from '../../../Profiles/components'
import classes from './SchoolsDetail.module.scss'

function SchoolsDetail() {
    const [tabValue, setTabValue] = React.useState(0)

    const handleChangeTab = (event, value) => {
        setTabValue(value)
    }

    // Mock data
    const schoolInfo = {
        id: 1,
        name: "Nguyễn Văn Trỗi",
        district: "Quận 1",
        address: "string",
        type: "Công lập",
        educationalLevel: "THCS",
        scale: "Vừa",
        email: "",
        phone: "0283.1234567",
        description: "đang hợp tác vs đối thủ",
        reprName: "Nguyễn Hồ Huy",
        reprGender: true,
        reprPhone: "0987654321",
        reprEmail: "huy-nvt@gmail.com",
        status: "Lead",
        active: true,
    }

    const renderInfoCard = (school) => {
        return (
            <Card>
                <CardHeaders title="Basic info"
                    titleTypographyProps={{ style: { fontSize: '1.15rem', fontWeight: 700 } }}
                    className={classes.header}
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Username:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>

                            <Typography>
                                {school.username}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Phone:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>

                            <Typography>
                                {school.phone}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>

                            <Typography>
                                {school.email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Address:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>

                            <Typography>
                                {school.address}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                Gender:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>
                            <Typography>
                                {school.gender ? 'Male' : 'Female'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={3} md={3} lg={3}>
                            <Typography className={classes.titles}>
                                BirthDate:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} md={9} lg={9}>

                            <Typography>

                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    return (
        <DetailLayouts
            header={`${schoolInfo.educationalLevel} ${schoolInfo.name}`}
            tabs={['General Info', 'Principal Info']}
            tabValue={tabValue}
            handleChangeTab={handleChangeTab}
        >
            { tabValue === 0 && (
                <div className="">
                    {renderInfoCard(schoolInfo)}
                </div>
            )
            }
            {
                tabValue === 1 && (
                    <div className="">
                        <h1>Item two</h1>
                    </div>
                )
            }
            {
                tabValue === 2 && (
                    <div className="">
                        <h1>Item three</h1>
                    </div>
                )
            }
        </DetailLayouts >
    );
}

export default SchoolsDetail