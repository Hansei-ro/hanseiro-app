import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { View } from 'react-native';

import { Text } from '@/shared/ui/Text';

export function WithdrawalInfo() {
  const theme = useTheme();

  return (
    <TextContainer>
      <Text variant="l" weight="semiBold" color={theme.colors.primary.black}>
        정말 탈퇴하시겠어요?
      </Text>

      <WarningText>
        <Text variant="s" weight="regular" color={theme.colors.text.secondary}>
          탈퇴하면 산본역·금정역과 한세대학교 택시 이용 기록과 정보가 모두 삭제되며 복구할 수
          없습니다.
        </Text>
        <Text variant="s" weight="regular" color={theme.colors.text.secondary}>
          탈퇴 후 동일한 계정으로 재가입하더라도 이전에 사용했던 정보나 기록은 복원되지 않습니다.
        </Text>
      </WarningText>
    </TextContainer>
  );
}

const TextContainer = styled(View)`
  gap: 20px;
`;

const WarningText = styled(View)`
  gap: 8px;
`;
