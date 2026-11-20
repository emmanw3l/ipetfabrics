import { motion } from "framer-motion";
import { PatternStrip } from "../PatternStrip";
import logoIcon from "@/assets/logo-icon.png";
import "./hero.css";
export function Hero() {
  return (
    <>
      <div
        id="top"
        className=" bg-brand-dark text-white d-flex flex-column "
        
      >
        <div className="container  flex-fill d-flex align-items-center py-3 py-lg-5">
          <div className="row  pad w-100">
            {/* Text */}
            <motion.div
              className="col-12 col-lg-6  text-lg-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p
                className="font-mono small text-uppercase text-brand-red mb-3"
                style={{ letterSpacing: "0.1em" }}
              >
                Cut, sewn, and styled with love
              </p>

              <h1
                className="font-display fw-semibold display-3 display-lg-2 mb-4"
                style={{ lineHeight: 1.05 }}
              >
                Fabric with a story.
                <br />
                <span className="text-brand-red">Fit</span> with a name.
              </h1>

              <p
                className="fs-5 text-white-50 mb-4 mx-auto mx-lg-0"
                style={{ maxWidth: "32rem" }}
              >
                Hand-picked Ankara, lace, and brocade — or let us stitch it into
                something that's actually yours. Browse, add to cart, and order
                straight to WhatsApp.
              </p>

              <div className="d-flex flex-wrap  justify-content-center justify-content-lg-start gap-3">
                <motion.a
                  href="#fabrics"
                  className="btn btn-brand rounded-pill px-4 py-2 fw-semibold"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop fabrics
                </motion.a>

                <motion.a
                  href="#clothes"
                  className="btn btn-outline-ivory rounded-pill px-4 py-2 fw-semibold"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop ready-to-wear
                </motion.a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="col-12 col-lg-6  "
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              
                <motion.img
                  src={logoIcon}
                  alt="I-PET Fabrics & Styles logo mark"
                  className="img-fluid  justify-content-center  d-block mx-auto"
                  style={{
                    maxHeight: "75vh",
                    width: "auto",
                    objectFit: "contain",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.35,
                  }}
                />
              
            </motion.div>
          </div>
        </div>
      </div>
      <PatternStrip />
    </>
  );
}
