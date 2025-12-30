/**
 * MatchingWaitingScreen 전용 UI 타입
 */

export interface MatchWaitingRouteUI {
  from: string;
  to: string;
}

export interface MatchWaitingParticipantUI {
  id: string;
  name?: string;
  department?: string;
  status?: string;
  isMe?: boolean;
  isReady?: boolean;
  isEmpty?: boolean;
}

export interface MatchWaitingDataUI {
  route: MatchWaitingRouteUI;
  participants: MatchWaitingParticipantUI[];
  currentCount: number;
  readyCount: number;
  maxCount: number;
  remainingTimeText: string;
}
