// eslint-disable-next-line import/no-extraneous-dependencies
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { IDecimal } from '../../interfaces/Decimal.interface';

interface IProps {
  value: number | undefined;
  onChange: (e: IDecimal) => void;
  label: string;
}

const CurrencyInput: React.FC<IProps> = ({ value, onChange, label }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={onChange}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      fixedDecimalScale={true}
      decimalScale={2}
      customInput={TextField}
      fullWidth
      label={label}
    />
  );
};

export default CurrencyInput;
