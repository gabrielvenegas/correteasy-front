/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-one-expression-per-line */
// Componente baseado em https://material-ui.com/components/tables/

import React, { useState } from 'react';
import MUIDataTable, {
  MUIDataTableColumnOptions,
  Responsive,
  MUIDataTableState,
  SelectableRows,
  MUIDataTableOptions,
  MUIDataTableTextLabels,
} from 'mui-datatables';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh,
} from '@material-ui/icons';
import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import ModalWithTransition from '../Modal';
import BootstrapTooltip from '../Tooltip';
import './styles.css';
import { stringToTitleCase } from '../../../utils/ConversionEvents';

interface ActionProps {
  type?: string;
  onClick?: (event: any) => void;
  route?: string;
  icon?: JSX.Element;
  text?: string;
  modalWidth?: string;
  component?: () => JSX.Element;
  target?: string;
  disabled?: boolean;
}

interface ActionsProps {
  buttonProps: ActionProps[];
}

const getMuiTheme = (): Theme =>
  createMuiTheme({
    overrides: {
      MUIDataTableToolbarSelect: {
        root: {
          boxShadow: 'none !important',
          backgroundColor: '#feebf2',
          borderRadius: 0,
          minHeight: '65px',
        },
      },
      MUIDataTableSelectCell: {
        checked: { color: 'var(--tannat)!important' },
      },
      MUIDataTableToolbar: {
        icon: {
          '&:hover': {
            color: 'var(--tannat);',
          },
        },
      },
      MuiPaper: {
        elevation4: {
          boxShadow: 'none !important',
        },
      },
    },
  } as ThemeOptions);

export const Delete = (props: ActionProps): JSX.Element => {
  const { onClick } = props;
  return (
    <BootstrapTooltip title="Excluir" arrow placement="top">
      <IconButton onClick={(event: any): void => onClick!(event)}>
        <DeleteIcon />
      </IconButton>
    </BootstrapTooltip>
  );
};

export const Disable = (props: ActionProps): JSX.Element => {
  const { onClick } = props;
  return (
    <BootstrapTooltip title="Ativar/Inativar" arrow placement="top">
      <IconButton onClick={(event: any): void => onClick!(event)}>
        <Refresh />
      </IconButton>
    </BootstrapTooltip>
  );
};

export const Edit = (props: ActionProps): JSX.Element => {
  const { route, onClick, disabled } = props;
  return (
    <BootstrapTooltip title="Editar" arrow placement="top">
      {route ? (
        <IconButton component={RouterLink} to={route} disabled={disabled}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={(event: any): void => onClick!(event)}
          disabled={disabled}
        >
          <EditIcon />
        </IconButton>
      )}
    </BootstrapTooltip>
  );
};

export const RouteButton = (props: ActionProps): JSX.Element => {
  const { route, onClick, icon, text, target = '_self' } = props;
  return (
    <BootstrapTooltip title={text} arrow placement="top">
      {route ? (
        <IconButton component={RouterLink} to={route} target={target}>
          {icon}
        </IconButton>
      ) : (
        <IconButton onClick={(event: any): void => onClick!(event)}>
          {icon}
        </IconButton>
      )}
    </BootstrapTooltip>
  );
};

export const OtherButton = (props: ActionProps): JSX.Element => {
  const { onClick, icon, text, disabled } = props;
  return (
    <BootstrapTooltip title={text} arrow placement="top">
      <IconButton
        onClick={(event: any): void => onClick!(event)}
        disabled={disabled}
      >
        {icon}
      </IconButton>
    </BootstrapTooltip>
  );
};

export const ModalButton = (props: ActionProps): JSX.Element => {
  const { text, icon, component: ModalComponent, modalWidth } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <BootstrapTooltip title={text} arrow placement="top">
        <IconButton onClick={(): void => setOpen(true)}>{icon}</IconButton>
      </BootstrapTooltip>

      {ModalComponent && (
        <ModalWithTransition
          open={open}
          handleClose={setOpen}
          modalWidth={
            modalWidth || (window.screen.width > 1600 ? '50vw' : '60vw')
          }
        >
          <ModalComponent />
        </ModalWithTransition>
      )}
    </>
  );
};

export const Actions = (props: ActionsProps): JSX.Element => {
  const arrayProps = props;
  const deleteButton = arrayProps.buttonProps.filter(
    (prop) => prop.type === 'DELETAR',
  )[0];
  const editButton = arrayProps.buttonProps.filter(
    (prop) => prop.type === 'EDITAR',
  )[0];
  const disableButton = arrayProps.buttonProps.filter(
    (prop) => prop.type === 'DISABLE',
  )[0];

  let deleteClickEvent;
  let editClickEvent;
  let disableClickEvent;
  let route;
  let disabled;

  if (deleteButton) {
    deleteClickEvent = deleteButton.onClick;
  }

  if (editButton) {
    route = editButton.route;
    editClickEvent = editButton.onClick;
    disabled = editButton.disabled;
  }

  if (disableButton) {
    disableClickEvent = disableButton.onClick;
  }

  const RouteButtons = (): JSX.Element => (
    <>
      {arrayProps.buttonProps
        .filter((prop) => prop.type === 'ROTA')
        .map((item, index) => (
          <RouteButton
            key={index}
            type="ROTA"
            route={item.route}
            icon={item.icon}
            text={item.text}
            onClick={item.onClick}
            target={item.target}
          />
        ))}
    </>
  );

  const ModalButtons = (): JSX.Element => (
    <>
      {arrayProps.buttonProps
        .filter((prop) => prop.type === 'MODAL')
        .map((item, index) => (
          <ModalButton
            key={index}
            type="MODAL"
            icon={item.icon}
            text={item.text}
            component={item.component}
            modalWidth={item.modalWidth}
          />
        ))}
    </>
  );

  const OtherButtons = (): JSX.Element => (
    <>
      {arrayProps.buttonProps
        .filter((prop) => prop.type === 'OTHER')
        .map((item, index) => (
          <OtherButton
            key={index}
            type="OTHER"
            icon={item.icon}
            text={item.text}
            onClick={item.onClick}
            disabled={item.disabled}
          />
        ))}
    </>
  );

  return (
    <div className="flexWrapCenterCenter">
      <ModalButtons />
      <RouteButtons />
      <OtherButtons />
      {deleteClickEvent && <Delete type="DELETAR" onClick={deleteClickEvent} />}
      {disableButton && <Disable type="DISABLE" onClick={disableClickEvent} />}
      {route ? (
        <Edit type="EDITAR" route={route} disabled={disabled} />
      ) : (
        editClickEvent && (
          <Edit type="EDITAR" onClick={editClickEvent} disabled={disabled} />
        )
      )}
    </div>
  );
};

export const StatusColumn = (value: string): JSX.Element => (
  <div className="flex flexAlignItemsCenter">
    <div
      className={`iconRedondoStatus ${
        value === 'PENDENTE'
          ? 'cellStatusPending'
          : value === 'PROCESSANDO'
          ? 'cellStatusProcessing'
          : value === 'ENVIADO'
          ? 'cellStatusAtivo'
          : 'cellStatusInativo'
      }`}
    />
    <div className="flex flexAlignItemsCenter flexJustifyCenter">
      {stringToTitleCase(value)}
    </div>
  </div>
);

export const BooleanColumn = (valor: boolean): JSX.Element => (
  <div className="flex flexAlignItemsCenter">
    <div
      className={`iconRedondoStatus ${
        valor ? 'cellStatusAtivo' : 'cellStatusInativo'
      }`}
    />
    <div className="flex flexAlignItemsCenter flexJustifyCenter">
      {valor ? 'Ativo' : 'Inativo'}
    </div>
  </div>
);

// TODO - Temp override of BooleanColumn component
export const BooleanColumnReverse = (valor: boolean): JSX.Element => (
  <div className="flex flexAlignItemsCenter">
    <div
      className={`iconRedondoStatus ${
        valor ? 'cellStatusPending' : 'cellStatusAtivo'
      }`}
    />
    <div className="flex flexAlignItemsCenter flexJustifyCenter">
      {valor ? 'Open' : 'Close'}
    </div>
  </div>
);

export const LinkColumn = (value: string): JSX.Element => (
  <div className="flex flexAlignItemsStart flexJustifyStart">
    <a
      href={value}
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: '#c81a78' }}
    >
      Acessar URL
    </a>
  </div>
);

const fixedOptions: MUIDataTableOptions = {
  filter: true,
  print: false,
  serverSide: false,
  textLabels: {
    body: {
      noMatch: 'Nenhum dado encontrado.',
      toolTip: 'Filtrar',
      columnHeaderTooltip: (column: any): string =>
        `Ordenar por ${column.label}`,
    },
    pagination: {
      next: 'Próxima Pagina',
      previous: 'Página Anterior',
      rowsPerPage: 'Linhas por página:',
      displayRows: 'de',
    },
    toolbar: {
      search: 'Pesquisar por texto',
      downloadCsv: 'Exportar para CSV',
      print: 'Imprimir',
      viewColumns: 'Escolher Colunas',
      filterTable: 'Filtrar Tabela',
    },
    filter: {
      all: 'Todos',
      title: 'Filtros',
      reset: 'Voltar ao Padrão',
    },
    viewColumns: {
      title: 'Exibir Colunas',
      titleAria: 'Exibir/Esconder colunas',
    },
    selectedRows: {
      text: 'Registro(s) selecionado(s)',
      delete: 'Excluir',
      deleteAria: 'Excluir linhas selecionadas',
    },
  } as MUIDataTableTextLabels,
};

export interface Column {
  label?: string;
  name: string;
  customBodyRender?: (
    value: any,
    tableMeta: any,
    updateValue: any,
  ) => React.Component;
  options?: MUIDataTableColumnOptions;
}

function setCellNoWrapText(columns: Column[]): Column[] {
  columns.forEach((item) => {
    item.options = {
      setCellProps: (): any => ({
        className: 'noWrap',
        style: {
          whiteSpace: 'nowrap',
          height: '45px',
        },
      }),
    };
  });

  return columns;
}

interface TableProps {
  options?: MUIDataTableOptions,
  data: any[];
  columns: Column[];
  currentPage?: number;
  totalRecords?: number;
  rowsPerPage?: number;
  exportToCSV?: boolean;
  fileNameExportCSV?: string;
  selectableRows?: SelectableRows;
  responsiveOption?: Responsive;
  noWrapTextInCells?: boolean;
  onSearchChange?: any;
  searchText?: string;
  onTableChange?: (
    action: string,
    tableState: MUIDataTableState,
  ) => void | undefined;
  onChangePage?: (currentPage: number) => void;
  onChangeRowsPerPage?: (numberOfRows: number) => void;
  onRowsDelete?: (
    selectedRows: Array<{ index: number; dataIndex: number }>,
  ) => void;
}
const Table = (props: TableProps): JSX.Element => {
  const {
    data,
    columns,
    currentPage,
    totalRecords,
    rowsPerPage: rowsPerPageProp,
    exportToCSV,
    fileNameExportCSV,
    selectableRows: selectableRowsProp,
    noWrapTextInCells,
    onTableChange: onTableChangeProp,
    onChangePage: onChangePageProp,
    onChangeRowsPerPage: onChangeRowsPerPageProp,
    onRowsDelete,
    onSearchChange,
    searchText,
    options
  } = props;

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title=""
        columns={noWrapTextInCells ? setCellNoWrapText(columns) : columns}
        data={data}
        options={{
          ...options,
          onTableChange: onTableChangeProp,
          onChangePage: onChangePageProp,
          onChangeRowsPerPage: onChangeRowsPerPageProp,
          customToolbarSelect: (
            selectedRows,
            displayData,
            setSelectedRows,
          ): JSX.Element => (
            <div className="iconButtonToolbarTable">
              <BootstrapTooltip
                title="Excluir Selecionada(s)"
                arrow
                placement="left"
              >
                <IconButton
                  onClick={(): void => onRowsDelete!(selectedRows.data)}
                >
                  <DeleteIcon />
                </IconButton>
              </BootstrapTooltip>
            </div>
          ),
          filterType: 'multiselect',
          responsive: 'standard',
          page: currentPage || 0,
          count: totalRecords,
          rowsPerPage: rowsPerPageProp || 10,
          download: !!exportToCSV,
          elevation: 0,
          searchText,
          onDownload: (buildHead, buildBody, columns, data) => `\uFEFF${buildHead(columns)}${buildBody(data)}`,
          onSearchChange,
          downloadOptions: fileNameExportCSV
            ? { filename: fileNameExportCSV, separator: ';' }
            : { filename: 'table', separator: ';' },
          selectableRows: selectableRowsProp || 'multiple',
          ...fixedOptions,
        }}
      />
    </MuiThemeProvider>
  );
};

export default Table;
