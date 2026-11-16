"use client";

import { useMemo, useState } from "react";

const categories = ["전체", "생활", "학습", "생산성", "공공·금융", "쇼핑", "뉴스", "여행", "엔터테인먼트", "개발"];
const shortcuts = [
  { title: "오늘의 날씨", description: "외출 전 날씨와 기온을 확인해요.", category: "생활", icon: "☀️", href: "https://www.weather.go.kr/" },
  { title: "지도와 길찾기", description: "장소를 찾고 이동 경로를 확인해요.", category: "생활", icon: "🧭", href: "https://map.naver.com/" },
  { title: "맞춤법 검사", description: "문장을 더 자연스럽고 정확하게 다듬어요.", category: "학습", icon: "✍️", href: "https://nara-speller.co.kr/speller/" },
  { title: "온라인 사전", description: "궁금한 단어의 뜻과 쓰임을 찾아봐요.", category: "학습", icon: "📖", href: "https://dict.naver.com/" },
  { title: "할 일 정리", description: "오늘 해야 할 일을 간단히 정리해요.", category: "생산성", icon: "☑️", href: "https://calendar.google.com/" },
  { title: "계산기", description: "빠른 계산이 필요할 때 이용해요.", category: "생산성", icon: "🔢", href: "https://www.google.com/search?q=calculator" },
  { title: "영상 둘러보기", description: "새로운 영상과 채널을 발견해요.", category: "엔터테인먼트", icon: "▶️", href: "https://www.youtube.com/" },
  { title: "음악 듣기", description: "좋아하는 음악과 플레이리스트를 찾아요.", category: "엔터테인먼트", icon: "🎧", href: "https://music.youtube.com/" },
  { title: "네이버 검색", description: "웹과 국내 콘텐츠를 폭넓게 찾아봐요.", category: "생활", icon: "🔎", href: "https://www.naver.com/" },
  { title: "Google 검색", description: "전 세계 웹에서 필요한 정보를 찾아요.", category: "생활", icon: "🌐", href: "https://www.google.com/" },
  { title: "카카오맵", description: "장소와 주변 정보를 살펴봐요.", category: "생활", icon: "📍", href: "https://map.kakao.com/" },
  { title: "파파고 번역", description: "문장과 웹페이지를 자연스럽게 번역해요.", category: "학습", icon: "🗺️", href: "https://papago.naver.com/" },
  { title: "Google 번역", description: "여러 언어의 문장과 단어를 번역해요.", category: "학습", icon: "🔤", href: "https://translate.google.com/" },
  { title: "위키백과", description: "다양한 주제의 백과사전 문서를 읽어요.", category: "학습", icon: "📚", href: "https://ko.wikipedia.org/" },
  { title: "K-MOOC", description: "대학의 온라인 공개 강좌를 찾아봐요.", category: "학습", icon: "🎓", href: "https://www.kmooc.kr/" },
  { title: "RISS 학술정보", description: "논문과 학술 자료를 검색해요.", category: "학습", icon: "📝", href: "https://www.riss.kr/" },
  { title: "Gmail", description: "이메일을 확인하고 답장을 보내요.", category: "생산성", icon: "✉️", href: "https://mail.google.com/" },
  { title: "Google Drive", description: "파일을 저장하고 어디서나 열어봐요.", category: "생산성", icon: "📁", href: "https://drive.google.com/" },
  { title: "Google Docs", description: "문서를 작성하고 함께 편집해요.", category: "생산성", icon: "📄", href: "https://docs.google.com/" },
  { title: "Google Keep", description: "메모와 아이디어를 간단히 기록해요.", category: "생산성", icon: "📌", href: "https://keep.google.com/" },
  { title: "Notion", description: "문서와 프로젝트를 한곳에서 정리해요.", category: "생산성", icon: "▤", href: "https://www.notion.so/" },
  { title: "Trello", description: "할 일을 보드로 나눠 관리해요.", category: "생산성", icon: "🗂️", href: "https://trello.com/" },
  { title: "Canva", description: "발표 자료와 디자인을 손쉽게 만들어요.", category: "생산성", icon: "🎨", href: "https://www.canva.com/" },
  { title: "정부24", description: "정부 민원과 각종 서비스를 이용해요.", category: "공공·금융", icon: "🏛️", href: "https://www.gov.kr/" },
  { title: "홈택스", description: "세금 신고와 국세 서비스를 확인해요.", category: "공공·금융", icon: "🧾", href: "https://www.hometax.go.kr/" },
  { title: "국민건강보험", description: "건강보험 자격과 보험료를 확인해요.", category: "공공·금융", icon: "🩺", href: "https://www.nhis.or.kr/" },
  { title: "국민연금", description: "연금 가입 내역과 예상 연금을 살펴봐요.", category: "공공·금융", icon: "🌱", href: "https://www.nps.or.kr/" },
  { title: "복지로", description: "나와 가족에게 맞는 복지 서비스를 찾아요.", category: "공공·금융", icon: "🤝", href: "https://www.bokjiro.go.kr/" },
  { title: "고용24", description: "취업 지원과 고용 서비스를 확인해요.", category: "공공·금융", icon: "💼", href: "https://www.work24.go.kr/" },
  { title: "국가통계포털", description: "주제별 국가 통계 자료를 검색해요.", category: "공공·금융", icon: "📊", href: "https://kosis.kr/" },
  { title: "국가법령정보센터", description: "법령과 판례 정보를 찾아봐요.", category: "공공·금융", icon: "⚖️", href: "https://www.law.go.kr/" },
  { title: "네이버 쇼핑", description: "여러 쇼핑몰의 상품과 가격을 비교해요.", category: "쇼핑", icon: "🛍️", href: "https://shopping.naver.com/" },
  { title: "쿠팡", description: "생활용품과 필요한 상품을 둘러봐요.", category: "쇼핑", icon: "📦", href: "https://www.coupang.com/" },
  { title: "11번가", description: "다양한 상품과 기획전을 살펴봐요.", category: "쇼핑", icon: "🏷️", href: "https://www.11st.co.kr/" },
  { title: "G마켓", description: "국내외 상품을 검색하고 비교해요.", category: "쇼핑", icon: "🛒", href: "https://www.gmarket.co.kr/" },
  { title: "무신사", description: "패션 브랜드와 스타일을 둘러봐요.", category: "쇼핑", icon: "👟", href: "https://www.musinsa.com/" },
  { title: "마켓컬리", description: "신선식품과 장보기 상품을 찾아봐요.", category: "쇼핑", icon: "🥬", href: "https://www.kurly.com/" },
  { title: "연합뉴스", description: "국내외 주요 뉴스를 확인해요.", category: "뉴스", icon: "📰", href: "https://www.yna.co.kr/" },
  { title: "KBS 뉴스", description: "방송 뉴스와 주요 이슈를 살펴봐요.", category: "뉴스", icon: "📺", href: "https://news.kbs.co.kr/" },
  { title: "BBC News 코리아", description: "한국어로 세계 소식을 읽어요.", category: "뉴스", icon: "🌍", href: "https://www.bbc.com/korean" },
  { title: "Google 뉴스", description: "여러 매체의 뉴스를 모아봐요.", category: "뉴스", icon: "🗞️", href: "https://news.google.com/" },
  { title: "코레일", description: "열차 시간표와 승차권을 확인해요.", category: "여행", icon: "🚆", href: "https://www.letskorail.com/" },
  { title: "SRT", description: "SRT 열차를 조회하고 예매해요.", category: "여행", icon: "🚄", href: "https://etk.srail.kr/" },
  { title: "대한민국 구석구석", description: "국내 여행지와 여행 정보를 찾아요.", category: "여행", icon: "🏞️", href: "https://korean.visitkorea.or.kr/" },
  { title: "서울관광재단", description: "서울의 명소와 행사 정보를 확인해요.", category: "여행", icon: "🏙️", href: "https://www.visitseoul.net/" },
  { title: "아고다", description: "여행 숙소와 항공권을 둘러봐요.", category: "여행", icon: "🧳", href: "https://www.agoda.com/" },
  { title: "Netflix", description: "영화와 시리즈를 감상해요.", category: "엔터테인먼트", icon: "🎬", href: "https://www.netflix.com/" },
  { title: "Spotify", description: "음악과 팟캐스트를 찾아 들어요.", category: "엔터테인먼트", icon: "🎵", href: "https://open.spotify.com/" },
  { title: "GitHub", description: "코드와 오픈소스 프로젝트를 살펴봐요.", category: "개발", icon: "🐙", href: "https://github.com/" },
  { title: "MDN Web Docs", description: "웹 기술과 개발 문서를 찾아봐요.", category: "개발", icon: "🧑‍💻", href: "https://developer.mozilla.org/ko/" },
];

export default function Home() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
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
          <div className="filters" aria-label="카테고리 필터">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => { setCategory(item); setVisibleCount(12); }} aria-pressed={category === item}>{item}</button>)}</div>
          <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(12); }} placeholder="서비스나 키워드 검색" aria-label="서비스 검색" /></label>
        </div>
        <div className="shortcut-grid">{filtered.slice(0, visibleCount).map((item, index) => <a className="shortcut-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}><div className="card-top"><span className={`shortcut-icon icon-${index % 4}`}>{item.icon}</span><span className="card-arrow">↗</span></div><span className="card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></a>)}</div>
        {filtered.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount((count) => count + 12)}>링크 더 보기 <span>＋</span></button>}
        {filtered.length === 0 && <div className="no-results">검색 결과가 없어요. 다른 단어나 카테고리를 선택해 보세요.</div>}
      </section>

      <section className="bottom-callout"><div><span className="eyebrow">UNTIL THE NEXT CHAPTER</span><h2>오늘의 여정이 끝나도,<br />이 문은 늘 여기 있어요.</h2></div><a href="#home">첫 장으로 <span>↑</span></a></section>
      <footer><a className="brand" href="#home"><span className="brand-mark">h</span>my-hub</a><span>매일을 여는 작은 현관</span><small>© 2026 my-hub</small></footer>
    </main>
  );
}
