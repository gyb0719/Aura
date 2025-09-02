import { io, Socket } from 'socket.io-client'

class WebSocketClient {
  private socket: Socket | null = null
  private url: string

  constructor() {
    this.url = process.env.NODE_ENV === 'production' 
      ? 'wss://your-production-domain.com' 
      : 'ws://localhost:3001'
  }

  connect(userId: string) {
    if (this.socket?.connected) return this.socket

    this.socket = io(this.url, {
      auth: { userId },
      transports: ['websocket', 'polling']
    })

    this.socket.on('connect', () => {
      console.log('WebSocket 연결됨')
    })

    this.socket.on('disconnect', () => {
      console.log('WebSocket 연결 해제됨')
    })

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket 연결 오류:', error)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  joinMatch(matchId: string) {
    this.socket?.emit('join_match', matchId)
  }

  leaveMatch(matchId: string) {
    this.socket?.emit('leave_match', matchId)
  }

  sendMessage(matchId: string, content: string) {
    this.socket?.emit('send_message', { matchId, content })
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket?.on('new_message', callback)
  }

  onTyping(callback: (data: { matchId: string, userId: string, isTyping: boolean }) => void) {
    this.socket?.on('user_typing', callback)
  }

  startTyping(matchId: string) {
    this.socket?.emit('typing', { matchId, isTyping: true })
  }

  stopTyping(matchId: string) {
    this.socket?.emit('typing', { matchId, isTyping: false })
  }

  onUserOnline(callback: (userId: string) => void) {
    this.socket?.on('user_online', callback)
  }

  onUserOffline(callback: (userId: string) => void) {
    this.socket?.on('user_offline', callback)
  }
}

export const websocketClient = new WebSocketClient()