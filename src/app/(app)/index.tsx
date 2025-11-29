import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to notes screen
  return <Redirect href="/notes" />;
}
