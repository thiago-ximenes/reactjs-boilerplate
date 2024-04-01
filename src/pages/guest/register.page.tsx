import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom'
import registerRequest from "../../requests/guest/register.request.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterRequestType } from "../../types/requests/register-request.type.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerRequestSchema } from "../../schemas/register-request.schema.ts";
import { useState } from "react";
import guestRoutesConstants from "../../constants/routes/guest-routes.constants.tsx";

export default function RegisterPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const navigate = useNavigate();


  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<RegisterRequestType>({
    resolver: zodResolver(registerRequestSchema)
  });
  const onSubmit: SubmitHandler<RegisterRequestType> = (data) => {
    registerRequest({
      email: data.email,
      password: data.password,
      name: data.name,
      lastName: data.lastName,
    }).then(() => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        navigate(guestRoutesConstants.login)
      }, 3000)
    })
      .catch(() => {
        setError('email', {
          type: 'manual',
          message: 'Email já cadastrado!',
        })
      })
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={ {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        { showSuccessMessage &&
            <Typography component="p" variant="subtitle1" sx={ {
              color: 'success.main',
              textAlign: 'center',
            } }>
                Registro realizado com sucesso! 🚀 redirecionamento para a página de login
            </Typography>
        }
        <Box component="form" noValidate onSubmit={ handleSubmit(onSubmit) } sx={ { mt: 3 } }>
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 6 }>
              <TextField
                autoComplete="given-name"
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                error={ !!errors.name }
                helperText={ errors.name?.message }
                { ...register('name') }
              />
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <TextField
                fullWidth
                id="lastName"
                label="Sobrenome"
                autoComplete="family-name"
                error={ !!errors.lastName }
                helperText={ errors.lastName?.message }
                { ...register('lastName') }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                id="email"
                label="Endereço de e-mail"
                autoComplete="email"
                error={ !!errors.email }
                helperText={ errors.email?.message }
                { ...register('email') }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <TextField
                fullWidth
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                error={ !!errors.password }
                helperText={ errors.password?.message }
                { ...register('password') }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={ { mt: 3, mb: 2 } }
          >
            Registrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Já possui uma conta? Entrar
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}