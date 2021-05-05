import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import api from '../../api'

export default function Location() {

    const [data, setData] = useState([{ name: '' , location: {}}])
    const [selected, setSelected] = useState({});

    const onSelect = item => {
        setSelected(item);
        console.log(item)
    }


    const getLastLocations = async () => {
        const locationResponse = await api.contributors.getLastLocation()
        if (locationResponse && locationResponse.status === 200) {
            setData(locationResponse.data.map((os => {
                const splitLocation = os.location.split('|')
                return {
                    name: os.name,
                    location: {
                        lat: parseFloat(splitLocation[0]),
                        lng: parseFloat(splitLocation[1])
                    }
                }
            })))
        }
    }

    useEffect(() => {
        getLastLocations()
    }, [])


    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 41.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 41.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 41.3773,
                lng: 2.1585
            },
        },
        {
            name: "Location 4",
            location: {
                lat: 41.3797,
                lng: 2.1682
            },
        },
        {
            name: "Location 5",
            location: {
                lat: 41.4055,
                lng: 2.1915
            },
        }
    ];

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={data[0].location}>
                {
                    data.map(item => {
                        return (
                            <Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}