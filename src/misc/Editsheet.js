import * as React from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { LinearProgress, Typography } from '@mui/material';
import useSWR from 'swr';
import { DataGrid, GridActionsCellItem, GridRowModes, GridRowEditStopReasons, GridToolbarContainer, GridToolbarQuickFilter, GridCellEditStopReasons } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack'
import EditTextarea from '../indexPages/EditTextarea';
import { updateMisc, viewSheet } from '../swrApi/miscApi';
import dayjs from 'dayjs';
import LoadingModal from '../Components/LoadingModal';

function isKeyboardEvent(event) {
  return !!event.key;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(1,0,0,2)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `5px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `5px solid ${theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 2,
  },

}));

const Editsheet = () => {
  const location = useLocation()
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { data, isLoading, error, mutate } = useSWR(location?.state !== null ? { url: '/misc', args: location.state } : null, viewSheet, {
    revalidateOnFocus: false,
  })
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false)
  const columns = [
    { field: 'date', headerName: 'Date', width: 130, editable: true, type: 'dateTime', },
    { field: 'particulars', headerName: 'Statement', minWidth: 400, editable: true, type: 'string', renderEditCell: (params) => <EditTextarea  {...params} /> },
    {
      field: 'debit', headerName: 'Debit', width: 130,
      // valueGetter: (params) => params.row.type == 'Debit'? params.row.amount : '', 
      editable: true, type: 'number'

    },
    {
      field: 'credit', headerName: 'Credit', width: 130,
      // valueGetter: (params) => params.row.type == 'Credit' ? params.row.amount :'',
      editable: true, type: 'number'
    },
    { field: 'billno', headerName: 'Bill No', minWidth: 130, editable: true },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Edit',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,

        ];
      },
    },


  ];
  React.useEffect(() => {
    const arr = [];
    data?.items?.forEach((item, i) => {
      // const date = dayjs(item.date).format("DD/MM/YYYY")
      let debit;
      let credit;
      if (item.type == 'Debit') {
        debit = item.amount;
      } else if (item.type == 'Credit') {
        credit = item.amount
      }
      const newdat = new Date(item.date)
      arr.push({ debit, credit, date: newdat, particulars: item.particulars, billno: item.billno, id: item.id })

    })
    setRows(arr)
  }, [data])
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const processRowUpdate = async (newRow, oldRow) => {
    const ledgerName = location.state;
    // console.log(newRow)
    if (!isNaN(newRow.debit) && !isNaN(newRow.credit) && (newRow.debit === 0 || newRow.credit === 0) && !(newRow.debit > 0 && newRow.credit > 0)) {
      const formDate = dayjs(newRow.date).format('MM/DD/YYYY HH:MM:ss');
      try {
        setLoading(true);
        const resp = await updateMisc({ ...newRow, ledgerName, date: formDate })
        if (resp == 200) {
          if (newRow.debit === 0 && newRow.credit === 0) {
            const updatedRow = { ...newRow };
            mutate()
            setLoading(false);
            enqueueSnackbar('Deleted Successfully !', { variant: 'success' })
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
          } else {
            const updatedRow = { ...newRow };
            mutate()
            setLoading(false);
            enqueueSnackbar('Edited Successfully !', { variant: 'success' })
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
          }
        }
      } catch (err) {
        setLoading(false);
        enqueueSnackbar('Failed !', { variant: 'error' })
        return oldRow
      }
    } else {
      console.log('invalid input')
      enqueueSnackbar('Invalid Input !', { variant: 'warning' })

      return oldRow
    }
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log(error)
  }, []);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>

        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput.split(',').map((value) => value.trim())
          }
          quickFilterFormatter={(quickFilterValues) => quickFilterValues.join(', ')}
          debounceMs={200} // time before applying the new quick filter value
        />
      </GridToolbarContainer>
    );
  }
  const pageSize = [10, 20, 40, 80, 100]
  const handleTest = () => {
    console.log(location)
  }
  if(loading) return <LoadingModal/>
  return (
    <>  {error ? <> <Typography variant='h5'>Not Found</Typography> </> :
      <Box sx={{ width: {sx:'100%'} }}>       
          <Stack spacing={2}>
            <Item><Typography>Opening Balance : {data?.balance?.openbal}</Typography></Item>
            <Item>
            <StyledDataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                //page: 0, pageSize: 10 [5, 10]
              }}
              pageSizeOptions={pageSize}

              editMode="row"
              getRowHeight={() => 'auto'}
              getRowSpacing={() => 'auto'}
              slots={{ noRowsOverlay: LinearProgress, toolbar: CustomToolbar, loadingOverlay: LinearProgress, }}
              loading={isLoading}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onCellDoubleClick={(params, event) => {
                if (!event.ctrlKey) {
                  event.defaultMuiPrevented = true;
                }
              }}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              onCellEditStop={(params, event) => {
                if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
                  return;
                }
                if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
                  event.defaultMuiPrevented = true;
                }
              }}
            />
            </Item>
            <Item><Typography>Closing Balance : {data?.balance?.closebal}</Typography></Item>

          </Stack>
      </Box>

    }




    </>
  )
}

export default Editsheet