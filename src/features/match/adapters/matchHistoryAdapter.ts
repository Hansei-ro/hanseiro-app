import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import { ApiMatchHistoryItem, ApiMatchHistoryResponse } from '../types/matchHistory.api';
import { MatchHistoryItemUI } from '../types/matchHistory.ui';

const formatMatchHistoryDate = (matchDate: string): string => {
  try {
    return format(parseISO(matchDate), 'M월 d일 (EEE)', { locale: ko });
  } catch {
    return '';
  }
};

export const adaptMatchHistoryItemToUI = (item: ApiMatchHistoryItem): MatchHistoryItemUI => ({
  id: String(item.match_id),
  dateText: formatMatchHistoryDate(item.match_date),
  title: `${item.match_location} ${item.participant_count}인 매칭`,
  participantCount: item.participant_count,
});

export const adaptMatchHistoryResponseToUI = (
  response: ApiMatchHistoryResponse,
): MatchHistoryItemUI[] => {
  return response.data.histories.map(adaptMatchHistoryItemToUI);
};
