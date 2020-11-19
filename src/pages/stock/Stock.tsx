import React, { useState, useEffect, useContext, memo } from 'react';
import SearchBar from 'material-ui-search-bar';
import { Grid, Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';
import StockTable, {
  Column,
} from '../../components/shared/Table';
import './Stock.css';
import Container from '../../components/shared/Container';
import Breadcrumb, {
  BreadcrumbItem,
} from '../../components/shared/Breadcrumb';
import API from '../../services/services';
import { AlertContext } from '../../contexts/AlertContext';
import { Skeleton } from '@material-ui/lab';


const Breadcrumbs: BreadcrumbItem[] = [
  {
    id: 1,
    isLink: false,
    name: 'Divergência de estoque',
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


const StockPage = memo((props: any) => {
  const { setAlert } = props;
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const columns: Column[] = [
    {
      name: 'id',
      label: 'Produto',
    },
    {
      name: 'stockReserva',
      label: 'Estoque Reserva',
    },
    {
      name: 'stock',
      label: 'Estoque Mkt ',
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
        const { data } = await API.get<any[]>('/stock');
        setProducts(data);
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
            Estoque
          </Typography>
          <Breadcrumb links={Breadcrumbs} />
        </Grid>
        <Container
          title="Divergência de estoque"
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
                !!products && products.map((mkt, index) => (
                  <Tab key={mkt.label} label={mkt.label} {...a11yprops(index)} />
                ))
              }
                </Tabs>
              </Paper>
              {
                !!products && products.map((mkt, index) => (
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
                    <StockTable selectableRows="none" columns={columns} data={mkt.products} />
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
          )
          }

        </Container>
      </Grid>
    </>
  );
});

const Stock = () => {
  const { setAlert } = useContext(AlertContext);
  return <StockPage {...{ setAlert }} />;
};

export default Stock;
