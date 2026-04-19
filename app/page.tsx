"use client";

import { useState } from "react";

type Personality = {
  name: string;
  coffee: string;
  tagline: string;
  icon: string;
  color: string;
  gradient: string;
  emoji: string;
};

const personalities: Record<string, Personality> = {
  bold: {
    name: "Смелый Исследователь",
    coffee: "Двойной Эспрессо",
    tagline: "Ты живёшь ради интенсивности",
    icon: "⚡",
    color: "#ff6b35",
    gradient: "linear-gradient(135deg, #ff6b35 0%, #ff3535 100%)",
    emoji: "⚡🔥",
  },
  cozy: {
    name: "Уютная Классика",
    coffee: "Средняя Обжарка Дрип",
    tagline: "Комфорт в каждой чашке",
    icon: "☕",
    color: "#c4956a",
    gradient: "linear-gradient(135deg, #c4956a 0%, #8b5e3c 100%)",
    emoji: "☕📖",
  },
  sweet: {
    name: "Сладкий Энтузиаст",
    coffee: "Карамельный Латте",
    tagline: "Жизнь слишком коротка для горького",
    icon: "🍬",
    color: "#e88fc4",
    gradient: "linear-gradient(135deg, #e88fc4 0%, #d45d9a 100%)",
    emoji: "🍬🧁",
  },
  zen: {
    name: "Дзен Минималист",
    coffee: "Чёрный кофе, Одиночное Происхождение",
    tagline: "Просто. Чисто. Идеально.",
    icon: "🧘",
    color: "#7ab8a0",
    gradient: "linear-gradient(135deg, #7ab8a0 0%, #3d7a5f 100%)",
    emoji: "🧘🍃",
  },
  night: {
    name: "Ночная Сова",
    coffee: "Красный Глаз (кофе + шот эспрессо)",
    tagline: "Сон опционален",
    icon: "🌙",
    color: "#6b7bff",
    gradient: "linear-gradient(135deg, #6b7bff 0%, #3b3d8f 100%)",
    emoji: "🌙⭐",
  },
  fancy: {
    name: "Избалованное Угощение",
    coffee: "Мокка со Взбитыми Сливками",
    tagline: "Кофе — это десерт",
    icon: "💎",
    color: "#c9a0ff",
    gradient: "linear-gradient(135deg, #c9a0ff 0%, #8b5cf6 100%)",
    emoji: "💎✨",
  },
};

type Answer = { text: string; icon: string; personality: string };

const questions = [
  {
    question: "Ты попадаешь в Хогвартс. Какой факультет выберешь?",
    answers: [
      { text: "Гриффиндор — смелость и отвага", icon: "🦁", personality: "bold" },
      { text: "Пуффендуй — доброта и верность", icon: "🦡", personality: "cozy" },
      { text: "Когтевран — мудрость и знания", icon: "🦅", personality: "zen" },
      { text: "Слизерин — амбиции и хитрость", icon: "🐍", personality: "night" },
    ],
  },
  {
    question: "Netflix спрашивает: что смотришь в пятницу вечером?",
    answers: [
      { text: "Ромком с попкорном", icon: "🍬", personality: "sweet" },
      { text: "Уютный сериал с чаем", icon: "🛋️", personality: "cozy" },
      { text: "Документалка о природе", icon: "🧘", personality: "zen" },
      { text: "Шоу о моде с вином", icon: "💅", personality: "fancy" },
    ],
  },
  {
    question: "Ты на необитаемом острове. Что берёшь первым?",
    answers: [
      { text: "Нож — выживу как МакГайвер", icon: "🔪", personality: "bold" },
      { text: "Книгу — буду читать на пляже", icon: "📖", personality: "cozy" },
      { text: "Рецепты — буду готовить десерты", icon: "🧁", personality: "sweet" },
      { text: "Ничего — наслаждаюсь тишиной", icon: "🧘", personality: "zen" },
    ],
  },
  {
    question: "Вымышленный персонаж на вечеринке. Кто ты?",
    answers: [
      { text: "Арья Старк — иду своей дорогой", icon: "🗡️", personality: "bold" },
      { text: "Эльза — всё под контролем, но внутри буря", icon: "👑", personality: "night" },
      { text: "Серена из Pokémon — блеск и слава", icon: "💖", personality: "fancy" },
      { text: "Вероника из Арчи — сладкая и общительная", icon: "🍭", personality: "sweet" },
    ],
  },
  {
    question: "Выбери жанр фильма на субботу:",
    answers: [
      { text: "Фантастика с космическими битвами", icon: "🎢", personality: "bold" },
      { text: "Авторское кино с глубоким смыслом", icon: "🎬", personality: "zen" },
      { text: "Фильм о высокой моде", icon: "👗", personality: "fancy" },
      { text: "Триллер до 3 ночи — спать не хочу", icon: "🔪", personality: "night" },
    ],
  },
  {
    question: "Какая у тебя суперсила?",
    answers: [
      { text: "Супер-сила — ломаю всё на пути", icon: "💪", personality: "bold" },
      { text: "Неуязвимость — ничего мне не страшно", icon: "🛡️", personality: "cozy" },
      { text: "Контроль льда — прохладно и элегантно", icon: "🧊", personality: "zen" },
      { text: "Превращение любого напитка в десерт", icon: "🎨", personality: "sweet" },
    ],
  },
  {
    question: "Ты в видеоигре. Какой класс выбираешь?",
    answers: [
      { text: "Воин — в бой без раздумий", icon: "⚔️", personality: "bold" },
      { text: "Паладин — защищаю слабых", icon: "🛡️", personality: "cozy" },
      { text: "Ночной охотник — удар в темноте", icon: "🌙", personality: "night" },
      { text: "Бард — все любят мои выступления", icon: "💎", personality: "fancy" },
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<Personality | null>(null);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (answer: Answer, index: number) => {
    setSelectedAnswer(index);

    const newScores = { ...scores };
    newScores[answer.personality] = (newScores[answer.personality] || 0) + 1;
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate result using local newScores (not stale state)
        const sorted = Object.entries(newScores).sort(([, a], [, b]) => b - a);
        if (sorted.length > 0 && sorted[0]) {
          const topKey = sorted[0][0];
          const personality = personalities[topKey];
          if (personality) {
            setResult(personality);
          } else {
            setResult(personalities["bold"]);
          }
        }
      }
    }, 400);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores({});
    setSelectedAnswer(null);
    setResult(null);
    setStarted(false);
  };

  const handleShare = () => {
    if (!result) return;
    const text = `☕ Моя кофейная личность: ${result.name} ${result.icon}\n${result.tagline}\n\nТвой напиток: ${result.coffee}\n\nПройди викторину и узнай свою кофейную личность!`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Start screen
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="text-6xl mb-6">☕</div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Какая твоя кофейная личность?
          </h1>
          <p className="text-[#888] text-lg mb-8 leading-relaxed">
            Пройди викторину из 7 вопросов и узнай, какой напиток Basecamp Coffee идеально подходит тебе.
          </p>
          <button
            onClick={handleStart}
            className="bg-[#ff6b35] hover:bg-[#ff8555] text-black font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            Начать викторину
          </button>
          <p className="text-[#444] text-sm mt-6">~1 минута • 7 вопросов</p>
        </div>
      </div>
    );
  }

  // Result screen
  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          <div className="mb-6 text-6xl">{result.icon}</div>
          <p className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest mb-4">
            Твоя кофейная личность
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">{result.name}</h1>
          <p className="text-[#888] text-lg mb-8">{result.tagline}</p>

          <div className="bg-[#111] border border-[#333] rounded-2xl overflow-hidden mb-8">
            <div
              className="w-full h-56 flex items-center justify-center"
              style={{ background: result.gradient }}
            >
              <span className="text-7xl">{result.emoji}</span>
            </div>
            <div className="p-6">
              <p className="text-[#ff6b35] font-bold text-sm uppercase tracking-widest mb-2">
                Твой напиток
              </p>
              <h2 className="text-2xl font-bold text-white">{result.coffee}</h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="bg-[#1a1a1a] hover:bg-[#222] text-white font-bold text-lg px-10 py-4 rounded-xl border border-[#333] transition-all hover:scale-105 active:scale-95"
            >
              Пройти ещё раз
            </button>
            <button
              onClick={handleShare}
              className="bg-[#ff6b35] hover:bg-[#ff8555] text-black font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              {copied ? "Скопировано!" : "Поделиться"}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Question screen
  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <div className="mb-8">
          <span className="inline-block bg-[#ff6b35] text-black font-bold text-xs px-3 py-1.5 rounded uppercase tracking-widest">
            Вопрос {currentQuestion + 1} из {questions.length}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer, index)}
              disabled={selectedAnswer !== null}
              className={`w-full flex items-center gap-4 bg-[#1a1a1a] border border-[#333] rounded-xl p-5 text-left transition-all ${
                selectedAnswer === index
                  ? "border-[#ff6b35] bg-[#1f1510] scale-[1.02]"
                  : selectedAnswer === null
                  ? "hover:border-[#ff6b35] hover:bg-[#1f1510] cursor-pointer"
                  : "opacity-40"
              }`}
            >
              <span className="text-2xl flex-shrink-0">{answer.icon}</span>
              <span className="text-[#ccc] font-semibold text-base">
                {answer.text}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 mt-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= currentQuestion ? "bg-[#ff6b35]" : "bg-[#333]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
