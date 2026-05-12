function HUD({ gunpowder, spinels, pesetas, variant = 'standalone' }) {
  const isCompact = variant === 'compact';

  const containerClasses = isCompact
    ? 'flex flex-col gap-2.5 items-end'
    : 'absolute top-14 left-[220px] z-10 flex flex-col gap-2.5';

  const rowClasses = isCompact
    ? 'flex items-center gap-3.5 justify-end'
    : 'flex items-center gap-3.5';

  return (
    <div className={containerClasses}>
      <div className={rowClasses}>
        <span className="font-['Oswald'] text-lg font-medium tracking-wide text-[#e8e0d0]">
          Pólvora x{gunpowder}
        </span>
        <span className="text-lg font-light text-[#4a4a4a]">|</span>
        <span className="font-['Oswald'] text-lg font-medium tracking-wide text-[#e8e0d0]">
          Espinela x{spinels}
        </span>
      </div>

      <div className={rowClasses}>
        <span className="font-['Oswald'] text-[22px] font-medium tracking-wide text-[#e8e0d0]">
          {pesetas.toLocaleString('en-US')} ptas.
        </span>
      </div>
    </div>
  );
}

export default HUD;
