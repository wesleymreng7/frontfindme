import moment from 'moment'
import { useState, useEffect, useMemo } from 'react'
import { Chart } from 'react-charts'
import api from '../../api'

export default function MyChart() {

    const [data, setData] = useState([
        {
            label: 'Series 1',
            data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]],
            specialLabel: 'Day'
        },
    ])

    const axes = useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    

    const getOss = async () => {
        const osResponse = await api.os.getAllCurrentMonth()
        if (osResponse && osResponse.status === 200) {
            const newData = [ { specialLabel: 'Day', data: osResponse.data.map((os) => [parseInt(os.day), os.total])} ]
            console.log(newData)
            setData(newData)
        }
    }


    const lineChart = (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '400px',
                height: '300px'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>

    )

    useEffect(() => {
        getOss()
    }, [])

    return (
        <>{lineChart}</>
    )
}