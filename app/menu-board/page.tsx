'use client'
import { useEffect, useState } from 'react'

const slides = [
  {
    title: 'PASTA • LUNCH SPECIALS',
    items: [
      'Spaghetti Meatballs',
      'Fettuccine Alfredo',
      'Shrimp Pasta',
      'Meatball Parmigiana',
      'Chicken Parmigiana',
      'Lunch Specials 11am–3pm',
    ],
  },
  {
    title: 'PIZZA',
    items: [
      'Pizza by the slice',
      'Cheese Pizza',
      'Pepperoni Pizza',
      'Meat Lovers',
      'Supreme',
      'Veggie',
      'Hawaiian',
      'Build your own pizza',
    ],
  },
]

export default function MenuBoard() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((v) => (v + 1) % slides.length)
    }, 18000)

    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <main className="board">
      <section className="card">
        <p className="eyebrow">TAPO PIZZERIA</p>
        <h1>{slide.title}</h1>

        <div className="grid">
          {slide.items.map((item) => (
            <div key={item} className="item">
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="motion-dot" />

      <video
        className="keep-awake"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQ=="
          type="video/mp4"
        />
      </video>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #faf7f0;
        }

        .board {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #fffaf0 0%, #f2e1c1 100%);
          font-family: Arial, sans-serif;
        }

        .card {
          width: 88vw;
          height: 82vh;
          border: 10px solid #111;
          background: #fffdf7;
          border-radius: 28px;
          padding: 5vh 5vw;
          text-align: center;
          animation: awakePan 38s linear infinite alternate;
        }

        .eyebrow {
          font-size: 2vw;
          letter-spacing: 0.35em;
          color: #9b1c1c;
          font-weight: 900;
        }

        h1 {
          font-size: 5vw;
          margin-bottom: 5vh;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2vh 3vw;
        }

        .item {
          font-size: 2.5vw;
          font-weight: 700;
          padding: 2vh;
          border-bottom: 3px solid #e7d8bb;
        }

        .motion-dot {
          position: fixed;
          width: 2px;
          height: 2px;
          animation: nudge 11s linear infinite;
        }

        .keep-awake {
          position: fixed;
          width: 1px;
          height: 1px;
          opacity: 0.01;
        }

        @keyframes awakePan {
          from {
            transform: scale(1.002) translate3d(-0.12%, -0.12%, 0);
          }
          to {
            transform: scale(1.006) translate3d(0.12%, 0.12%, 0);
          }
        }

        @keyframes nudge {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(3px, 3px, 0);
          }
        }
      `}</style>
    </main>
  )
}
