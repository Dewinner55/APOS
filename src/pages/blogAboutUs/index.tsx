import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from "src/@core/components/landing/AppAppBar";
import MainFeaturedPost from "src/@core/components/landing/blogAboutUs/MainFeaturedPost";
import FeaturedPost from "src/@core/components/landing/blogAboutUs/FeaturedPost";
import Main from "src/@core/components/landing/blogAboutUs/Main";
import Footer from "src/@core/components/landing/Footer";
import {PaletteMode} from "@mui/material";
import {ReactNode} from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import FacebookIcon from "@mui/icons-material/GitHub";
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import Sidebar from "src/@core/components/landing/blogAboutUs/Sidebar";


const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    {title: 'March 2020', url: '#'},
    {title: 'February 2020', url: '#'},
    {title: 'January 2020', url: '#'},
    {title: 'November 1999', url: '#'},
    {title: 'October 1999', url: '#'},
    {title: 'September 1999', url: '#'},
    {title: 'August 1999', url: '#'},
    {title: 'July 1999', url: '#'},
    {title: 'June 1999', url: '#'},
    {title: 'May 1999', url: '#'},
    {title: 'April 1999', url: '#'},
  ],
  social: [
    {name: 'GitHub', icon: GitHubIcon},
    {name: 'X', icon: XIcon},
    {name: 'Facebook', icon: FacebookIcon},
  ],
};

const posts = [
  {
    title: 'Global Joy',
    date: 'April 1, 2020',
    author: 'Кривитченко Валентин',
    content: `
      Global Joy – это компания, специализирующаяся на создании инновационных IT-продуктов и веб-сайтов для бизнеса в сфере электронной коммерции. Мы являемся надежным партнером для компаний, стремящихся к эффективному присутствию в онлайн-среде и увеличению своего диджитал-бизнеса.

Наши услуги:

Разработка веб-сайтов: Мы создаем уникальные и привлекательные веб-сайты, которые отражают вашу компанию и помогают привлечь новых клиентов.

Электронная коммерция: Мы разрабатываем мощные интернет-магазины с удобным интерфейсом и безопасными методами оплаты, чтобы ваш бизнес процветал в онлайн-пространстве.

Индивидуальный подход: Мы учитываем уникальные потребности каждого клиента, предлагая гибкие и индивидуальные решения, которые соответствуют вашим целям и бюджету.

Поддержка и обслуживание: Мы обеспечиваем непрерывную поддержку и техническое обслуживание, чтобы ваш сайт работал стабильно и без сбоев.

Наши преимущества:

Опыт и экспертиза: Наша команда состоит из опытных специалистов, готовых реализовать самые сложные проекты и достичь ваших целей.

Инновационные технологии: Мы используем современные технологии и лучшие практики разработки, чтобы обеспечить высокое качество и эффективность продуктов.

Клиентоориентированность: Мы ценим каждого клиента и стремимся к долгосрочным партнерским отношениям, основанным на взаимном доверии и понимании.

Гибкость и адаптивность: Мы готовы реагировать на изменения в ваших потребностях и быстро адаптироваться к новым требованиям рынка.

Присоединяйтесь к Global Joy и дайте вашему бизнесу новый импульс в онлайн-мире!
    `,
  },
  {
    title: '5 причин выбрать Global Joy для создания вашего веб-сайта в сфере электронной коммерции',
    date: 'April 5, 2020',
    author: 'Кривитченко Валентин',
    content: `
        1. **Опыт и экспертиза:** Мы обладаем богатым опытом в разработке веб-сайтов и интернет-магазинов, что позволяет нам реализовывать проекты любой сложности.

        2. **Индивидуальный подход:** Мы всегда учитываем особенности вашего бизнеса и предлагаем решения, которые точно отвечают вашим потребностям и целям.

        3. **Инновационные технологии:** Мы используем только современные технологии и лучшие практики разработки, чтобы ваш сайт был не только красивым, но и эффективным.

        4. **Непрерывная поддержка:** Мы гарантируем непрерывную поддержку и обслуживание вашего сайта, чтобы он всегда работал стабильно и без сбоев.

        5. **Гибкость и адаптивность:** Мы готовы к изменениям и быстро адаптируемся к новым требованиям рынка, чтобы ваш бизнес оставался конкурентоспособным.

        Не упустите возможность работать с лучшими! Присоединяйтесь к Global Joy уже сегодня!
    `,
  },
  {
    title: 'Как Global Joy помогает бизнесу в электронной коммерции достичь успеха',
    date: 'April 10, 2020',
    author: 'Кривитченко Валентин',
    content: `
        В современном мире электронной коммерции конкуренция становится все более ожесточенной. Чтобы выделиться среди множества других онлайн-магазинов, вашему бизнесу необходимо иметь качественный и профессионально разработанный веб-сайт. Именно здесь Global Joy может стать вашим надежным партнером и помочь вам достичь успеха.

        Наши специалисты обладают не только техническими знаниями, но и пониманием особенностей электронной коммерции. Мы разработаем для вас уникальный дизайн, удобный интерфейс и эффективную структуру сайта, которые помогут привлечь новых клиентов и увеличить конверсию.

        Кроме того, мы предлагаем непрерывную поддержку и обслуживание вашего сайта, что позволит вам сосредоточиться на развитии своего бизнеса, не беспокоясь о технических аспектах.

        Присоединяйтесь к Global Joy и дайте вашему бизнесу новый импульс в онлайн-мире электронной коммерции!
    `,
  },
];

const Blog = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({palette: {mode}});

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <Container maxWidth="lg">
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost}/>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post}/>
            ))}
          </Grid>
          <Grid container spacing={5} sx={{mt: 3}}>
            <Main title="From the firehose" posts={posts}/>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}

Blog.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

Blog.guestGuard = true;

export default Blog;
