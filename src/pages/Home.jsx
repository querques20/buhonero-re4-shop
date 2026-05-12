import { useEffect, useState } from 'react';
import HUD from '../components/HUD.jsx';
import ShopMenu from '../components/ShopMenu.jsx';
import BuyView from '../components/BuyView.jsx';
import { menuItems } from '../data/menuItems.jsx';

function Home() {
  const [view, setView] = useState('menu'); // 'menu' | 'comprar' | 'mejorar' | 'vender' | 'intercambiar'
  const pesetas = 17747;
  const gunpowder = 0;
  const spinels = 18;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setView('menu');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-transparent">
      {view === 'menu' ? (
        <>
          <HUD gunpowder={gunpowder} spinels={spinels} pesetas={pesetas} />
          <ShopMenu
            title="Tienda"
            items={menuItems}
            onSelect={(key) => setView(key)}
          />
        </>
      ) : (
        <BuyView
          initialTab={view}
          pesetas={pesetas}
          gunpowder={gunpowder}
          spinels={spinels}
          onChangeTab={(key) => setView(key)}
          onBack={() => setView('menu')}
        />
      )}
    </div>
  );
}

export default Home;
