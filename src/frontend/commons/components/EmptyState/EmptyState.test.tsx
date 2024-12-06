import React from 'react';
import { render } from '@testing-library/react';
import EmptyState from './EmptyState';

test('renders EmptyState', () => {
  render(<EmptyState title="teste" description="teste" />);
});
