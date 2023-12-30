import * as React from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { Grid, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import useSWR from 'swr';
import { generateBill } from '../swrApi/helperApis';
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';

const BillsData = () => {
    const location = useLocation()
    const [rows, setRows] = React.useState([])
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const particularWidth = React.useCallback(() => {
        if (isXs) {
          return 200;
        } else if (isSm) {
          return 350;
        } else if (isMd) {
          return 400;
        }else{
          return 400
        }
      },[isXs,isSm,isMd]);
      const amountWidth = React.useCallback(() =>{
        if (isXs) {
          return 100;
        } else if (isSm) {
          return 120;
        } else if (isMd){
          return 130;
        }
    
      },[isXs,isSm,isMd])
      const dateWidth = React.useCallback(() => {
        if (isXs) {
          return 110;
        } else if (isSm) {
          return 150;
        } else {
          return 180;
        }
      },[isXs,isSm]);
    const { data: billData, isLoading, error } = useSWR(location.state?.details !== null ? { url: '/exec', args: location.state.details } : null, generateBill, {
        revalidateOnFocus: false,
    })

    const columns = [
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'particulars', headerName: 'Statement', minWidth: 400 },
        {
            field: 'debit', headerName: 'Debit', width: 130,
            valueGetter: (params) => params.row.type == 'Debit' & (params.row.flag !== true) ? params.row.amount : params.row.debitT
            ,

        },
        {
            field: 'credit', headerName: 'Credit', width: 130,
            valueGetter: (params) => (params.row.type == 'Credit') & (params.row.flag !== true) ? params.row.amount : params.row.creditT
            ,
        },
    ];
    const updatedColumns = columns.map(col => ({
        ...col,
        width: col.field === 'particulars' ? particularWidth() : col.field === 'date' ? dateWidth() :col.field === 'debit' || col.field === 'credit' ? amountWidth() : col.width,
      }));
    React.useEffect(() => {
        const arr = [];
        let debitT = 0;
        let creditT = 0;
        billData?.items?.forEach((item, i) => {

            const date = dayjs(item.date,'DD/MM/YYYY HH:mm:ss').format("DD/MM/YYYY")
            if (item.type == 'Debit') debitT += item.amount;
            if (item.type == 'Credit') creditT += item.amount;

            if (item.type !== 'Deleted') {
                arr.push({ ...item, date, id: i })
            }


        })
        // arr.push({ date: '--', particulars: `--`, debitT: '--', creditT: '--', id: arr.length + 2})
        arr.push({ date: '', particulars: ``, debitT: '', creditT: '', id: arr.length + 100, flag: true })
        arr.push({ date: '', particulars: `Total`, debitT:`${debitT} Rs`, creditT:`${creditT} Rs`, id: arr.length + 101, flag: true })
        arr.push({ date: ``, debitT:"--", creditT :"--", particulars: `Opening Balance : ${billData?.balance?.openbal} Rs`, id: arr.length + 102, flag: true })
        arr.push({ date: '--', particulars: `Closing Balance :${billData?.balance?.closebal} Rs`, debitT: '--', creditT: '--', id: arr.length + 103 })
        arr.push({ date: '--', particulars: `--`, debitT: '--', creditT: '--', id: arr.length + 104 })

        setRows(arr)
    }, [billData])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport printOptions={{
                    hideFooter: true,
                    hideToolbar: true,
                }}

                />

                <GridToolbarDensitySelector />
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

    return (
        <>  {error ? <> <Typography variant='h5'>Not Found</Typography> </> :
            <Grid container sx={{ width: {sx:'100%',md:'70vw', lg: '70vw',xl:'60vw'} }}>
                <Box sx={{ width: '100%', mx: 'auto',mb:2 }}>
                    <Stack spacing={2}>
                        <Item><Typography>Opening Balance : {billData?.balance?.openbal} Rs</Typography></Item>
                        <Item>
                        <DataGrid
                            rows={rows}
                            columns={updatedColumns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={pageSize}
                            getRowHeight={() => 'auto'}
                            getRowSpacing={() => 'auto'}
                            slots={{ noRowsOverlay: LinearProgress, toolbar: CustomToolbar, loadingOverlay: LinearProgress, }}
                            loading={isLoading}
                            sx = {{fontSize:15}}
                        />
                        </Item>
                        <Item><Typography>Closing Balance : {billData?.balance?.closebal} Rs</Typography></Item>

                    </Stack>



                </Box>
            </Grid>

        }




        </>
    )
}

export default BillsData