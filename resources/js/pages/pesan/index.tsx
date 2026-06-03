import CampLinkLayout from '@/layouts/camplink-layout';
import { type SharedData } from '@/types';
import { Head, router, usePage, usePoll } from '@inertiajs/react';
import { Send, Search, MessageSquare } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Conversation {
    id: number;
    other_user: {
        id: number;
        name: string;
    };
    last_message: string;
    last_message_time: string;
    unread_count: number;
}

interface Message {
    id: number;
    sender_id: number;
    body: string;
    created_at: string;
    sender: {
        id: number;
        name: string;
    };
}

interface PageProps extends SharedData {
    conversations: Conversation[];
    activeConversation: {
        id: number;
        other_user: {
            id: number;
            name: string;
        };
    } | null;
    messages: Message[];
}

export default function Pesan() {
    const { auth, conversations, activeConversation, messages } = usePage<PageProps>().props;
    const [body, setBody] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Inertia v2 Polling for realtime updates
    // Polls every 3 seconds only on this page
    usePoll(3000, {
        only: ['conversations', 'messages', 'activeConversation'],
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const selectConversation = (id: number) => {
        router.get(
            '/pesan',
            { conversation_id: id },
            { preserveState: true, preserveScroll: true, only: ['conversations', 'activeConversation', 'messages'] }
        );
    };

    const sendMessage = () => {
        if (!body.trim() || !activeConversation) return;

        router.post(
            '/pesan',
            {
                conversation_id: activeConversation.id,
                body: body,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setBody(''),
            }
        );
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <CampLinkLayout>
            <Head title="Pesan" />

            <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* Conversation list */}
                <div className="w-64 shrink-0 border-r border-gray-100 flex flex-col">
                    <div className="p-3 border-b border-gray-100">
                        <h2 className="mb-2 text-sm font-semibold text-gray-900 px-1">Pesan</h2>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari percakapan..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-xs text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="p-4 text-center text-sm text-gray-500">Belum ada percakapan.</div>
                        ) : (
                            conversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => selectConversation(conv.id)}
                                    className={`flex w-full items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                                        activeConversation?.id === conv.id ? 'bg-[#EEF1FA]' : ''
                                    }`}
                                >
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold bg-[#2F3E8F]">
                                        {getInitials(conv.other_user.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-sm font-medium text-gray-900 truncate">
                                                {conv.other_user.name}
                                            </span>
                                            <span className="text-xs text-gray-400 shrink-0">
                                                {conv.last_message_time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{conv.last_message}</p>
                                    </div>
                                    {conv.unread_count > 0 && (
                                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                                            {conv.unread_count}
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat window */}
                <div className="flex flex-1 flex-col min-w-0 bg-gray-50">
                    {activeConversation ? (
                        <>
                            {/* Chat header */}
                            <div className="flex items-center gap-3 border-b border-gray-100 bg-white px-5 py-3">
                                <div className="flex size-8 items-center justify-center rounded-full text-white text-xs font-semibold bg-[#2F3E8F]">
                                    {getInitials(activeConversation.other_user.name)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {activeConversation.other_user.name}
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                                        Belum ada pesan. Mulai sapa {activeConversation.other_user.name}!
                                    </div>
                                ) : (
                                    messages.map((msg) => {
                                        const isSelf = msg.sender_id === auth.user.id;
                                        const time = new Date(msg.created_at).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });

                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-[75%] ${
                                                        isSelf ? 'items-end' : 'items-start'
                                                    } flex flex-col gap-1`}
                                                >
                                                    {!isSelf && (
                                                        <span className="text-xs text-gray-500 px-1">
                                                            {msg.sender.name}
                                                        </span>
                                                    )}
                                                    <div
                                                        className={`rounded-2xl px-4 py-2.5 text-sm ${
                                                            isSelf
                                                                ? 'bg-[#2F3E8F] text-white rounded-br-sm'
                                                                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm'
                                                        }`}
                                                    >
                                                        {msg.body}
                                                    </div>
                                                    <span className="text-[10px] text-gray-400 px-1">{time}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="border-t border-gray-100 bg-white p-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Tulis pesan..."
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') sendMessage();
                                        }}
                                    />
                                    <button
                                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#2F3E8F] text-white hover:bg-[#243070] transition-colors disabled:opacity-50"
                                        onClick={sendMessage}
                                        disabled={!body.trim()}
                                    >
                                        <Send className="size-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center text-gray-500">
                            <MessageSquare className="size-12 mb-4 text-gray-300" />
                            <p>Pilih percakapan untuk mulai mengirim pesan</p>
                        </div>
                    )}
                </div>
            </div>
        </CampLinkLayout>
    );
}
