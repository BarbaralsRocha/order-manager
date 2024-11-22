/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { IDecimal } from '../../interfaces/Decimal.interface';

interface IProps {
  value?: number;
  onChange: (e: IDecimal) => void;
  label: string;
}

const DecimalInput: React.FC<IProps> = ({ value, onChange, label }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={onChange}
      decimalSeparator=","
      thousandSeparator="."
      allowNegative={false}
      customInput={TextField}
      label={label}
      fullWidth
    />
  );
};

export default DecimalInput;
