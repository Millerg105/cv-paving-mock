'use client'
import config from '@/cloner.config';

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [clientPhotos, setClientPhotos] = useState<Record<string, string[]>>({})
    const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
        { from: 'bot', text: `Hi! I'm ${config.shortName}'s assistant. How can I help you today?` }
    ])
    const [input, setInput] = useState('')
    const [showOptions, setShowOptions] = useState(true)

    useEffect(() => {
        fetch('/api/client-photos')
            .then(res => res.json())
            .then(data => setClientPhotos(data))
            .catch(() => { })
    }, [])

    const widgetIconSrc = clientPhotos['favicon']?.find((img) => img.toLowerCase().includes('download')) || clientPhotos['favicon']?.[0] || '/favicon/download.png'

    const faqs = [
        { q: "Driveway Quote", a: `We can help with resin bound driveways, block paving and full frontage upgrades. Tell us a little about your property and we will point you toward the best option.` },
        { q: "Porcelain Paving", a: "Porcelain paving is ideal for clean, premium patios and outdoor living spaces. We can help with slab style, layout and the right finish for your garden." },
        { q: "Artificial Grass", a: "Artificial grass is a great low-maintenance option for family gardens and awkward lawn areas. Proper groundwork makes all the difference to the final finish." },
        { q: "Garden Makeover", a: "We handle full garden transformations including paving, artificial grass, pathways, screening and layout improvements to make the space more usable." }
    ]

    const handleQuickReply = (faq: { q: string; a: string }) => {
        setShowOptions(false)
        setMessages(prev => [...prev, { from: 'user', text: faq.q }])

        setTimeout(() => {
            setMessages(prev => [...prev,
            { from: 'bot', text: faq.a },
            { from: 'bot', text: "Thanks! Leave your name and phone number below and a member of the team will get back to you shortly." }
            ])
        }, 600)
    }

    const handleSend = () => {
        if (!input.trim()) return
        setShowOptions(false)
        setMessages(prev => [...prev, { from: 'user', text: input }])
        setInput('')

        setTimeout(() => {
            setMessages(prev => [...prev, {
                from: 'bot',
                text: "Thank you. We've logged your enquiry. Leave your contact details and the team will review your project and be in touch shortly."
            }])
        }, 1000)
    }

    return (
        <>
            {/* Chat bubble button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#9ea4ac] rounded-full shadow-lg flex items-center justify-center hover:bg-[#8e959e] transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="w-9 h-9"
                        >
                            <Image
                                src={widgetIconSrc}
                                alt={`${config.shortName} favicon`}
                                width={36}
                                height={36}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
                )}
            </motion.button>

            {/* Preview bubble when closed */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 1, duration: 0.3 }}
                        className="fixed bottom-8 right-24 z-40 bg-background border border-foreground/10 rounded-xl px-3 py-2 shadow-xl"
                    >
                        <p className="text-white text-xs">Chat with us</p>
                        <div className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-background border-r border-t border-foreground/10" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-[9999] w-[360px] max-w-[calc(100vw-3rem)] bg-background rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary px-5 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold">{config.businessName}</h3>
                                <p className="text-white/60 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    Online now
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.from === 'user'
                                        ? 'bg-white/10 text-white rounded-br-sm'
                                        : 'bg-primary text-white rounded-bl-sm'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick replies */}
                            {showOptions && (
                                <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
                                    {faqs.map((faq, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuickReply(faq)}
                                            className="text-xs bg-primary/10 border border-primary/30 text-white/90 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-left"
                                        >
                                            {faq.q}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                                />
                                <button
                                    onClick={handleSend}
                                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-center text-white/20 text-[10px] mt-3 tracking-wide">
                                Powered by Sovereign Systems
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
