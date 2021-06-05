import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import Legends from "./Legends";
import Maps from './Maps';
import { getDashboards } from '../../../pages/Dashboards/DashboardsServices';

const style = {
    fillColor: "#F28F3B",
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.5,
};

const MapCharts = () => {
    const [districts, setDistricts] = useState(null);
    const [data4Blocks, setData4Blocks] = useState(null);

    async function fetchProfileData() {
        return Promise.all([
            getDashboards('map'),

            fetch("../districts.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
        ]).then(([api, file]) => {
            // console.log('file = ', file);
            return { api, file };
        })
    }
    const promise = fetchProfileData();

    // useEffect(() => {
    //     promise.then(data => {
    //         setData4Blocks(data.api)

    //         data.file.json().then(json => {
    //             setDistricts(json.features)
    //         })

    //     });

    useEffect(() => {
        promise.then(data => {
            setData4Blocks(data.api)

            data.file.json().then(json => {
                setDistricts(json.features)
            })

        });
    }, []);

    if (!districts) {
        return null
    }

    if (!data4Blocks) {
        return null
    }

    const item = [{
        title: '21+',
        color: '#4527a0',
        textColor: 'white'

    },
    {
        title: '5 - 20',
        color: '#9575cd',
        textColor: 'white'
    },
    {
        title: '1 - 4',
        color: '#d1c4e9',
        textColor: 'black'

    },
    {
        title: '0',
        color: '#ede7f6',
        textColor: 'black'

    }]
    const convert = () => {
        let list = []
        if (districts.length > 0 && data4Blocks.length > 0) {
            districts.forEach(dist => {
                data4Blocks.forEach(data => {
                    if (dist.properties.localname === data.name) {
                        dist.properties.value = data.value
                        dist.properties.total = data.totalSchool
                        list.push(dist)
                    }
                })
            })
        }
        return list
    }
    const test = convert()
    return (
        <>
            <div>{test && <Maps geojson={test} />}
            </div>
            <div>{<Legends item={item.reverse()} />}
            </div>
        </>
    )
}

export default MapCharts;