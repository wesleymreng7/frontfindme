import React, { useEffect, useState } from 'react'
import { Paper, Typography, Grid, Button } from '@material-ui/core'
import { Edit, DeleteOutline } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import CustomTable from '../../common/CustomTable'
import useStyles from './style'
import AddClient from './components/AddClient'
import EditClient from './components/EditClient'
import DeleteClient from './components/DeleteClient'
import api from '../../api'

const Clients = () => {
    const classes = useStyles()
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [data, setData] = useState([])
    const [selectedClient, setSelectedClient] = useState({})

    const handleClickOpenAdd = () => {
        setOpenAdd(true)
    }

    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    const handleClickOpenEdit = rowData => {
        setSelectedClient(rowData)
        setOpenEdit(true)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleClickOpenDelete = rowData => {
        setSelectedClient(rowData)
        setOpenDelete(true)
    }

    const getClients = async () => {
        const clientsResponse = await api.clients.getAll()
        if (clientsResponse && clientsResponse.status === 200) {
            setData(clientsResponse.data)
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }
    return (
        <div>
            <Grid container justify='flex-end' className={classes.header}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClickOpenAdd}>
                    Adicionar
        </Button>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <CustomTable
                        title='Clientes'
                        columns={[
                            { title: 'Nome', field: 'name' },
                        ]}
                        data={data}
                        actions={[
                            {
                                icon: () => <Edit />,
                                tooltip: 'Editar Clinte',
                                onClick: (event, rowData) => handleClickOpenEdit(rowData),
                            },
                            rowData => ({
                                icon: () => <DeleteOutline />,
                                tooltip: 'Deletar Cliente',
                                onClick: (event, rowData) => handleClickOpenDelete(rowData),
                                disabled: rowData.birthYear < 2000,
                            }),
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                        }}
                    />
                </Grid>
            </Grid>
            <AddClient
                handleClose={handleCloseAdd}
                open={openAdd}
                update={getClients}
            />
            <EditClient
                handleClose={handleCloseEdit}
                open={openEdit}
                client={selectedClient}
                update={getClients}
            />
            <DeleteClient
                handleClose={handleCloseDelete}
                open={openDelete}
                client={selectedClient}
                update={getClients}
            />
        </div>
    )
}

export default Clients
