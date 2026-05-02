"use client";

import React, { useState } from 'react';
import { 
  Search, ArrowRight, Languages, BookOpen, 
  ChevronLeft, Table as TableIcon, MessageCircle, 
  Lightbulb, User, UserCircle
} from 'lucide-react';

// ==========================================
// 1. DATA SOURCES
// ==========================================

const SUBJECTS = ["Io", "Tu", "Lui/Lei", "Noi", "Voi", "Loro"];

const LESSICO = [
  {
    id: "brioche",
    word: "La Brioche",
    type: "Noun",
    gender: "Feminine",
    meaning: "Breakfast pastry (croissant)",
    usage: "Northern Italy (Milano). Order this for breakfast with a cappuccino.",
    sentence: "Vorrei una brioche alla crema, per favore.",
    translation: "I would like a cream croissant, please."
  },
  {
    id: "cornetto",
    word: "Il Cornetto",
    type: "Noun",
    gender: "Masculine",
    meaning: "Breakfast pastry (croissant)",
    usage: "Southern Italy (Puglia). Essential regional terminology.",
    sentence: "Prendo un cornetto vuoto e un caffè.",
    translation: "I'll have a plain croissant and a coffee."
  },
  {
    id: "delizioso",
    word: "Delizioso",
    type: "Adjective",
    meaning: "Delicious",
    usage: "Use this to compliment the chef or waiter at a restaurant.",
    sentence: "Il cibo è delizioso, complimenti!",
    translation: "The food is delicious, my compliments!"
  }
];

const VERBS = [
  {
    id: "andare",
    word: "Andare",
    meaning: "To go",
    usage: "Irregular verb. Always uses 'Essere' as the auxiliary in past tenses.",
    sentence: "Vado a Milano domani.",
    translation: "I am going to Milan tomorrow.",
    conjugations: {
      presente: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
      passatoProssimo: ["sono andato/a", "sei andato/a", "è andato/a", "siamo andati/e", "siete andati/e", "sono andati/e"],
      imperfetto: ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"]
    }
  },
  {
    id: "venire",
    word: "Venire",
    meaning: "To come",
    usage: "Used when joining the listener at a destination or for invitations.",
    sentence: "Vuoi venire con noi in Puglia?",
    translation: "Do you want to come with us to Puglia?",
    conjugations: {
      presente: ["vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
      passatoProssimo: ["sono venuto/a", "sei venuto/a", "è venuto/a", "siamo venuti/e", "siete venuti/e", "sono venuti/e"],
      imperfetto: ["venivo", "venivi", "veniva", "venivamo", "venivate", "venivano"]
    }
  }
];

const GRAMMAR_TIPS = [
  {
    title: "Politeness: Tu vs. Lei",
    points: [
      "Use 'Lei' (Formal) for anyone older than you or in professional settings (doctors, shopkeepers).",
      "Use 'Tu' (Informal) for peers, friends, and younger people.",
      "Crucial phrases: 'Piacere di conoscerLa' (Formal) vs 'Piacere di conoscerti' (Informal)."
    ]
  },
  {
    title: "Prepositions of Place",
    points: [
      "A + City: Vado 'a' Milano, abito 'a' Roma.",
      "IN + Region/Country: Vado 'in' Puglia, abito 'in' Italia.",
      "DA + Person: Vado 'da' Luca (to Luca's house), vado 'dal' medico (to the doctor)."
    ]
  },
  {
    title: "The CI & NE Particles",
    points: [
      "CI: Replaces a place. 'Vado a Milano?' -> 'Ci vado.' (I'm going there).",
      "NE: Replaces a quantity. 'Vuoi del caffè?' -> 'Sì, ne vorrei uno.' (I'd like one of it)."
    ]
  }
];

const CONVERSATIONS = [
  {
    title: "Ordering Breakfast at a Milanese Bar",
    type: "Dialogue",
    lines: [
      { speaker: "Barista", text: "Buongiorno! Cosa vi porto?", en: "Good morning! What can I get you?" },
      { speaker: "Tu", text: "Buongiorno! Vorrei un cappuccino e una brioche alla crema, per favore.", en: "Good morning! I'd like a cappuccino and a cream croissant, please." },
      { speaker: "Barista", text: "Certamente. Altro?", en: "Certainly. Anything else?" },
      { speaker: "Tu", text: "No, grazie. Il conto?", en: "No, thanks. The bill?" }
    ]
  },
  {
    title: "A Day in Milano",
    type: "Monologue",
    content: "Visto che hai pochissimo tempo, fai una bella passeggiata nel centro storico. Vai a vedere il Duomo di Milano, è magnifico! Poi fai due passi nella Galleria Vittorio Emanuele II. La sera, andate a fare un classico aperitivo ai Navigli.",
    translation: "Since you have very little time, take a nice walk in the historic center. Go see the Duomo, it's magnificent! Then walk through the Galleria. In the evening, go for a classic aperitivo at the Navigli."
  }
];

// ==========================================
// 2. COMPONENTS
// ==========================================

const VerbDetail = ({ verb, onBack }: { verb: any; onBack: () => void }) => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline">
      <ChevronLeft size={20} /> Torna alla lista
    </button>
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-5xl font-serif font-black text-slate-900 mb-2">{verb.word}</h2>
      <p className="text-slate-500 italic text-xl mb-8">{verb.meaning}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {Object.entries(verb.conjugations).map(([tense, forms]: [string, any]) => (
          <div key={tense}>
            <h3 className="text-xs uppercase tracking-[0.2em] font-black text-indigo-600 mb-6 border-b border-indigo-50 pb-2">
              {tense.replace(/([A-Z])/g, ' $1')}
            </h3>
            <div className="space-y-4">
              {forms.map((form: string, i: number) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 text-xs font-mono">{SUBJECTS[i]}</span>
                  <span className="font-bold text-slate-800">{form}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ==========================================
// 3. MAIN APP
// ==========================================

export default function ItalianCrashCourse() {
  const [activeTab, setActiveTab] = useState("lessico");
  const [selectedVerb, setSelectedVerb] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <header className="mb-16 border-b border-slate-100 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-100">
                <Languages size={32} />
              </div>
              <h1 className="text-5xl font-serif font-black text-slate-900 tracking-tight">Italian Crash Course</h1>
            </div>
            
            <nav className="flex flex-wrap justify-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {[
                { id: "lessico", label: "Nouns & Adjectives" },
                { id: "verbi", label: "Verbs" },
                { id: "grammatica", label: "Grammar Tips" },
                { id: "conversazioni", label: "Conversations" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSelectedVerb(null); }}
                  className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? "bg-white text-indigo-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Search - Hidden on specific views */}
        {!selectedVerb && (activeTab === "lessico" || activeTab === "verbi") && (
          <div className="relative max-w-2xl mx-auto mb-16">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-14 pr-6 py-5 border-2 border-slate-100 rounded-3xl bg-slate-50/50 focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* 1. NOUNS & ADJECTIVES */}
        {activeTab === "lessico" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {LESSICO.filter(i => i.word.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col h-full shadow-sm hover:shadow-lg">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-serif font-bold text-slate-900">{item.word}</h3>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded uppercase">{item.type}</span>
                    {item.gender && <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase">{item.gender}</span>}
                  </div>
                </div>
                <p className="text-slate-600 font-bold mb-4">{item.meaning}</p>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed italic">{item.usage}</p>
                <div className="mt-auto pt-6 border-t border-slate-50">
                  <p className="text-slate-900 font-black italic">"{item.sentence}"</p>
                  <p className="text-slate-400 text-xs mt-1">— {item.translation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. VERBS */}
        {activeTab === "verbi" && (
          selectedVerb ? (
            <VerbDetail verb={selectedVerb} onBack={() => setSelectedVerb(null)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {VERBS.filter(v => v.word.toLowerCase().includes(searchQuery.toLowerCase())).map((verb) => (
                <div 
                  key={verb.id} 
                  onClick={() => setSelectedVerb(verb)}
                  className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-500 cursor-pointer transition-all group shadow-sm"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-indigo-600">{verb.word}</h3>
                    <TableIcon className="text-slate-200 group-hover:text-indigo-400" size={28} />
                  </div>
                  <p className="text-slate-600 font-bold mb-2">{verb.meaning}</p>
                  <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                    View Conjugations <ArrowRight size={14} />
                  </p>
                  <p className="text-slate-400 text-sm italic">"{verb.sentence}"</p>
                </div>
              ))}
            </div>
          )
        )}

        {/* 3. GRAMMAR TIPS */}
        {activeTab === "grammatica" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {GRAMMAR_TIPS.map((tip, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                    <Lightbulb size={24} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">{tip.title}</h3>
                </div>
                <ul className="space-y-4">
                  {tip.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-4 text-slate-700 leading-relaxed">
                      <div className="mt-2 w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* 4. CONVERSATIONS */}
        {activeTab === "conversazioni" && (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {CONVERSATIONS.map((conv, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                  <h3 className="text-xl font-serif font-bold">{conv.title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">{conv.type}</span>
                </div>
                <div className="p-8">
                  {conv.type === "Dialogue" ? (
                    <div className="space-y-6">
                      {conv.lines?.map((line, lIdx) => (
                        <div key={lIdx} className={`flex flex-col ${line.speaker === "Tu" ? "items-end text-right" : "items-start"}`}>
                          <span className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1">
                            {line.speaker === "Tu" ? <User size={10} /> : <UserCircle size={10} />} {line.speaker}
                          </span>
                          <div className={`max-w-md p-4 rounded-2xl ${line.speaker === "Tu" ? "bg-indigo-50 text-indigo-900 rounded-tr-none" : "bg-slate-50 text-slate-900 rounded-tl-none"}`}>
                            <p className="font-bold italic">{line.text}</p>
                            <p className="text-xs text-slate-400 mt-1">{line.en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-lg text-slate-700 leading-relaxed font-serif italic">"{conv.content}"</p>
                      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-500">
                        <strong>Translation:</strong> {conv.translation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
