import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)({
  width: '100%',
  '& label': {
    color: '#fff',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
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
