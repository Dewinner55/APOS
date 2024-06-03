import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface Post {
  title: string;
  date: string;
  description: string;
  content: string;
}

interface MainProps {
  posts: ReadonlyArray<Post>;
  title: string;
}

const Main: React.FC<MainProps> = ({ posts, title }) => {
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
        '& > div': {
          marginTop: 5,
          marginBottom: 5, // Add margin between posts
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post, index) => (
        <div key={index}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 'small' }}>{post.date}</Typography>
          <Typography variant="body1">{post.description}</Typography>
          <Typography variant="body1">{post.content}</Typography>
        </div>
      ))}
    </Grid>
  );
};

export default Main;
