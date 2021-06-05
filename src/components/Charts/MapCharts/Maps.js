import React, { useState, useEffect } from "react";
import Choropleth from "react-leaflet-choropleth";
import { Map } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const style = {
    fillColor: "#ede7f6",
    weight: .5,
    opacity: 1,
    // color: "white",
    //dashArray: "3",
    fillOpacity: 1,
};

const Maps = ({ geojson }) => {
    // const distNames = geojson["features"].map((dist) => dist = { ...dist, 'name': dist.properties.localname, 'value': 500 })
    const calulateColor = (value) => {
        if (value >= 21) return '#4527a0'
        if (value >= 5 && value <= 20) return '#9575cd'
        if (value >= 1 && value <= 4) return '#d1c4e9'
        return '#ede7f6'
    }
    const onEachCountry = (country, layer) => {
        //layer.options.fillColor = country.properties.color;
        const color = calulateColor(country.properties.value)
        const name = `${country.properties.localname}: ${country.properties.value}/ ${country.properties.total}`;
        layer.options.fillColor = color
        layer.on({
            'mouseout': function (event) {
                event.target.setStyle({
                    fillColor: color,
                    transition: '0.3s'
                })

            },
            'mouseover': function (event) {
                event.target.setStyle({
                    transition: '0.3s',
                    fillColor: "#009688"
                })
                // layer.bindPopup(name).openPopup();
            }
        })
        layer.bindPopup(name).openPopup();
        // const confirmedText = country.properties.confirmedText;
        //layer.bindPopup(`${name}: 100`);
        // layer.on('mouseover', function (e) {
        //   layer.bindPopup(name).openPopup(); // here add openPopup()
        // });
    };
    // console.log(geojson);
    return (
        <Map style={{ height: "70vh" }} zoom={11} center={[10.817396238910442, 106.69106344134427]}>
            <Choropleth
                data={geojson}
                valueProperty={(feature) => feature.properties.localname}
                //scale={['#b3cde0', '#011f4b']}
                steps={7}
                mode='e'
                style={style}
                onEachFeature={onEachCountry}
            // (feature, layer) => layer.bindPopup(feature.properties.localname)

            />
        </Map>
    );
};

export default Maps;