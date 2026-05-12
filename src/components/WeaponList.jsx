import WeaponRow from './WeaponRow.jsx';

function WeaponList({ weapons, activeCategory, hoveredId }) {
  const filtered = activeCategory === 'todo'
    ? weapons
    : weapons.filter((w) => w.category === activeCategory);

  return (
    <ul className="flex flex-col list-none">
      {filtered.map((weapon) => (
        <WeaponRow
          key={weapon.id}
          name={weapon.name}
          price={weapon.price}
          slots={weapon.slots}
          badge={weapon.badge}
          hovered={weapon.id === hoveredId}
        />
      ))}
    </ul>
  );
}

export default WeaponList;
