import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';
import { Form, Formik } from "formik";
import FormikField from '../components/FormikField';
import FormikDesktopDatePicker from '../components/FormikDesktopDatePicker';
import { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { axiosInstance, generateErrorsMarkup, ReactSwal, showError, showLoading, showNetworkError, showSuccess } from '../components/utils';

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

const Checkin = () => {
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [check, setCheck] = useState(null);

  const { isbn } = useParams();

  useEffect(() => {
    showLoading();

    axiosInstance.get('book/' + isbn)
    .then(res => {
      ReactSwal.close();

      if (res.status === 200) {
        const data = res.data.checks[res.data.checks.length - 1];
        setDate(data.checkout_date);
        setReturnDate(data.return_date);
        setCheck(data);
      }
      else
        showNetworkError();
    })
    .catch((e) => {
      ReactSwal.close();

      console.log(e);
      showNetworkError();
    });
  }, [isbn]);

  const handleDateChange = (newValue) => {
    setDate(newValue);
    setReturnDate(new Date(new Date(newValue).getTime() + (15 * 8.64e+7)));
  };

  const handleReturnDateChange = (newValue) => {
    setReturnDate(newValue);
  };

  const submit = () => {
    showLoading('Please wait...');

    axiosInstance.post('book/checkin/' + isbn, {})
    .then(res => {
      ReactSwal.close();

      if (res.status === 200)
        showSuccess('Success', 'Book Checked-in!');
      else if (res.status === 400) {
        showError('Oops!', generateErrorsMarkup(res.data.messages));
      }
      else
        showNetworkError();
    })
    .catch((e) => {
      ReactSwal.close();

      console.log(e);
      showNetworkError();
    });
  };

  return (
    <Layout>
      <Root>
        <Typography variant='h4' className='title'>Check-in</Typography>

        <div className="formContainer">
          <Formik
            enableReinitialize={true}
            initialValues={{
              borrower_name: check ? check.borrower_name : '',
              borrower_phone: check ? check.borrower_phone : '',
              borrower_nid: check ? check.borrower_nid : '',
              checkout_date: check ? check.checkout_date : date,
              return_date: check ? check.return_date : returnDate,
            }}

            validationSchema={yup.object({
              borrower_name: yup.string()
                .required('Please enter borrower\'s name'),
              borrower_phone: yup.string()
                .required('Please enter borrower\'s phone'),
              borrower_nid: yup.string()
                .required('Please enter borrower\'s national ID')
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(11, 'Must be exactly 11 digits')
                .max(11, 'Must be exactly 11 digits'),
              checkout_date: yup.date()
                .required('Please enter check-out date'),
              return_date: yup.date()
                .required('Please enter return date'),
            })}

            onSubmit={submit}
          >
            <Form className="form">
              <FormikField
                name="borrower_name"
                variant="outlined"
                label="Borrower's Name"
                color="secondary"
                className="form-input"
                disabled={true}
                InputProps={{ className: "field" }}
              />
              <FormikField
                name="borrower_phone"
                variant="outlined"
                label="Borrower's Phone"
                color="secondary"
                className="form-input"
                disabled={true}
                InputProps={{ className: "field" }}
              />
              <FormikField
                name="borrower_nid"
                variant="outlined"
                label="Borrower's National ID"
                color="secondary"
                className="form-input"
                disabled={true}
                InputProps={{ className: "field" }}
              />
              <FormikDesktopDatePicker
                name="checkout_date"
                variant="outlined"
                label="Check-out Date"
                color="secondary"
                className="form-input"
                inputFormat="DD/MM/yyyy"
                disabled={true}
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
                disabled={true}
                value={returnDate}
                onChange={handleReturnDateChange}
                InputProps={{ className: "field" }}
              />

              <CustomButton color="secondary" variant="contained" type="submit" className="btn">
                Check-in
              </CustomButton>
            </Form>
          </Formik>
        </div>
      </Root>
    </Layout>
  );
};

export default Checkin;