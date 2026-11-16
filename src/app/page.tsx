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
        <nav aria-label="주요 메뉴"><a href="#shortcuts">바로가기</a><a href="#about">소개</a></nav>
        <a className="header-link" href="#shortcuts">둘러보기 <span>↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><i /> YOUR EVERYDAY STARTING POINT</span>
          <h1>자주 찾는 것들을<br />한곳에, <em>my-hub.</em></h1>
          <p>필요한 정보와 유용한 서비스를 모아<br className="desktop-break" /> 오늘을 더 가볍게 시작해 보세요.</p>
          <a className="primary-button" href="#shortcuts">포털 둘러보기 <span>↓</span></a>
          <div className="hero-caption"><span>매일 쓰는 웹의 새로운 시작</span><span>YOUR SPACE, YOUR WAY</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img className="hub-artwork" src="/hub-illustration.svg" alt="" />
        </div>
      </section>

      <section className="welcome-strip" id="about"><span>한곳에서 시작하는 나만의 웹 포털</span><span>필요한 정보 · 자주 쓰는 서비스 · 새로운 발견</span></section>

      <section className="shortcuts" id="shortcuts">
        <div className="section-heading"><div><span className="eyebrow">QUICK ACCESS</span><h2>무엇을 찾고 있나요?</h2><p>자주 쓰는 서비스와 유용한 도구를 모았어요.</p></div><span className="count">{filtered.length.toString().padStart(2, "0")} LINKS</span></div>
        <div className="toolbar">
          <div className="filters" aria-label="카테고리 필터">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div>
          <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="서비스나 키워드 검색" aria-label="서비스 검색" /></label>
        </div>
        <div className="shortcut-grid">{filtered.map((item, index) => <a className="shortcut-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><div className="card-top"><span className={`shortcut-icon icon-${index % 4}`}>{item.icon}</span><span className="card-arrow">↗</span></div><span className="card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></a>)}</div>
        {filtered.length === 0 && <div className="no-results">검색 결과가 없어요. 다른 단어나 카테고리를 선택해 보세요.</div>}
      </section>

      <section className="bottom-callout"><div><span className="eyebrow">A LITTLE MORE ORGANIZED</span><h2>오늘 필요한 페이지,<br />여기서 바로 시작해요.</h2></div><a href="#home">맨 위로 <span>↑</span></a></section>
      <footer><a className="brand" href="#home"><span className="brand-mark">h</span>my-hub</a><span>나만의 정보 포털</span><small>© 2026 my-hub</small></footer>
    </main>
  );
}
