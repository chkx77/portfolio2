import { useEffect, useState, useRef } from "react";
import { FaUserAlt, FaProjectDiagram, FaCode, FaEnvelope } from "react-icons/fa";
import img15Segundos from "./images/15.png";
import "./App.css";

function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowStars(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100 && audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch((err) => console.log("Audio failed:", err));
    }
  }, [progress]);

  return (
    <div className="loading-screen">
      <div className="crt-overlay"></div>
      {showStars && <div className="stars"></div>}

      <div
        className="loading-text"
        style={{ width: "80%", maxWidth: "600px", textAlign: "center" }}
      >
        {progress < 100 ? (
          <>
            <p className="loading-bar-full">
              <span className="bar-fill" style={{ width: `${progress}%` }}></span>
            </p>
            <p className="loading-bar-label">{progress}%</p>
            <p className="loading-message">Inicializando sistema...</p>
            <div className="equalizer">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>

          </>
        ) : (
          <>
            <p className="welcome-title">
              Bienvenido a:{" "}
              <span className="neon">
                MATÍAS // DEV1989<span className="blinking-cursor">_</span>
              </span>
            </p>
            <p className="welcome">Hola visitante, gracias por pasar 👋</p>
            <button className="enter-button" onClick={onFinish}>
              Ingresar
            </button>
          </>
        )}
      </div>

      <audio ref={audioRef} src="/retro-sound.mp3" preload="auto" />
    </div>
  );
}

function Section({ id, title, icon, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`section ${visible ? "visible" : ""}`}
    >
      <h2 className="section-title" data-text={title}>
        {icon} {title}
      </h2>
      <div className="section-content">{children}</div>
    </section>
  );
}


function LandingPage() {
  return (
    <div className="landing-container">
      
        <div className="content-wrapper">
  <header className="landing-header" role="banner">
    <h1 className="logo-text typing-effect">MATÍAS.EXE<span className="blinking-cursor">|</span></h1>
    <p className="tagline typing-effect delay-1">Desarrollador & Diseñador Web Retro</p>
  </header>

  <nav className="top-nav" aria-label="Navegación principal">
    <a href="#sobre-mi"><FaUserAlt /> Sobre mí</a>
    <a href="#proyectos"><FaProjectDiagram /> Proyectos</a>
    <a href="#skills"><FaCode /> Skills</a>
    <a href="#contacto"><FaEnvelope /> Contacto</a>
  </nav>
    
          <main className="landing-main" role="main">
            {/* secciones */}
          </main>

        <main className="landing-main" role="main">
          <Section id="sobre-mi" title="Sobre mí" icon={<FaUserAlt />}>
          <p>
            Soy <strong>Técnico en Desarrollo de Software</strong>, apasionado por
            la estética retro, la programación full-stack y la creación de
            experiencias digitales con onda vintage y neón.
          </p>
          <p>Me gusta combinar código con diseño para lograr interfaces únicas que cuenten historias.</p>
          <blockquote style={{
            fontStyle: "italic",
            color: "var(--neon-pink)",
            textShadow: "0 0 6px var(--neon-pink)",
            marginTop: "1rem",
            borderLeft: "4px solid var(--neon-pink)",
            paddingLeft: "1rem",
            opacity: 0.8,
          }}>
            "El código es arte en movimiento."
          </blockquote>
        </Section>


         <Section id="proyectos" title="Proyectos" icon={<FaProjectDiagram />}>
  <ul className="projects-list">
    <li
      title="Juego interactivo de velocidad mental hecho con React"
      style={{ cursor: "pointer" }}
      onClick={() => window.open("https://15-segundos.vercel.app/", "_blank")}
      className="project-card"
    >
      <img
        src={img15Segundos}
        alt="15 Segundos"
        draggable={false}
      />
      <h3>⏱️ 15 Segundos</h3>
      <p>Juego de reflejos mentales hecho 100% en React.</p>
    </li>
    <li
      title="Aplicación PHP/Laravel para gestión CRUD simple de negocios"
      style={{ cursor: "pointer" }}
      onClick={() => alert("Próximamente...")}
      className="project-card"
    >
      <img
        src="https://picsum.photos/id/1011/300/180"
        alt="Mini gestión negocios"
        draggable={false}
      />
      <h3>📊 Mini gestión negocios (PHP)</h3>
      <p>CRUD simple para comercios.</p>
    </li>
    <li
      title="Portafolio web personal con animaciones retro y estilo personalizado"
      style={{ cursor: "pointer" }}
      onClick={() => alert("Próximamente...")}
      className="project-card"
    >
      <img
        src="https://picsum.photos/id/1043/300/180"
        alt="Portafolio"
        draggable={false}
      />
      <h3>✨ Este portafolio</h3>
      <p>Animaciones retro, estilo personalizado.</p>
    </li>
  </ul>
</Section>



          <Section id="skills" title="Skills" icon={<FaCode />}>
  <div className="skills-icons">
    <div className="skill-item" title="HTML/CSS">
      <img src="https://cdn-icons-png.flaticon.com/512/732/732190.png" alt="HTML5" />
      <span>HTML/CSS</span>
    </div>
    <div className="skill-item" title="JavaScript">
      <img src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" alt="JavaScript" />
      <span>JavaScript</span>
    </div>
    <div className="skill-item" title="PHP / Laravel">
      <img src="https://cdn-icons-png.flaticon.com/512/919/919830.png" alt="PHP" />
      <span>PHP / Laravel</span>
    </div>
    <div className="skill-item" title="React">
      <img src="https://cdn-icons-png.flaticon.com/512/1126/1126012.png" alt="React" />
      <span>React</span>
    </div>
  </div>
</Section>


          <Section id="contacto" title="Contacto" icon={<FaEnvelope />}>
            <form
  className="contact-form"
  onSubmit={(e) => {
    e.preventDefault();
    alert("¡Mensaje enviado! Gracias por contactarme.");
  }}
  aria-label="Formulario de contacto"
>
  <label htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    placeholder="matirom77@gmail.com"
  />

  <label htmlFor="mensaje">Mensaje:</label>
  <textarea
    id="mensaje"
    name="mensaje"
    required
    placeholder="Escribí tu mensaje acá..."
  ></textarea>

  <button type="submit" aria-label="Enviar mensaje">
    Enviar 📩
  </button>
</form>

          </Section>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <LandingPage />
      )}
    </>
  );
}

export default App;
