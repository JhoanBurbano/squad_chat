import socketio from 'socket.io-client';
import { ICreateOrJoinRoom, IRoom, ILeaveRoom, ISendMessage } from '../interfaces';

export const socket = socketio(process.env.REACT_APP_API_URL as string, { reconnectionAttempts: 5 });

export function createOrJoinRoom(data: ICreateOrJoinRoom) {
  const { roomId, userName } = data;

  socket.emit('createOrJoinRoom', { roomId, userName });
}

export function getRoomData(subscribeFunction: (room: IRoom) => void) {
  socket.on('roomInfo', subscribeFunction);
}

export function leaveRoom(data: ILeaveRoom) {
  const { roomId } = data;

  socket.emit('leaveRoom', { roomId, userId: socket.id });
}

export function sendMessage(data: ISendMessage) {
  const { roomId, author, message } = data;

  socket.emit('sendMessage', { roomId, clientId: socket.id, author, message });
}

export function userJoined(subscribeFunction: (user: string) => void) {
  socket.on('userJoined', subscribeFunction);
}

export function userLeaved(subscribeFunction: (user: string) => void) {
  socket.on('userLeaved', subscribeFunction);
}
