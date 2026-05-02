"use client";

import React, { useState } from 'react';
import { 
  Search, GitBranch, Globe, Lightbulb, ArrowRight, 
  Utensils, Languages, MapPin, BookOpen, Info 
} from 'lucide-react';

// ==========================================
// 1. DATA SOURCES (Refined for Italian Hub)
// ==========================================

const ITALIAN_LEXICON = [
  {
    id: "brioche",
    word: "La Brioche",
    type: "Noun",
    gender: "Feminine",
    usage: "Northern Italy",
    vibe: "Milanese breakfast staple.",
    sentence: "Vorrei una brioche alla crema.",
    translation: "I would like a cream croissant.",
    category: "Food",
  },
  {
    id: "cornetto",
    word: "Il Cornetto",
    type: "Noun",
    gender: "Masculine",
    usage: "Southern Italy",
    vibe: "Essential for your trip to Puglia.",
    sentence: "Prendo un cornetto vuoto e un caffè.",
    translation: "I'll have a plain croissant and a coffee.",
    category: "Food",
  },
  {
    id: "andare",
    word: "Andare",
    type: "Verb",
    conjugation: "vado, vai, va, andiamo, andate, vanno",
    usage: "Movement away",
    vibe: "Irregular. Requieres 'essere' in past tenses.",
    sentence: "Vado a Milano domani.",
    translation: "I am going to Milan tomorrow.",
    category: "Grammar",
  },
  {
    id: "venire",
    word: "Venire",
    type: "Verb",
    conjugation: "vengo, vieni, viene, veniamo, venite, vengono",
    usage: "Movement toward",
    vibe: "Use for invitations or joining the listener.",
    sentence: "Vuoi venire con noi in Puglia?",
    translation: "Do you want to come with us to Puglia?",
    category: "Grammar",
  },
  {
    id: "pasticceria",
    word: "La Pasticceria",
    type: "Noun",
    gender: "Feminine",
    usage: "Quality Breakfast",
    vibe: "The location you look for to find real brioche.",
    sentence: "Dov'è la pasticceria più vicina?",
    translation: "Where is the nearest pastry shop?",
    category: "Travel",
  }
];

const GRAMMAR_BATTLES = [
  {
    id: "sapere-conoscere",
    title: "Sapere vs. Conoscere",
    icon: "🧠",
    pair: [
      { 
        term: "Sapere", 
        role: "Facts/Skills", 
        logic: "To know info or how to do something.",
        conj: "so, sai, sa, sappiamo, sapete, sanno" 
      },
      { 
        term: "Conoscere", 
        role: "People/Places", 
        logic: "To be acquainted/familiar with.",
        conj: "conosco, conosci, conosce, conosciamo..." 
      }
    ]
  },
  {
    id: "essere-avere",
    title: "Essere vs. Avere",
    icon: "⚖️",
    pair: [
      { 
        term: "Essere", 
        role: "Movement/State", 
        logic: "Used for 'andare', 'arrivare', and reflexives.",
        conj: "sono, sei, è, siamo, siete, sono" 
      },
      { 
        term: "Avere", 
        role: "Transitive", 
        logic: "Used for most other verbs (mangiare, comprare).",
        conj: "ho, hai, ha, abbiamo, avete, hanno" 
      }
    ]
  }
];

const TRAVEL_GUIDE = [
  {
    id: "milano",
    title: "Milano Essentials",
    sections: [
      {
        topic: "Geography & Dining",
        content: "In Milano, it is always 'Brioche'. Order at the counter (banco) or sit (tavolo).",
        phrases: [
          { it: "Un caffè amaro, per favore.", en: "A bitter coffee (no sugar), please." }
        ]
      },
      {
        topic: "The Navigli Night",
        content: "Late May is perfect for aperitivo by the canals.",
        tips: ["Order a Spritz", "Check out the Duomo at dusk"]
      }
    ]
  }
];

// ==========================================
// 2. COMPONENTS
// ==========================================

const ItalianWordCard = ({ data }: { data: any }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full font-sans">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-3xl font-serif font-bold text-emerald-900">{data.word}</h3>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
          {data.type}
        </span>
        {data.gender && (
          <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full uppercase">
            {data.gender}
          </span>
        )}
      </div>
    </div>

    <div className="mb-4">
      {data.conjugation ? (
        <div className="mb-2 p-2 bg-emerald-50/50 rounded border border-emerald-100">
           <p className="text-[10px] uppercase text-emerald-600 font-bold mb-1">Conjugation</p>
           <p className="text-xs text-emerald-800 font-mono italic">{data.conjugation}</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-emerald-600 font-medium text-xs mb-2 uppercase tracking-widest">
          <Info size={14} />
          <span>{data.usage}</span>
        </div>
      )}
    </div>

    <div className="bg-stone-50 p-4 rounded-lg mb-4 border-l-4 border-emerald-500 italic text-stone-700 text-sm">
      {data.vibe}
    </div>

    <div className="mt-auto space-y-1">
      <p className="text-emerald-950 font-bold text-lg">"{data.sentence}"</p>
      <p className="text-slate-400 text-xs">— {data.translation}</p>
    </div>
  </div>
);

// ==========================================
// 3. MAIN APP
// ==========================================

export default function ItalianHubApp() {
  const [activeTab, setActiveTab] = useState("vocabolario");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVocab = ITALIAN_LEXICON.filter(item => 
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 font-sans selection:bg-emerald-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-700 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
              <Globe size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Italian Travel Hub</h1>
              <p className="text-xs text-stone-400 uppercase tracking-[0.2em] font-bold">May 2024 Expedition</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-stone-200/50 p-1 rounded-xl border border-stone-200">
            {["vocabolario", "grammatica", "guida"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                  activeTab === tab ? "bg-white text-emerald-700 shadow-sm" : "text-stone-500 hover:text-slate-700"
                }`}
              >
                {tab === "guida" ? "Travel Guide 🇮🇹" : tab}
              </button>
            ))}
          </nav>
        </header>

        {activeTab === "vocabolario" && (
          <div className="animate-in fade-in duration-500">
            <div className="relative max-w-2xl mx-auto mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Cerca parole, categorie o verbi..."
                className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVocab.map((item) => <ItalianWordCard key={item.id} data={item} />)}
            </div>
          </div>
        )}

        {activeTab === "grammatica" && (
          <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-slate-900 italic underline decoration-emerald-200 underline-offset-8">La Grammatica</h2>
              <p className="text-stone-500 mt-4 text-lg font-serif italic">Distinguishing the building blocks of the language.</p>
            </div>
            {GRAMMAR_BATTLES.map((battle) => (
              <div key={battle.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <div className="bg-stone-50 p-4 border-b border-stone-200 flex items-center gap-3">
                  <span className="text-2xl">{battle.icon}</span>
                  <h3 className="text-xl font-bold text-slate-800">{battle.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                  {battle.pair.map((item: any, idx: number) => (
                    <div key={idx} className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-serif text-2xl font-bold text-emerald-700">{item.term}</span>
                        <ArrowRight size={16} className="text-stone-300" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 bg-stone-50 px-2 py-1 rounded">{item.role}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{item.logic}</p>
                      <div className="p-3 bg-emerald-50/30 rounded-lg border border-emerald-50 italic text-xs text-emerald-900">
                        {item.conj}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guida" && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {TRAVEL_GUIDE.map((trip) => (
              <div key={trip.id} className="space-y-8">
                <h3 className="text-4xl font-serif font-bold text-slate-900 flex items-center gap-3 italic">
                  <MapPin className="text-emerald-600" size={32} /> {trip.title}
                </h3>
                <div className="grid gap-6">
                  {trip.sections.map((section: any, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm group">
                      <h4 className="text-xl font-bold text-slate-800 border-b border-stone-100 pb-3 mb-4 group-hover:text-emerald-700 transition-colors">{section.topic}</h4>
                      <p className="text-slate-600 leading-relaxed mb-6">{section.content}</p>
                      
                      {/* FIXED VERCEL ISSUE: Defensive property checking */}
                      {section.phrases && (
                        <div className="grid gap-3">
                          {section.phrases.map((p: any, i: number) => (
                            <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                              <p className="text-emerald-900 font-bold italic">"{p.it}"</p>
                              <p className="text-stone-400 text-xs">{p.en}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.tips && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {section.tips.map((tip: string, i: number) => (
                            <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                              Tip: {tip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
