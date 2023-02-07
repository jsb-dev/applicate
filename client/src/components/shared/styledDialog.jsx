import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    overflow: 'hidden',
    padding: '2%',
  },
});

export default StyledDialog;
