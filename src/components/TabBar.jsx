function TabBar({ tabs, activeKey, kbdLeft, kbdRight, variant, onSelect }) {
  const isMain = variant === 'main';
  const isCategories = variant === 'categories';

  const containerBase = 'flex items-center gap-3.5';
  const containerVariant = isMain
    ? 'pl-[132px]'
    : isCategories
    ? 'mt-2 py-3.5 border-y border-[rgba(150,140,120,0.18)]'
    : '';

  const kbdClasses =
    "inline-flex items-center justify-center min-w-[28px] h-7 px-2 font-['Bebas_Neue'] text-[13px] font-bold text-[#d4c8a8] border-[1.5px] border-[#6e685a] bg-black/40";

  const tabBaseClasses = isCategories
    ? "relative flex flex-col items-center gap-1.5 px-[18px] py-2.5 min-w-[70px] font-['Bebas_Neue'] text-xs tracking-[1.5px] cursor-pointer transition-colors duration-200"
    : "relative inline-flex items-center gap-2.5 px-3.5 py-1.5 font-['Bebas_Neue'] tracking-[2px] cursor-pointer transition-colors duration-200";

  const inactiveColor = 'text-[#6e685a] hover:text-[#c8c0a8]';
  const activeColor = 'text-[#f5ecd6]';

  return (
    <div className={`${containerBase} ${containerVariant}`}>
      {kbdLeft && <span className={kbdClasses}>{kbdLeft}</span>}

      <ul className="flex items-center flex-wrap list-none">
        {tabs.map((tab, idx) => {
          const isActive = tab.key === activeKey;
          const sizeColor = isMain ? 'text-base' : '';
          const stateColor = isActive ? activeColor : inactiveColor;
          const activeBg = isActive && isCategories ? 'brushstroke' : '';
          const activeBar =
            isActive && isMain
              ? "after:content-[''] after:absolute after:-bottom-0.5 after:left-3.5 after:right-6 after:h-px after:bg-[#f5ecd6]"
              : '';

          return (
            <li
              key={tab.key}
              className={`${tabBaseClasses} ${sizeColor} ${stateColor} ${activeBg} ${activeBar}`}
              onClick={() => onSelect && onSelect(tab.key)}
            >
              {tab.label && (
                <span className="font-semibold uppercase">{tab.label}</span>
              )}
              {tab.showArrow && isActive && <span className="text-xs ml-1">▾</span>}
              {idx < tabs.length - 1 && (
                <span
                  className={
                    isCategories
                      ? 'self-stretch ml-2.5 text-[28px] text-[#2a2520] flex items-center'
                      : 'ml-2.5 text-[#3a3530] font-light'
                  }
                >
                  |
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {kbdRight && <span className={kbdClasses}>{kbdRight}</span>}
    </div>
  );
}

export default TabBar;
