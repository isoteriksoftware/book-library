import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useField } from "formik";

const FormikDesktopDatePicker = ({label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <DesktopDatePicker
        label={label}
        {...props}
        renderInput={(params) =>
          <TextField
            {...props}
            {...params}
            fullWidth
            {...field}
            error={meta.touched && meta.error ? true : false}
            helperText={meta.touched ? meta.error : ''}
          />
        }
      />
    </>
  );
};

export default FormikDesktopDatePicker;