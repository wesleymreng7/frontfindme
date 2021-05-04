import React, { useEffect } from 'react'
import clsx from 'classnames'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Popover,
    Button,
    Tooltip,
} from '@material-ui/core'
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    MoveToInbox as InboxIcon,
    Mail as MailIcon,
    AccountCircle as AccountIcon,
} from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import menus from './menus'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        minHeight: '55px !important',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    selectedMenu: {
        color: theme.palette.primary.main,
        '& svg': {
            color: theme.palette.primary.main,
        },
    },
}))

export default function SideMenu(props) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const openPop = Boolean(anchorEl)
    const id = openPop ? 'simple-popover' : undefined



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        Findme dashboard
          </Typography>
                    <Grid container justify='flex-end' alignItems='center'>
                        <Button onClick={handleClick} color='inherit'>
                            <Typography color='inherit' style={{ marginRight: '10px' }}>
                                User
                            </Typography>
                            <AccountIcon />
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menus &&
                        menus.map((menu, index) => (
                            <Tooltip title={menu.name} key={index} arrow placement='right'>
                                <ListItem
                                    button
                                    onClick={() => history.push(menu.path)}
                                    className={
                                        location.pathname.toString().indexOf(menu.path) > -1
                                            ? classes.selectedMenu
                                            : ''
                                    }>
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={menu.name} />
                                </ListItem>
                            </Tooltip>
                        ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
            <Popover
                id={id}
                open={openPop}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <List component='nav' aria-label='secondary mailbox folders'>
                    <ListItem button onClick={() => alert('logout')}>
                        <ListItemText primary='Sair' />
                    </ListItem>
                </List>
            </Popover>
        </div>
    )
}
