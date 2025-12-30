import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { MapPin } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { Text } from '@/shared/ui/Text';

interface MatchingRouteInfoProps {
  from: string;
  to: string;
}

export function MatchingRouteInfo({ from, to }: MatchingRouteInfoProps) {
  const theme = useTheme();

  return (
    <Container>
      <MapPin color={theme.colors.primary.main} size={18} />

      <RouteContent>
        <Text variant="s" weight="medium">
          {from}
        </Text>

        <View style={{ flex: 1 }}>
          <Svg height="2" width="100%">
            <Line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke={theme.colors.primary.main}
              strokeWidth="2"
              strokeDasharray="5, 5"
              strokeLinecap="round"
            />
          </Svg>
        </View>

        <Text variant="s" weight="medium">
          {to}
        </Text>
      </RouteContent>
    </Container>
  );
}

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: #fff4ee;
  padding: 11px 14px;
  border-radius: 12px;
`;

const RouteContent = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
