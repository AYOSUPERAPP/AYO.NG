"use client";

import React from "react";

export default function WalletPage() {
  const balance = 12450;
  const giftsPlatform = 2340; // 30% from gifts
  const winningsPlatform = 890; // 10% from winnings
  const platformEarnings = giftsPlatform + winningsPlatform; // 3230

  const transactions = [
    { id: "t1", type: "gift", amount: 500, date: "2026-09-10" },
    { id: "t2", type: "cashout", amount: -2000, date: "2026-09-08" },
    { id: "t3", type: "win", amount: 890, date: "2026-09-01" },
  ];

  function handleCashout() {
    // placeholder for Paystack integration
    alert("Triggering Paystack cashout. Set PAYSTACK_SECRET_KEY in env and implement server API.");
  }

  return (
    <div className="min-h-screen pt-6 pb-20 app-center">
      <div className="w-full max-w-[430px] px-4">
        <h2 className="text-2xl font-bold mb-4">Wallet</h2>

        <div className="bg-neutral-900 rounded-md p-4 mb-4">
          <div className="text-sm text-neutral-400">Balance</div>
          <div className="text-3xl font-semibold">{balance}</div>
        </div>

        <div className="bg-neutral-900 rounded-md p-4 mb-4">
          <div className="text-sm text-neutral-400 mb-2">Platform earnings breakdown</div>
          <div className="flex justify-between">
            <div>30% from gifts</div>
            <div>{giftsPlatform}</div>
          </div>
          <div className="flex justify-between">
            <div>10% from winnings</div>
            <div>{winningsPlatform}</div>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <div>Platform earnings</div>
            <div>{platformEarnings}</div>
          </div>
        </div>

        <div className="mb-4">
          <button onClick={handleCashout} className="w-full bg-yellow-400 text-black py-3 rounded-md font-semibold">
            Cashout via Paystack
          </button>
        </div>

        <div className="bg-neutral-900 rounded-md p-4">
          <div className="text-sm text-neutral-400 mb-2">Transactions</div>
          <ul className="space-y-2">
            {transactions.map((t) => (
              <li key={t.id} className="flex justify-between text-sm">
                <span>{t.type}</span>
                <span>{t.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
