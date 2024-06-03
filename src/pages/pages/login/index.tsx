// ** Next Imports

// ** React Imports
import {ChangeEvent, MouseEvent, ReactNode, useEffect, useState} from 'react'

// ** Next Imports
import {motion} from 'framer-motion';

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, {FormControlLabelProps} from '@mui/material/FormControlLabel'

// Component Imports
import Logo from '@core/svg/Logo'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** SSR Imports
import {withAuthForLogin} from "src/@core/SSR/lib/authenticated";
import {useImageVariant} from "src/@core/hooks/useImageVariant";
import {Mode} from "src/@core/types";
import Illustrations from "src/@core/components/Illustrations";
import Alert from "@mui/material/Alert";
import {Controller, useForm} from 'react-hook-form';
import Link from "next/link";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import StoreAnimation from "src/pages/pages/login/loadingAnimation";
import Box from "@mui/material/Box";

interface State {
  email: string;
  password: string
  showPassword: boolean
}

type ErrorType = {
  message: string[]
}

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({theme}) => ({
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

const randomPhrases = [
  "Проверьте ваш профиль для дополнительных заданий.",
  "Для доступа к магазину клиента введите специальный код.",
  "Новые приключения ждут вас за каждым углом.",
  "Сделайте свою учетную запись уникальной. Добавьте фотографию и описание.",
  "Пригласите друзей и получите бонусы!",
  "Смените тему интерфейса в настройках для большего комфорта.",
  "Получите доступ к эксклюзивным предложениям в магазине клиента.",
];

const LoginPage = ({mode}: { mode: Mode }) => {
  const config = themeConfig();
  const {control, formState: {errors}} = useForm();

  const darkImg = '/images/pages/auth-v2-mask-dark.png';
  const lightImg = '/images/pages/auth-v2-mask-light.png';
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png';
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png';
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png';
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png';

  const [values, setValues] = useState<State>({
    email: 'user1@example.com',
    password: '1',
    showPassword: false
  });

  const [, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [invalidEmailFormat, setInvalidEmailFormat] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [showAnimation, setShowAnimation] = useState(false);
  const [phrase, setPhrase] = useState(randomPhrases[0]);

  useEffect(() => {
    if (isLoading) {
      setShowAnimation(true);
    }
  }, [isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomPhrases.length);
      setPhrase(randomPhrases[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const clearAuthError = () => setAuthError('');

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
          window.location.href = '/api/continueDashboard';
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } else {
        const data = await response.json();
        if (response.status === 500) {
          setShowErrorMessage(true);
          setInvalidCredentials(true);
        } else if (response.status === 422) {
          setInvalidEmailFormat(true);
        } else {
          setAuthError(data.message || 'Произошла ошибка при попытке входа');
        }
      }
    } catch (error) {
      setAuthError('Network error');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setShowAnimation(false);
      }, 5000); // 3 секунды задержки
    }
  };

  const authBackground = useImageVariant(mode, lightImg, darkImg);

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  );

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <div className='flex bs-full justify-center'>
        <div className='flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden'>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            drag
            onDragEnd={(event, info) => {
              console.log('Drag ended with info:', info);
            }}
            className='plb-12 pis-12'>
            <img
              src={characterIllustration}
              alt='character-illustration'
              className='max-bs-[500px] max-is-full bs-auto'
            />
          </motion.div>
          <Illustrations
            image1={{src: '/images/illustrations/objects/tree-2.png'}}
            image2={null}
            maskImg={{src: authBackground}}
          />
        </div>
        <div
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px] hidden md:block'>
          <div className='flex justify-center items-center gap-3 mbe-6'>
            <Logo className='text-primary' height={28} width={35}/>
            <Typography variant='h4' className='font-semibold tracking-[0.15px]'>
              {config.templateName}
            </Typography>
          </div>
        </div>
        <div
          className='flex justify-center items-center bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
          {isLoading && showAnimation && (
            <motion.div style={{ height: '600px' }} className='flex justify-center items-center bg-backgroundPaper flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
              <div className="text-center">
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.5}}
                >
                  <Typography>
                    Пожалуйста, войдите в свою учетную запись и начните приключение. {phrase}
                  </Typography>
                </motion.div>
              </div>
              <StoreAnimation/>
            </motion.div>
          )}
          {!isLoading && (
            <>
              <motion.div
                className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
              <div>
                  <Typography variant='h3' mb={4}>
                    Welcome to
                  </Typography>
                  <Typography variant='h2' mb={8} style={{fontFamily: 'Pacifico, cursive'}}>
                    {`${config.templateName}!`}
                  </Typography>
                  <Typography>Пожалуйста, войдите в свою учетную запись и начните приключение.</Typography>
                </div>

                <form noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-5'>
                  <Controller
                    name='email'
                    control={control}
                    rules={{required: true, pattern: /^\S+@\S+$/i}}
                    render={({field}) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='email'
                        label='Email'
                        value={values.email}
                        onChange={handleChange('email')}
                        onFocus={() => {
                          if (!isLoading) {
                            setInvalidCredentials(false);
                            setInvalidEmailFormat(false);
                          }
                        }}
                        error={invalidCredentials || invalidEmailFormat}
                        helperText={
                          invalidCredentials
                            ? 'Неверный адрес электронной почты'
                            : invalidEmailFormat
                              ? 'Неверный формат электронной почты'
                              : ''
                        }
                        InputProps={{className: invalidCredentials || invalidEmailFormat ? 'border-red-500' : ''}}
                      />
                    )}
                  />
                  <Controller
                    name='password'
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Password'
                        value={values.password}
                        id='login-password'
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        onFocus={() => {
                          if (!isLoading) {
                            setInvalidCredentials(false);
                          }
                        }}
                        error={invalidCredentials}
                        helperText={invalidCredentials ? 'Неверный пароль' : ''}
                        InputProps={{
                          endAdornment: (
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
                          ),
                        }}
                        {...(errors.password && {error: true, helperText: errors.password.message})}
                      />
                    )}
                  />
                  <Typography color='error.main' hidden={!showErrorMessage}>
                    Неверный адрес электронной почты или пароль
                  </Typography>
                  <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label='Remember me'/>
                    <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                      Forgot password?
                    </Typography>
                  </div>
                  <Button
                    type='submit'
                    fullWidth
                    size='large'
                    variant='contained'
                    onClick={() => setShowErrorMessage(false)}
                  >
                    Login
                  </Button>
                </form>

                <Divider className='gap-3'>or</Divider>
                <Button
                  color='secondary'
                  className='self-center text-textPrimary'
                  startIcon={<img src='/images/logos/google.png' alt='Google' width={22}/>}
                  sx={{'& .MuiButton-startIcon': {marginInlineEnd: 3}}}
                >
                  Sign in with Google
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LoginPage.guestGuard = true;

export default LoginPage;
