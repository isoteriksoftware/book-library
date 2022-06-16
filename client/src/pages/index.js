import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../components/Layout";

const Root = styled('div')(({ theme }) => ({
  
}));

const Section1 = styled('div')(({ theme }) => ({
  height: 400,
  width: '100%',
  marginTop: '2rem',

  '& .title': {
    marginBottom: '1rem'
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

const rows = [
  { title: 'Book 1', isbn: '125373849', publishYear: '2022', coverPrice: 1400, status: 'Checked Out' },
];

const Index = () => {
  return (
    <Layout>
      <Root>
        <Section1>
          <Typography variant='h5' className='title'>Available Books</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={row => row.isbn}
          />
        </Section1>
      </Root>
    </Layout>
  );
};

export default Index