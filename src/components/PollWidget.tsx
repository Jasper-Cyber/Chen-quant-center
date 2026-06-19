"use client";

import { useEffect, useState, useMemo, Fragment } from "react";

type PollId = "us-market-view" | "industry" | "country";

const polls: {
  id: PollId;
  title: string;
  options: string[];
}[] = [
  {
    id: "us-market-view",
    title: "View on U.S. stock market (next 12 months)",
    options: ["Bullish", "Neutral", "Bearish", "Uncertain"],
  },
  {
    id: "industry",
    title: "Your industry (optional)",
    options: [
      "Asset management",
      "Banking",
      "Technology",
      "Academia",
      "Student",
      "Other",
    ],
  },
  {
    id: "country",
    title: "Your country/region (voluntary)",
    options: ["United States", "China", "Europe", "Other"],
  },
];

export default function PollWidget() {
  const [results, setResults] = useState<Record<PollId, Record<string, number>> | null>(
    null
  );
  const [votedPolls, setVotedPolls] = useState<Set<PollId>>(new Set());

  // Helper to get current year and quarter
  const getCurrentQuarter = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is 0-indexed
    const quarter = Math.ceil(month / 3);
    return `${year}Q${quarter}`;
  }, []);

  useEffect(() => {
    fetch(`/api/poll?quarter=${getCurrentQuarter}`)
      .then((r) => r.json())
      .then((j) => setResults(j.polls))
      .catch(() => null);

    // Load voted polls from localStorage on mount
    const storedVotes = localStorage.getItem(`cqc_voted_polls_${getCurrentQuarter}`);
    if (storedVotes) {
      try {
        const parsedVotes = JSON.parse(storedVotes);
        if (Array.isArray(parsedVotes) && parsedVotes.every(id => polls.some(p => p.id === id))) {
          setVotedPolls(new Set(parsedVotes));
        }
      } catch (e) {
        console.error("Failed to parse voted polls from localStorage", e);
      }
    }
  }, [getCurrentQuarter]);

  async function vote(pollId: PollId, choice: string) {
    if (votedPolls.has(pollId)) {
      return; // User has already voted for this poll
    }

    const res = await fetch("/api/poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pollId, choice, quarter: getCurrentQuarter }),
    });
    const json = await res.json();
    if (res.ok) {
      setResults(json.polls);


      // Update voted polls in state and localStorage
      const newVotedPolls = new Set(votedPolls);
      newVotedPolls.add(pollId);
      setVotedPolls(newVotedPolls);
       localStorage.setItem(`cqc_voted_polls_${getCurrentQuarter}`, JSON.stringify(Array.from(newVotedPolls)));
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-mist">
        Anonymous polls—no login required. Results aggregate on the server for this quarter.
        <span className="font-bold"> Current Quarter: {getCurrentQuarter}</span>
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {polls.map((poll) => (
        <div key={poll.id} className="card">
          <h3 className="font-semibold text-ink">{poll.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {poll.options.map((opt) => (
              <button
                key={opt}
                type="button"
                disabled={votedPolls.has(poll.id)}
                onClick={() => vote(poll.id, opt)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${
                  votedPolls.has(poll.id)
                    ? "border-slate-200 text-mist cursor-not-allowed opacity-60"
                    : "border-slate-300 text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {votedPolls.has(poll.id) && results?.[poll.id] && (
            <div className="mt-6 space-y-3">
              {(() => {
                const pollResults = results[poll.id];
                const totalVotes = Object.values(pollResults).reduce((sum, val) => sum + val, 0);
                
                return Object.entries(pollResults)
                  .sort((a, b) => b[1] - a[1])
                  .map(([option, count]) => {
                    const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                    return (
                      <div key={option} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 truncate text-xs font-medium text-ink" title={option}>
                          {option}
                        </span>
                        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div 
                            className="h-full bg-accent transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-10 text-right font-mono text-[10px] text-mist">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    );
                  });
              })()}
            </div>
          )}
        </div>
        ))}
      </div>
    </div>
  );
}
