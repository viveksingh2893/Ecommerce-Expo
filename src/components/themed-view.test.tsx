import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedView } from './themed-view';
import { Text } from 'react-native';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    background: '#fff',
  }),
}));

describe('ThemedView', () => {
  it('renders children correctly and applies theme background', () => {
    const { getByText, getByTestId } = render(
      <ThemedView testID="themed-view">
        <Text>Child Element</Text>
      </ThemedView>
    );
    
    expect(getByText('Child Element')).toBeTruthy();
    
    const viewElement = getByTestId('themed-view');
    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: '#fff' }])
    );
  });
});
