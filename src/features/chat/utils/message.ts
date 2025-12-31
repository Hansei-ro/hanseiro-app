import { Message } from '../types/message.ui';

const formatMessageDate = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const buildMessagesWithDateSeparators = (messages: Message[]): Message[] => {
  if (messages.length === 0) {
    return [];
  }

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  const result: Message[] = [];
  let lastDate = '';

  sortedMessages.forEach((message) => {
    const messageDate = formatMessageDate(message.timestamp);

    if (messageDate !== lastDate) {
      result.push({
        id: `date-${messageDate}`,
        text: messageDate,
        sender: 'other',
        timestamp: message.timestamp,
        isDateSeparator: true,
      });
      lastDate = messageDate;
    }

    result.push(message);
  });

  // inverted FlatList 기준에 맞게 최신 메시지가 먼저 오도록 다시 뒤집기
  return result.reverse();
};
