"use client";

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Scale, Search, GitBranch, Feather, 
  Globe, Lightbulb, ArrowRight, Utensils, Languages, MapPin, Coffee
} from 'lucide-react';

// ==========================================
// 1. ITALIAN VOCABULARY (The new "Lexicon")
// ==========================================

const ITALIAN_LEXICON = [
  {
    id: "brioche",
    word: "La Brioche",
    usage: "Northern Italian Breakfast",
    etymology: "From French 'brioche'. Used specifically in Milan/North.",
    vibe: "The Milanese Morning. Flaky, sweet, paired with a cappuccino.",
    sentence: "Vorrei una brioche alla crema, per favore.",
    translation: "I would like a cream croissant, please.",
    category: "Food",
  },
  {
    id: "cornetto",
    word: "Il Cornetto",
    usage: "Southern Italian Breakfast",
    etymology: "From 'piccolo corno' (little horn).",
    vibe: "The Southern Staple. Essential for your trip to Puglia.",
    sentence: "Un cornetto e un caffè macchiato.",
    translation: "A croissant and a macchiato coffee.",
    category: "Food",
  },
  {
    id: "magari",
    word: "Magari",
    usage: "Expressing Desire or 'Maybe'",
    etymology: "From Greek 'makarie' (blessed).",
    vibe: "The Dreamer. 'I wish!' or 'If only it were true!'",
    sentence: "Vuoi venire in Italia? Magari!",
    translation: "Do you want to come to Italy? I wish!",
    category: "Conversational",
  },
  {
    id: "pasticceria",
    word: "La Pasticceria",
    usage: "Pastry Shop",
    etymology: "From 'pasta' (dough/paste).",
    vibe: "The High-Quality Choice. Better than a standard bar for breakfast.",
    sentence: "Cerchiamo una pasticceria storica a Brera.",
    translation: "Let's look for a historic pastry shop in Brera.",
    category: "Travel",
  }
];

// ==========================================
// 2. GRAMMAR CONTRASTS (The new "Battleground")
// ==========================================

const GRAMMAR_BATTLES = [
  {
    id: "tu-lei",
    title: "Tu vs. Lei",
    icon: "👥",
    description: "Informal vs. Formal Politeness",
    pair: [
      { term: "Tu", role: "Friends & Peers", logic: "Use with young people, friends, and family. (Piacere di conoscerti)." },
      { term: "Lei", role: "Seniors & Pros", logic: "Use with elders, waiters, and shopkeepers. (Piacere di conoscerLa)." }
    ]
  },
  {
    id: "andare-venire",
    title: "Andare vs. Venire",
    icon: "🚶",
    description: "Direction of Movement",
    pair: [
      { term: "Andare", role: "Going Away", logic: "Moving toward a place where the listener IS NOT." },
      { term: "Venire", role: "Coming Toward", logic: "Moving toward the listener or an invitation. (Vuoi venire con noi?)" }
    ]
  },
  {
    id: "sapere-conoscere",
    title: "Sapere vs. Conoscere",
    icon: "🧠",
    description: "Facts vs. Familiarity",
    pair: [
      { term: "Sapere", role: "The Fact", logic: "To know a piece of information or a skill. (So dove abita)." },
      { term: "Conoscere", role: "The Person/Place", logic: "To be acquainted with a person or place. (Conosco Milano)." }
    ]
  }
];

// ==========================================
// 3. TRAVEL GUIDE (The specialized Hub)
// ==========================================

const TRAVEL_GUIDE = [
  {
    id: "milan",
    title: "Late May in Milano",
    sections: [
      {
        topic: "The Aperitivo Ritual",
        content: "Head to the Navigli district. Order a 'Negroni Sbagliato' or a 'Spritz' between 6 PM and 8 PM.",
        tips: ["Duomo at sunrise", "Galleria Vittorio Emanuele", "Navigli canals"]
      }
    ]
  },
  {
    id: "puglia",
    title: "Heading South to Puglia",
    sections: [
      {
        topic: "Ordering in the South",
        content: "Language is more informal but regional terms matter. The food is 'delizioso' (delicious).",
        phrases: [
          { it: "Vengo dagli Stati Uniti.", en: "I come from the United States." },
          { it: "Il cibo è eccezionale!", en: "The food is exceptional!" }
        ]
      }
    ]
  }
];

// ==========================================
// 4. COMPONENTS
// ==========================================

const ItalianWordCard = ({ data }: { data: any }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-3xl font-serif font-bold text-emerald-900">{data.word}</h3>
      <span className="text-xs font-mono bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full uppercase tracking-tighter">
        {data.category}
      </span>
    </div>
    <div className="mb-4">
      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm mb-2 uppercase tracking-widest">
        <Languages size={16} />
        <span>{data.usage}</span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed italic">{data.etymology}</p>
    </div>
    <div className="bg-stone-50 p-4 rounded-lg mb-4 border-l-4 border-emerald-500">
      <p className="text-slate-700 text-sm italic">{data.vibe}</p>
    </div>
    <div className="space-y-1">
      <p className="text-emerald-900 font-bold">"{data.sentence}"</p>
      <p className="text-slate-400 text-xs">— {data.translation}</p>
    </div>
  </div>
);

const BattleCard = ({ data }: { data: any }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="bg-stone-50 p-4 border-b border-slate-200 flex items-center gap-3">
      <span className="text-2xl">{data.icon}</span>
      <h3 className="text-lg font-bold text-slate-800">{data.title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
      {data.pair.map((item: any, idx: number) => (
        <div key={idx} className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-serif text-xl font-bold text-emerald-700">{item.term}</span>
            <ArrowRight size={16} className="text-slate-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.role}</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{item.logic}</p>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// 5. MAIN APP
// ==========================================

export default function ItalianHubApp() {
  const [activeTab, setActiveTab] = useState("vocabolario");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVocab = ITALIAN_LEXICON.filter(item => 
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.usage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <Globe size={24} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Italian Travel Hub</h1>
          </div>
          
          <nav className="flex space-x-1 bg-stone-200/50 p-1 rounded-xl border border-stone-200">
            {["vocabolario", "grammatica", "guida"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                  activeTab === tab ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "guida" ? "Travel Guide 🇮🇹" : tab}
              </button>
            ))}
          </nav>
        </header>

        {activeTab === "vocabolario" && (
          <>
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Cerca parole o frasi..."
                className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {filteredVocab.map((item) => <ItalianWordCard key={item.id} data={item} />)}
            </div>
          </>
        )}

        {activeTab === "grammatica" && (
          <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-slate-900 italic">Confronti Grammaticali</h2>
              <p className="text-slate-600 mt-2 text-lg">Mastering the nuances of local speech.</p>
            </div>
            {GRAMMAR_BATTLES.map((battle) => <BattleCard key={battle.id} data={battle} />)}
          </div>
        )}

        {activeTab === "guida" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {TRAVEL_GUIDE.map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
                <h3 className="text-3xl font-serif font-bold text-emerald-900 mb-6 flex items-center gap-3">
                  <MapPin className="text-emerald-600" /> {trip.title}
                </h3>
                {trip.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-xl font-bold text-slate-800 border-b border-stone-100 pb-2">{section.topic}</h4>
                    <p className="text-slate-600 leading-relaxed">{section.content}</p>
                    {section.tips && (
                      <div className="flex flex-wrap gap-2">
                        {section.tips.map((tip, i) => (
                          <span key={i} className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight">
                            {tip}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
