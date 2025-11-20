# UI 컴포넌트

이 폴더에는 화면에서 사용할 재사용 가능한 컴포넌트를 작성합니다.

## 예시

```tsx
// ExampleCard.tsx
import { View, Text, StyleSheet } from 'react-native';

interface ExampleCardProps {
  title: string;
  description: string;
}

export function ExampleCard({ title, description }: ExampleCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
```
