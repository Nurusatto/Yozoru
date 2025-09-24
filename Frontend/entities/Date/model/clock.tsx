import { useEffect, useState } from "react";
import type { ClockProp } from "./type";

type TimeTrigger = "morning" | "day" | "evening" | "night";

function getTimeTrigger(date: Date): TimeTrigger {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const phrases: Record<TimeTrigger, string[]> = {
  morning: [
    "Доброе утро ☀️ — новый день ждёт!",
    "Вставай, сегодня всё получится 💪",
    "Зарядись энергией и вперёд 🚀",
    "Утро — лучшее время для новых идей ✨",
    "Кофе уже зовёт тебя ☕",
  ],
  day: [
    "День в разгаре 🌿",
    "Работа кипит",
    "Всё движется вперёд — и ты вместе с этим 🚴",
    "Главное — не забыть про обед 🍴",
    "Рабочий настрой держит тебя в тонусе 📈",
  ],
  evening: [
    "Вечер приносит спокойствие 🌆",
    "Пора подводить итоги",
    "Расслабься — ты это заслужил 🍷",
    "Закат наполняет вдохновением 🎨",
    "Сделай что-то приятное для себя 🌸",
  ],
  night: [
    "Доброй ночи 🌙",
    "Тишина хранит мысли",
    "Завтра ждёт тебя с новыми возможностями ✨",
    "Пусть ночь подарит отдых и силы 😴",
    "Время снов и идей, которые придут во сне 🌠",
  ],
};

export const Clock = ({ startTime }: ClockProp) => {
  const [time, setTime] = useState<Date | null>(
    startTime ? new Date(startTime) : null
  );
  const [trigger, setTrigger] = useState<TimeTrigger | null>(null);
  const [phrase, setPhrase] = useState<string>("");

  useEffect(() => {
    if (startTime) {
      const date = new Date(startTime);
      setTime(date);
      setTrigger(getTimeTrigger(date));
    }
  }, [startTime]);

  useEffect(() => {
    if (!time) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (!prev) return null;
        const next = new Date(prev.getTime() + 1000);
        setTrigger(getTimeTrigger(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (trigger) {
      const index = Math.floor(Math.random() * phrases[trigger].length);
      setPhrase(phrases[trigger][index]);
    }
  }, [trigger]);

  if (!time) return <p>Загрузка часов...</p>;

  return (
    <>
      <h1>{time.toLocaleTimeString()}</h1>
      <span>{phrase}</span>
    </>
  );
};
