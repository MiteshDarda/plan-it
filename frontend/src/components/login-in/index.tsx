import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MessageTypeEnum } from '../../store/reducers/enums/message_type.enum';
import { messageSlice } from '../../store/reducers/message-slice';
import { NavigationEnum } from '../../router/enums/navigation.enum.tsx';
import { useState } from 'react';
import { UtilsEnum } from '../../utils/enums/utils.enum.tsx';
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
  useTheme
} from '@mui/material';
// import { Theme } from '@emotion/react';

const customTheme = (outerTheme: any) =>
  createTheme({
    palette: {
      mode: outerTheme?.palette?.mode
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)'
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)'
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)'
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)'
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)'
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)'
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      }
    }
  });

export default function Login() {
  const outerTheme = useTheme();
  //* ---------------------------------------------- Constants/States ----------------------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //* ---------------------------------------------- Functions ----------------------------------------------
  const formSubmitHandler = async (data: any) => {
    try {
      setLoading(true);
      console.log('data', data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API Call with 2 seconds delay
      dispatch(
        messageSlice.actions.setMessage({
          type: MessageTypeEnum.SUCCESS,
          text: 'Successfully Signed In'
        })
      );
    } catch (error: any) {
      if (error?.message === 'Network Error') {
        dispatch(
          messageSlice.actions.setMessage({
            type: MessageTypeEnum.ERROR,
            text: 'Network Error'
          })
        );
        return;
      }
      dispatch(
        messageSlice.actions.setMessage({
          type: MessageTypeEnum.ERROR,
          text: error?.response?.data?.message[0] || 'Something went wrong'
        })
      );
      console.log('error', error);
      console.log('error', error?.message);
    } finally {
      setLoading(false);
    }
  };

  //* ---------------------------------------------- JSX ----------------------------------------------
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ backgroundColor: '#111111', color: 'white' }}
          square
          color={'White'}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              {UtilsEnum.Title}
            </Typography>
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            {/* 
         //$ ---------------------------------------------- FORM ---------------------------------------------- 
         */}
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit((data: any) => formSubmitHandler(data))}>
              {/* 
         //$ ---------------------------------------------- Email ---------------------------------------------- 
         */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors?.email}
                {...register('email', {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                })}
                disabled={loading}
                variant="filled"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '5px'
                }}
              />
              {errors?.email ? (
                <Typography variant="caption" display="block" color={'red'} gutterBottom>
                  Opps!! Not a Valid Email
                </Typography>
              ) : (
                <></>
              )}
              {/* 
         //$ ---------------------------------------------- Password ---------------------------------------------- 
         */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors?.password}
                {...register('password', { required: true, minLength: 6 })}
                disabled={loading}
                variant="filled"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '5px'
                }}
              />
              {errors?.password?.type === 'minLength' ? (
                <Typography variant="caption" display="block" color={'red'} gutterBottom>
                  Your password must be at least <b>6 characters long</b>.
                </Typography>
              ) : (
                <></>
              )}
              {/* 
         //$ ---------------------------------------------- Submit ---------------------------------------------- 
         */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}>
                {loading ? <CircularProgress size={26} /> : <>Login</>}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      navigate(NavigationEnum.REGISTER);
                    }}
                    sx={{ cursor: 'pointer' }}>
                    {"Don't have an account? Register now"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
