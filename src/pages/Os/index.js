import React, { useState, useEffect, useRef } from 'react'
import {
    Paper,
    Typography,
    Grid,
    Button,
    FormControlLabel,
    Switch,
    CircularProgress,
    TextField,
    IconButton,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
    Edit,
    DeleteOutline,
    YoutubeSearchedFor,
    CloseOutlined,
} from '@material-ui/icons'
import CustomTable from '../../common/CustomTable'
import { MTableEditRow } from 'material-table'
import useStyles from './style'
import moment from 'moment'
import api from '../../api'
import utils from '../../utils'

let timer = null

const OS = () => {
    const classes = useStyles()
    const [filters, setFilters] = useState({
        clientId: '',
        contributorId: '',
        startDate: '',
        endDate: '',
        orderByDate: 'desc',
        orderByClientId: 'desc',
        orderByContributorId: 'desc'
    })
    const tableRef = useRef(null)

    const changeFilter = event => {
        setFilters({ ...filters, [event.target.name]: event.target.value })
        clearTimeout(timer)
        timer = setTimeout(() => {
            tableRef.current && tableRef.current.onQueryChange()
        }, 700)
    }


    const searchOss = query => {
        return new Promise(async (resolve, reject) => {
            const osResponse = await api.os.getAll({
                clientId: filters.clientId,
                contributorId: filters.contributorId,
                startDate: filters.startDate,
                endDate: filters.endDate || moment().format('YYYY-MM-DD'),
                orderByDate: filters.orderByDate,
                orderByClientId: filters.orderByClientId,
                orderByContributorId: filters.orderByClientId,
                page: query.page,
                pageSize: query.pageSize,
            })
            if (osResponse && osResponse.status === 200) {
                resolve({
                    data: osResponse.data.data,
                    page: query.page,
                    totalCount: osResponse.data.total,
                })
            } else {
                reject()
            }
        })
    }

    const resetFilters = () => {
        setFilters({
            clientId: '',
            contributorId: '',
            startDate: '',
            endDate: '',
            orderByDate: 'desc',
            orderByClientId: 'desc',
            orderByContributorId: 'desc'
        })
        tableRef.current && tableRef.current.onQueryChange()
    }

    const renderDate = data => {       
        return (
            <span>{moment(data.created_at).utc().format('DD/MM/YYYY HH:mm')}</span>
        )
    }


    useEffect(() => {
        console.log(filters)
    }, [filters])

    return (
        <div>
            <Grid container justify='flex-end' className={classes.header}></Grid>
            <Grid container>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            placeholder='Id do Cliente'
                            label='Id do Cliente'
                            size='small'
                            name='clientId'
                            value={filters.clientId}
                            onChange={changeFilter}
                            style={{ background: '#FFF', marginBottom: 10 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            placeholder='Id do Colaborador'
                            label='Id do Colaborador'
                            size='small'
                            name='contributorId'
                            value={filters.contributorId}
                            onChange={changeFilter}
                            style={{ background: '#FFF', marginBottom: 10 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            type='date'
                            fullWidth
                            variant='outlined'
                            placeholder='Data Inicial'
                            label='Data Inicial'
                            size='small'
                            value={filters.startDate}
                            style={{ background: '#FFF', marginBottom: 10 }}
                            name='startDate'
                            onChange={changeFilter}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            type='date'
                            fullWidth
                            variant='outlined'
                            placeholder='Data Final'
                            label='Data Final'
                            size='small'
                            name='endDate'
                            onChange={changeFilter}
                            value={filters.endDate}
                            style={{ background: '#FFF', marginBottom: 10 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} container alignItems='center'>
                        <TextField
                            type='date'
                            variant='outlined'
                            size='small'
                            name='orderByDate'
                            style={{ background: '#FFF', marginBottom: 10, flex: 7 }}
                            select
                            onChange={changeFilter}
                            value={filters.orderByDate}
                            SelectProps={{
                                native: true,
                            }}>
                            <option value=''>Ordenar por data</option>
                            <option value='asc'>Asc</option>
                            <option value='desc'>Desc</option>
                        </TextField>

                        <CloseOutlined
                            onClick={resetFilters}
                            style={{ margin: '0px 0px 9px 15px', cursor: 'pointer' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} container alignItems='center'>
                        <TextField
                            type='date'
                            variant='outlined'
                            size='small'
                            name='orderByClientId'
                            style={{ background: '#FFF', marginBottom: 10, flex: 7 }}
                            select
                            onChange={changeFilter}
                            value={filters.orderByClientId}
                            SelectProps={{
                                native: true,
                            }}>
                            <option value=''>Ordenar por Id do cliente</option>
                            <option value='asc'>Asc</option>
                            <option value='desc'>Desc</option>
                        </TextField>

                        <CloseOutlined
                            onClick={resetFilters}
                            style={{ margin: '0px 0px 9px 15px', cursor: 'pointer' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} container alignItems='center'>
                        <TextField
                            type='date'
                            variant='outlined'
                            size='small'
                            name='orderByContributorId'
                            style={{ background: '#FFF', marginBottom: 10, flex: 7 }}
                            select
                            onChange={changeFilter}
                            value={filters.orderByContributorId}
                            SelectProps={{
                                native: true,
                            }}>
                            <option value=''>Ordenar por Id do colaborador</option>
                            <option value='asc'>Asc</option>
                            <option value='desc'>Desc</option>
                        </TextField>

                        <CloseOutlined
                            onClick={resetFilters}
                            style={{ margin: '0px 0px 9px 15px', cursor: 'pointer' }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        title='Histórico de OSs'
                        tableRef={tableRef}
                        columns={[
                            {
                                title: 'ID',
                                field: 'id',
                                editable: 'never',
                            },
                            {
                                title: 'Data',
                                field: 'created_at',
                                editable: 'never',
                                render: renderDate,
                            },
                            {
                                title: 'Descrição',
                                field: 'description',
                            },
                            {
                                title: 'Colaborador',
                                field: 'contributor_name',
                            },
                            {
                                title: 'Cliente',
                                field: 'client_name',
                            },
                        ]}
                        data={
                            searchOss
                        }
                        options={{
                            actionsColumnIndex: -1,
                            search: false,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default OS
