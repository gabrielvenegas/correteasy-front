import {
  createStyles,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Theme,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Radio,
  Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import './Users.css';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { DropzoneDialog } from 'material-ui-dropzone';
import SaveIcon from '@material-ui/icons/Save';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

//import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        flexGrow: 1,
        margin: theme.spacing(1),
      },
    },
    divisor: {
      marginTop: theme.spacing(2),
    },
    dadosPessoais: {
      marginLeft: theme.spacing(1),
    },
    dadosProfissionais: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    dadosAdicionais: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    botao: {
      textAlign: 'right',
    },
  }),
);

const Users = () => {
  const classes = useStyles();
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [possuiDeficiencia, setPossuiDeficiencia] = useState('false');
  const [open, setOpen] = useState(false);
  const buscaCep = async (e: any) => {
    const cep = e.target.value;
    const { data } = await axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
    );

    //  setando cidade
    setCidade(data.city);
    // setando Rua
    setRua(data.street);
    //setando Estado
    setEstado(data.state);
    //setandoBairro
    setBairro(data.neighborhood);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPossuiDeficiencia(event.target.value);
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.dadosPessoais}>
            <Typography variant="h5" gutterBottom>
              Dados Pessoais
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField id="Name" label="Nome" variant="outlined" type="text" />
          </Grid>
          <Grid item xs={3}>
            <InputMask
              required
              mask="999.999.999-99"
              //       value={challenge.identifier}
              //       onChange={({ target: { value } }) =>
              //         setChallenge({ ...challenge, identifier: value })
              //       }
            >
              {() => <TextField label="CPF" variant="outlined" />}
            </InputMask>
          </Grid>
          <Grid item xs={3}>
            <TextField id="rg" label="RG" variant="outlined" type="number" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="CEP"
              label="CEP"
              onBlur={(e) => buscaCep(e)}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Rua"
              variant="outlined"
              value={rua}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Cidade"
              variant="outlined"
              value={cidade}
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              id="Name"
              label="Estado"
              variant="outlined"
              value={estado}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Bairro"
              variant="outlined"
              value={bairro}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Numero" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Complemento"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Estado civil
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //       value={age}
                //       onChange={handleChange}
                label="Estado civil"
              >
                <MenuItem value={10}>Solteiro(a)</MenuItem>
                <MenuItem value={20}>Casado(a)</MenuItem>
                <MenuItem value={30}>Divorciado(a)</MenuItem>
                <MenuItem value={30}>Viúvo(a)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="Name"
              label="Data Nascimento"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Sexo
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //       value={age}
                //       onChange={handleChange}
                label="Sexo"
              >
                <MenuItem value={10}>Masculino</MenuItem>
                <MenuItem value={20}>Feminino</MenuItem>
                <MenuItem value={30}>Outro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Altura(m)"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
      <Divider className={classes.divisor} />

      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.dadosProfissionais}>
            <Typography variant="h5" gutterBottom>
              Dados Profissionais
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Escolaridade
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //       value={age}
                //       onChange={handleChange}
                label="Escolaridade"
              >
                <MenuItem value={10}>Fundamental Completo</MenuItem>
                <MenuItem value={20}>Médio Incompleto</MenuItem>
                <MenuItem value={30}>Médio Completo</MenuItem>
                <MenuItem value={30}>Superior Incompleto</MenuItem>
                <MenuItem value={30}>Superior Completo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="Profissao"
              label="Profissao"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="Empresa"
              label="Empresa"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="Cargo"
              label="Cargo"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="Renda"
              label="Renda(R$)"
              variant="outlined"
              type="text"
            />
          </Grid>
        </Grid>
      </form>
      <Divider className={classes.divisor} />
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.dadosAdicionais}>
            <Typography variant="h5" gutterBottom>
              Informacoes adicionais
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <p>Possui alguma deficiencia física?</p>
            <Radio
              checked={possuiDeficiencia === 'true'}
              onChange={handleChange}
              value="true"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            Sim
            <Radio
              checked={possuiDeficiencia === 'false'}
              onChange={handleChange}
              value="false"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            Não
          </Grid>
          <Grid item xs={3}>
            {possuiDeficiencia === 'true' && (
              <TextField
                id="Deficiencia"
                label="Qual?"
                variant="outlined"
                type="text"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="Observacoes"
              label="Observacoes"
              variant="outlined"
              type="text"
            />
          </Grid>
        </Grid>
      </form>
      <Divider className={classes.divisor} />

      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.dadosAdicionais}>
            <Typography variant="h5" gutterBottom>
              Perfil
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={() => setOpen(true)}>Add Image</Button>
            <DropzoneDialog
              open={open}
              // onSave={this.handleSave.bind(this)}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={() => setOpen(false)}
            />
          </Grid>
          <Grid item xs={6} className={classes.botao}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // className={classes.button}
              startIcon={<SaveIcon />}
            >
              Salvar Cadastro
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Users;
