"use client";

import React from "react"

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatWidget() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    t("chat.quickReplies.sample"),
    t("chat.quickReplies.quote"),
    t("chat.quickReplies.contact"),
    t("chat.quickReplies.products"),
  ];

  // Initialize welcome message when component mounts
  useEffect(() => {
    if (!initialized) {
      setMessages([{
        id: 1,
        text: t("chat.welcome"),
        isUser: false,
        timestamp: new Date(),
      }]);
      setInitialized(true);
    }
  }, [initialized, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let response = "";
      const lowerText = messageText.toLowerCase();

      if (lowerText.includes("sample")) {
        response =
          "We'd be happy to send you fabric samples! Please email us at info@gocommtex.com with your requirements and shipping address, and we'll arrange the samples for you.";
      } else if (lowerText.includes("fabric") || lowerText.includes("product")) {
        response =
          "We specialize in premium natural fiber fabrics including wool, cashmere, yak hair, alpaca, and silk blends. Our products are perfect for high-end autumn/winter clothing. Would you like to visit our Products page or request specific samples?";
      } else if (lowerText.includes("quote") || lowerText.includes("price")) {
        response =
          "For a detailed quote, please contact us directly at info@gocommtex.com or call +86 19884900913. Please include your fabric requirements, quantity, and any specific specifications.";
      } else if (lowerText.includes("contact")) {
        response =
          "You can reach us at:\n\nEmail: info@gocommtex.com\nPhone: +86 19884900913\n\nOur office is located at Building B, No. 16 Shuanghong Road, Haizhou Street, Haining, Jiaxing, Zhejiang, China.";
      } else {
        response =
          "Thank you for your message! For specific inquiries, please email us at info@gocommtex.com or call +86 19884900913. Our team will be happy to assist you with fabric samples, quotes, or any questions about our products.";
      }

      const botMessage: Message = {
        id: Date.now(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110",
          isOpen
            ? "bg-muted-foreground text-background"
            : "bg-accent text-accent-foreground"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-border",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-semibold">{t("chat.title")}</h3>
              <p className="text-xs text-primary-foreground/70">
                {t("chat.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-secondary/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line",
                  message.isUser
                    ? "bg-accent text-accent-foreground rounded-br-sm"
                    : "bg-card text-card-foreground border border-border rounded-bl-sm"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-border bg-card">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("chat.placeholder")}
              className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-muted-foreground"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Contact Options */}
        <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-center gap-6">
          <a
            href="mailto:info@gocommtex.com"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={14} />
            {t("chat.emailUs")}
          </a>
          <a
            href="tel:+8619884900913"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone size={14} />
            {t("chat.callUs")}
          </a>
        </div>
      </div>
    </>
  );
}
