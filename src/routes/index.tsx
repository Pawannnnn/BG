import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Maximize2, Menu, Play, X } from "lucide-react";
import { useEffect, useState } from "react";

import albumArt from "@/assets/bhavana-album-art.jpg";
import nightLights from "@/assets/bhavana-night-lights.jpg";
import portrait from "@/assets/bhavana-editorial-portrait.jpg";
import purpleStage from "@/assets/bhavana-purple-stage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhavana.G — 21 September" },
      { name: "description", content: "A private birthday story created for Bhavana.G." },
      { property: "og:title", content: "Bhavana.G — This Day Belongs to You" },
      { property: "og:description", content: "A private birthday story created for Bhavana.G." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

const navItems = [
  ["HOME", "home"], ["BIRTHDAY", "birthday"], ["VIBES", "vibes"],
  ["MEMORIES", "memories"], ["MESSAGE", "message"], ["SURPRISE", "surprise"],
] as const;

const wishes = [
  ["01", "MORE LAUGHTER", "The kind that makes time disappear."],
  ["02", "MORE ADVENTURES", "Stories you’ll still tell years from now."],
  ["03", "MORE MUSIC", "Songs that find you at exactly the right moment."],
  ["04", "MORE PEACE", "Quiet days, soft mornings, a rested heart."],
  ["05", "MORE MEMORIES", "Little moments that become everything."],
  ["06", "DREAMS COME TRUE", "Especially the ones you keep to yourself."],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .78, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [open]);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return <>
    <header className={`nav-shell ${scrolled ? "nav-visible" : ""} ${open ? "nav-open" : ""}`}>
      <button className="wordmark" onClick={() => go("home")} aria-label="Return home">B·G</button>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={18}/></button>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22}/></button>
      <p>BHAVANA.G / 21·09</p>
      <nav>{navItems.map(([label,id], i) => <motion.button key={id} onClick={() => go(id)} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 * i }}>{label}<span>0{i+1}</span></motion.button>)}</nav>
    </motion.div>}</AnimatePresence>
  </>;
}

function Atmosphere() { return <div className="atmosphere" aria-hidden="true"><div className="light-one"/><div className="light-two"/><div className="grain"/><div className="stars">{Array.from({length: 10}, (_,i) => <i key={i}/>)}</div></div>; }

function Hero() {
  return <section id="home" className="hero">
    <Atmosphere />
    <div className="hero-frame">
      <i className="frame-corner top-left"/><i className="frame-corner top-right"/><i className="frame-corner bottom-left"/><i className="frame-corner bottom-right"/>
    <motion.div className="hero-inner">
      <motion.p className="eyebrow" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35,duration:1}}>21 SEPTEMBER</motion.p>
      <div className="hero-title-wrap"><motion.h1 initial={{opacity:0, y:28}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:1.25,ease:[.22,1,.36,1]}}>BHAVANA<span>.G</span></motion.h1></div>
      <motion.div className="hero-copy" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:1.05,duration:.9}}>
        <p className="hero-statement">THIS DAY BELONGS TO YOU.</p>
        <p className="hero-sub">A little universe, created just for Bhavana.</p>
      </motion.div>
      <motion.button className="enter-button" onClick={() => document.getElementById("birthday")?.scrollIntoView({behavior:"smooth"})} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:.7}}>ENTER THE EXPERIENCE <ArrowRight size={15}/></motion.button>
    </motion.div>
    </div>
    <div className="hero-foot"><span>A BIRTHDAY STORY IN MOTION</span><ArrowDown size={15}/><span>PRIVATE EDITION · 2026</span></div>
  </section>;
}

function BirthdayReveal() { return <section id="birthday" className="date-section section-pad">
  <div className="date-rule"><span>THE DAY</span><span>SEPTEMBER · TWENTY ONE</span></div>
  <Reveal><p className="giant-date">21 <i>/</i> 09</p></Reveal>
  <div className="date-copy">
    <Reveal><h2>TODAY, THE WORLD GOT<br/>A LITTLE MORE <em>BEAUTIFUL.</em></h2></Reveal>
    <Reveal delay={.15}><p>September 21 is more than a date.<br/>It is a reminder that someone wonderful was born into this world.</p></Reveal>
  </div>
 </section>; }

function MusicExperience() {
  return <section id="vibes" className="music-section section-pad">
    <div className="section-index"><span>02</span><span>THE SOUND</span></div>
    <Reveal className="section-intro"><p className="eyebrow">FOR EVERY CHAPTER</p><h2>YOUR <em>SOUNDTRACK.</em></h2><p>Because every unforgettable moment deserves a soundtrack.</p></Reveal>
    <Reveal className="player" delay={.12}>
      <div className="cover-wrap"><img src={albumArt} alt="Abstract violet ribbon and pearl album artwork" width={1200} height={1200}/><span>PRIVATE PRESSING<br/>NO. 21</span></div>
      <div className="track-info"><span className="track-label">BIRTHDAY SCORE · INSTRUMENTAL</span><h3>A Little Universe</h3><p>For Bhavana.G</p>
        <div className="waveform" aria-hidden="true">{Array.from({length: 42},(_,i)=><i key={i} style={{height:`${18 + ((i*13)%38)}%`}}/>)}</div>
        <div className="progress"><span>00:00</span><div><i/></div><span>—:—</span></div>
      </div>
      <button className="play-button" disabled aria-label="Audio will be available when a local track is added"><Play size={23} fill="currentColor"/><span>TRACK COMING SOON</span></button>
    </Reveal>
  </section>;
}

function MainCharacter() { return <section className="character-section">
  <img src={portrait} alt="Anonymous figure facing a sea of violet concert lights" width={1600} height={1200} loading="lazy"/>
  <div className="character-shade"/>
  <div className="character-content"><span>03 / THE MOMENT</span><Reveal><h2>YOUR MAIN<br/><em>CHARACTER</em><br/>ERA.</h2></Reveal><Reveal className="character-quote"><p>Some people walk into a room.</p><p>Some people change the atmosphere.</p></Reveal></div>
 </section>; }

function MessageSection() { return <section id="message" className="message-section section-pad">
  <div className="section-index"><span>04</span><span>THE LETTER</span></div>
  <div className="letter-layout"><Reveal><p className="eyebrow">PRIVATE & PERSONAL</p><h2>A MESSAGE<br/>FOR <em>YOU.</em></h2></Reveal>
    <Reveal className="letter" delay={.12}><p className="salutation">Happy Birthday, Bhavana.G ♡</p><p>I hope this year brings you beautiful memories, peaceful moments, unexpected happiness, and everything you've been quietly wishing for.</p><p>Keep laughing.<br/>Keep dreaming.<br/>Keep listening to the songs that make your heart happy.<br/>Keep being exactly who you are.</p><p>You deserve a year filled with moments worth remembering.</p><p className="signoff">Happy Birthday.</p><span className="letter-mark">21 · IX</span></Reveal>
  </div>
 </section>; }

const gallery = [
  {src: purpleStage, alt:"Violet spotlight crossing an empty stage", label:"THE LIGHT", size:"tall"},
  {src: nightLights, alt:"Purple night lights reflecting over water", label:"THE NIGHT", size:"wide"},
  {src: portrait, alt:"Anonymous figure in a violet-lit concert arena", label:"THE MOMENT", size:"square"},
];

function MemoryGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = selected === null ? undefined : gallery[selected];
  return <section id="memories" className="gallery-section section-pad">
    <div className="section-index"><span>05</span><span>THE ARCHIVE</span></div>
    <Reveal className="section-intro"><h2>MOMENTS WORTH <em>KEEPING.</em></h2><p>The little things become the memories we remember forever.</p></Reveal>
    <div className="editorial-grid">{gallery.map((item,i)=><Reveal className={`gallery-item ${item.size}`} delay={i*.08} key={item.label}><button onClick={()=>setSelected(i)} aria-label={`View ${item.label.toLowerCase()} full screen`}><img src={item.src} alt={item.alt} loading="lazy" width={i===0?1200:1600} height={i===0?1600:i===1?1008:1200}/><div><span>0{i+1}</span><p>{item.label}</p><Maximize2 size={16}/></div></button></Reveal>)}</div>
    <p className="gallery-note">Personal photographs can replace these cinematic frames.</p>
    <AnimatePresence>{selectedItem && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)} role="dialog" aria-modal="true" aria-label="Expanded photograph"><button onClick={()=>setSelected(null)} aria-label="Close photograph"><X/></button><img src={selectedItem.src} alt={selectedItem.alt}/></motion.div>}</AnimatePresence>
  </section>;
}

function WishCards() { return <section className="wishes-section section-pad">
  <div className="section-index"><span>06</span><span>THE WISHES</span></div>
  <Reveal className="section-intro"><h2>A FEW THINGS<br/>I WISH <em>FOR YOU.</em></h2></Reveal>
  <div className="wishes-grid">{wishes.map(([num,title,copy])=><Reveal key={num} className="wish"><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i></Reveal>)}</div>
 </section>; }

function Surprise() {
  const [open,setOpen]=useState(false);
  return <section id="surprise" className={`surprise-section ${open?"is-open":""}`}>
    <Atmosphere/><div className="surprise-inner">
      <AnimatePresence mode="wait">{!open ? <motion.div key="closed" exit={{opacity:0,y:-20}} transition={{duration:.6}}><p className="eyebrow">07 / THE SURPRISE</p><h2>ONE LAST <em>THING.</em></h2><p>There is something waiting for you.</p><button className="enter-button" onClick={()=>setOpen(true)}>OPEN YOUR SURPRISE <ArrowRight size={15}/></button></motion.div> : <motion.div key="open" className="final-message" initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} transition={{delay:.5,duration:1.2}}><span>FOR BHAVANA.G</span><p>You deserve all the beautiful things<br/>life has to offer.</p><h2>Happy Birthday,<br/><em>Bhavana.G ♡</em></h2></motion.div>}</AnimatePresence>
    </div>
  </section>;
}

function Closing() { return <footer className="closing"><div className="closing-light"/><Reveal><p>HERE’S TO ANOTHER BEAUTIFUL CHAPTER.</p><h2>KEEP<br/><em>SHINING.</em></h2><div><span>BHAVANA.G</span><i/><span>21 · 09</span></div></Reveal><small>MADE WITH INTENTION, JUST FOR YOU.</small></footer>; }

function BirthdayExperience() { return <><a className="skip-link" href="#birthday">Skip to the birthday story</a><main><Navigation/><Hero/><BirthdayReveal/><MusicExperience/><MainCharacter/><MessageSection/><MemoryGallery/><WishCards/><Surprise/><Closing/></main></>; }