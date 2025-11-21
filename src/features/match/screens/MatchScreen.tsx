import { StyleSheet, Text, View } from 'react-native';

export function MatchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>매칭</Text>
      <Text style={styles.subtitle}>택시 매칭 및 방 생성</Text>
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
