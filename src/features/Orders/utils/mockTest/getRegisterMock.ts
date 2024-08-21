export default ({
  insertRegister = jest.fn(),
  handleRemoveRegister = jest.fn(),
}: {
  insertRegister?: jest.Mock;
  handleRemoveRegister?: jest.Mock;
}) => ({
  insertRegister,
  handleRemoveRegister,
});
