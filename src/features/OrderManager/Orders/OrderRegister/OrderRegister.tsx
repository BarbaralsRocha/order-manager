/* eslint-disable import/no-extraneous-dependencies */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  Button,
} from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { IOrder, IProductOrder } from '../../interfaces/IOrder';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as S from './OrderRegister.style';
import useDrawer from '../../../../hooks/useDrawer';

dayjs.locale('pt-br');

const OrderRegister: React.FC = () => {
  const { values } = useFormikContext<IOrder>();
  const { handleCloseDrawer } = useDrawer();
  const [products, setProducts] = useState<IProductOrder[]>([]);
  return (
    <S.Container>
      <div>
        <Box sx={{ display: 'flex', p: 4, alignItems: 'flex-end', gap: 2 }}>
          <FormControl fullWidth sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">
              Selecione o cliente
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.customer.id}
              label="Selecione o cliente"
              onChange={(e) => console.log(e)}
            >
              <MenuItem value={10}>Murilo</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Data da entrega"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="DD/MM/YYYY hh:mm a"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', p: 4, alignItems: 'center', gap: 2 }}>
          <FormControl fullWidth sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-label">
              Selecione o produto
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.customer.id}
              label=" Selecione o produto"
              onChange={(e) => console.log(e)}
            >
              <MenuItem value={10}>Murilo</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">Medida</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.customer.id}
              label="Medida"
              onChange={(e) => console.log(e)}
            >
              <MenuItem value={10}>Murilo</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Qtde"
            variant="outlined"
            sx={{ width: 100 }}
          />

          <TextField
            id="outlined-basic"
            label="Comentário"
            variant="outlined"
            sx={{ width: 200 }}
          />
          <AddCircleOutlineIcon fontSize="large" />
        </Box>
        <Typography sx={{ paddingLeft: 4 }} variant="h6">
          Produto adicionado
        </Typography>
        <Box sx={{ paddingLeft: 4, paddingRight: 4, paddingTop: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ p: 0 }}>Produto</TableCell>
                  <TableCell align="right">Medida</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                  <TableCell align="right">Observações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow key={row.name} sx={{ border: 0 }}>
                    <TableCell component="th" scope="row" sx={{ p: 0 }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      {row.additionalInformations}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
      <div>
        <Divider />
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCloseDrawer}
            sx={{
              color: 'neutral.dark.contrastText',
              borderColor: 'neutral.dark.contrastText',
              borderRadius: 0,
              letterSpacing: 1,
              p: 2,
              paddingLeft: 3,
              paddingRight: 3,
              '&:hover': {
                borderColor: 'neutral.light.light',
                backgroundColor: 'neutral.light.light',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              letterSpacing: 1,
              p: 2,
              paddingLeft: 3,
              paddingRight: 3,
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </div>
    </S.Container>
  );
};

export default OrderRegister;
