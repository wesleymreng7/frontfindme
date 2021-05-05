import axios from 'axios'

const requests = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

const getAll = async (data) => {
    try {
        const response = await requests.get(`order-services/all/${data.page}/${data.pageSize}`, {
            params: {
                clientId: data.clientId,
                contributorId: data.contributorId,
                startDate: data.startDate,
                endDate: data.endDate,
                orderByDate: data.orderByDate,
                orderByClientId: data.orderByClientId,
                orderByContributorId: data.orderByContributorId
            }
        })
        return response.data
    } catch (error) {
        if (error.response) return error.response.data
    }
}

export default {
    getAll
}
