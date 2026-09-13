"use client";

import React, { useState } from "react";

const LANGUAGES = [
  { code: "yo", name: "Yoruba", flag: "NG" },
  { code: "ig", name: "Igbo", flag: "NG" },
  { code: "ha", name: "Hausa", flag: "NG" },
  { code: "pcm", name: "Pidgin", flag: "NG" },
  { code: "en", name: "English", flag: "GB" },
  { code: "fr", name: "French", flag: "FR" },
  { code: "zh", name: "Chinese", flag: "CN" },
  { code: "es", name: "Spanish", flag: "ES" },
];

export default function AyoVoiceTranslatorAll() {
  const [from, setFrom] = useState<string>("en");
  const [to, setTo] = useState<string>("yo");

  return (
    <div className="p-4 bg-neutral-900 rounded-md">
      <div className="text-sm font-semibold mb-2">Voice Translator</div>
      <div className="flex gap-2">
        <select className="flex-1 p-2 bg-neutral-800 rounded-md" value={from} onChange={(e) => setFrom(e.target.value)}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{`${l.code} - ${l.name} - ${l.flag}`}</option>
          ))}
        </select>
        <select className="flex-1 p-2 bg-neutral-800 rounded-md" value={to} onChange={(e) => setTo(e.target.value)}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{`${l.code} - ${l.name} - ${l.flag}`}</option>
          ))}
        </select>
      </div>

      <div className="mt-3 text-xs text-neutral-400">Supported languages: {LANGUAGES.map((l) => l.code).join(", ")}</div>
    </div>
  );
}
