import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)({
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
