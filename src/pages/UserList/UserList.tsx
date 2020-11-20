import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import UserListTable, { Column } from '../../components/shared/Table';
import '../../pages/UserList/UserList.css';

const UserList = () => {
  const columns: Column[] = [
    {
      name: 'id',
      label: 'Cód.',
    },
    {
      name: 'name',
      label: 'Nome',
    },
    {
      name: 'phone',
      label: 'Telefone',
    },
    {
      name: 'mail',
      label: 'Email',
    },
    {
      name: 'active',
      label: 'Situacao',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => (
          <div className="flex flexAlignItemsCenter">
            <div
              className={`iconRedondoStatus ${
                value ? 'cellStatusAtivo' : 'cellStatusInativo'
              }`}
            />
            <div className="flex flexAlignItemsCenter flexJustifyCenter">
              {value ? 'Ativo' : 'Inativo'}
            </div>
          </div>
        ),
        setCellHeaderProps: (): any => ({ align: 'center' }),
      },
    },
  ];
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom className="titulo-lista">
            Listagem de usuários
          </Typography>
        </Grid>
        <Grid item xs={6} className="botao-criar-usuario">
          <Button variant="contained" href="/usuario">
            Criar Novo Usuário
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div>
            <UserListTable
              columns={columns}
              data={[
                {
                  id: 1,
                  name: 'daniel',
                  phone: '9999-9999',
                  mail: 'daniel.venegas.jc@gmail.com',
                  active: true,
                },
              ]}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default UserList;
