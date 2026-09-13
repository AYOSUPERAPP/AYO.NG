"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FeedPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  function handleDoubleTap(id: number) {
    setLiked((s) => ({ ...s, [id]: !s[id] }));
  }

  const items = Array.from({ length: 6 }).map((_, i) => ({ id: i + 1 }));

  return (
    <div className="min-h-screen pt-6 pb-20 app-center">
      <div className="w-full max-w-[430px] px-4">
        <h2 className="text-xl font-bold mb-4">For You</h2>

        <div className="space-y-6">
          {items.map((it) => (
            <div key={it.id} className="relative bg-neutral-900 rounded-md overflow-hidden h-[600px] flex items-center justify-center">
              <motion.div
                onDoubleClick={() => handleDoubleTap(it.id)}
                className="w-full h-full flex items-center justify-center"
              >
                <div className="text-neutral-400">Video placeholder {it.id}</div>
              </motion.div>

              <div className="absolute right-4 bottom-6 flex flex-col items-center gap-3">
                <button className={`bg-white/10 text-white px-3 py-2 rounded-md`}>{liked[it.id] ? "Liked" : "Like"}</button>
                <div className="text-xs text-neutral-300">Gift split 70/30 note</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
