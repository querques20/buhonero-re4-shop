import MenuItem from './MenuItem.jsx';

function ShopMenu({ title, items, onSelect }) {
  return (
    <div className="absolute top-1/2 left-[220px] -translate-y-1/4 z-10 min-w-[380px]">
      <h1 className="font-['Bebas_Neue'] text-[38px] tracking-[4px] uppercase text-[#f0e8d8] mb-6 pb-3.5 border-b border-[rgba(180,170,150,0.25)]">
        {title}
      </h1>

      <ul className="flex flex-col list-none">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            label={item.label}
            active={item.active}
            hovered={item.hovered}
            onClick={() => onSelect && onSelect(item.key)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShopMenu;
