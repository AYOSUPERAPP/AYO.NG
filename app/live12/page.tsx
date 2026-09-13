"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOX_COUNT = 12;
const COLS = 3;

type Participant = {
  id: number;
  name: string;
  isHost: boolean;
  muted: boolean;
};

export default function Live12Page() {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    return Array.from({ length: BOX_COUNT }).map((_, i) => ({
      id: i,
      name: `User ${i + 1}`,
      isHost: i === 0,
      muted: false,
    }));
  });

  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [enlarged, setEnlarged] = useState<number | null>(null);
  const [hostBalance, setHostBalance] = useState<number>(5000);
  const [platformEarnings, setPlatformEarnings] = useState<number>(0);

  useEffect(() => {
    // random speaking detection simulation
    const interval = setInterval(() => {
      const next = Math.random() < 0.8 ? Math.floor(Math.random() * BOX_COUNT) : null;
      setSpeakingIndex(next as any);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  function toggleMute(id: number) {
    setParticipants((p) => p.map((x) => (x.id === id ? { ...x, muted: !x.muted } : x)));
  }

  function sendGift(value: number) {
    // apply gift logic: 30% to platform
    const platformShare = Math.round(value * 0.3);
    const hostShare = value - platformShare;
    // for demo, give to host (participant 0)
    setHostBalance((b) => b + hostShare);
    setPlatformEarnings((p) => p + platformShare);
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-4 pb-20 app-center">
      <div className="w-full max-w-[430px]">
        <h1 className="text-xl font-bold mb-3">LIVE12 Room</h1>

        <div className="grid grid-cols-3 gap-2">
          {participants.map((p) => {
            const idx = p.id;
            const isSpeaking = speakingIndex === idx;
            const isEnlarged = enlarged === idx;
            return (
              <motion.div
                key={p.id}
                layout
                whileTap={{ scale: 0.98 }}
                onClick={() => setEnlarged((s) => (s === idx ? null : idx))}
                className={`relative bg-neutral-900 rounded-md overflow-hidden aspect-[3/4] p-1 border-2 ${
                  isSpeaking ? "border-green-400 speaking-pulse" : "border-neutral-800"
                }`}
                style={{ gridRowEnd: `span 1` }}
              >
                <motion.div
                  animate={{ scale: isEnlarged ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-full h-full bg-black flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start p-2">
                    <div className="flex items-center gap-2">
                      {p.isHost && (
                        <span className="text-yellow-400 text-xs font-semibold">HOST</span>
                      )}
                      <span className="text-xs text-neutral-300">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="mute"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(p.id);
                        }}
                        className="text-neutral-300 text-xs"
                      >
                        {p.muted ? "M" : "S"}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                      <div className="text-xs text-neutral-400">Video {p.id + 1}</div>
                    </div>
                  </div>

                  <div className="p-2 flex justify-between items-center">
                    <div className="text-xs text-neutral-400">{isSpeaking ? "Speaking" : ""}</div>
                    <div className="text-xs text-neutral-400">{p.muted ? "Muted" : "Live"}</div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 bg-neutral-900 rounded-md p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="bg-neutral-800 px-3 py-2 rounded-md">Mic</button>
            <button className="bg-neutral-800 px-3 py-2 rounded-md">Chat</button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => sendGift(100)}
                className="bg-yellow-500 text-black px-3 py-2 rounded-md font-semibold"
              >
                Gift 100
              </button>
              <button
                onClick={() => sendGift(500)}
                className="bg-yellow-500 text-black px-3 py-2 rounded-md font-semibold"
              >
                Gift 500
              </button>
              <button
                onClick={() => sendGift(1000)}
                className="bg-yellow-500 text-black px-3 py-2 rounded-md font-semibold"
              >
                Gift 1000
              </button>
            </div>
          </div>

          <div className="text-right text-xs">
            <div>Host balance: {hostBalance}</div>
            <div>Platform earnings: {platformEarnings}</div>
          </div>
        </div>

        <div className="mt-3 text-xs text-neutral-400">
          Gift split: giftValue * 0.3 goes to platform earnings. Host receives remaining share.
        </div>
      </div>
    </div>
  );
}
