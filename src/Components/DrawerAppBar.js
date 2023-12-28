import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { handleLogin } from '../Firebase/helper';
import { auth } from '../Firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Layout from '../Pages/Layout';
import { AuthContext } from '../Pages/AuthContexProvider';
import LoadingModal from './LoadingModal';

import { expressLogout } from '../swrApi/helperApis';
const drawerWidth = 240;



function DrawerAppBar(props) {
    const username = React.useContext(AuthContext).user.username
    const { setUser } = React.useContext(AuthContext)
    const { privates } = React.useContext(AuthContext)

    const adminRole = React.useContext(AuthContext).user.role?.includes(privates[0])

    const navItems = adminRole ? ['Home', 'Contact', 'Admin', 'Logout'] : username ? ['Home', 'Contact', 'Logout'] : ['Home', 'Contact', 'Login']
    const navigate = useNavigate()
    //
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleClick = (item) => {

        switch (item) {
            case 'Home': {
                navigate('/');
                break;
            }
            case 'Login': {
                // navigate('login')
                handleLogin()
                break;
            }
            case 'Logout': {
                signOut(auth).then(async () => {
                    // Sign-out successful.
                    setUser({
                        username: '',
                        email: '',
                        userId: '',
                        role: [],
                        accessToken: ''
                    })
                    await expressLogout()
                    navigate('/')

                }).catch((error) => {
                    // An error happened.
                });
                break;
            }
            case 'Contact': {
                navigate('/contacts');
                break;
            }
            case 'Admin': {
                navigate('/adminpanel');
                break;
            }
            default: {
                break;
            }
        }

    }


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2,fontFamily:'sans-serif' }}>
                {username ? username : 'Guest'}
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center',}} onClick={() => handleClick(item)}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        
                        sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
                    >
                        {username ? username : 'Guest'}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} onClick={() => handleClick(item)}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            {props.loading ? <LoadingModal/> :
             <Box component="main" sx={{ p: 0, boxSizing: 'border-box', width: '100vw' }}>
             <Toolbar sx={{ mb: 2 }} />
             <Box sx={{ p: 0, boxSizing: 'border-box', maxWidth: '100vw',minWidth:{xs:'100vw',md:'98vw'},display:'flex',flexWrap:'nowrap',justifyContent:'center',alignItems:'center',flexDirection:'column',minHeight:'80vh',overflowX:'hidden'}}>
             <Layout />
             </Box>
         </Box> 
           }
           
        </Box>
    );
}



export default DrawerAppBar;
