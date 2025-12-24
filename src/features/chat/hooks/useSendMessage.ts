import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mockSendMessage } from '../api/mockChatRoomMessages';
import { ApiMessagesResponse } from '../types/message.api';

/**
 * 메시지 전송 Mutation 훅
 *
 * @param chatRoomId - 채팅방 ID
 * @returns 메시지 전송 mutation 객체
 *
 * @example
 * const sendMessage = useSendMessage('100');
 * sendMessage.mutate('안녕하세요');
 *
 * @features
 * - 메시지 전송 후 자동 쿼리 갱신 (Optimistic Update)
 * - API 응답 → UI 타입 자동 변환
 * - 메시지 목록 캐시 자동 업데이트
 *
 * @future
 * - WebSocket 연동 시 실시간 메시지 수신
 */
export const useSendMessage = (chatRoomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageText: string) => {
      const response = await mockSendMessage(Number(chatRoomId), messageText);
      return response;
    },
    onSuccess: (response) => {
      // 전송된 메시지를 UI 타입으로 변환
      // const newMessage = adaptApiMessageToUI(response.data.message);

      // 메시지 목록 캐시 업데이트 (Optimistic Update)
      queryClient.setQueryData<ApiMessagesResponse>(['chatRoomMessages', chatRoomId], (oldData) => {
        if (!oldData) {
          return {
            status: 'success',
            message: '메시지를 전송했습니다',
            data: { messages: [response.data.message] },
          };
        }

        // 새 메시지를 맨 앞에 추가 (최신순 정렬)
        return {
          ...oldData,
          data: {
            messages: [response.data.message, ...oldData.data.messages],
          },
        };
      });

      // 채팅 목록의 last_message 업데이트를 위해 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
  });
};
