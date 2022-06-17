import { Dialog, DialogContent, DialogTitle, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../components/Layout";
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from 'react';
import SlideTransition from "../components/SlideTransition";
import { axiosInstance, showError, showNetworkError } from '../components/utils';
import { useHistory } from 'react-router-dom';

const Root = styled('div')(({ theme }) => ({
  
}));

const Section1 = styled('div')(({ theme }) => ({
  height: 400,
  width: '100%',
  marginTop: '2rem',

  '& .title': {
    marginBottom: '1rem'
  },
  '& .actionBtns': {
    display: 'flex',
    columnGap: '1.5rem',
    marginTop: '2rem',
  }
}));

const columns = [
  {
    field: 'title',
    headerName: 'Book Title',
    width: 200,
  },
  {
    field: 'isbn',
    headerName: 'ISBN',
    width: 200,
  },
  {
    field: 'publishYear',
    headerName: 'Publish Year',
    width: 200,
  },
  {
    field: 'coverPrice',
    headerName: 'Cover Price',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
  },
];

const DetailRow = ({ title, value }) => {
  const Row = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
  }));

  return (
    <>
      <Row>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body1'>{value}</Typography>
      </Row>

      <Divider/>
    </>
  );
};

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .historyTitle': {
    marginTop: '2rem',
    fontWeight: 500,
  }
}));

const Index = () => {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [disableCheckout, setDisableCheckout] = useState(true);
  const [disableCheckin, setDisableCheckin] = useState(true);
  const [disableDetails, setDisableDetails] = useState(true);
  const [books, setBooks] = useState([]);

  const history = useHistory();

  const showDetails = () => {
    if (selectedBooks.length === 0) {
      showError('Oops!', 'Please select a book first');
      return;
    }

    if (selectedBooks.length > 1) {
      showError('Oops!', 'Please select only one book');
      return;
    }

    setShowDetailsDialog(true);
  };

  useEffect(() => {
    axiosInstance.get('book')
    .then(res => {
      if (res.status === 200)
        setBooks(res.data);
      else
        showNetworkError();
    })
    .catch((e) => {
      console.log(e);
      showNetworkError();
    });
  }, []);

  useEffect(() => {
    if (books.length === 0)
    return;
    
    setSelectedBook(null);

    if (selectedBooks.length === 1)
      setSelectedBook(books.find(row => row.isbn === selectedBooks[0]));
  }, [books, selectedBooks]);

  useEffect(() => {
    if (selectedBook == null) {
      setDisableCheckin(true);
      setDisableCheckout(true);
      setDisableDetails(true);
    }
    else {
      setDisableCheckin(selectedBook.status === 'Checked-in');
      setDisableCheckout(selectedBook.status === 'Checked-out');
      setDisableDetails(false);
    }
  }, [selectedBook]);

  const checkout = () => {
    if (selectedBook === null)
      return;

    history.push('checkout/' + selectedBook.isbn);
  };

  const checkin = () => {
    if (selectedBook === null)
      return;

    history.push('checkin/' + selectedBook.isbn);
  };

  return (
    <Layout>
      <Root>
        <Section1>
          <Typography variant='h5' className='title'>Available Books</Typography>
          <DataGrid
            rows={books}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableMultipleSelection
            getRowId={row => row.isbn}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectedBooks(newSelectionModel);
            }}
            selectionModel={selectedBooks}
          />

          <div className='actionBtns'>
            <CustomButton variant="contained" color="secondary" className='btn' disabled={disableCheckin} onClick={checkin}>
              Check-in
            </CustomButton>
            <CustomButton variant="contained" color="secondary" className='btn' disabled={disableCheckout} onClick={checkout}>
              Check-out
            </CustomButton>
            <CustomButton variant="contained" color="secondary" className='btn' disabled={disableDetails} onClick={showDetails}>
              Details
            </CustomButton>
          </div>
        </Section1>

        <CustomDialog
          fullWidth
          open={showDetailsDialog}
          scroll="body"
          maxWidth="sm"
          onClose={() => setShowDetailsDialog(false)}
          TransitionComponent={SlideTransition}
        >
          <DialogTitle>Book Details</DialogTitle>
          <DialogContent>
            {selectedBook && (
              <>
                <List>
                  <DetailRow
                    title='Book title'
                    value={selectedBook.title}
                  />
                  <DetailRow
                    title='ISBN'
                    value={selectedBook.isbn}
                  />
                  <DetailRow
                    title='Publish year'
                    value={selectedBook.publishYear}
                  />
                  <DetailRow
                    title='Cover price'
                    value={selectedBook.coverPrice}
                  />
                  <DetailRow
                    title='Status'
                    value={selectedBook.status}
                  />

                  {selectedBook.status === 'Checked-out' && 
                    <DetailRow
                      title='Checked-out by'
                      value={selectedBook.status}
                    />}
                </List>

                <Typography variant='h5' className='historyTitle'>History</Typography>
                <List>
                  {selectedBook.checks.map((value, index) => 
                    <ListItem key={index}>
                      <ListItemText primary={`${value.borrower_name} ${value.status}`} secondary={`on ${value.created_at}`}/>
                    </ListItem>)}
                </List>
              </>
            )}
          </DialogContent>
        </CustomDialog>
      </Root>
    </Layout>
  );
};

export default Index