interface Message {
  message: string;
  value: unknown | undefined;
}

export const messageCreator = (messages: Message[]): string => messages
  .filter(({ value }) => !!value)
  .map(({ message, value,}) => message + ' ' + value)
  .join('\n');
