import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Pause, Stars, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

const SECRET_PASSWORD = "07/04/2026";
const BIRTHDAY_DATE = new Date('2026-07-08T00:00:00').getTime();

const photos = [
  { id: 1, src: '/photos/pic1.jpg', caption: "Lost in each other ✨" },
  { id: 2, src: '/photos/pic2.jpg', caption: "Walking through life together" },
  { id: 3, src: '/photos/pic3.jpg', caption: "Matching vibes 🌊" },
  { id: 4, src: '/photos/pic4.jpg', caption: "I love your silly face ❤️" },
  { id: 5, src: '/photos/pic5.jpg', caption: "Late night rides 🛵" },
  { id: 6, src: '/photos/pic6.jpg', caption: "Cheering side by side 🏏" },
  { id: 7, src: '/photos/pic7.jpg', caption: "That look you give me..." },
  { id: 8, src: '/photos/pic8.jpg', caption: "Our peaceful moments 🏛️" },
  { id: 9, src: '/photos/pic9.jpg', caption: "My happiest place is with you" }
];

const loveQuotes = [
  "You are my today and all of my tomorrows 💕",
  "Every love story is beautiful, but ours is my favorite ✨",
  "In a sea of people, my eyes will always search for you 🌊",
  "You make my heart smile 💖",
  "I fell in love with your smile, then I fell in love with you ❤️",
  "Together is my favorite place to be 🏡",
  "You are the best thing that's ever been mine 💗",
];

const FloatingHearts = () => {
  const elements = Array.from({ length: 40 });
  return (
    <div className="floating-hearts">
      {elements.map((_, i) => {
        const isStar = i % 4 === 0;
        const size = Math.random() * 25 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 15;
        return isStar ? (
          <Stars 
            key={i} className="heart"
            style={{ width: size, height: size, left: `${left}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s`, color: '#ffd700' }} 
            fill="currentColor"
          />
        ) : (
          <Heart 
            key={i} className="heart"
            style={{ width: size, height: size, left: `${left}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s` }} 
            fill="currentColor"
          />
        );
      })}
    </div>
  );
};

const LoveQuotesTicker = () => (
  <div className="quotes-ticker-wrapper">
    <div className="quotes-ticker">
      {[...loveQuotes, ...loveQuotes].map((q, i) => (
        <span key={i} className="ticker-quote serif">{q}</span>
      ))}
    </div>
  </div>
);

const SparkDivider = () => (
  <motion.div 
    className="spark-divider"
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    <span className="spark-line" />
    <Sparkles size={24} color="#ffd700" />
    <Heart size={18} fill="var(--primary)" color="var(--primary)" />
    <Sparkles size={24} color="#ffd700" />
    <span className="spark-line" />
  </motion.div>
);

const Countdown = ({ timeLeft }) => (
  <div className="countdown-box">
    <div className="glass-panel time-unit">
      <span className="time-val">{timeLeft.days}</span>
      <span className="time-label">Days</span>
    </div>
    <div className="glass-panel time-unit">
      <span className="time-val">{timeLeft.hours}</span>
      <span className="time-label">Hrs</span>
    </div>
    <div className="glass-panel time-unit">
      <span className="time-val">{timeLeft.minutes}</span>
      <span className="time-label">Min</span>
    </div>
    <div className="glass-panel time-unit">
      <span className="time-val">{timeLeft.seconds}</span>
      <span className="time-label">Sec</span>
    </div>
  </div>
);

const LoveEnvelope = ({ isBirthday }) => {
  const [stage, setStage] = useState('closed');

  const handleTap = () => {
    if (stage === 'closed') {
      setStage('opening');
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#ff4b72', '#ff7ea1', '#ffb3c6', '#ffd700'],
        shapes: ['circle'],
        scalar: 0.8,
      });
      setTimeout(() => setStage('letter'), 1200);
    }
  };
  
  // Custom letter content depending on if it's her birthday or not!
  const defaultLetter = [
    "To my dearest Bipasha,",
    "",
    "I wanted to make something special just for you. Every photo above represents a beautiful memory we've shared, and I can't wait to make countless more.",
    "",
    "You make every day brighter, and I hope this birthday brings you as much joy as you bring me.",
    "",
    "Forever yours,",
    "❤️"
  ];
  
  const birthdayLetter = [
    "Happy Birthday my love! ❤️",
    "",
    "I love you so much. I miss you every single day when I don't get to meet you.",
    "",
    "Our first trip is so incredibly special to me, and I am so excited to spend the rest of my life with you. I am here with you always, in your good days and your bad days. You are absolutely everything to me.",
    "",
    "Many trips soon, and so much love coming your way soon. For me, every day with you is Valentine's Day, and every day I just love you more.",
    "",
    "Happy Birthday Bipasha!",
    "Forever yours, ❤️"
  ];

  const lines = isBirthday ? birthdayLetter : defaultLetter;

  return (
    <div className="envelope-section">
      <AnimatePresence mode="wait">
        {stage !== 'letter' && (
          <motion.div
            key="envelope"
            className="envelope-3d"
            onClick={handleTap}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className={`envelope-body ${stage === 'opening' ? 'shake' : ''}`}>
              <div className={`envelope-flap ${stage === 'opening' ? 'flap-open' : ''}`} />
              
              <motion.div 
                className="letter-peek"
                animate={stage === 'opening' ? { y: -120, rotate: -3, scale: 1.05 } : { y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.3 }}
              >
                <Heart fill="var(--primary)" color="var(--primary)" size={30} />
                <p className="letter-peek-text handwritten">For you...</p>
              </motion.div>
              
              <div className="envelope-front" />
              
              <motion.div 
                className="wax-seal"
                animate={stage === 'opening' ? { scale: 0, rotate: 180 } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Heart fill="white" size={16} />
              </motion.div>
            </div>
            
            {stage === 'closed' && (
              <motion.p 
                className="envelope-tap-text handwritten"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌 Tap to open your letter...
              </motion.p>
            )}
          </motion.div>
        )}

        {stage === 'letter' && (
          <motion.div 
            key="fullLetter"
            className="love-letter"
            initial={{ opacity: 0, y: 100, scale: 0.3, rotate: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.25 }}
          >
            <motion.div className="letter-corner top-left" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Heart fill="var(--primary-light)" size={20} />
            </motion.div>
            <motion.div className="letter-corner top-right" animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
              <Heart fill="var(--primary-light)" size={20} />
            </motion.div>
            <motion.div className="letter-corner bottom-left" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }}>
              <Heart fill="var(--primary-light)" size={20} />
            </motion.div>
            <motion.div className="letter-corner bottom-right" animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 3 }}>
              <Heart fill="var(--primary-light)" size={20} />
            </motion.div>

            <motion.div 
              className="letter-wax-stamp"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <Heart fill="white" size={22} />
            </motion.div>

            <motion.h2 
              className="letter-heading serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isBirthday ? "Happy Birthday My Love" : "A Little Note For You"}
            </motion.h2>

            <motion.div className="letter-body handwritten">
              {lines.map((line, i) => (
                <motion.p 
                  key={i}
                  className={line === "" ? "letter-space" : "letter-line"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [appState, setAppState] = useState('login');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const isBirthday = timeLeft.total <= 0;

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const total = BIRTHDAY_DATE - new Date().getTime();
    if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      total,
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60)
    };
  }

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.8;
      audio.play().then(() => setIsPlaying(true)).catch(err => console.log('Play blocked:', err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setError(false);
      setAppState('transition');
      
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.8;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log('Autoplay blocked — use the music button'));
      }

      setTimeout(() => setAppState('dashboard'), 5000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  useEffect(() => {
    if (appState === 'dashboard' && isBirthday) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min, max) => Math.random() * (max - min) + min;
      const interval = setInterval(function() {
        const tl = animationEnd - Date.now();
        if (tl <= 0) return clearInterval(interval);
        const particleCount = 50 * (tl / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [appState, isBirthday]);

  return (
    <div className="app-container">
      <FloatingHearts />
      
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </button>

      <AnimatePresence mode="wait">
        {appState === 'login' && (
          <motion.div 
            key="login" className="login-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="login-heart-wrapper"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
            >
              <Heart className="giant-heart" fill="var(--primary)" />
              <div className="login-content">
                <h1 className="login-title serif">Welcome</h1>
                <motion.form 
                  className="login-form" onSubmit={handleLogin}
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: error ? 0.4 : 1 }}
                >
                  <input 
                    type="text" className="login-input" 
                    placeholder="Enter our special date"
                    value={password} onChange={(e) => setPassword(e.target.value)} autoFocus
                  />
                  <button type="submit" className="login-btn">Unlock</button>
                </motion.form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {appState === 'transition' && (
          <motion.div 
            key="transition" className="transition-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
          >
            <motion.div
              className="exploding-heart"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 60], opacity: [1, 0] }}
              transition={{ duration: 3.5, ease: "easeIn" }}
            >
              <Heart fill="var(--primary)" size={100} />
            </motion.div>
            <motion.h1 
              className="transition-text serif"
              initial={{ opacity: 0, scale: 0.5, y: 50 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ delay: 1, duration: 2, type: "spring" }}
            >
              Welcome back Bipasha..<br/>all yours
            </motion.h1>
          </motion.div>
        )}

        {appState === 'dashboard' && (
          <motion.div 
            key="dashboard" className="dashboard"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          >
            <motion.div 
              className="glass-panel hero-section"
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            >
              {!isBirthday ? (
                <>
                  <h1 className="title serif">Almost Time...</h1>
                  <p className="subtitle">I'm counting down every second until your special day ❤️</p>
                  <Countdown timeLeft={timeLeft} />
                </>
              ) : (
                <div className="birthday-celebration">
                  <motion.h1 
                    className="birthday-title serif"
                    initial={{ scale: 0 }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    Happy Birthday<br/>My Love!
                  </motion.h1>
                  <p className="subtitle serif" style={{fontSize: '1.8rem'}}>Today is all about you and the beautiful light you bring into my world.</p>
                </div>
              )}
            </motion.div>

            <LoveQuotesTicker />
            <SparkDivider />

            <div className="gallery-grid">
              {photos.map((photo, index) => {
                const randomRotate = (index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 2);
                
                return (
                  <motion.div 
                    key={photo.id} className="polaroid"
                    initial={{ opacity: 0, y: 150, rotate: randomRotate * 3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: randomRotate }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (index % 3) * 0.15, duration: 0.8, type: "spring", bounce: 0.4 }}
                    whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
                    style={{ zIndex: Math.floor(Math.random() * 10) }}
                  >
                    <img src={photo.src} alt="Memory" className="photo-img" 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80' }} 
                    />
                    <p className="photo-caption handwritten">{photo.caption}</p>
                  </motion.div>
                );
              })}
            </div>

            <SparkDivider />

            <LoveEnvelope isBirthday={isBirthday} />

            <motion.p 
              className="footer-text handwritten"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              Made with all my ❤️ just for you, Bipasha
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
