import './App.css';
import DrawerAppBar from './Components/DrawerAppBar';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { getUserfromDB } from './Firebase/helper';
import { useContext } from 'react';
import { AuthContext } from './Pages/AuthContexProvider';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
const auth = getAuth();
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor:teal[500],
            '&:hover': {
              backgroundColor: teal[700],
            },
            '&:active': {
              backgroundColor: teal[700],
            },
            fontFamily:'Arial',

          },
        },
      ],
    },
  },
});


function App() {
  const { user, setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (user?.username) {
      setLoading(false)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const roles = await getUserfromDB(user.uid);
        if (roles) {
          setUser((prev) => {
            return {
              ...prev,
              username: user.displayName,
              email: user.email,
              role: [...roles],
              accessToken: user.accessToken
            }
          })

        }

      }
    });
  }, [setUser])

  return (
    <div className="App">
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <DrawerAppBar loading={loading} />
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
