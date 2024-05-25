// ** Next Imports
import {NextPage} from "next";

// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** SSR Imports
import {withAuthForLogin} from "src/@core/SSR/lib/authenticated";

interface State {
  email: string;
  password: string
  showPassword: boolean
}

interface LoginProps {
  initialIsLoading: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LogoImage = styled('img')(({ theme }) => ({
  display: 'block', // Делает изображение блочным элементом
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '80px',
  height: '70px',
  borderRadius: '10px',
  padding: '4px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

export const getServerSideProps = withAuthForLogin(async () => {
  return {
    props: {
      initialIsLoading: false,
    },
  };
});

const LoginPage: NextPage<LoginProps> = () => {
  // ** State
  const [values, setValues] = useState<State>({
    email: 'user1@example.com',
    password: '1',
    showPassword: false
  })

  const config = themeConfig();

  const [, setAuthError] = useState('');
  const [, setIsLoading] = useState(false);


  const clearAuthError = () => setAuthError('');

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearAuthError();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({email: values.email, password: values.password})
      });

      if (response.ok) {
        const profileResponse = await fetch('/api/getUserProfile', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });

        if (profileResponse.ok) {
          // Используем новый API роут для перенаправления на dashboard
          window.location.href = '/api/continueDashboard';
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } else {
        const data = await response.json();
        setAuthError(data.message || 'Произошла ошибка при попытке входа');
      }
    } catch (error) {
      setAuthError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent>
          <CardContent>
            <LogoImage
              src="/images/misc/GJ.png"
              alt="Logo"
            />
          </CardContent>
          <Box sx={{mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {config.templateName}
            </Typography>
          </Box>
          <Box sx={{mb: 6}}>
            <Typography variant='h5' sx={{fontWeight: 600, marginBottom: 1.5}}>
              Welcome to {config.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email'
              name='email' // Убедитесь, что есть атрибут name
              value={values.email} // Привязка состояния к полю
              onChange={handleChange('email')} // Обработчик изменений
              sx={{marginBottom: 4}}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline/> : <EyeOffOutline/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              <FormControlLabel control={<Checkbox/>} label='Remember Me'/>
              <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
            </Box>
            <Button
              type='submit' // Тип кнопки должен быть submit для отправки формы
              fullWidth
              size='large'
              variant='contained'
              sx={{marginBottom: 7}}
            >
              Login
            </Button>
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
              <Typography variant='body2' sx={{marginRight: 2}}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <LinkStyled>Create an account</LinkStyled>
              </Typography>
            </Box>
            <Divider sx={{my: 5}}>or</Divider>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Facebook sx={{color: '#497ce2'}}/>
              </IconButton>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Twitter sx={{color: '#1da1f2'}}/>
              </IconButton>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Github
                  sx={{color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300])}}
                />
              </IconButton>
              <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                <Google sx={{color: '#db4437'}}/>
              </IconButton>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1/>
    </Box>
  )
}

// @ts-ignore
LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
