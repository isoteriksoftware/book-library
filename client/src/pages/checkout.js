import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';
import { Form, Formik } from "formik";
import FormikField from '../components/FormikField';
import FormikDesktopDatePicker from '../components/FormikDesktopDatePicker';
import { useState } from 'react';

const Root = styled('div')(({ theme }) => ({
  marginTop: '2rem',

  '& .title': {
    marginBottom: '1.5rem',
  },
  '& .form-input': {
    marginBottom: '1.2rem',
    borderRadius: '10px !important',
  },
  '& .field': {
    borderRadius: '10px !important',
    width: '600px',
  },
}));

const Checkout = () => {
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + (15 * 8.64e+7)));

  const handleDateChange = (newValue) => {
    setDate(newValue);
    setReturnDate(new Date(new Date(newValue).getTime() + (15 * 8.64e+7)));
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDate(newValue);
  };

  return (
    <Layout>
      <Root>
        <Typography variant='h4' className='title'>Check-out</Typography>

        <div className="formContainer">
          <Formik>
            <Form className="form">
              <FormikField
                name="borrower_name"
                variant="outlined"
                label="Borrower's Name"
                color="secondary"
                className="form-input"
                InputProps={{ className: "field" }}
              />
              <FormikField
                name="borrower_phone"
                variant="outlined"
                label="Borrower's Phone"
                color="secondary"
                className="form-input"
                InputProps={{ className: "field" }}
              />
              <FormikField
                name="borrower_nid"
                variant="outlined"
                label="Borrower's National ID"
                color="secondary"
                className="form-input"
                InputProps={{ className: "field" }}
              />
              <FormikDesktopDatePicker
                name="checkout_date"
                variant="outlined"
                label="Check-out Date"
                color="secondary"
                className="form-input"
                inputFormat="DD/MM/yyyy"
                value={date}
                onChange={handleDateChange}
                InputProps={{ className: "field" }}
              />
              <FormikDesktopDatePicker
                name="return_date"
                variant="outlined"
                label="Return Date"
                color="secondary"
                className="form-input"
                inputFormat="DD/MM/yyyy"
                value={returnDate}
                onChange={handleReturnDateChange}
                InputProps={{ className: "field" }}
              />
            </Form>
          </Formik>
        </div>
      </Root>
    </Layout>
  );
};

export default Checkout;