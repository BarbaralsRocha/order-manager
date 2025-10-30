import { Alert, List, ListItem } from '@mui/material';
import * as S from './AlertRegisterValidation.style';
interface IProps {
  validationResult?: { [key: string]: string }[];
}
const AlertregisterValidation: React.FC<IProps> = ({ validationResult }) => {
  return (
    <Alert variant="outlined" severity="error">
      Campos com erros não poderão ser salvos.
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          overflow: 'auto',
          listStyleType: 'disc',
          pl: 3,
        }}
        component="ul"
      >
        {validationResult?.map((value) => (
          <ListItem
            component="li"
            sx={{ p: 0, display: 'list-item' }}
            key={`item-${Object.keys(value)}`}
          >
            <S.ItemTexto
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '12px',
                },
              }}
              primary={Object.values(value)}
            />
          </ListItem>
        ))}
      </List>
    </Alert>
  );
};

export default AlertregisterValidation;
