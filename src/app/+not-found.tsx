import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.code}>
            404
          </ThemedText>
          <ThemedText type="subtitle" style={styles.heading}>
            Page Not Found
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.body}>
            The screen you&apos;re looking for doesn&apos;t exist.
          </ThemedText>
          <Link href="/" style={styles.link}>
            <ThemedText type="linkPrimary">Go back home</ThemedText>
          </Link>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  code: {
    fontSize: 72,
    fontWeight: '700',
    opacity: 0.15,
  },
  heading: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    marginTop: 8,
  },
});
