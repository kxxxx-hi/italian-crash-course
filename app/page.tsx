"use client";

import React, { useState } from 'react';
import { 
  Search, ArrowRight, Languages, BookOpen, 
  ChevronLeft, Table as TableIcon, MessageCircle, 
  Lightbulb, User, UserCircle, Coffee, Utensils
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
    usage: "Southern Italy (Puglia). Essential regional terminology when visiting Marco's family.",
    sentence: "Prendo un cornetto vuoto e un caffè.",
    translation: "I'll have a plain croissant and a coffee."
  },
  {
    id: "pensierino",
    word: "Il Pensierino",
    type: "Noun",
    gender: "Masculine",
    meaning: "A little gift / a small thought",
    usage: "Use this when giving Marco's brother the gift for his dog.",
    sentence: "Ti ho portato un pensierino per Arturo!",
    translation: "I brought you a little something for Arturo!"
  },
  {
    id: "taglia",
    word: "La Taglia",
    type: "Noun",
    gender: "Feminine",
    meaning: "Clothing size",
    usage: "Crucial for shopping or giving clothes as a gift.",
    sentence: "È stato un acquisto alla cieca, spero che la taglia gli vada bene.",
    translation: "It was a blind buy, I hope the size fits him."
  },
  {
    id: "bucato",
    word: "Il Bucato",
    type: "Noun",
    gender: "Masculine",
    meaning: "The laundry",
    usage: "Great for talking about daily chores.",
    sentence: "Io faccio quasi sempre il bucato.",
    translation: "I almost always do the laundry."
  },
  {
    id: "cuoco",
    word: "Il Cuoco",
    type: "Noun",
    gender: "Masculine",
    meaning: "The cook / chef",
    usage: "Remember to use the masculine noun since Marco is a guy.",
    sentence: "Marco è un bravissimo cuoco.",
    translation: "Marco is a very good cook."
  },
  {
    id: "tour-gastronomico",
    word: "Il Tour Gastronomico",
    type: "Noun",
    gender: "Masculine",
    meaning: "Food tour / culinary journey",
    usage: "Perfect for describing your travel plans from Milan to Puglia.",
    sentence: "Il nostro tour gastronomico inizierà da Milano.",
    translation: "Our food tour will start from Milan."
  },
  {
    id: "neanche",
    word: "Neanche",
    type: "Adverb",
    meaning: "Neither / not even",
    usage: "Use this instead of 'anche' when agreeing with a negative statement.",
    sentence: "Non gli piace neanche il burro o il formaggio.",
    translation: "He doesn't even like butter or cheese."
  }
];

const VERBS = [
  {
    id: "andare",
    word: "Andare",
    meaning: "To go",
    usage: "Always needs the preposition 'A' before a following verb (e.g., andiamo a visitare).",
    sentence: "Sto andando a cenare con Marco.",
    translation: "I am going to have dinner with Marco.",
    conjugations: {
      presente: ["vado", "vai", "va", "andiamo", "andate", "vanno"],
      passatoProssimo: ["sono andato/a", "sei andato/a", "è andato/a", "siamo andati/e", "siete andati/e", "sono andati/e"],
      imperfetto: ["andavo", "andavi", "andava", "andavamo", "andavate", "andavano"],
      futuroSemplice: ["andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
      condizionale: ["andrei", "andresti", "andrebbe", "andremmo", "andreste", "andrebbero"]
    }
  },
  {
    id: "stare",
    word: "Stare",
    meaning: "To stay / To be",
    usage: "Used for 'How are you?' (Come stai?), for relationships (Stiamo insieme), and present continuous (Sto andando).",
    sentence: "Stiamo insieme da due anni e mezzo.",
    translation: "We have been together for two and a half years.",
    conjugations: {
      presente: ["sto", "stai", "sta", "stiamo", "state", "stanno"],
      passatoProssimo: ["sono stato/a", "sei stato/a", "è stato/a", "siamo stati/e", "siete stati/e", "sono stati/e"],
      imperfetto: ["stavo", "stavi", "stava", "stavamo", "stavate", "stavano"],
      futuroSemplice: ["starò", "starai", "starà", "staremo", "starete", "staranno"],
      condizionale: ["starei", "staresti", "starebbe", "staremmo", "stareste", "starebbero"]
    }
  },
  {
    id: "fare",
    word: "Fare",
    meaning: "To do / To make",
    usage: "Incredibly versatile. Used for making food, doing chores, and taking trips.",
    sentence: "Lui fa molti piatti giapponesi.",
    translation: "He makes many Japanese dishes.",
    conjugations: {
      presente: ["faccio", "fai", "fa", "facciamo", "fate", "fanno"],
      passatoProssimo: ["ho fatto", "hai fatto", "ha fatto", "abbiamo fatto", "avete fatto", "hanno fatto"],
      imperfetto: ["facevo", "facevi", "faceva", "facevamo", "facevate", "facevano"],
      futuroSemplice: ["farò", "farai", "farà", "faremo", "farete", "faranno"],
      condizionale: ["farei", "faresti", "farebbe", "faremmo", "fareste", "farebbero"]
    }
  },
  {
    id: "conoscere",
    word: "Conoscere",
    meaning: "To know (people/places) / To meet for the first time",
    usage: "Use this instead of 'riconoscere' when talking about meeting Marco's family.",
    sentence: "Li ho già conosciuti, questa sarà la seconda volta.",
    translation: "I've already met them, this will be the second time.",
    conjugations: {
      presente: ["conosco", "conosci", "conosce", "conosciamo", "conoscete", "conoscono"],
      passatoProssimo: ["ho conosciuto", "hai conosciuto", "ha conosciuto", "abbiamo conosciuto", "avete conosciuto", "hanno conosciuto"],
      imperfetto: ["conoscevo", "conoscevi", "conosceva", "conoscevamo", "conoscevate", "conoscevano"],
      futuroSemplice: ["conoscerò", "conoscerai", "conoscerà", "conosceremo", "conoscerete", "conosceranno"],
      condizionale: ["conoscerei", "conosceresti", "conoscerebbe", "conosceremmo", "conoscereste", "conoscerebbero"]
    }
  }
];

const GRAMMAR_TIPS = [
  {
    title: "Possessive Adjectives & Family Members",
    points: [
      "Rule: DO NOT use 'il' or 'la' with singular family members.",
      "Correct: 'Suo padre' (His dad), 'Sua madre' (His mom).",
      "Incorrect: 'Il suo padre' or 'La sua madre'.",
      "Exception: If plural or modified, use the article (e.g., 'I suoi genitori', 'Il mio fratellino')."
    ]
  },
  {
    title: "Expressing Time: 'Da' vs. 'Fa'",
    points: [
      "Use 'FA' for things that ended in the past (AGO). Example: 'Ci siamo conosciuti due anni fa' (We met 2 years ago).",
      "Use 'DA' for things that started in the past and are still true now (FOR/SINCE).",
      "Correct: 'Stiamo insieme da due anni' (We have been together for 2 years)."
    ]
  },
  {
    title: "The Verb 'Piacere' (To Like)",
    points: [
      "It literally means 'to be pleasing to'. The thing you like is the subject.",
      "Use 'piace' for singular things: 'Gli piace il formaggio' (Cheese is pleasing to him).",
      "Use 'piacciono' for plural things: 'Non gli piacciono i piatti del nord' (Northern dishes are not pleasing to him)."
    ]
  },
  {
    title: "Verbs of Movement + Preposition 'A'",
    points: [
      "Whenever you use a movement verb (Andare, Venire) followed by an infinitive verb, you MUST insert 'A' between them.",
      "Correct: 'Sto andando a cenare' (I am going to eat dinner).",
      "Correct: 'Andiamo a visitare la sua famiglia' (We are going to visit his family)."
    ]
  }
];

const CONVERSATIONS = [
  {
    title: "Compliments for Marco's Mom in Puglia",
    type: "Dialogue",
    lines: [
      { speaker: "Mamma", text: "Hai fame? Ti ho preparato le orecchiette, mangia mangia!", en: "Are you hungry? I made orecchiette for you, eat eat!" },
      { speaker: "Tu", text: "Signora, è tutto buonissimo! Ha le mani d'oro.", en: "Ma'am, everything is delicious! You have golden hands (you're a great cook)." },
      { speaker: "Mamma", text: "Grazie cara! Ne vuoi ancora?", en: "Thank you dear! Do you want more?" },
      { speaker: "Tu", text: "Sì, posso avere il bis? È una meraviglia.", en: "Yes, can I have seconds? It's wonderful." }
    ]
  },
  {
    title: "Talking About Your Relationship",
    type: "Monologue",
    content: "Io e Marco stiamo insieme da due anni e mezzo, e viviamo insieme da due anni. Lui è un bravissimo cuoco, fa molti piatti giapponesi o mediorientali, ma non gli piacciono i piatti del nord. Io, d'altra parte, faccio quasi sempre io il bucato!",
    translation: "Marco and I have been together for two and a half years, and we've been living together for two years. He is a great cook, he makes a lot of Japanese or Middle Eastern dishes, but he doesn't like Northern Italian dishes. I, on the other hand, almost always do the laundry!"
  },
  {
    title: "Giving the Gift in Milan",
    type: "Dialogue",
    lines: [
      { speaker: "Tu", text: "Ciao! Ti ho portato un pensierino.", en: "Hi! I brought you a little something." },
      { speaker: "Fratello", text: "Ma grazie! Cos'è?", en: "Well thank you! What is it?" },
      { speaker: "Tu", text: "Per Arturo ho comprato una magliettina. L'ho già conosciuto, ma non so quanto pesa.", en: "I bought a little t-shirt for Arturo. I've already met him, but I don't know how much he weighs." },
      { speaker: "Tu", text: "Quindi è stato un acquisto alla cieca... spero che la taglia gli vada bene!", en: "So it was a blind buy... I hope the size fits him!" }
    ]
  }
];

// ==========================================
// 2. COMPONENTS
// ==========================================

const VerbDetail = ({ verb, onBack }: { verb: any; onBack: () => void }) => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-1.5 text-indigo-600 text-sm font-bold mb-5 hover:underline">
      <ChevronLeft size={14} /> Torna alla lista
    </button>
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <h2 className="text-3xl font-serif font-black text-slate-900 mb-1.5">{verb.word}</h2>
      <p className="text-slate-500 italic text-sm mb-5">{verb.meaning}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(verb.conjugations).map(([tense, forms]: [string, any]) => (
          <div key={tense}>
            <h3 className="text-[9px] uppercase tracking-[0.2em] font-black text-indigo-600 mb-4 border-b border-indigo-50 pb-1.5">
              {tense.replace(/([A-Z])/g, ' $1')}
            </h3>
            <div className="space-y-2.5 font-sans">
              {forms.map((form: string, i: number) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-1.5">
                  <span className="text-slate-400 text-[9px] font-mono">{SUBJECTS[i]}</span>
                  <span className="font-bold text-sm text-slate-800">{form}</span>
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
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-8">
        
        {/* Header */}
        <header className="mb-10 border-b border-slate-100 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
                <Languages size={22} />
              </div>
              <h1 className="text-3xl font-serif font-black text-slate-900 tracking-tight uppercase">Italian Crash Course</h1>
            </div>
            
            <nav className="flex flex-wrap justify-center space-x-0.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {[
                { id: "lessico", label: "Nouns & Adjectives" },
                { id: "verbi", label: "Verbs" },
                { id: "grammatica", label: "Grammar Tips" },
                { id: "conversazioni", label: "Conversations" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSelectedVerb(null); }}
                  className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
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
          <div className="relative max-w-2xl mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search terms..."
              className="w-full pl-10 pr-4 py-3.5 border-2 border-slate-100 rounded-2xl bg-slate-50/50 focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* 1. NOUNS & ADJECTIVES */}
        {activeTab === "lessico" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-500">
            {LESSICO.filter(i => i.word.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col h-full shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif font-bold text-slate-900">{item.word}</h3>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[7px] font-black bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded uppercase tracking-widest">{item.type}</span>
                    {item.gender && <span className="text-[7px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-widest">{item.gender}</span>}
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-bold mb-2.5">{item.meaning}</p>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed italic">{item.usage}</p>
                <div className="mt-auto pt-4 border-t border-slate-50">
                  <p className="text-slate-900 font-black italic text-sm">"{item.sentence}"</p>
                  <p className="text-slate-400 text-[9px] mt-0.5">— {item.translation}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-500">
              {VERBS.filter(v => v.word.toLowerCase().includes(searchQuery.toLowerCase())).map((verb) => (
                <div 
                  key={verb.id} 
                  onClick={() => setSelectedVerb(verb)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 cursor-pointer transition-all group shadow-sm flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-indigo-600">{verb.word}</h3>
                    <TableIcon className="text-slate-200 group-hover:text-indigo-400" size={20} />
                  </div>
                  <p className="text-slate-600 text-sm font-bold mb-1.5">{verb.meaning}</p>
                  <p className="text-indigo-600 text-[9px] font-black uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    View Conjugations <ArrowRight size={10} />
                  </p>
                  <div className="mt-auto pt-2.5 border-t border-slate-50">
                    <p className="text-slate-400 text-[10px] italic">"{verb.sentence}"</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* 3. GRAMMAR TIPS */}
        {activeTab === "grammatica" && (
          <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in duration-500">
            {GRAMMAR_TIPS.map((tip, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
                    <Lightbulb size={16} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900">{tip.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {tip.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed font-medium">
                      <div className="mt-1.5 w-1 h-1 bg-indigo-400 rounded-full shrink-0" />
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
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
            {CONVERSATIONS.map((conv, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                  <h3 className="text-sm font-serif font-bold">{conv.title}</h3>
                  <span className="text-[7px] font-black uppercase tracking-widest bg-white/20 px-1.5 py-0.5 rounded">{conv.type}</span>
                </div>
                <div className="p-5">
                  {conv.type === "Dialogue" ? (
                    <div className="space-y-4">
                      {conv.lines?.map((line, lIdx) => (
                        <div key={lIdx} className={`flex flex-col ${line.speaker === "Tu" ? "items-end text-right" : "items-start"}`}>
                          <span className="text-[7px] font-black text-slate-400 uppercase mb-0.5 flex items-center gap-0.5">
                            {line.speaker === "Tu" ? <User size={7} /> : <UserCircle size={7} />} {line.speaker}
                          </span>
                          <div className={`max-w-md p-2.5 rounded-xl ${line.speaker === "Tu" ? "bg-indigo-50 text-indigo-900 rounded-tr-none" : "bg-slate-50 text-slate-900 rounded-tl-none"}`}>
                            <p className="font-bold italic text-xs leading-snug">{line.text}</p>
                            <p className="text-[9px] text-slate-400 mt-1 font-medium">{line.en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-700 leading-relaxed font-serif italic">"{conv.content}"</p>
                      <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 font-medium border-l-4 border-indigo-400">
                        <strong className="text-indigo-600 uppercase tracking-widest text-[7px] block mb-1">Translation</strong> {conv.translation}
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
