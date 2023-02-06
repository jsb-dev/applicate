import Styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

const StyledTextField = Styled(TextField)({
  '& label': {
    color: '#ffffff',
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
  '& label.Mui-focused': {
    color: '#ffffff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff',
    },
    '&:hover fieldset': {
      borderColor: '#00aec2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#39d0ff ',
    },
  },
});

export default StyledTextField;
