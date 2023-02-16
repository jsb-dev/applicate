import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    overflow: 'hidden',
    padding: '1vh',
    backgroundColor: '#222c30',
    color: '#fff',
    margin: '5%',
  },
});

export default StyledDialog;
