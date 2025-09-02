'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Phone, Video, MoreVertical, ArrowLeft, Heart, Smile } from 'lucide-react'
import { demoMessages, demoMatches } from '@/lib/data/demoData'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function MessagesPage() {
  const [selectedMatch, setSelectedMatch] = useState(demoMatches[0])
  const [messages, setMessages] = useState(demoMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date(),
      read: true
    }
    
    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    // 시뮬레이션: 3초 후 상대방 응답
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const responses = [
          '그렇군요! 정말 흥미로워요 😊',
          '저도 같은 생각이에요!',
          '와! 정말 좋은 아이디어네요',
          '언제 한번 만나서 이야기해봐요',
          '공감해요! 더 자세히 얘기해주세요'
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          senderId: selectedMatch.user.id,
          content: randomResponse,
          timestamp: new Date(),
          read: false
        }])
        setIsTyping(false)
      }, 2000)
    }, 3000)
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* 매치 리스트 */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">메시지</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{demoMatches.length}개의 매치</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {demoMatches.map((match) => (
            <motion.div
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                selectedMatch.id === match.id 
                  ? 'bg-pink-50 dark:bg-pink-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                    {match.user.photo && (
                      <img
                        src={match.user.photo}
                        alt={match.user.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {match.user.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {match.lastMessage?.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {match.lastMessage?.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 채팅 헤더 */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/matches">
                <Button variant="ghost" className="lg:hidden">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                {selectedMatch.user.photo && (
                  <img
                    src={selectedMatch.user.photo}
                    alt={selectedMatch.user.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {selectedMatch.user.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  온라인
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="rounded-full">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="rounded-full">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="rounded-full">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.senderId === 'me'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 'me' ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-2xl">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="rounded-full">
              <Smile className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="메시지를 입력하세요..."
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            
            <Button
              variant="primary"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="rounded-full w-12 h-12 p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}