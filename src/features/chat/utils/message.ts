import { Message } from '../types/message.ui';

const formatMessageDate = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const createDateSeparator = (dateText: string, timestamp: string): Message => ({
  id: `date-${dateText}`,
  text: dateText,
  sender: 'other',
  timestamp,
  isDateSeparator: true,
});

export const buildMessagesWithDateSeparators = (messages: Message[]): Message[] => {
  if (messages.length === 0) {
    return [];
  }

  const result: Message[] = [];
  let currentDate = '';
  let currentDateTimestamp = '';

  messages.forEach((message) => {
    const messageDate = formatMessageDate(message.timestamp);

    if (!currentDate) {
      currentDate = messageDate;
    }

    if (messageDate !== currentDate) {
      result.push(createDateSeparator(currentDate, currentDateTimestamp));
      currentDate = messageDate;
    }

    result.push(message);
    currentDateTimestamp = message.timestamp;
  });

  if (currentDate) {
    result.push(createDateSeparator(currentDate, currentDateTimestamp));
  }

  return result;
};
