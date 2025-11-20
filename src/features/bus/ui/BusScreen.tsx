import { StyleSheet, Text, View } from 'react-native';

export function BusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>버스</Text>
      <Text style={styles.subtitle}>버스 시간표 및 노선 정보</Text>
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
