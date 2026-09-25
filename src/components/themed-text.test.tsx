import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from './themed-text';

jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    text: '#11181C',
  }),
}));

describe('ThemedText', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<ThemedText>Default Text</ThemedText>);
    const textElement = getByText('Default Text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        { color: '#11181C' },
        { fontSize: 16, fontWeight: 500, lineHeight: 24 },
      ])
    );
  });

  it('renders correctly with title type', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const textElement = getByText('Title Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 48, fontWeight: 600 })
      ])
    );
  });
});
