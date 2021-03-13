import React, { useState, useEffect } from 'react'
import * as SchoolsServices from './SchoolsServices'

function Schools() {
    const [schools, setSchools] = useState([])

    const refreshSchools = () => {
        SchoolsServices.getSchools().then((data) => {
            // console.log(response.data.list)
            // setSchools(response.data.list)
           setSchools(data.list)
        })
    }

    useEffect(refreshSchools, [])

    return (
        <div className="schools">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>District</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Educational Level</th>
                        <th>Scale</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Active</th>
                        <th>Status</th>
                        <th>Representative Name</th>
                        <th>Representative Phone</th>
                        <th>Representative Email</th>
                        <th>Representative Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map((school) => (
                        <tr key={school.id}>
                            <td>{school.id}</td>
                            <td>{school.name}</td>
                            <td>{school.address}</td>
                            <td>{school.district}</td>
                            <td>{school.phone}</td>
                            <td>{school.email}</td>
                            <td>{school.educationalLevel}</td>
                            <td>{school.scale}</td>
                            <td>{school.type}</td>
                            <td>{school.description}</td>
                            <td>{school.active}</td>
                            <td>{school.status}</td>
                            <td>{school.reprName}</td>
                            <td>{school.reprPhone}</td>
                            <td>{school.reprEmail}</td>
                            <td>{school.reprGender?'Nam':'Nu'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Schools
