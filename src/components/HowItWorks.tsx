import Reveal from "./Reveal";
import PhoneFrame from "./PhoneFrame";
import ScoreRadar from "./ScoreRadar";

const steps = [
  {
    number: "01",
    title: "Tell us about you",
    description:
      "A quick assessment — goals, body stats, experience, limitations — takes under two minutes.",
  },
  {
    number: "02",
    title: "AI builds your plan",
    description:
      "FitMind's coach generates a workout and nutrition plan tailored to your answers in seconds.",
  },
  {
    number: "03",
    title: "Track effortlessly",
    description: "Log meals and workouts by photo or voice. No manual search, no tedious forms.",
  },
  {
    number: "04",
    title: "See your score climb",
    description: "Strength, agility, and endurance, visualized in one score that updates as you go.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              From question one to your first workout.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-10">
            {steps.map((s, i) => (
              <Reveal key={s.number} delay={i * 0.1}>
                <div className="flex gap-5">
                  <span className="font-display text-2xl font-extrabold text-brand/70">
                    {s.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <PhoneFrame>
            <ScoreRadar />
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
