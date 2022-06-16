import { Button } from "@mui/material";
import { styled } from "@mui/system";

const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: '.1rem 1rem',
  fontWeight: 600,
  fontSize: '1rem',
  border: '4px solid rgba(255, 255, 255, 0.9)',
  boxShadow: '0px 10px 35px 2px rgba(81, 75, 201, 0.25)',
  borderRadius: '8px',
}));

export default CustomButton;