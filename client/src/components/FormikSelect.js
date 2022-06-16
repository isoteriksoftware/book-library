import React from 'react';
const { FormControl, InputLabel, Select } = "@mui/material";
const { useField } = require("formik");

const FormikSelect = ({label, children, ...props}) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <FormControl color="primary" variant="outlined" style={{width: '100%'}}>
          <InputLabel>{label}</InputLabel>
          <Select
              label={label}
              {...field}
              {...props}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched ? meta.error : ''}
          >
          {children}
          </Select>
        </FormControl>
      </>
    );
};

export default FormikSelect;