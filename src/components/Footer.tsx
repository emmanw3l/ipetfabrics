import { PatternStrip } from './PatternStrip';

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <PatternStrip />
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-4">
        <p className="font-display fs-5 fw-bold text-brand-red mb-0">
          I-PET <span className="fw-normal text-white">Fabrics &amp; Styles</span>
        </p>
        <p className="small text-white-50 mb-0">
          © {new Date().getFullYear()} I-PET Fabrics &amp; Styles. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
