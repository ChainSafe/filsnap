interface Message {
  message: string;
  value: unknown | undefined;
}

export const messageCreator = (messages: Message[]): string => messages
  .map(({ message, value,}) => message + ' ' + value)
  .join('\n');
