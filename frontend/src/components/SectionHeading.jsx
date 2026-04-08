function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-slate-600">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
