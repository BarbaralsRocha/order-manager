import { Dayjs } from 'dayjs';

export interface IPeriod {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
