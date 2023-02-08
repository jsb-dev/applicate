import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    overflow: 'hidden',
    padding: '1%',
  },
});

export default StyledDialog;
