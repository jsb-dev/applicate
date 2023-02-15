import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    overflow: 'hidden',
    padding: '1%',
    backgroundColor: '#222c30',
    color: '#fff',
    maxWidth: '60vw',
  },
  '@media (max-width: 600px)': {
    '& .MuiDialog-paper': {
      maxWidth: '90vw',
    },
  },
});

export default StyledDialog;
