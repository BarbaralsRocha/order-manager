export interface ISnackbar {
  message: string;
  type: 'success' | 'info' | 'error' | 'warning' | undefined;
  open?: boolean;
}
