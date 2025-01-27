export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  chatId: string;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  lastLogin: Date;
};

export interface Chat {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  recipient: User;
}

export type PageParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
