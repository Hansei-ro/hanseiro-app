import styled from '@emotion/native';
import React from 'react';
import { View } from 'react-native';

interface ChatAvatarGroupProps {
  imageUrls?: string[]; // Up to 4 images
  count?: number; // Callback if we just want to show based on count
}

export function ChatAvatarGroup({ imageUrls = [], count = 0 }: ChatAvatarGroupProps) {
  // 빈 문자열이나 falsy 값을 제외한 유효한 이미지 URL만 필터링
  const validImageUrls = imageUrls.filter((url) => url && url.trim() !== '');
  const displayCount = validImageUrls.length > 0 ? validImageUrls.length : count;
  const safeCount = Math.min(displayCount, 4);

  if (safeCount === 2) {
    return (
      <Container>
        <AvatarBase style={{ position: 'absolute', top: 2, left: 2, zIndex: 2 }} />
        <AvatarBase style={{ position: 'absolute', bottom: 2, right: 2, zIndex: 1 }} />
      </Container>
    );
  }

  if (safeCount === 3) {
    return (
      <Container>
        {/* Top Center */}
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 2 }}>
          <AvatarBase />
        </View>
        {/* Bottom Row */}
        <Row>
          <AvatarBase style={{ marginRight: 2 }} />
          <AvatarBase />
        </Row>
      </Container>
    );
  }

  if (safeCount === 4) {
    return (
      <Container>
        <Row style={{ marginBottom: 2 }}>
          <AvatarBase style={{ marginRight: 2 }} />
          <AvatarBase />
        </Row>
        <Row>
          <AvatarBase style={{ marginRight: 2 }} />
          <AvatarBase />
        </Row>
      </Container>
    );
  }

  // Default: single avatar (safeCount <= 1)
  return <SingleAvatar />;
}

const Container = styled(View)`
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

const SingleAvatar = styled(View)`
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background-color: #d9d9d9;
`;

const AvatarBase = styled(View)`
  width: 32px;
  height: 32px;
  background-color: #d9d9d9;
  border-radius: 12px;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: center;
`;
