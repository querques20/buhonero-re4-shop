function WeaponRow({ name, price, slots, badge, hovered, children }) {
  const base =
    "relative grid items-center gap-6 px-6 py-3.5 border-b border-[rgba(180,170,150,0.08)] cursor-pointer transition-colors duration-200 min-h-14";
  const bg = hovered ? 'brushstroke-row' : 'row-bg hover:brushstroke-row';
  const grid = "grid-cols-[1fr_auto_auto]";

  return (
    <li className={`${base} ${grid} ${bg}`}>
      {badge === 'enDirecto' && (
        <span className="badge-live absolute top-1/2 -translate-y-1/2 left-0 px-3 py-1 pr-2 font-['Bebas_Neue'] text-xs font-normal tracking-[2px] text-[#f5d6c8] z-[2]">
          EN DIRECTO
        </span>
      )}

      <div className="flex flex-col">
        {badge === 'nuevo' && (
          <span className="block font-['Bebas_Neue'] text-[13px] tracking-[2px] text-[#f0a437] -mb-0.5">
            NUEVO
          </span>
        )}
        <span className="font-['Bebas_Neue'] text-[26px] tracking-[1.5px] text-[#e8e0d0] leading-tight">
          {name}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-[3px] content-center justify-end">
        {Array.from({ length: slots }).map((_, i) => (
          <span key={i} className="w-2 h-2 bg-[rgba(180,170,150,0.35)]" />
        ))}
      </div>

      <div className="flex items-center gap-2.5 min-w-[130px] justify-end">
        <span className="font-['Bebas_Neue'] text-[26px] tracking-wide text-[#d63d3d]">
          {price.toLocaleString('en-US')} ptas.
        </span>
      </div>

      {children}
    </li>
  );
}

export default WeaponRow;
