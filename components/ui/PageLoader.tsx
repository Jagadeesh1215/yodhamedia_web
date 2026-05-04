type PageLoaderProps = {
  label: string;
  title: string;
  description: string;
};

export function PageLoader({ label, title, description }: PageLoaderProps) {
  return (
    <section className="bg-[var(--bg-app)] px-6 py-24">
      <div className="container-wide">
        <div className="panel-strong mx-auto max-w-5xl p-8 md:p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--gold-warm)]">
            {label}
          </p>
          <h1 className="mt-4 text-4xl font-heading font-semibold tracking-tight text-[var(--text-primary)] md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
            {description}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--bg-panel)] p-5"
              >
                <div className="h-3 w-20 animate-pulse rounded-full bg-[var(--border-soft)]" />
                <div className="mt-5 h-6 w-3/4 animate-pulse rounded-full bg-[var(--border-soft)]" />
                <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-[var(--border-soft)]" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-[var(--border-soft)]" />
                <div className="mt-6 h-10 w-32 animate-pulse rounded-full bg-[var(--border-soft)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
