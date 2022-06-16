import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '.3rem 1rem',
  fontWeight: 400,
  fontSize: '1rem',
  borderRadius: '8px',
}));

export default CustomButton;