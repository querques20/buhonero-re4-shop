import { useEffect, useState } from 'react';
import HUD from './HUD.jsx';
import TabBar from './TabBar.jsx';
import WeaponList from './WeaponList.jsx';
import { shopTabs } from '../data/shopTabs.jsx';
import { categories } from '../data/categories.jsx';
import { weapons } from '../data/weapons.js';

function BuyView({ initialTab = 'comprar', pesetas, gunpowder, spinels, onChangeTab, onBack }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCategory, setActiveCategory] = useState('todo');
  const hoveredWeapon = 'killer7';

  const handleTab = (key) => {
    setActiveTab(key);
    if (onChangeTab) onChangeTab(key);
  };

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key.toLowerCase();

      if (key === 'q' || key === 'e') {
        const idx = shopTabs.findIndex((t) => t.key === activeTab);
        const delta = key === 'q' ? -1 : 1;
        const next = (idx + delta + shopTabs.length) % shopTabs.length;
        handleTab(shopTabs[next].key);
      }

      if (key === 'a' || key === 'd') {
        const idx = categories.findIndex((c) => c.key === activeCategory);
        const delta = key === 'a' ? -1 : 1;
        const next = (idx + delta + categories.length) % categories.length;
        setActiveCategory(categories[next].key);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeTab, activeCategory]);

  const currentTabLabel = shopTabs.find((t) => t.key === activeTab)?.label?.toUpperCase();

  return (
    <div className="absolute inset-0 pt-12 px-[60px] flex flex-col gap-4.5">
      <button
        onClick={onBack}
        className="absolute top-4.5 left-[60px] inline-flex items-center gap-2.5 bg-transparent border-none text-[#b8b0a0] hover:text-[#f5ecd6] font-['Bebas_Neue'] text-[13px] font-semibold tracking-[3px] uppercase cursor-pointer px-2.5 py-1.5 transition-colors duration-200"
      >
        <span>Atrás</span>
        <span className="ml-1.5 inline-flex items-center justify-center min-w-[36px] h-[22px] px-1.5 text-[11px] font-bold tracking-wide text-[#d4c8a8] border-[1.5px] border-[#6e685a] bg-black/40">
          ESC
        </span>
      </button>

      <div className="flex justify-between items-start gap-8">
        <div className="flex items-center gap-6">
          <h1 className="font-['Bebas_Neue'] text-[64px] font-bold tracking-[8px] uppercase text-[#f0e8d8] leading-none">
            {currentTabLabel}
          </h1>
        </div>

        <HUD gunpowder={gunpowder} spinels={spinels} pesetas={pesetas} variant="compact" />
      </div>

      <TabBar
        tabs={shopTabs}
        activeKey={activeTab}
        kbdLeft="Q"
        kbdRight="E"
        variant="main"
        onSelect={handleTab}
      />

      <TabBar
        tabs={categories}
        activeKey={activeCategory}
        kbdLeft="A"
        kbdRight="D"
        variant="categories"
        onSelect={setActiveCategory}
      />

      <div className="flex-1 overflow-y-auto pr-2 max-w-[45vw]">
        <WeaponList
          weapons={weapons}
          activeCategory={activeCategory}
          hoveredId={hoveredWeapon}
        />
      </div>
    </div>
  );
}

export default BuyView;
