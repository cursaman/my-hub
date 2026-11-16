"use client";

import { useMemo, useState } from "react";

const categories = ["전체", "생활", "학습", "일과 생산성", "엔터테인먼트"];
const shortcuts = [
  { title: "오늘의 날씨", description: "외출 전 날씨와 기온을 확인해요.", category: "생활", icon: "☀️", href: "https://www.weather.go.kr/" },
  { title: "지도와 길찾기", description: "장소를 찾고 이동 경로를 확인해요.", category: "생활", icon: "🧭", href: "https://map.naver.com/" },
  { title: "맞춤법 검사", description: "문장을 더 자연스럽고 정확하게 다듬어요.", category: "학습", icon: "✍️", href: "https://speller.cs.pusan.ac.kr/" },
  { title: "온라인 사전", description: "궁금한 단어의 뜻과 쓰임을 찾아봐요.", category: "학습", icon: "📖", href: "https://dict.naver.com/" },
  { title: "할 일 정리", description: "오늘 해야 할 일을 간단히 정리해요.", category: "일과 생산성", icon: "☑️", href: "https://calendar.google.com/" },
  { title: "계산기", description: "빠른 계산이 필요할 때 이용해요.", category: "일과 생산성", icon: "🔢", href: "https://www.google.com/search?q=calculator" },
  { title: "영상 둘러보기", description: "새로운 영상과 채널을 발견해요.", category: "엔터테인먼트", icon: "▶️", href: "https://www.youtube.com/" },
  { title: "음악 듣기", description: "좋아하는 음악과 플레이리스트를 찾아요.", category: "엔터테인먼트", icon: "🎧", href: "https://music.youtube.com/" },
];

export default function Home() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => shortcuts.filter((item) =>
    (category === "전체" || item.category === category) &&
    `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="my-hub 홈"><span className="brand-mark">h</span>my-hub</a>
        <nav aria-label="주요 메뉴"><a href="#story">포털 이야기</a><a href="#shortcuts">바로가기</a></nav>
        <a className="header-link" href="#shortcuts">둘러보기 <span>↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><i /> A LITTLE DOOR TO YOUR DAY</span>
          <h1>하루의 첫 장을 여는<br />작은 현관, <em>my-hub.</em></h1>
          <p>날씨를 살피고, 갈 곳을 찾고,<br className="desktop-break" /> 오늘의 리듬을 천천히 시작해요.</p>
          <a className="primary-button" href="#story">오늘의 문 열기 <span>↓</span></a>
          <div className="hero-caption"><span>매일 아침, 나를 위한 작은 출발</span><span>OPEN A NEW DAY</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="hub-artwork" src="/hub-illustration.svg" alt="" />
        </div>
      </section>

      <section className="welcome-strip" id="about"><span>어서 와요, 오늘의 여정은 여기서 시작돼요.</span><span>둘러보고 · 발견하고 · 나만의 속도로</span></section>

      <section className="story" id="story">
        <div className="story-heading"><span className="eyebrow">THE STORY OF MY-HUB</span><h2>오늘도 이 문을 열면,<br /><em>필요한 곳이 기다리고 있어요.</em></h2><p>복잡한 인터넷을 헤매지 않도록, 나를 위한 작은 현관을 만들었어요.<br />마음 가는 문을 골라 오늘의 다음 장으로 넘어가 보세요.</p></div>
        <div className="story-steps">
          <article><span className="chapter">CHAPTER 01</span><span className="chapter-icon">☀</span><h3>아침을 살펴요</h3><p>오늘의 날씨와 필요한 정보를 확인하며 하루의 문을 열어요.</p></article>
          <article><span className="chapter">CHAPTER 02</span><span className="chapter-icon">⌁</span><h3>나만의 길을 골라요</h3><p>배우고, 정리하고, 쉬어갈 곳까지 한눈에 찾아요.</p></article>
          <article><span className="chapter">CHAPTER 03</span><span className="chapter-icon">✦</span><h3>가벼운 마음으로 떠나요</h3><p>작은 바로가기 하나가 오늘의 좋은 흐름이 되도록.</p></article>
        </div>
        <div className="story-ending"><span>“오늘은 어디부터 가볼까요?”</span><a href="#shortcuts">나의 다음 장 찾기 <b>↓</b></a></div>
      </section>

      <section className="shortcuts" id="shortcuts">
        <div className="section-heading"><div><span className="eyebrow">CHOOSE YOUR NEXT DOOR</span><h2>어디로 떠나볼까요?</h2><p>오늘 필요한 문을 골라 다음 장을 열어보세요.</p></div><span className="count">{filtered.length.toString().padStart(2, "0")} DOORS</span></div>
        <div className="toolbar">
          <div className="filters" aria-label="카테고리 필터">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
          <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="서비스나 키워드 검색" aria-label="서비스 검색" /></label>
        </div>
        <div className="shortcut-grid">{filtered.map((item, index) => <a className="shortcut-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><div className="card-top"><span className={`shortcut-icon icon-${index % 4}`}>{item.icon}</span><span className="card-arrow">↗</span></div><span className="card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></a>)}</div>
        {filtered.length === 0 && <div className="no-results">검색 결과가 없어요. 다른 단어나 카테고리를 선택해 보세요.</div>}
      </section>

      <section className="bottom-callout"><div><span className="eyebrow">UNTIL THE NEXT CHAPTER</span><h2>오늘의 여정이 끝나도,<br />이 문은 늘 여기 있어요.</h2></div><a href="#home">첫 장으로 <span>↑</span></a></section>
      <footer><a className="brand" href="#home"><span className="brand-mark">h</span>my-hub</a><span>매일을 여는 작은 현관</span><small>© 2026 my-hub</small></footer>
    </main>
  );
}
