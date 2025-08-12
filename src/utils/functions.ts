import {
  RenderResult,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const changeSelect = async (
  container: RenderResult,
  testid: string,
  option: string,
): Promise<void> => {
  const dropdown = within(await container.findByTestId(testid)).getByRole(
    'combobox',
  );
  userEvent.click(dropdown);
  userEvent.click(await container.findByRole('option', { name: option }));
  expect(container.getByText(option)).toBeInTheDocument();
};

export const changeInput = async (
  container: RenderResult,
  testid: string,
  value: string | number,
): Promise<void> => {
  const inputElement = container.getByTestId(testid).querySelector('input');
  fireEvent.change(inputElement!, { target: { value } });
  expect(inputElement).toHaveValue(value);
};
