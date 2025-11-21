import { StyleSheet, Text, View } from 'react-native';

export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필</Text>
      <Text style={styles.subtitle}>내 정보 및 설정</Text>
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
