"use client";

import React, { useState } from 'react';
import { 
  Search, Globe, ArrowRight, Utensils, 
  Languages, MapPin, BookOpen, ChevronLeft, 
  Table as TableIcon, Info
} from 'lucide-react';

// ==========================================
// 1. DATA STRUCTURES & TYPES
// ==========================================

interface Phrase {
  it: string;
  en: string;
}

interface GuideSection {
  topic: string;
  content: string;
  phrases?: Phrase[];
  tips?: string[];
}

interface Conjugation {
  presente: string[];
  passatoProssimo: string[];
  imperfetto: string[];
}

const SUBJECTS = ["Io", "Tu", "Lui/Lei", "Noi", "Voi", "Loro"];

const NOUNS_ADJECTIVES = [
  {
    id: "brioche",
    word: "La Brioche",
    type: "Noun",
    gender: "Feminine",
    meaning: "Breakfast pastry (croissant)",
    usage: "Used in Milan and Northern Italy.",
    sentence: "Vorrei una brioche alla crema, per favore.",
    translation: "I would like a cream croissant, please.",
    category: "Dining"
  },
  {
    id: "cornetto",
    word: "Il Cornetto",
    type: "Noun",
    gender: "Masculine",
    meaning: "Breakfast pastry (croissant)",
    usage: "Used in Puglia and Southern Italy.",
    sentence: "Un cornetto vuoto e un caffè espresso.",
    translation: "A plain croissant and an espresso coffee.",
    category: "Dining"
  },
  {
    id: "delizioso",
    word: "Delizioso",
    type: "Adjective",
    meaning: "Delicious",
    usage: "To express appreciation for food.",
    sentence: "Grazie mille, il cibo è delizioso!",
    translation: "Thank you very much, the food is delicious!",
    category: "Dining"
  }
];

const VERBS = [
  {
    id: "andare",
    word: "Andare",
    meaning: "To go",
    usage: "Movement away from the speaker.",
    sentence: "Vado a Milano questo fine settimana.",
    translation: "I am going to Milan this weekend.",
    conjugations: {
      presente: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
      passatoProssimo: ["sono andato/a", "sei andato/a", "è andato/a", "siamo andati/e", "siete andati/e", "sono andati/e"],
      imperfetto: ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"]
    }
  },
  {
    id: "sapere",
    word: "Sapere",
    meaning: "To know (facts/skills)",
    usage: "Used for information or 'knowing how to'.",
    sentence: "Non so dove sia il bagno.",
    translation: "I don't know where the bathroom is.",
    conjugations: {
      presente: ["so", "sai", "sa", "sappiamo", "sapete", "sanno"],
      passatoProssimo: ["ho saputo", "hai saputo", "ha saputo", "abbiamo saputo", "avete saputo", "hanno saputo"],
      imperfetto: ["sapevo", "sapevi", "sapeva", "sapevamo", "sapevate", "sapevano"]
    }
  }
];

const TRAVEL_GUIDE: { title: string; sections: GuideSection[] }[] = [
  {
    title: "Milano Essentials",
    sections: [
      {
        topic: "Breakfast Etiquette",
        content: "In Milan, always ask for a 'Brioche'. You can eat at the 'banco' (standing) or 'tavolo' (sitting).",
        phrases: [{ it: "Un caffè amaro, per favore.", en: "A bitter coffee, please." }]
      },
      {
        topic: "Sightseeing",
        content: "The center is walkable. Focus on the Duomo and the Navigli canals.",
        tips: ["Visit Duomo at sunrise", "Aperitivo at Navigli starts at 6 PM"]
      }
    ]
  }
];

// ==========================================
// 2. COMPONENTS
// ==========================================

const VerbDetail = ({ verb, onBack }: { verb: any; onBack: () => void }) => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:underline">
      <ChevronLeft size={20} /> Torna ai Verbi
    </button>
    
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8">
      <h2 className="text-5xl font-serif font-bold text-slate-900 mb-2">{verb.word}</h2>
      <p className="text-slate-500 italic text-xl mb-6">{verb.meaning}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(verb.conjugations).map(([tense, forms]: [string, any]) => (
          <div key={tense} className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-black text-blue-600 border-b border-blue-100 pb-2">
              {tense.replace(/([A-Z])/g, ' $1')}
            </h3>
            <table className="w-full text-left font-sans">
              <tbody>
                {forms.map((form: string, i: number) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-2 text-slate-400 text-xs w-12">{SUBJECTS[i]}</td>
                    <td className="py-2 font-bold text-slate-800">{form}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

  const filteredNouns = NOUNS_ADJECTIVES.filter(item => 
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVerbs = VERBS.filter(item => 
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <header className="mb-16 border-b border-slate-100 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-100">
                <Languages size={32} />
              </div>
              <h1 className="text-5xl font-serif font-black text-slate-900 tracking-tight">Italian Crash Course</h1>
            </div>
            
            <nav className="flex space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {["lessico", "verbi", "guida"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSelectedVerb(null); }}
                  className={`px-8 py-2.5 text-sm font-black rounded-xl transition-all capitalize ${
                    activeTab === tab 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === "lessico" ? "Nouns & Adjectives" : tab === "verbi" ? "Verbs" : "Travel Guide"}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Tab Content */}
        {!selectedVerb && activeTab !== "guida" && (
          <div className="relative max-w-2xl mx-auto mb-16">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Cerca..."
              className="w-full pl-14 pr-6 py-5 border-2 border-slate-100 rounded-3xl bg-slate-50/50 focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {activeTab === "lessico" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {filteredNouns.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.word}</h3>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md uppercase tracking-widest">{item.type}</span>
                    {item.gender && <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest">{item.gender}</span>}
                  </div>
                </div>
                <p className="text-slate-600 font-medium mb-4">{item.meaning}</p>
                <div className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-50 p-4 rounded-xl border-l-2 border-slate-200 italic">{item.usage}</div>
                <div className="mt-auto">
                  <p className="text-slate-900 font-bold italic">"{item.sentence}"</p>
                  <p className="text-slate-400 text-xs mt-1">— {item.translation}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "verbi" && (
          selectedVerb ? (
            <VerbDetail verb={selectedVerb} onBack={() => setSelectedVerb(null)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {filteredVerbs.map((verb) => (
                <div 
                  key={verb.id} 
                  onClick={() => setSelectedVerb(verb)}
                  className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-serif font-bold text-slate-900 group-hover:text-blue-600">{verb.word}</h3>
                    <TableIcon className="text-slate-300 group-hover:text-blue-500" size={24} />
                  </div>
                  <p className="text-slate-600 font-medium mb-4">{verb.meaning}</p>
                  <div className="text-blue-600 text-xs font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
                    Click to see conjugations <ArrowRight size={14} />
                  </div>
                  <p className="text-slate-400 text-sm italic">"{verb.sentence}"</p>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "guida" && (
          <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {TRAVEL_GUIDE.map((trip, tIdx) => (
              <div key={tIdx} className="space-y-8">
                <h2 className="text-4xl font-serif font-black text-slate-900 flex items-center gap-4 italic">
                  <MapPin className="text-blue-600" size={32} /> {trip.title}
                </h2>
                <div className="grid gap-8">
                  {trip.sections.map((section, sIdx) => (
                    <div key={sIdx} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                      <h4 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">{section.topic}</h4>
                      <p className="text-slate-600 leading-relaxed mb-8 text-lg">{section.content}</p>
                      
                      {section.phrases && (
                        <div className="grid gap-4">
                          {section.phrases.map((p, pIdx) => (
                            <div key={pIdx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-blue-900 font-bold italic text-lg">"{p.it}"</p>
                              <p className="text-slate-400 text-sm">{p.en}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.tips && (
                        <div className="flex flex-wrap gap-3 mt-6">
                          {section.tips.map((tip, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase border border-blue-100">
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
