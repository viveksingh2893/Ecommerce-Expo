import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorBoundary } from './error-boundary';
import { Text } from 'react-native';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Suppress expected console.error from React
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Safe Child</Text>
      </ErrorBoundary>
    );
    expect(getByText('Safe Child')).toBeTruthy();
  });

  it('catches error and renders fallback UI', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Test error')).toBeTruthy();
  });
});
