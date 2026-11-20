import { MessageCircle, MapPin, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function About() {
  return (
    <section id="about" className="bg-brand-dark-light text-white py-5">
      <div className="container py-4">
        <p className="font-mono small text-uppercase text-brand-red mb-2" style={{ letterSpacing: '0.1em' }}>
          Our story
        </p>
        <h2 className="font-display fw-semibold display-6 mb-3" style={{ maxWidth: '40rem' }}>
          Every piece starts with fabric someone chose on purpose.
        </h2>
        <p className="text-white-50" style={{ maxWidth: '36rem' }}>
          We source Ankara, lace, and brocade directly from trusted market
          suppliers, and cut and sew everything in-house. Whether you want
          fabric to take to your own tailor or a finished piece ready to wear,
          we've got you.
        </p>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="container py-5">
      <p className="font-mono small text-uppercase text-brand-red-deep mb-2" style={{ letterSpacing: '0.1em' }}>
        Get in touch
      </p>
      <h2 className="font-display fw-semibold display-6 text-brand-dark mb-4">
        Visit, message, or place an order
      </h2>

      <div className="row g-4">
        <div className="col-md-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="d-flex gap-3 p-4 rounded-4 border text-decoration-none text-body h-100"
          >
            <MessageCircle className="flex-shrink-0 text-success mt-1" size={20} />
            <div>
              <p className="fw-semibold mb-1">WhatsApp</p>
              <p className="small text-black-50 mb-0">
                Chat with us directly for orders and questions
              </p>
            </div>
          </a>
        </div>

        <div className="col-md-4">
          <div className="d-flex gap-3 p-4 rounded-4 border h-100">
            <MapPin className="flex-shrink-0 text-brand-red mt-1" size={20} />
            <div>
              <p className="fw-semibold mb-1">Location</p>
              <p className="small text-black-50 mb-0">Add your shop address here</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex gap-3 p-4 rounded-4 border h-100">
            <Clock className="flex-shrink-0 text-warning mt-1" size={20} />
            <div>
              <p className="fw-semibold mb-1">Hours</p>
              <p className="small text-black-50 mb-0">Mon–Sat, 9am–6pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
