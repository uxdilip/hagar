const socials = [
  { name: "LinkedIn", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "Behance", href: "#" },
  { name: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 px-4 pt-24 pb-10 md:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="border-t border-border pt-16">
          <p className="font-serif text-[clamp(3.5rem,12vw,10rem)] leading-[0.95] tracking-tight text-ink">
            Let&apos;s build
            <br />
            <span className="italic text-ink-muted">something good.</span>
          </p>

          <a
            href="mailto:hello@example.com"
            data-name="link"
            data-text="Email"
            className="mt-10 inline-block text-lg text-ink underline-offset-[6px] hover:underline"
          >
            hello@example.com
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-border-soft pt-8 text-sm text-ink-muted md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  data-name="link"
                  data-text={s.name}
                  aria-label={s.name}
                  className="hover:text-ink"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs">© {new Date().getFullYear()} Hagar</p>
        </div>
      </div>
    </footer>
  );
}
