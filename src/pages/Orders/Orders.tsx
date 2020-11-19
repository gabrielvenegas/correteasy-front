import React, { useState, useEffect, useContext, memo, Fragment } from 'react';
import SearchBar from 'material-ui-search-bar';
import { Grid, Paper, Tabs, Tab, Typography, Box, TableRow, TableCell } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import OrderTable, {
  Column,
} from '../../components/shared/Table';
import Container from '../../components/shared/Container';
import Breadcrumb, {
  BreadcrumbItem,
} from '../../components/shared/Breadcrumb';
import API from '../../services/services';
import { AlertContext } from '../../contexts/AlertContext';
import OrderItemsDetails from './OrderItemsDetails';


const Breadcrumbs: BreadcrumbItem[] = [
  {
    id: 1,
    isLink: false,
    name: 'Pedidos',
    route: ''
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span" variant="body1">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yprops = (index: any) => (
  {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
);

const OrdersPage = memo((props: any) => {
  const { setAlert } = props;
  const [open, setOpen] = useState<boolean | string>(false);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);


  const handleClickOpen = (id: string): any => {
    setOpen(id);
  };

  const handleClose = (): any => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const columns: Column[] = [
    {
      name: 'order_id',
      label: 'Cód.',
    },
    {
      name: 'order_mkt_id',
      label: 'Cód. Mkt',
    },
    {
      name: 'order_am_id',
      label: 'Cód. Reserva',
    },
    {
      name: 'state_mkt',
      label: 'Status Mkt',
    },
    {
      name: 'state_reserva',
      label: 'Status Reserva',
    },
    {
      name: 'divergent',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => (
          <div className="flex flexAlignItemsCenter">
            <div
              className={`iconRedondoStatus ${
                !value ? 'cellStatusAtivo' : 'cellStatusInativo'
              }`}
            />
            <div className="flex flexAlignItemsCenter flexJustifyCenter">
              {value ? 'Divergente' : 'Não divergente'}
            </div>
          </div>
        ),
        setCellHeaderProps: (): any => ({ align: 'center' }),
      },
    }
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await API.get<any[]>('/orders');
        setOrders(data);
      } catch (err) {
        setAlert({
          open: true,
          type: 'error',
          message: 'Registro não encontrado',
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [setAlert]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h2">
            Checagem de Pedidos
          </Typography>
          <Breadcrumb links={Breadcrumbs} />
        </Grid>
        <Container
          title="Pedidos"
        >
          {!loading ? (
            <>
              <Paper style={{ marginLeft: 20, marginRight: 20 }} square>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  {
            !!orders && orders.map((mkt, index) => (
              <Tab key={mkt.label} label={mkt.label} {...a11yprops(index)} />
            ))
          }
                </Tabs>
              </Paper>
              {
            !!orders && orders.map((mkt, index) => (
              <TabPanel key={mkt.label} value={value} index={index}>

                <div className="flex flexJustifyCenter flexAlignItemsCenter">
                  <Grid item xs={12} sm={8} lg={6}>
                    <SearchBar
                      style={{ marginLeft: 20, marginRight: 20, marginBottom: 15 }}
                      placeholder="Procurar por um pedido..."
                      value={search}
                      onChange={(value: string) => setSearch(value)}
                      onRequestSearch={() => {}}
                    />
                  </Grid>
                </div>
                <OrderTable
                  options={{
                    elevation: 2,
                    filter: true,
                    filterType: 'dropdown',
                    expandableRows: true,
                    expandableRowsOnClick: true,
                    rowsExpanded: [0, 1],
                    renderExpandableRow: (rowData, rowMeta) => {
                      const items = mkt.orders[rowMeta.dataIndex].order_items;
                      const idDialog = `${rowMeta.dataIndex}_`;
                      return (
                        items.map((item: any) => (
                          <Fragment key={item.id}>
                            <TableRow style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(`${idDialog}${item.id}`)} key={item.id}>
                              <TableCell colSpan={1}>
                                {item.id}
                              </TableCell>
                              <TableCell colSpan={6}>
                                {item.name}
                              </TableCell>
                            </TableRow>
                            <OrderItemsDetails item={item} open={open !== false && open === `${idDialog}${item.id}`} handleClose={handleClose} />
                          </Fragment>
                        ))
                      );
                    }
                  }}
                  selectableRows="none"
                  columns={columns}
                  data={mkt.orders}
                />
              </TabPanel>
            ))
          }
            </>

          ) : (
            <Skeleton
              className="skeleton"
              variant="rect"
              animation="wave"
              width="100%"
              height={500}
            />
          )}
        </Container>
      </Grid>
    </>
  );
});


const Orders = () => {
  const { setAlert } = useContext(AlertContext);
  return <OrdersPage {...{ setAlert }} />;
};


export default Orders;
