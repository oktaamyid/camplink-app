import CampLinkLayout from '@/layouts/camplink-layout';
import { Head } from '@inertiajs/react';
import { Send, Search } from 'lucide-react';
import { useState } from 'react';

const conversations = [
    {
        id: 1,
        name: 'Tim Business Plan',
        avatar: 'TB',
        avatarColor: 'bg-[#2F3E8F]',
        lastMessage: 'Raffa: Oke, kita meeting besok jam 3 ya',
        time: '10:24',
        unread: 3,
        isGroup: true,
    },
    {
        id: 2,
        name: 'Dinda Aulia',
        avatar: 'DA',
        avatarColor: 'bg-purple-500',
        lastMessage: 'Iya nanti aku kirim file-nya',
        time: '09:15',
        unread: 0,
        isGroup: false,
    },
    {
        id: 3,
        name: 'BEM Universitas',
        avatar: 'BU',
        avatarColor: 'bg-emerald-500',
        lastMessage: 'Pendaftaran sudah dibuka!',
        time: 'Kemarin',
        unread: 1,
        isGroup: false,
    },
    {
        id: 4,
        name: 'Rizky Pratama',
        avatar: 'RP',
        avatarColor: 'bg-orange-500',
        lastMessage: 'Makasih ya infonya!',
        time: 'Kemarin',
        unread: 0,
        isGroup: false,
    },
];

const messages = [
    { id: 1, sender: 'Dinda Aulia', content: 'Halo, gimana progress desain UI-nya?', time: '09:00', isSelf: false },
    {
        id: 2,
        sender: 'Kamu',
        content: 'Lagi ngerjain flow untuk halaman detail kegiatan. Hampir selesai!',
        time: '09:05',
        isSelf: true,
    },
    { id: 3, sender: 'Dinda Aulia', content: 'Oke siap, nanti kalau sudah bisa di-review bareng ya', time: '09:08', isSelf: false },
    {
        id: 4,
        sender: 'Kamu',
        content: 'Siap! Rencana besok aku selesaikan, abis itu langsung share ke grup',
        time: '09:10',
        isSelf: true,
    },
    { id: 5, sender: 'Dinda Aulia', content: 'Iya nanti aku kirim file-nya', time: '09:15', isSelf: false },
];

export default function Pesan() {
    const [activeConv, setActiveConv] = useState(conversations[0]);
    const [message, setMessage] = useState('');

    return (
        <CampLinkLayout>
            <Head title="Pesan" />

            <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* Conversation list */}
                <div className="w-64 flex-shrink-0 border-r border-gray-100 flex flex-col">
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
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setActiveConv(conv)}
                                className={`flex w-full items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                                    activeConv.id === conv.id ? 'bg-[#EEF1FA]' : ''
                                }`}
                            >
                                <div
                                    className={`flex size-9 flex-shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold ${conv.avatarColor}`}
                                >
                                    {conv.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-sm font-medium text-gray-900 truncate">{conv.name}</span>
                                        <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                                </div>
                                {conv.unread > 0 && (
                                    <span className="flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[#2F3E8F] text-xs font-medium text-white">
                                        {conv.unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat window */}
                <div className="flex flex-1 flex-col min-w-0">
                    {/* Chat header */}
                    <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3">
                        <div
                            className={`flex size-8 items-center justify-center rounded-full text-white text-xs font-semibold ${activeConv.avatarColor}`}
                        >
                            {activeConv.avatar}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{activeConv.name}</p>
                            {activeConv.isGroup && (
                                <p className="text-xs text-gray-500">Grup · 4 anggota</p>
                            )}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs ${msg.isSelf ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                    {!msg.isSelf && (
                                        <span className="text-xs text-gray-500 px-1">{msg.sender}</span>
                                    )}
                                    <div
                                        className={`rounded-2xl px-4 py-2.5 text-sm ${
                                            msg.isSelf
                                                ? 'bg-[#2F3E8F] text-white rounded-br-sm'
                                                : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                    <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-100 p-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Tulis pesan..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') setMessage('');
                                }}
                            />
                            <button
                                className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#2F3E8F] text-white hover:bg-[#243070] transition-colors"
                                onClick={() => setMessage('')}
                            >
                                <Send className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CampLinkLayout>
    );
}
