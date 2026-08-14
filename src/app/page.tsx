import DrinkCarousel from "@/components/DrinkCarousel";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <DrinkCarousel />

      {/* Scroll sections with GSAP reveal */}
      <section className="bg-[color:var(--surface)] px-6 py-24 text-[color:var(--color-cream)] md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl font-bold text-[color:var(--color-cream)] md:text-5xl">
              Why Banana?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[rgba(245,240,232,0.72)]">
              We believe great drinks start with great ingredients. Every bottle is
              small-batch crafted, sustainably sourced, and designed to delight.
            </p>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            {
              title: "Real Ingredients",
              desc: "No artificial flavors or sweeteners. Just pure, natural goodness.",
            },
            {
              title: "Small Batch",
              desc: "Crafted in limited runs to ensure peak freshness and quality.",
            },
            {
              title: "Sustainable",
              desc: "Recyclable packaging and ethically sourced ingredients.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1} direction="up">
              <div className="rounded-2xl border border-[color:var(--border-soft)] p-8 transition-colors hover:border-gold/50">
                <h3 className="font-display text-xl font-semibold text-gold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[rgba(245,240,232,0.72)]">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
