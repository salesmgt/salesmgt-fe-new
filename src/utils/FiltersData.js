import React, { useEffect } from 'react'
import * as FiltersServices from '../services/FiltersServices'

export function initFilters() {
    // useEffect(() => {
    FiltersServices.getDistricts()
        .then((data) => {
            localStorage.setItem('dists', JSON.stringify(data))
        })
        .catch((error) => {
            if (error.response) {
                console.log(error)
            }
        })
    // }, [])
    // useEffect(() => {
    FiltersServices.getEducationalLevels()
        .then((data) => {
            localStorage.setItem('schEduLvls', JSON.stringify(data))
        })
        .catch((error) => {
            if (error.response) {
                console.log(error)
            }
        })
    // }, [])
    // useEffect(() => {
    FiltersServices.getSchoolTypes()
        .then((data) => {
            localStorage.setItem('schTypes', JSON.stringify(data))
        })
        .catch((error) => {
            if (error.response) {
                console.log(error)
            }
        })
    // }, [])
    // useEffect(() => {
    FiltersServices.getSchoolScales()
        .then((data) => {
            localStorage.setItem('schScales', JSON.stringify(data))
        })
        .catch((error) => {
            if (error.response) {
                console.log(error)
            }
        })
    // }, [])
    // useEffect(() => {
    FiltersServices.getSchoolStatuses()
        .then((data) => {
            localStorage.setItem('schStatus', JSON.stringify(data))
        })
        .catch((error) => {
            if (error.response) {
                console.log(error)
            }
        })
    // }, [])
    // useEffect(() => {
    FiltersServices.getRoles()
        .then((data) => {
            localStorage.setItem('roles', JSON.stringify(data))
        })
        .catch((error) => {
            if (error.response) {
                console.log(error)
            }
        })
    // }, [])
}
