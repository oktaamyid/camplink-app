import CampLinkLayout from '@/layouts/camplink-layout';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage, usePoll } from '@inertiajs/react';
import { Send, Search, MessageSquare, Users, User, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Conversation {
    id: number;
    title: string;
    type: 'direct' | 'team';
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
        title: string;
        type: 'direct' | 'team';
    } | null;
    messages: Message[];
}

export default function Pesan() {
    const { auth, conversations, activeConversation, messages } = usePage<PageProps>().props;
    const [body, setBody] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{id: number, name: string, username: string}[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Inertia v2 Polling for realtime updates
    usePoll(1500, {
        only: ['conversations', 'messages', 'activeConversation'],
    }, {
        keepAlive: true,
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (query.length < 2) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(`/pesan/users/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsSearching(false);
            }
        }, 500);
    };

    const startConversation = (userId: number) => {
        setSearchQuery('');
        setSearchResults([]);
        router.post(route('pesan.start'), { user_id: userId }, { preserveScroll: true });
    };

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

    const filteredConversations = conversations.filter(conv => 
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showSearchResults = searchQuery.length >= 2 && !isSearching && searchResults.length > 0;
    const noResults = searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && filteredConversations.length === 0;

    return (
        <CampLinkLayout>
            <Head title="Pesan" />

            <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* Conversation list */}
                <div className="w-72 shrink-0 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="mb-3 text-lg font-bold text-gray-900">Pesan</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama atau username..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none"
                            />
                            {isSearching && (
                                <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 animate-spin" />
                            )}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {showSearchResults && (
                            <div className="border-b border-gray-100 pb-2 mb-2">
                                <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Pengguna (Global)</p>
                                {searchResults.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex w-full items-center justify-between gap-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                                    >
                                        <button
                                            onClick={() => startConversation(user.id)}
                                            className="flex flex-1 items-center gap-3 text-left min-w-0"
                                        >
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                                                {getInitials(user.name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-[10px] text-gray-500 truncate">@{user.username}</p>
                                            </div>
                                        </button>
                                        <Link
                                            href={route('profil.index', user.id)}
                                            className="text-xs font-semibold text-[#2F3E8F] hover:underline shrink-0 px-2 py-1"
                                        >
                                            Profil
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {searchQuery.length >= 2 && filteredConversations.length > 0 && (
                            <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Percakapan Anda</p>
                        )}

                        {noResults ? (
                            <div className="p-8 text-center text-sm text-gray-500">
                                Pengguna atau percakapan tidak ditemukan.
                            </div>
                        ) : filteredConversations.length === 0 && !showSearchResults && searchQuery.length < 2 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                                <MessageSquare className="size-8 text-gray-200" />
                                <p className="text-sm text-gray-500">Tidak ada percakapan.</p>
                            </div>
                        ) : (
                            filteredConversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => selectConversation(conv.id)}
                                    className={`flex w-full items-start gap-3 px-4 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors text-left border-b border-gray-50 dark:border-slate-800/50 last:border-0 ${
                                        activeConversation?.id === conv.id ? 'bg-[#EEF1FA] dark:bg-slate-800/80' : ''
                                    }`}
                                >
                                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-white text-xs font-semibold relative ${
                                        conv.type === 'team' ? 'bg-indigo-600' : 'bg-[#2F3E8F]'
                                    }`}>
                                        {getInitials(conv.title)}
                                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-gray-100">
                                            {conv.type === 'team' ? <Users className="size-2.5 text-indigo-600" /> : <User className="size-2.5 text-[#2F3E8F]" />}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-sm font-bold text-gray-900 truncate">
                                                {conv.title}
                                            </span>
                                            <span className="text-[10px] text-gray-400 shrink-0">
                                                {conv.last_message_time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate line-clamp-1">{conv.last_message}</p>
                                    </div>
                                    {conv.unread_count > 0 && (
                                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
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
                            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {activeConversation.type === 'direct' && activeConversation.other_user_id ? (
                                        <Link 
                                            href={route('profil.index', activeConversation.other_user_id)}
                                            className={`flex size-9 items-center justify-center rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-opacity shrink-0 ${
                                                activeConversation.type === 'team' ? 'bg-indigo-600' : 'bg-[#2F3E8F]'
                                            }`}
                                        >
                                            {getInitials(activeConversation.title)}
                                        </Link>
                                    ) : (
                                        <div className={`flex size-9 items-center justify-center rounded-xl text-white text-xs font-semibold shrink-0 ${
                                            activeConversation.type === 'team' ? 'bg-indigo-600' : 'bg-[#2F3E8F]'
                                        }`}>
                                            {getInitials(activeConversation.title)}
                                        </div>
                                    )}
                                    <div>
                                        {activeConversation.type === 'direct' && activeConversation.other_user_id ? (
                                            <Link 
                                                href={route('profil.index', activeConversation.other_user_id)}
                                                className="text-sm font-bold text-gray-900 hover:underline block"
                                            >
                                                {activeConversation.title}
                                            </Link>
                                        ) : (
                                            <p className="text-sm font-bold text-gray-900">
                                                {activeConversation.title}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                            {activeConversation.type === 'team' ? (
                                                <><Users className="size-2.5" /> Grup Diskusi Tim</>
                                            ) : (
                                                <><User className="size-2.5" /> Pesan Langsung</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.length === 0 ? (
                                    <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                                        <MessageSquare className="size-12 opacity-20" />
                                        <p className="text-sm">Belum ada pesan. Mulai percakapan sekarang!</p>
                                    </div>
                                ) : (
                                    messages.map((msg, index) => {
                                        const isSelf = msg.sender_id === auth.user.id;
                                        const time = new Date(msg.created_at).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });

                                        const showSender = !isSelf && (index === 0 || messages[index - 1].sender_id !== msg.sender_id);

                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex ${isSelf ? 'justify-start' : 'justify-end'}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] ${
                                                        isSelf ? 'items-start' : 'items-end'
                                                    } flex flex-col gap-1`}
                                                >
                                                    {showSender && (
                                                        <span className="text-[10px] font-bold text-gray-500 px-1 uppercase tracking-wider">
                                                            {msg.sender.name}
                                                        </span>
                                                    )}
                                                    <div
                                                        className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                                                            isSelf
                                                                ? 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
                                                                : 'bg-[#2F3E8F] text-white rounded-br-none'
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
                                <div className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder={`Kirim pesan ke ${activeConversation.type === 'team' ? 'grup tim' : activeConversation.title}...`}
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] transition-all"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') sendMessage();
                                        }}
                                    />
                                    <button
                                        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#2F3E8F] text-white hover:bg-[#243070] transition-all shadow-md disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95"
                                        onClick={sendMessage}
                                        disabled={!body.trim()}
                                    >
                                        <Send className="size-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center text-gray-400 gap-4">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <MessageSquare className="size-16 text-gray-100" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-900">Mulai Mengirim Pesan</p>
                                <p className="text-sm max-w-xs px-6">Pilih percakapan di samping untuk berdiskusi dengan tim atau teman Anda.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CampLinkLayout>
    );
}
