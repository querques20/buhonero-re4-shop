function MenuItem({ label, active, hovered, onClick, children }) {
  const base =
    "relative flex items-center gap-4 px-[22px] py-4 font-['Bebas_Neue'] text-2xl tracking-[3px] uppercase cursor-pointer border-b border-[rgba(180,170,150,0.18)] last:border-b-0 transition-colors duration-200";
  const color = active || hovered ? 'text-[#f5ecd6]' : 'text-[#b8b0a0] hover:text-[#f5ecd6]';
  const bg = hovered ? 'brushstroke' : '';

  return (
    <li className={`${base} ${color} ${bg}`} onClick={onClick}>
      {active && (
        <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-[1.5px] border-[#d4c8a8] bg-transparent flex items-center justify-center">
          <span className="w-[3px] h-[3px] rounded-full bg-[#d4c8a8]" />
        </span>
      )}
      <span className="flex-1">{label}</span>
      {children && <div className="mt-1">{children}</div>}
    </li>
  );
}

export default MenuItem;
