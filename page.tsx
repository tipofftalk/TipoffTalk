'use client';

import { useMemo, useState } from 'react';

type Player = {
  name: string;
  team: string;
  rating: number;
  tier: string;
  verdict: string;
  offense: number;
  defense: number;
  impact: number;
  strengths: string[];
  weaknesses: string[];
};

const players: Player[] = [
  {
    name: 'Nikola Jokić', team: 'DEN', rating: 97, tier: 'Generational',
    verdict: 'The safest answer in basketball. Elite scoring, elite creation, complete offensive control.',
    offense: 99, defense: 82, impact: 99,
    strengths: ['Playmaking', 'Touch', 'Rebounding'], weaknesses: ['Vertical rim deterrence', 'Transition footspeed']
  },
  {
    name: 'Shai Gilgeous-Alexander', team: 'OKC', rating: 96, tier: 'Generational',
    verdict: 'A superstar scorer who makes the whole offense feel calm, clean, and under control.',
    offense: 98, defense: 86, impact: 97,
    strengths: ['Shot creation', 'Foul drawing', 'Midrange control'], weaknesses: ['Lower 3PT volume', 'Wing size']
  },
  {
    name: 'Luka Dončić', team: 'LAL', rating: 95, tier: 'Superstar',
    verdict: 'If you need one player to generate offense on demand, Luka is near the very top.',
    offense: 99, defense: 78, impact: 96,
    strengths: ['Advantage creation', 'Passing reads', 'Late-clock offense'], weaknesses: ['Ball dominance', 'Consistent defensive pressure']
  },
  {
    name: 'Giannis Antetokounmpo', team: 'MIL', rating: 94, tier: 'Superstar',
    verdict: 'One of the most physically overwhelming players alive. He turns normal possessions into emergencies.',
    offense: 94, defense: 91, impact: 95,
    strengths: ['Rim pressure', 'Transition scoring', 'Help defense'], weaknesses: ['Jumper gravity', 'Availability']
  },
  {
    name: 'Anthony Edwards', team: 'MIN', rating: 91, tier: 'Superstar',
    verdict: 'Looks like a superstar because he is one. Explosive, confident, and built for big moments.',
    offense: 93, defense: 82, impact: 90,
    strengths: ['Pressure scoring', 'Athletic pop', 'Self-creation'], weaknesses: ['Advanced playmaking', 'Shot diet variance']
  },
  {
    name: 'Victor Wembanyama', team: 'SAS', rating: 90, tier: 'Superstar',
    verdict: 'The easiest casual explanation: he does things normal humans cannot do.',
    offense: 88, defense: 97, impact: 92,
    strengths: ['Shot blocking', 'Length mismatch', 'Defensive ceiling'], weaknesses: ['Strength base', 'Creation polish']
  }
];

const articles = [
  'Why Anthony Edwards is closer to MVP than people think',
  'Luka doesn’t need more help — he needs the right ecosystem',
  'What people still misunderstand about Steph’s gravity'
];

const sessions = [
  'Is Shai already more reliable than every other guard?',
  'Why Luka breaks normal roster logic',
  'The real Ant timeline'
];

const games = [
  { matchup: 'DEN vs OKC', status: 'Live • Q4 5:18', score: '108 - 104', verdict: 'Shai is controlling the pace. Jokic is still bending every help rotation.' },
  { matchup: 'LAL vs MIN', status: '7:30 PM', score: 'Preview', verdict: 'This matchup alone feels app-open worthy.' },
  { matchup: 'MIL vs NYK', status: 'Final', score: '121 - 116', verdict: 'Giannis closed it late. Brunson still looked like a real lead guard.' }
];

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="statBar">
      <div className="statRow"><span>{label}</span><strong>{value}</strong></div>
      <div className="track"><div className="fill" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

export default function Page() {
  const [tab, setTab] = useState<'home'|'savant'|'articles'|'sessions'|'games'>('home');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(players[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return players;
    return players.filter((p) => `${p.name} ${p.team} ${p.tier}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="page">
      <section className="hero card">
        <div>
          <div className="eyebrow">TipoffTalk pre-launch</div>
          <h1>The everything basketball app.</h1>
          <p className="sub">Live scores, verdict-driven player pages, exclusive writing, app-only sessions, and daily-use basketball culture in one place.</p>
          <div className="chips">
            {['Live games', 'Savant ratings', 'Exclusive articles', 'App-only sessions'].map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div className="heroGrid">
          <div className="miniCard"><span>Brand</span><strong>TipoffTalk</strong></div>
          <div className="miniCard"><span>Core</span><strong>Savant</strong></div>
          <div className="miniCard"><span>Hook</span><strong>Verdicts</strong></div>
          <div className="miniCard"><span>Habit</span><strong>Scores + alerts</strong></div>
        </div>
      </section>

      <nav className="tabs card">
        {['home', 'savant', 'articles', 'sessions', 'games'].map((t) => (
          <button key={t} className={tab === t ? 'tab active' : 'tab'} onClick={() => setTab(t as any)}>
            {t}
          </button>
        ))}
      </nav>

      {tab === 'home' && (
        <section className="grid2">
          <div className="card pad">
            <div className="sectionLabel">Featured verdict</div>
            <h2>Anthony Edwards is closer to MVP than most casuals realize.</h2>
            <p className="body">That kind of sentence is the whole point of the product. Fast, debatable, screenshot-worthy, and worth opening the app to unpack.</p>
            <div className="listStack">
              <div className="rowCard"><strong>Games</strong><span>Daily utility and live opens</span></div>
              <div className="rowCard"><strong>Savant</strong><span>Trust layer that tells people how good players actually are</span></div>
              <div className="rowCard"><strong>Content</strong><span>Your voice through articles and sessions</span></div>
            </div>
          </div>
          <div className="card pad">
            <div className="sectionLabel">Tonight</div>
            {games.map((g) => (
              <div key={g.matchup} className="gameCard">
                <div><strong>{g.matchup}</strong><div className="muted">{g.status}</div></div>
                <div className="score">{g.score}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'savant' && (
        <section className="grid2">
          <div className="card pad">
            <div className="sectionLabel">Search players</div>
            <input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Jokic, Shai, Luka..." />
            <div className="listStack topGap">
              {filtered.map((p) => (
                <button key={p.name} className={selected.name === p.name ? 'playerRow selected' : 'playerRow'} onClick={() => setSelected(p)}>
                  <div>
                    <strong>{p.name}</strong>
                    <div className="muted">{p.team} • {p.tier}</div>
                  </div>
                  <div className="scoreSmall">{p.rating}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="card pad">
            <div className="sectionLabel">Player verdict</div>
            <div className="headlineRow">
              <div>
                <h2>{selected.name}</h2>
                <div className="muted">{selected.team} • {selected.tier}</div>
              </div>
              <div className="scoreBig">{selected.rating}</div>
            </div>
            <p className="body">{selected.verdict}</p>
            <div className="statsGrid">
              <StatBar label="Offense" value={selected.offense} />
              <StatBar label="Defense" value={selected.defense} />
              <StatBar label="Impact" value={selected.impact} />
            </div>
            <div className="grid2small topGap">
              <div className="softCard"><strong>Strengths</strong><ul>{selected.strengths.map((s) => <li key={s}>{s}</li>)}</ul></div>
              <div className="softCard"><strong>Weaknesses</strong><ul>{selected.weaknesses.map((s) => <li key={s}>{s}</li>)}</ul></div>
            </div>
          </div>
        </section>
      )}

      {tab === 'articles' && (
        <section className="grid2">
          <div className="card pad">
            <div className="sectionLabel">Featured article</div>
            <h2>{articles[0]}</h2>
            <p className="body">Fast reads, strong opinions, and a final verdict. This is the writing layer that feeds your IG and makes the app feel owned.</p>
            <div className="quoteBox">Final Verdict: Top-tier trajectory. Not just hype anymore.</div>
          </div>
          <div className="card pad">
            <div className="sectionLabel">Queue</div>
            <div className="listStack">
              {articles.map((a) => <div className="rowCard" key={a}><strong>{a}</strong><span>Exclusive / app-first</span></div>) }
            </div>
          </div>
        </section>
      )}

      {tab === 'sessions' && (
        <section className="grid2">
          <div className="card pad">
            <div className="sectionLabel">Session player</div>
            <h2>{sessions[0]}</h2>
            <p className="body">App-only audio with teaser clips pushed to IG. This keeps the full value inside your ecosystem.</p>
            <div className="playerBox">
              <button className="playButton">▶</button>
              <div className="audioMeta"><strong>Now playing</strong><span>TipoffTalk Session • 12 min</span></div>
            </div>
            <div className="track topGap"><div className="fill" style={{ width: '28%' }} /></div>
          </div>
          <div className="card pad">
            <div className="sectionLabel">Up next</div>
            <div className="listStack">
              {sessions.map((s) => <div className="rowCard" key={s}><strong>{s}</strong><span>App only</span></div>) }
            </div>
          </div>
        </section>
      )}

      {tab === 'games' && (
        <section className="grid2">
          <div className="card pad">
            <div className="sectionLabel">Featured game</div>
            <h2>DEN vs OKC</h2>
            <div className="muted">Live • Q4 5:18 • Ball Arena</div>
            <div className="headlineRow topGap">
              <div className="scoreHuge">108 - 104</div>
              <div className="chip">Tipoff verdict: Shai is controlling the pace.</div>
            </div>
            <div className="table topGap">
              <div className="tableHead"><span>Player</span><span>PTS</span><span>REB</span><span>AST</span></div>
              {[
                ['Shai Gilgeous-Alexander', '34', '4', '8'],
                ['Nikola Jokić', '29', '13', '10'],
                ['Jamal Murray', '19', '3', '5']
              ].map((r) => (
                <div className="tableRow" key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span></div>
              ))}
            </div>
          </div>
          <div className="card pad">
            <div className="sectionLabel">Live notes</div>
            <div className="listStack">
              {[
                '5:18 — Shai hits a pull-up middy over drop coverage.',
                '4:42 — Jokic slips the trap and finds a cutter.',
                '3:59 — Holmgren alters a layup, OKC pushes in transition.'
              ].map((n) => <div className="rowCard" key={n}><strong>{n}</strong><span>Play-by-play style note</span></div>)}
            </div>
          </div>
        </section>
      )}

      <section className="footerGrid">
        {[
          ['Deploy-ready', 'Upload this folder to Vercel and it will build as a real site.'],
          ['Best next step', 'Connect a custom domain and start iterating publicly.'],
          ['Use case', 'Show partners, Sidney, or your audience a real product link.']
        ].map(([title, body]) => (
          <div className="card pad small" key={title}><strong>{title}</strong><p className="muted topGapSmall">{body}</p></div>
        ))}
      </section>
    </main>
  );
}
