import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = (props) => {
  const isNarrow = useMediaQuery('(max-width: 800px)');

  const StyledButton = styled(Button)({
    borderRadius: '1.5rem',
    boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: 'white',
      boxShadow: '0px 0px 12px 5px #fff',
      transition: 'all 0.2s ease-in-out',
    },
    padding: isNarrow ? '1.2rem' : '1.5rem',
  });

  return (
    <StyledButton>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.8rem',
        }}
      >
        {props.text ? (
          props.text
        ) : (
          <img
            src={props.image}
            style={{
              objectFit: 'cover',
              width: isNarrow ? '1.2rem' : '1.5rem',
            }}
          />
        )}
      </div>
    </StyledButton>
  );
};

export default StyledButton;
