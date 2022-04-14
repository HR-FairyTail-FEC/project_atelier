import { render } from '@testing-library/react';
import Overview from './Overview.jsx';
import React from 'react';

describe("Overview Component", () => {
  it('renders overview container', () => {
    const { getByTestId } = render(<Overview details={[]}/>);
    const overview = getByTestId('overview-container');
    expect(overview).toBeTruthy();
  });
});