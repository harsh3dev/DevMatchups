import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add this import directly in the test file (temporary fix)

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a sample Next.js app with Jest testing setup.</p>
    </div>
  );
};

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });
    expect(heading).toBeInTheDocument(); // Should now be recognized
  });

  it('renders the paragraph text', () => {
    render(<Home />);
    const paragraph = screen.getByText(/this is a sample next\.js app/i);
    expect(paragraph).toBeInTheDocument(); // Should now be recognized
  });
});
