import styled from '@emotion/native';
import { Link } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/shared/ui/Text';

export default function NotFoundScreen() {
  return (
    <Container>
      <TitleText>404</TitleText>
      <SubtitleText>페이지를 찾을 수 없습니다.</SubtitleText>
      <StyledLink href="/">
        <LinkText>홈으로 돌아가기</LinkText>
      </StyledLink>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.white};
  padding: 20px;
`;

const TitleText = styled(Text)`
  font-size: 72px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.black};
`;

const SubtitleText = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 10px;
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
`;

const LinkText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration-line: underline;
`;
