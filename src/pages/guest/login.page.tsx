import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/use-auth.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginRequestType } from "../../types/requests/login-request.type.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema } from "../../schemas/guest/login-request.schema.ts";
import { useState } from "react";

export default function LoginPage() {
  const [showError, setShowError] = useState<boolean>(false)
  const { login } = useAuth()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginRequestType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginRequestSchema)
  })

  const onSubmit: SubmitHandler<LoginRequestType> = (data) => {
    setShowError(false);
    login({
      email: data.email,
      password: data.password,
    }, () => setShowError(true))
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
          Entrar
        </Typography>
        { showError &&
            <Typography component="p" variant="subtitle1" sx={ {
              color: 'error.main',
              textAlign: 'center',
            } }>
              E-mail ou senha inválidos
            </Typography>
        }
        <Box component="form" onSubmit={ handleSubmit(onSubmit) } noValidate sx={ { mt: 1 } }>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de e-mail"
            autoComplete="email"
            autoFocus
            error={ !!errors.email }
            helperText={ errors.email?.message }
            { ...register('email') }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            error={ !!errors.password }
            helperText={ errors.password?.message }
            { ...register('password') }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={ { mt: 3, mb: 2 } }
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">
                Não tem uma conta? Registre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}