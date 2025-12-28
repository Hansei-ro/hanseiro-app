import { ApiMatchWaitingParticipant, ApiMatchWaitingResponse } from '../types/matchWaiting.api';
import { MatchWaitingDataUI, MatchWaitingParticipantUI } from '../types/matchWaiting.ui';

const formatRemainingTime = (seconds: number): string => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}분 ${String(remainingSeconds).padStart(2, '0')}초`;
};

const adaptMatchWaitingParticipantToUI = (
  participant: ApiMatchWaitingParticipant,
  index: number,
): MatchWaitingParticipantUI => ({
  id: participant.user_id ? String(participant.user_id) : `empty-${index + 1}`,
  name: participant.name ?? '',
  department: participant.department ?? '',
  status: participant.status ?? '',
  isMe: participant.is_me ?? false,
  isReady: participant.is_ready ?? false,
  isEmpty: participant.is_empty ?? false,
});

export const adaptMatchWaitingResponseToUI = (
  response: ApiMatchWaitingResponse,
): MatchWaitingDataUI => {
  const { data } = response;
  const participants = data.participants.map(adaptMatchWaitingParticipantToUI);

  return {
    route: data.route,
    participants,
    currentCount: data.current_count,
    readyCount: data.ready_count,
    maxCount: data.max_count,
    remainingTimeText: formatRemainingTime(data.remaining_seconds),
  };
};
