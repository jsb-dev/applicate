import React from 'react';
import { CheckOrientation } from '../../utils/CheckOrientation.jsx';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = (props) => {
  const isVertical = CheckOrientation();

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
    padding: isVertical ? '1.3rem' : '1.6rem',
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
              width: isVertical ? '1.3rem' : '1.6rem',
              height: isVertical ? '1.3rem' : '1.6rem',
            }}
          />
        )}
      </div>
    </StyledButton>
  );
};

export default StyledButton;
