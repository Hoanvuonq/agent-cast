'use-client'
import React from 'react';

export const TypingIndicator: React.FC = () => (
    <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
        <div className="bg-gradient-chat-bot text-white self-start px-4 py-2 rounded-xl rounded-tl-sm">
            <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-[0.5vw] h-[0.5vw] bg-white rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
                <span className="xl:tracking-[0.1vw] tracking-[0.2vw]  xl:text-[0.8vw] lg:text-[1vw] md:text-[1.4vw] sm:text-[1.5vw] text-[3.5vw] text-white">Agents is typing ...</span>
            </div>
        </div>
    </div>
);