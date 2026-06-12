import { Link } from 'react-router-dom';
import WeaponRow from './WeaponRow.jsx';

function WeaponList({ weapons, activeCategory, hoveredId }) {
  const filtered = activeCategory === 'todo'
    ? weapons
    : weapons.filter((w) => w.category === activeCategory);

  return (
    <ul className="flex flex-col list-none">
      {filtered.map((weapon) => (
        // Cada arma enlaza a su página de detalle (/detail/:id)
        <Link key={weapon.id} to={`/detail/${weapon.id}`} className="block no-underline">
          <WeaponRow
            name={weapon.name}
            price={weapon.price}
            slots={weapon.slots}
            badge={weapon.badge}
            hovered={weapon.id === hoveredId}
          />
        </Link>
      ))}
    </ul>
  );
}

export default WeaponList;
