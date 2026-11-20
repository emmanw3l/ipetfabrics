import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { href: '#fabrics', label: 'Fabrics' },
  { href: '#clothes', label: 'Ready-to-wear' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-brand-dark sticky-top py-3">
      <div className="container">
        <a href="#top" className="navbar-brand d-flex align-items-baseline gap-2 font-display">
          <span className="fw-bold fs-4 text-brand-red">I-PET</span>
          <span className="d-none d-sm-inline small text-white-50">Fabrics &amp; Styles</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto gap-md-4">
            {NAV_LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <a href={link.href} className="nav-link text-white-50">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={openCart}
          aria-label={`Open cart, ${itemCount} items`}
          className="btn btn-link position-relative text-white p-2"
        >
          <ShoppingBag size={20} />
          {itemCount > 0 && (
            <span className="position-absolute top-0 end-0 badge rounded-pill bg-brand-red">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
