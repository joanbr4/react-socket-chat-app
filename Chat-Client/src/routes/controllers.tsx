import { ChatModel } from "../";

export const getChats = (user: string) => {
  return fetch(`/chat/${user}/null`);
};

export const getMessages = () => {};

export const createChat = (room, message) => {
  ChatModel.create({
    pair_writers: room,
    messages: [dataToInsert],
    // `messages.writer`: writer,
  });
};
