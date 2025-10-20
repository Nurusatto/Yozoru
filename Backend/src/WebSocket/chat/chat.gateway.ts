import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Клиент подключился: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Клиент отключился: ', client.id);
  }

  @SubscribeMessage('chat_message')
  handleChatMessage(
    @MessageBody() msg: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Сообщение от клиента: ', msg);
    client.emit('chat_message', `Сервер получил: ${msg}`);
  }
}