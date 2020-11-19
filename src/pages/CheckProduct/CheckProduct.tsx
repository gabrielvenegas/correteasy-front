
import React, { useContext, useState, memo } from 'react';
import SearchBar from 'material-ui-search-bar';
import { Grid, Typography, Card, CardContent, Divider, List, ListItemAvatar, ListItem, Avatar, ListItemText, Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Cancel, CheckCircle, } from '@material-ui/icons';
import Container from '../../components/shared/Container';
import Breadcrumb, {
  BreadcrumbItem,
} from '../../components/shared/Breadcrumb';
import API from '../../services/services';
import { AlertContext } from '../../contexts/AlertContext';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
  }),
);

const Breadcrumbs: BreadcrumbItem[] = [
  {
    id: 1,
    isLink: false,
    name: 'Checklist de Produto',
    route: ''
  }
];

const CheckProductPage = memo((props: any) => {
  const classes = useStyles();
  const { setAlert } = props;
  const [product, setProduct] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    setProduct([]);
    try {
      setLoading(true);
      const { data } = await API.get<any[]>(`/products/${search}`);
      setProduct(data);
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

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h2">
          Checklist de Produto
        </Typography>
      </Grid>
      <Breadcrumb links={Breadcrumbs} />
      <Container
        title="Buscar produto"
      >
        <div className="flex flexJustifyCenter flexAlignItemsCenter">
          <Grid item xs={12} sm={8} lg={6}>
            <SearchBar
              style={{ marginLeft: 20, marginRight: 20 }}
              placeholder="Procurar por um produto..."
              value={search}
              onChange={(value: string) => setSearch(value)}
              onRequestSearch={() => handleSearch()}
              // onCancelSearch={() => setProduct([])}
            />
          </Grid>
        </div>
        {
          loading && (
            <Skeleton
              className="skeleton"
              variant="rect"
              animation="wave"
              width="100%"
              height={500}
            />
          )
        }
        {
          !loading && product.skus &&
            product.skus.map((sku: any) => (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card style={{ margin: 20 }} variant="outlined">
                    <CardContent>
                      <div className={classes.section1}>
                        <Typography gutterBottom variant="h6">
                          {`Produto #${sku.product}`}
                        </Typography>
                        <Typography
                          style={{ color: (sku.active ? '#4fbfa5' : '#e46e6e') }}
                          variant="body1"
                        >
                          { sku.message}
                        </Typography>
                      </div>
                      <Divider variant="middle" />
                      <List>
                        {
                          sku.verifications.map((verification: any) => (
                            <>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar style={{
                                  backgroundColor: (verification.value ? '#4fbfa5' : '#e46e6e')
                                }}
                                  >
                                    {
                                    verification.value ? <CheckCircle /> : <Cancel />
                                  }
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={verification.descriptiveTitle} secondary={verification.message} />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </>
                          ))
                        }
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))

        }
      </Container>
    </Grid>
  );
});

const CheckProduct = () => {
  const { setAlert } = useContext(AlertContext);
  return <CheckProductPage {...{ setAlert }} />;
};

export default CheckProduct;
