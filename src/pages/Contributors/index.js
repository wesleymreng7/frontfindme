import React, { useEffect, useState } from 'react'
import { Paper, Typography, Grid, Button } from '@material-ui/core'
import { Edit, DeleteOutline } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import CustomTable from '../../common/CustomTable'
import useStyles from './style'
import AddContributor from './components/AddContributor'
import EditContributor from './components/EditContributor'
import DeleteContributor from './components/DeleteContributor'
import api from '../../api'

const Contributors = () => {
    const classes = useStyles()
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [data, setData] = useState([])
    const [selectedContributor, setSelectedContributor] = useState({})

    const handleClickOpenAdd = () => {
        setOpenAdd(true)
    }

    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    const handleClickOpenEdit = rowData => {
        setSelectedContributor(rowData)
        setOpenEdit(true)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleClickOpenDelete = rowData => {
        setSelectedContributor(rowData)
        setOpenDelete(true)
    }

    const getContributors = async () => {
        const contributorsResponse = await api.contributors.getAll()
        if (contributorsResponse && contributorsResponse.status === 200) {
            setData(contributorsResponse.data)
        }
    }

    useEffect(() => {
        getContributors()
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
                        title='Colaboradores'
                        columns={[
                            { title: 'Nome', field: 'name' },
                            { title: 'E-mail', field: 'email' },
                        ]}
                        data={data}
                        actions={[
                            {
                                icon: () => <Edit />,
                                tooltip: 'Editar Colaborador',
                                onClick: (event, rowData) => handleClickOpenEdit(rowData),
                            },
                            rowData => ({
                                icon: () => <DeleteOutline />,
                                tooltip: 'Deletar Colaborador',
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
            <AddContributor
                handleClose={handleCloseAdd}
                open={openAdd}
                update={getContributors}
            />
            <EditContributor
                handleClose={handleCloseEdit}
                open={openEdit}
                contributor={selectedContributor}
                update={getContributors}
            />
            <DeleteContributor
                handleClose={handleCloseDelete}
                open={openDelete}
                contributor={selectedContributor}
                update={getContributors}
            />
        </div>
    )
}

export default Contributors
