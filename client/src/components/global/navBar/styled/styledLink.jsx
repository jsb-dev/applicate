import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const styledLink = styled(Link)({
  color: '#182021',
  textDecoration: 'none',
  width: '100%',
  height: '100%',
  '&:hover': {
    color: '#ffffff',
  },
});

export default styledLink;
