import { StyleSheet, Text, View } from 'react-native';

export function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>채팅</Text>
      <Text style={styles.subtitle}>실시간 채팅방 목록</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
