import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import Button from '../../components/Button';

test('Button', () => {
  render(<Button disabled={false} onClick_={() => console.log('clicked')} cta="Click me!" />);
  expect(screen.getByRole('button', {name: 'Click me!'})).toBeDefined();
});
