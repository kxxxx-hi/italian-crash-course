"use client";

import React, { useState, useMemo } from 'react';
import { BookOpen, Scale, Search, GitBranch, Feather, Globe, Lightbulb, ArrowRight } from 'lucide-react';

// ==========================================
// 1. THE DATA SOURCE (Complete Collection)
// ==========================================

const VOCABULARY = [
  // --- NEW ADDITIONS ---
  {
    id: "penitential",
    word: "Penitential",
    root: "Poena (Punishment/Pain)",
    etymology: "To balance the scales of sin by suffering a penalty.",
    vibe: "The Balance. Payment through pain.",
    sentence: "He wore a penitential expression after breaking the vase.",
    synonyms: ["Repentant", "Contrite"],
    italian: "Pena (Pain/Punishment), Pentirsi",
  },
  {
    id: "erratic",
    word: "Erratic",
    root: "Errare (To wander/stray)",
    etymology: "Wandering to and fro without a fixed course.",
    vibe: "The Wanderer. Unpredictable movement.",
    sentence: "The driver's erratic behavior attracted the police.",
    synonyms: ["Unpredictable", "Inconsistent"],
    italian: "Errare (To wander/mistake), Errore",
  },
  {
    id: "reticent",
    word: "Reticent",
    root: "Tacere (To be silent) -> Reticere",
    etymology: "To keep thoroughly silent. Holding back words.",
    vibe: "The Locked Vault. Voluntary silence.",
    sentence: "She was reticent about her past.",
    synonyms: ["Reserved", "Tight-lipped"],
    italian: "Tacere (To be silent), Reticente",
  },
  {
    id: "nefarious",
    word: "Nefarious",
    root: "Ne (Not) + Fas (Divine Law)",
    etymology: "An act so bad it is contrary to divine law. Unspeakable evil.",
    vibe: "Cosmic Evil. The Villain.",
    sentence: "A nefarious plot to destroy the city.",
    synonyms: ["Wicked", "Villainous", "Heinous"],
    italian: "Nefando (Abominable), Nefasto",
  },
  {
    id: "opprobrium",
    word: "Opprobrium",
    root: "Ob (Against) + Probrum (Disgrace)",
    etymology: "Disgrace cast against someone. Public scorn.",
    vibe: "The Booing Crowd. Public shame.",
    sentence: "The dictator faced international opprobrium.",
    synonyms: ["Disgrace", "Ignominy", "Shame"],
    italian: "Obbrobrio (Disgrace/Eyesore)",
  },
  {
    id: "profligate",
    word: "Profligate",
    root: "Fligere (To strike/dash)",
    etymology: "To be dashed down. Ruined by lack of control.",
    vibe: "The Wreck. Throwing life into the trash.",
    sentence: "The profligate spender wasted his inheritance in a month.",
    synonyms: ["Wasteful", "Dissolute", "Prodigal"],
    italian: "Sconfitta (Defeat - from same root)",
  },
  {
    id: "disparage",
    word: "Disparage",
    root: "Par (Equal) -> Desparagier",
    etymology: "To marry below one's rank. To treat as unequal/unworthy.",
    vibe: "The Snob. 'You are below par.'",
    sentence: "Do not disparage his efforts just because he failed.",
    synonyms: ["Belittle", "Denigrate", "Scorn"],
    italian: "Disprezzare (To despise/undervalue)",
  },
  {
    id: "impudent",
    word: "Impudent",
    root: "Pudere (Shame)",
    etymology: "Without shame. Bold and disrespectful.",
    vibe: "The Brat. Shameless rudeness.",
    sentence: "The impudent child stuck his tongue out.",
    synonyms: ["Insolent", "Cheeky", "Brazen"],
    italian: "Impudente (Shameless)",
  },
  {
    id: "imprudent",
    word: "Imprudent",
    root: "Pro-videre (To foresee)",
    etymology: "Not looking forward. Acting without foresight.",
    vibe: "The Fool. Blind to consequences.",
    sentence: "It was imprudent to hike without water.",
    synonyms: ["Rash", "Unwise", "Reckless"],
    italian: "Imprudente (Unforeseeing)",
  },
  {
    id: "cantankerous",
    word: "Cantankerous",
    root: "Contek (Strife) + Rancorous",
    etymology: "A blend of strife and bitterness. Habitually difficult.",
    vibe: "The Grump. Rusty engine.",
    sentence: "The cantankerous old man yelled at the kids.",
    synonyms: ["Irascible", "Curmudgeonly", "Grumpy"],
    italian: "Bisbetico (Shrewish), Scontroso",
  },
  {
    id: "divulge",
    word: "Divulge",
    root: "Vulgus (The Crowd)",
    etymology: "To spread among the mob. To make common.",
    vibe: "The Scandal. Making it public.",
    sentence: "He refused to divulge the secret recipe.",
    synonyms: ["Reveal", "Disclose"],
    italian: "Divulgare (To spread/popularize)",
  },
  {
    id: "preponderance",
    word: "Preponderance",
    root: "Pondus (Weight)",
    etymology: "To weigh more. Tipping the scale.",
    vibe: "The Heavy Scale. Quality over quantity.",
    sentence: "A preponderance of the evidence pointed to guilt.",
    synonyms: ["Majority", "Dominance"],
    italian: "Preponderanza, Ponderare",
  },
  {
    id: "alacrity",
    word: "Alacrity",
    root: "Alacer (Lively/Eager)",
    etymology: "Wings on the heels. Cheerful readiness.",
    vibe: "Speed + Smile. Happy to help.",
    sentence: "She accepted the invitation with alacrity.",
    synonyms: ["Eagerness", "Readiness", "Zeal"],
    italian: "Allegro (Happy/Fast)",
  },
  {
    id: "dearth",
    word: "Dearth",
    root: "Deore (Dear/Costly)",
    etymology: "Scarcity makes things expensive (dear). A 'time of dearness'.",
    vibe: "The Famine. Costly lack.",
    sentence: "There is a dearth of honest politicians.",
    synonyms: ["Scarcity", "Lack", "Paucity"],
    italian: "Carestia (Famine)",
  },
  {
    id: "lugubrious",
    word: "Lugubrious",
    root: "Lugere (To mourn)",
    etymology: "To break/bend with grief. Exaggerated mourning.",
    vibe: "The Undertaker. Heavy, damp sadness.",
    sentence: "The lugubrious music made everyone depressed.",
    synonyms: ["Mournful", "Doleful", "Gloomy"],
    italian: "Lugubre, Lutto",
  },
  {
    id: "inveigle",
    word: "Inveigle",
    root: "Aveugle (Blind)",
    etymology: "To blind someone with flattery or charm.",
    vibe: "The Con Artist. Blinding charm.",
    sentence: "He inveigled his way into the VIP section.",
    synonyms: ["Entice", "Cajole", "Charm"],
    italian: "Abbagliare (To dazzle/blind)",
  },
  {
    id: "pliable",
    word: "Pliable",
    root: "Plicare (To fold)",
    etymology: "Able to be folded. Passive submission.",
    vibe: "The Clay. Bends easily.",
    sentence: "The manager was pliable and agreed to everything.",
    synonyms: ["Flexible", "Malleable"],
    italian: "Piegare (To fold)",
  },
  {
    id: "supple",
    word: "Supple",
    root: "Sub-Plicare (Fold under)",
    etymology: "Originally kneeling down. Now moving with grace/fluidity.",
    vibe: "The Panther. Organic flexibility.",
    sentence: "The dancer's supple movements.",
    synonyms: ["Limber", "Agile", "Lithe"],
    italian: "Flessuoso",
  },
  {
    id: "fulminate",
    word: "Fulminate",
    root: "Fulmen (Lightning)",
    etymology: "To strike with lightning. To denounce explosively.",
    vibe: "The Thunderbolt. Explosive anger.",
    sentence: "The preacher fulminated against sin.",
    synonyms: ["Rail", "Rage", "Denounce"],
    italian: "Fulmine (Lightning)",
  },
  {
    id: "adjuration",
    word: "Adjuration",
    root: "Jurare (To swear)",
    etymology: "A command bound by an oath. 'I charge you...'",
    vibe: "The Command. Top-down power.",
    sentence: "The exorcist's adjuration forced the spirit out.",
    synonyms: ["Command", "Order", "Charge"],
    italian: "Scongiurare (To adjure/ward off)",
  },
  {
    id: "supplication",
    word: "Supplication",
    root: "Sub-Plicare (Fold under)",
    etymology: "Folding legs under to kneel. Begging from weakness.",
    vibe: "The Prayer. Bottom-up begging.",
    sentence: "He fell to his knees in supplication.",
    synonyms: ["Plea", "Entreaty", "Petition"],
    italian: "Supplica",
  },
  {
    id: "acme",
    word: "Acme",
    root: "Akme (Point/Edge)",
    etymology: "The sharpest point. The peak of perfection.",
    vibe: "The Mountain Tip. Perfection.",
    sentence: "The acme of his career.",
    synonyms: ["Peak", "Pinnacle", "Zenith"],
    italian: "Acme (Crisis point)",
  },
  {
    id: "apogee",
    word: "Apogee",
    root: "Apo-Geo (Away from Earth)",
    etymology: "The farthest point in an orbit. The climax of a long arc.",
    vibe: "The Orbit. Distant climax.",
    sentence: "The apogee of the empire's power.",
    synonyms: ["Climax", "Culmination"],
    italian: "Apogeo",
  },
  {
    id: "turbid",
    word: "Turbid",
    root: "Turba (Uproar/Crowd)",
    etymology: "Stirred up. Cloudy because of commotion/sediment.",
    vibe: "The Churn. Violent confusion.",
    sentence: "The turbid floodwaters.",
    synonyms: ["Cloudy", "Murky", "Opaque"],
    italian: "Torbido",
  },
  {
    id: "murky",
    word: "Murky",
    root: "Myrkr (Darkness)",
    etymology: "Cloudy because of darkness or stagnation.",
    vibe: "The Gloom. Stagnant mystery.",
    sentence: "The murky depths of the swamp.",
    synonyms: ["Gloomy", "Dark", "Obscure"],
    italian: "Buio (Dark)",
  },
  {
    id: "assuage",
    word: "Assuage",
    root: "Suavis (Sweet)",
    etymology: "To make sweet. To soothe a feeling.",
    vibe: "The Sweetener. Soothing balm.",
    sentence: "The water assuaged his thirst.",
    synonyms: ["Soothe", "Calm", "Alleviate"],
    italian: "Soave (Sweet)",
  },
  {
    id: "abate",
    word: "Abate",
    root: "Battuere (To beat)",
    etymology: "To beat down. To reduce intensity.",
    vibe: "The Beating. Diminishing force.",
    sentence: "The storm finally abated.",
    synonyms: ["Subside", "Diminish", "Lessen"],
    italian: "Abbattere (To knock down)",
  },
  // --- ORIGINAL SET ---
  {
    id: "corollary",
    word: "Corollary",
    root: "Corona (Crown) -> Corolla (Small garland)",
    etymology: "Originally a 'gratuity' (money for a garland) given to actors. Now, a 'bonus truth' that follows a main proof.",
    vibe: "A freebie; a bonus deduction.",
    sentence: "The chaotic traffic was a corollary of the broken traffic light.",
    synonyms: ["Consequence", "Result", "Deduction"],
    italian: "Corolla (botanical ring), Corona (Crown)",
  },
  {
    id: "mordant",
    word: "Mordant",
    root: "Mordere (To bite)",
    etymology: "From the idea of biting. In dyeing, it bites the color into cloth. In wit, it bites the feelings.",
    vibe: "Sharp, biting, incisive.",
    sentence: "His mordant wit made everyone laugh, but left a sting.",
    synonyms: ["Caustic", "Incisive", "Trenchant"],
    italian: "Mordere (to bite), Mordente (dye fixative / grit)",
  },
  {
    id: "refractory",
    word: "Refractory",
    root: "Frangere (To break) -> Refringere (Break back)",
    etymology: "Like a wave breaking against a wall. Resisting by breaking the force applied to it.",
    vibe: "The Wall. Stubborn resistance.",
    sentence: "The refractory infection did not respond to antibiotics.",
    synonyms: ["Intractable", "Unmanageable", "Rebellious"],
    italian: "Frangere (to break), Refrattario",
  },
  {
    id: "pertinacious",
    word: "Pertinacious",
    root: "Tenere (To hold) -> Pertinax (Holding thoroughly)",
    etymology: "Refusing to let go. Holding on with a vice grip.",
    vibe: "The Bulldog. Relentless determination.",
    sentence: "The pertinacious journalist refused to stop asking questions.",
    synonyms: ["Dogged", "Tenacious", "Relentless"],
    italian: "Tenace (Tenacious), Tenere (To hold)",
  },
  {
    id: "vanquish",
    word: "Vanquish",
    root: "Vincere (To win/conquer)",
    etymology: "To win completely. Unlike conquer (seeking land), this is about crushing the opposition.",
    vibe: "Total Victory. Making the enemy disappear.",
    sentence: "She finally vanquished her fear of public speaking.",
    synonyms: ["Crush", "Overcome", "Subjugate"],
    italian: "Vincere (To win), Vittoria (Victory)",
  },
  {
    id: "demur",
    word: "Demur",
    root: "Mora (Delay)",
    etymology: "From the legal 'demurrer' (a pause to argue). It is not a refusal, but a hesitation.",
    vibe: "The Pause Button. 'Wait a minute...'",
    sentence: "They wanted to leave immediately, but I demurred, citing the weather.",
    synonyms: ["Hesitate", "Object", "Vacillate"],
    italian: "Dimorare (To dwell/stay), Mora (Delay)",
  },
  {
    id: "rehash",
    word: "Rehash",
    root: "Hacher (To chop with an axe)",
    etymology: "Literally to re-cook chopped leftovers. implies nothing new is added.",
    vibe: "Stale leftovers. Tired repetition.",
    sentence: "Let's not rehash the same argument we had last week.",
    synonyms: ["Recycle", "Reiterate"],
    italian: "Ascia (Axe - related root)",
  },
  {
    id: "equivocal",
    word: "Equivocal",
    root: "Aequus (Equal) + Vox (Voice)",
    etymology: "Equal voice. Two meanings speaking with equal volume, making it impossible to choose.",
    vibe: "A Tie Game. Ambiguous on purpose.",
    sentence: "His answer was equivocal, satisfying neither side.",
    synonyms: ["Ambiguous", "Evasive", "Noncommittal"],
    italian: "Equivoco (Misunderstanding/Ambiguous)",
  },
  {
    id: "impute",
    word: "Impute",
    root: "Putare (To reckon/calculate/prune)",
    etymology: "To enter into the account. Originally financial, now assigning cause or blame.",
    vibe: "Moral Accounting. 'I calculate this is your fault.'",
    sentence: "I impute his silence to shyness rather than arrogance.",
    synonyms: ["Attribute", "Ascribe", "Assign"],
    italian: "Imputare (To charge/accuse)",
  },
  {
    id: "calumny",
    word: "Calumny",
    root: "Calvi (To deceive/trick)",
    etymology: "A false accusation meant to destroy a reputation. Roman slanderers were branded with a 'K'.",
    vibe: "Weaponized Lying. A little breeze that becomes a storm.",
    sentence: "He was the victim of a vicious calumny spread by his rivals.",
    synonyms: ["Slander", "Libel", "Defamation"],
    italian: "Calunnia (Slander)",
  },
  {
    id: "ascribe",
    word: "Ascribe",
    root: "Scribere (To write)",
    etymology: "To write someone's name next to a deed or work.",
    vibe: "The Writer. Subjective assignment of credit.",
    sentence: "Scholars ascribe this poem to Homer.",
    synonyms: ["Attribute", "Credit"],
    italian: "Scrivere (To write), Ascrivere",
  },
  {
    id: "attribute",
    word: "Attribute",
    root: "Tribuere (To give/assign)",
    etymology: "To allot or giveaway credit/cause.",
    vibe: "The Giver. Logical cause-and-effect.",
    sentence: "We attribute the crash to a software bug.",
    synonyms: ["Ascribe", "Impute"],
    italian: "Attribuire",
  },
  {
    id: "atavism",
    word: "Atavism",
    root: "Atavus (Great-great-great-grandfather)",
    etymology: "A trait skipping generations to reappear. A 'ghost in the DNA'.",
    vibe: "The Throwback. Reverting to the primitive.",
    sentence: "The mob's violence was a terrifying display of atavism.",
    synonyms: ["Reversion", "Regression"],
    italian: "Avo (Ancestor)",
  },
  {
    id: "corroborate",
    word: "Corroborate",
    root: "Robur (Oak/Strength)",
    etymology: "To make strong like oak. Adding structural support to a story.",
    vibe: "The Oak. Muscle for an argument.",
    sentence: "The fingerprints corroborated the witness's testimony.",
    synonyms: ["Confirm", "Verify", "Substantiate"],
    italian: "Corroborare (Strengthen), Robusto",
  },
  {
    id: "vitriolic",
    word: "Vitriolic",
    root: "Vitreus (Glass) -> Vitriol (Sulfuric Acid)",
    etymology: "Like acid. It burns and corrodes.",
    vibe: "Sulfuric Acid. Pure hate.",
    sentence: "The divorce proceedings turned vitriolic.",
    synonyms: ["Acrimonious", "Virulent"],
    italian: "Vetro (Glass)",
  },
  {
    id: "discursive",
    word: "Discursive",
    root: "Currere (To run)",
    etymology: "Running to and fro. Covering ground comprehensively but wandering.",
    vibe: "The Runner. Winding but connected.",
    sentence: "His discursive speech covered politics, art, and fishing.",
    synonyms: ["Rambling", "Digressive", "Meandering"],
    italian: "Correre (To run), Discorrere (To converse)",
  },
  {
    id: "desultory",
    word: "Desultory",
    root: "Salire (To jump)",
    etymology: "From Roman circus riders jumping between horses. Lacking focus.",
    vibe: "The Jumper. Random and lazy.",
    sentence: "She made a desultory attempt to clean her room.",
    synonyms: ["Aimless", "Haphazard"],
    italian: "Salire (To go up/mount)",
  },
  {
    id: "hamper",
    word: "Hamper",
    root: "Hamble (To mutilate/shackle)",
    etymology: "To tangle or shackle legs so movement is clumsy.",
    vibe: "The Net/Shackle. Entangled movement.",
    sentence: "The heavy snow hampered the rescue efforts.",
    synonyms: ["Impede", "Encumber"],
    italian: "N/A",
  },
  {
    id: "hinder",
    word: "Hinder",
    root: "Hind (Back/Behind)",
    etymology: "To keep back or drag rearward.",
    vibe: "The Wall. Kept in the rear.",
    sentence: "A lack of funding hindered the project's progress.",
    synonyms: ["Obstruct", "Block"],
    italian: "N/A",
  },
  {
    id: "petulant",
    word: "Petulant",
    root: "Petere (To seek/attack)",
    etymology: "Aggressively seeking attention. Rushing at people with demands.",
    vibe: "The Toddler. Bratty and demanding.",
    sentence: "The petulant CEO threw his coffee because it was cold.",
    synonyms: ["Peevish", "Sulky", "Bratty"],
    italian: "Competere (To compete - seek together)",
  },
  {
    id: "exacerbate",
    word: "Exacerbate",
    root: "Acer (Sharp/Bitter)",
    etymology: "To make thoroughly bitter. Pouring lemon on a cut.",
    vibe: "Making PROBLEMS worse.",
    sentence: "Yelling will only exacerbate the argument.",
    synonyms: ["Aggravate", "Worsen"],
    italian: "Aceto (Vinegar - sour)",
  },
  {
    id: "exasperate",
    word: "Exasperate",
    root: "Asper (Rough)",
    etymology: "To roughen up. Like rubbing skin with sandpaper.",
    vibe: "Driving PEOPLE crazy.",
    sentence: "His constant whistling exasperated the teacher.",
    synonyms: ["Infuriate", "Annoy"],
    italian: "Aspro (Sour/Rough)",
  },
  {
    id: "recondite",
    word: "Recondite",
    root: "Condere (To store/hide)",
    etymology: "Buried deep in a library.",
    vibe: "The Scholar. Hidden by depth/complexity.",
    sentence: "He enjoyed recondite discussions on 12th-century logic.",
    synonyms: ["Abstruse", "Esoteric"],
    italian: "Nascondere (To hide)",
  },
  {
    id: "arcane",
    word: "Arcane",
    root: "Arca (Chest/Box)",
    etymology: "Locked in a box. Known only to initiates.",
    vibe: "The Mystic. Hidden by secrecy.",
    sentence: "The arcane rules of the secret society.",
    synonyms: ["Mysterious", "Secret"],
    italian: "Arcano",
  },
  {
    id: "obscure",
    word: "Obscure",
    root: "Obscurus (Dark/Covered)",
    etymology: "Covered by shadow. Hard to see.",
    vibe: "The Shadow. Hidden by darkness.",
    sentence: "An obscure poet nobody reads.",
    synonyms: ["Unclear", "Murky"],
    italian: "Oscuro",
  },
  
];


// ==========================================
// 2. THE COMPARISONS
// ==========================================

const COMPARISONS = [
  {
    id: "hamper-hinder",
    title: "Hamper vs. Hinder",
    icon: "⛓️",
    description: "Clumsiness vs. Direction",
    pair: [
      { wordId: "hamper", role: "The Net", logic: "Entanglement. 'I can move, but it's clumsy.'" },
      { wordId: "hinder", role: "The Wall", logic: "Position. 'I am being kept back/behind.'" }
    ]
  },
  {
    id: "refractory-pertinacious",
    title: "Refractory vs. Pertinacious",
    icon: "🧱",
    description: "Breaking vs. Holding",
    pair: [
      { wordId: "refractory", role: "The Wall", logic: "Breaking back. 'I resist your control.'" },
      { wordId: "pertinacious", role: "The Bulldog", logic: "Holding on. 'I won't let go of this idea.'" }
    ]
  },
  {
    id: "vitriolic-mordant",
    title: "Vitriolic vs. Mordant",
    icon: "🧪",
    description: "Acid vs. Teeth",
    pair: [
      { wordId: "vitriolic", role: "Sulfuric Acid", logic: "Burns and destroys. Pure hate." },
      { wordId: "mordant", role: "Sharp Teeth", logic: "Bites and stings. Witty and intellectual." }
    ]
  },
  {
    id: "exacerbate-exasperate",
    title: "Exacerbate vs. Exasperate",
    icon: "😤",
    description: "Problems vs. People",
    pair: [
      { wordId: "exacerbate", role: "The Acid", logic: "Makes PROBLEMS worse (intensifies)." },
      { wordId: "exasperate", role: "The Sandpaper", logic: "Drives PEOPLE crazy (frustrates)." }
    ]
  },
  {
    id: "discursive-desultory",
    title: "Discursive vs. Desultory",
    icon: "🏃",
    description: "Running vs. Jumping",
    pair: [
      { wordId: "discursive", role: "The Runner", logic: "Covers ground. Connected flow." },
      { wordId: "desultory", role: "The Jumper", logic: "Skips around. Random and lazy." }
    ]
  },
  {
    id: "hidden-knowledge",
    title: "Recondite vs. Arcane vs. Obscure",
    icon: "📜",
    description: "Three ways to hide the truth",
    pair: [
      { wordId: "recondite", role: "The Buried", logic: "Hidden by complexity/depth." },
      { wordId: "arcane", role: "The Locked", logic: "Hidden by secrecy/rituals." },
      { wordId: "obscure", role: "The Shadowed", logic: "Hidden by darkness/lack of fame." }
    ]
  },
  {
    id: "ascribe-attribute",
    title: "Ascribe vs. Attribute",
    icon: "✍️",
    description: "Writing vs. Giving",
    pair: [
      { wordId: "ascribe", role: "The Writer", logic: "Subjective. 'I write your name next to this.'" },
      { wordId: "attribute", role: "The Giver", logic: "Logical. 'I assign the cause to this.'" }
    ]
  },
  {
    id: "impudent-imprudent",
    title: "Impudent vs. Imprudent",
    icon: "🙈",
    description: "Shame vs. Sight",
    pair: [
      { wordId: "impudent", role: "No Shame", logic: "Missing the Shame. Rude/Bratty." },
      { wordId: "imprudent", role: "No Sight", logic: "Missing the 'R' (Pro-videre). Unwise/Rash." }
    ]
  },
  {
    id: "scorn-spectrum",
    title: "Disparage, Scorn & Contempt",
    icon: "👎",
    description: "Why we look down on people",
    pair: [
      { wordId: "disparage", role: "The Snob", logic: "Inequality. 'You are below my rank.'" },
      { wordId: "mordant", role: "The Mocker", logic: "Scorn. 'You are ridiculous.'" }, // Using Mordant as proxy for Scorn
      { wordId: "vanquish", role: "The Judge", logic: "Contempt. 'You are worthless trash.'" } // Using Vanquish loosely for Contempt context or just generic text
    ]
  },
  {
    id: "pliable-supple",
    title: "Pliable vs. Supple",
    icon: "🤸",
    description: "Structure vs. Fluidity",
    pair: [
      { wordId: "pliable", role: "The Clay", logic: "Passive. Submits to bending." },
      { wordId: "supple", role: "The Panther", logic: "Active. Moves with grace/oil." }
    ]
  },
  {
    id: "adjuration-supplication",
    title: "Adjuration vs. Supplication",
    icon: "🙏",
    description: "Top-down vs. Bottom-up",
    pair: [
      { wordId: "adjuration", role: "The Wizard", logic: "Commanding by oath. 'I charge you!'" },
      { wordId: "supplication", role: "The Beggar", logic: "Begging on knees. 'I implore you!'" }
    ]
  },
  {
    id: "acme-apogee",
    title: "Acme vs. Apogee",
    icon: "🏔️",
    description: "Sharpness vs. Distance",
    pair: [
      { wordId: "acme", role: "Mountain Peak", logic: "The Sharpest Point. Perfection." },
      { wordId: "apogee", role: "Orbit Far Point", logic: "The Farthest Point. Climax of an arc." }
    ]
  },
  {
    id: "turbid-murky",
    title: "Turbid vs. Murky",
    icon: "🌊",
    description: "Churning vs. Gloom",
    pair: [
      { wordId: "turbid", role: "The Flood", logic: "Stirred up. Cloudy due to violence." },
      { wordId: "murky", role: "The Swamp", logic: "Stagnant. Cloudy due to darkness." }
    ]
  },
  {
    id: "assuage-abate",
    title: "Assuage vs. Abate",
    icon: "📉",
    description: "Soothing vs. Diminishing",
    pair: [
      { wordId: "assuage", role: "The Sweetener", logic: "Target: Feelings. Makes them softer." },
      { wordId: "abate", role: "The Beating", logic: "Target: Forces (Storms). Reduces intensity." }
    ]
  },
  {
    id: "anger-types",
    title: "Fulminate vs. Rail vs. Berate",
    icon: "⚡",
    description: "Types of Loud Anger",
    pair: [
      { wordId: "fulminate", role: "Jupiter", logic: "Explosive lightning. Public condemnation." },
      { wordId: "petulant", role: "The Toddler", logic: "Bratty seeking of attention." },
      { wordId: "vitriolic", role: "The Acid", logic: "Hateful corrosion." }
    ]
  }
];

// ==========================================
// 3. THE COMPONENTS
// ==========================================

const WordCard = ({ data }: { data: any }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-3xl font-serif font-bold text-blue-900">{data.word}</h3>
      <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
        {data.id}
      </span>
    </div>
    
    <div className="mb-4">
      <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-2">
        <GitBranch size={16} />
        <span>{data.root}</span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{data.etymology}</p>
    </div>

    <div className="bg-slate-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
      <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm mb-1">
        <Lightbulb size={16} />
        <span>The Vibe</span>
      </div>
      <p className="text-slate-700 text-sm">{data.vibe}</p>
    </div>

    <div className="flex-grow mb-4">
        <p className="text-slate-600 text-sm leading-relaxed">"{data.sentence}"</p>
    </div>

    <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Scale size={14} />
        <span>Synonyms: {data.synonyms.join(", ")}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-emerald-600">
        <Globe size={14} />
        <span>IT: {data.italian}</span>
      </div>
    </div>
  </div>
);

const ComparisonCard = ({ data, vocabMap }: { data: any, vocabMap: any }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
      <span className="text-2xl">{data.icon}</span>
      <div>
        <h3 className="text-lg font-bold text-slate-800">{data.title}</h3>
        <p className="text-sm text-slate-500">{data.description}</p>
      </div>
    </div>
    
    <div className={`grid grid-cols-1 md:grid-cols-${data.pair.length} divide-y md:divide-y-0 md:divide-x divide-slate-100`}>
      {data.pair.map((item: any, idx: number) => {
        const wordData = vocabMap.get(item.wordId);
        return (
          <div key={idx} className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-xl font-bold text-indigo-700">{wordData?.word}</span>
              <ArrowRight size={16} className="text-slate-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.role}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">{item.logic}</p>
            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                Root: <span className="font-medium">{wordData?.root}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================

export default function EtymologistApp() {
  const [activeTab, setActiveTab] = useState("lexicon");
  const [searchQuery, setSearchQuery] = useState("");

  // Create a map for easy lookup in comparisons
  const vocabMap = useMemo(() => {
    const map = new Map();
    VOCABULARY.forEach(item => map.set(item.id, item));
    return map;
  }, []);

  // Filter vocabulary based on search
  const filteredVocab = VOCABULARY.filter(item => 
    item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.root.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.vibe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-100">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title and Tabs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Feather className="text-indigo-600" size={32} />
              <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">The Etymologist</h1>
            </div>
            
            <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("lexicon")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === "lexicon" 
                    ? "bg-blue-500 text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Lexicon
              </button>
              <button
                onClick={() => setActiveTab("comparisons")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === "comparisons" 
                    ? "bg-blue-500 text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Comparisons
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          {activeTab === "lexicon" && (
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search roots, words, or vibes..."
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
        
        {/* Lexicon View */}
        {activeTab === "lexicon" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVocab.map((item) => (
                <WordCard key={item.id} data={item} />
              ))}
            </div>
            
            {filteredVocab.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No words found. Try searching for "bite" or "run".
              </div>
            )}
          </div>
        )}

        {/* Comparisons View */}
        {activeTab === "comparisons" && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">The Battleground</h2>
              <p className="text-slate-600">Distinguishing between commonly confused roots.</p>
            </div>
            
            {COMPARISONS.map((comp) => (
              <ComparisonCard key={comp.id} data={comp} vocabMap={vocabMap} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
