import { ApiMessagesResponse } from '../types/message.api';

import { mockFetchMessages } from './mockChatRoomMessages';

export type ChatRoomMessagesParams = {
  beforeId?: number;
  size?: number;
};

export const getChatRoomMessages = async (
  chatRoomId: number,
  params?: ChatRoomMessagesParams,
): Promise<ApiMessagesResponse> => {
  return mockFetchMessages(chatRoomId, params);
};
