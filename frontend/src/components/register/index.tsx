import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MessageTypeEnum } from '../../store/reducers/enums/message_type.enum';
import { NavigationEnum } from '../../router/enums/navigation.enum';
import { messageSlice } from '../../store/reducers/message-slice';
import { useState } from 'react';
import { UtilsEnum } from '../../utils/enums/utils.enum';
import { CircularProgress } from '@mui/material';

export default function Register() {
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
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulating API Call with 5 seconds delay
      navigate(NavigationEnum.LOGIN);
      console.log('in', data);
      dispatch(
        messageSlice.actions.setMessage({
          type: MessageTypeEnum.SUCCESS,
          text: 'Successfully Signed Up'
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
      console.log('error>>>>', error);
    } finally {
      setLoading(false);
    }
  };
  //* ---------------------------------------------- JSX ----------------------------------------------
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: '#111111', color: 'white', paddingTop: '4rem' }}>
      <CssBaseline />
      <Box
        sx={{
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
          Sign up
        </Typography>
        {/* 
         //$ ---------------------------------------------- FORM ---------------------------------------------- 
         */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data: any) => formSubmitHandler(data))}
          sx={{ mt: 3 }}>
          {/* 
         //$ ---------------------------------------------- Name ---------------------------------------------- 
         */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={!!errors?.name}
                {...register('name', { required: true })}
                disabled={loading}
                variant="filled"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '5px'
                }}
              />
            </Grid>
            {/* 
         //$ ---------------------------------------------- Email ---------------------------------------------- 
         */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                error={!!errors?.email}
                label="Email Address"
                autoComplete="email"
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
            </Grid>
            {/* 
         //$ ---------------------------------------------- Password ---------------------------------------------- 
         */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
            </Grid>
          </Grid>
          {/* 
         //$ ---------------------------------------------- Submit ---------------------------------------------- 
         */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}>
            {loading ? <CircularProgress size={26} /> : <>Register</>}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={() => {
                  navigate(NavigationEnum.LOGIN);
                }}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
