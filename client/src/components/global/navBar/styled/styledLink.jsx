import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const styledLink = styled(Link)({
  color: '#182021',
  textDecoration: 'none',
  marginRight: '10px',
  '&:hover': {
    color: '#ffffff',
  },
});

export default styledLink;
