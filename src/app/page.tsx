"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

const categories = ["전체", "생활", "학습", "생산성", "공공·금융", "쇼핑", "뉴스", "여행", "엔터테인먼트", "개발"];
type Shortcut = { id?: string; title: string; description: string; category: string; icon: string; href: string };
const shortcuts: Shortcut[] = [
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
  { title: "Vercel", description: "웹 프로젝트를 배포하고 운영해요.", category: "개발", icon: "▲", href: "https://vercel.com/" },
  { title: "Supabase", description: "앱 데이터베이스와 백엔드를 관리해요.", category: "개발", icon: "⚡", href: "https://supabase.com/" },
];
const getShortcutId = (item: Shortcut) => item.id ?? item.href;

export default function Home() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(shortcuts.slice(0, 6).map((item) => item.href));
  const [customLinks, setCustomLinks] = useState<Shortcut[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [editingFavorites, setEditingFavorites] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("생활");
  const [formError, setFormError] = useState("");
  const allLinks = useMemo(() => [...shortcuts, ...customLinks], [customLinks]);
  const favorites = useMemo(() => favoriteIds.map((id) => allLinks.find((item) => getShortcutId(item) === id)).filter((item): item is Shortcut => Boolean(item)), [favoriteIds, allLinks]);
  const filtered = useMemo(() => allLinks.filter((item) =>
    (category === "전체" || item.category === category) &&
    `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [allLinks, category, query]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("my-hub:personal-links:v1");
      if (stored) {
        const data = JSON.parse(stored) as { favorites?: string[]; customLinks?: Shortcut[] };
        if (Array.isArray(data.favorites)) setFavoriteIds(data.favorites);
        if (Array.isArray(data.customLinks)) setCustomLinks(data.customLinks);
      }
    } catch {
      // Keep the starter links available if browser storage is unavailable or invalid.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("my-hub:personal-links:v1", JSON.stringify({ favorites: favoriteIds, customLinks }));
    } catch {
      // The page remains usable when browser storage is blocked or full.
    }
  }, [favoriteIds, customLinks, storageReady]);

  const toggleFavorite = (item: Shortcut) => {
    const id = getShortcutId(item);
    setFavoriteIds((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  };

  const moveFavorite = (index: number, direction: -1 | 1) => {
    setFavoriteIds((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const reordered = [...current];
      [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
      return reordered;
    });
  };

  const addCustomLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    try {
      const parsedUrl = new URL(newUrl.trim());
      if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") throw new Error("웹사이트 주소(http 또는 https)를 입력해 주세요.");
      const item: Shortcut = { id: `custom-${Date.now()}`, title: newTitle.trim(), description: `${newCategory}에서 자주 찾는 나만의 링크예요.`, category: newCategory, icon: "🔗", href: parsedUrl.toString() };
      if (!item.title) throw new Error("링크 이름을 입력해 주세요.");
      setCustomLinks((current) => [...current, item]);
      setFavoriteIds((current) => [...current, getShortcutId(item)]);
      setNewTitle("");
      setNewUrl("");
      setAddingLink(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "주소를 확인해 주세요.");
    }
  };

  const removeCustomLink = (item: Shortcut) => {
    if (!item.id) return;
    setCustomLinks((current) => current.filter((link) => link.id !== item.id));
    setFavoriteIds((current) => current.filter((id) => id !== item.id));
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="my-hub 홈"><span className="brand-mark">h</span>my-hub</a>
        <nav aria-label="주요 메뉴"><a href="#favorites">즐겨찾기</a><a href="#shortcuts">모든 링크</a></nav>
        <a className="header-link" href="#favorites">내 포털 <span>↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><i /> A LITTLE DOOR TO YOUR DAY</span>
          <h1>하루의 첫 장을 여는<br />작은 현관, <em>my-hub.</em></h1>
          <p>날씨를 살피고, 갈 곳을 찾고,<br className="desktop-break" /> 오늘의 리듬을 천천히 시작해요.</p>
          <a className="primary-button" href="#favorites">오늘의 문 열기 <span>↓</span></a>
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

      <section className="favorites-section" id="favorites">
        <div className="favorites-heading"><div><span className="eyebrow">YOUR PERSONAL HUB</span><h2>내가 고른 바로가기</h2><p>자주 가는 곳을 모아 나만의 첫 화면을 만들어요.</p></div><div className="favorite-actions"><button className="soft-button" onClick={() => setEditingFavorites((value) => !value)}>{editingFavorites ? "정리 끝" : "순서 정리"}</button><button className="add-button" onClick={() => { setAddingLink((value) => !value); setFormError(""); }}>{addingLink ? "닫기" : "+ 링크 추가"}</button></div></div>
        {addingLink && <form className="add-link-form" onSubmit={addCustomLink}><label>링크 이름<input required maxLength={30} value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="예: 나의 작업공간" /></label><label>웹사이트 주소<input required type="url" value={newUrl} onChange={(event) => setNewUrl(event.target.value)} placeholder="https://example.com" /></label><label>분류<select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>{categories.filter((item) => item !== "전체").map((item) => <option key={item}>{item}</option>)}</select></label><button className="add-button" type="submit">즐겨찾기에 추가</button>{formError && <p className="form-error" role="alert">{formError}</p>}</form>}
        {favorites.length > 0 ? <div className="favorite-grid">{favorites.map((item, index) => <article className="favorite-card" key={getShortcutId(item)}><a className="favorite-main" href={item.href} target="_blank" rel="noreferrer"><span className="favorite-icon">{item.icon}</span><span className="favorite-text"><small>{item.category}</small><strong>{item.title}</strong></span><span className="favorite-arrow">↗</span></a>{editingFavorites && <div className="favorite-controls"><button aria-label={`${item.title} 위로`} disabled={index === 0} onClick={() => moveFavorite(index, -1)}>↑</button><button aria-label={`${item.title} 아래로`} disabled={index === favorites.length - 1} onClick={() => moveFavorite(index, 1)}>↓</button><button aria-label={`${item.title} 즐겨찾기 해제`} onClick={() => toggleFavorite(item)}>×</button></div>}</article>)}</div> : <div className="favorites-empty"><span>✦</span><p>아직 즐겨찾기가 비어 있어요. 아래 목록에서 별표를 눌러 자주 가는 곳을 담아보세요.</p><a href="#shortcuts">링크 둘러보기 ↓</a></div>}
      </section>

      <section className="shortcuts" id="shortcuts">
        <div className="section-heading"><div><span className="eyebrow">CHOOSE YOUR NEXT DOOR</span><h2>어디로 떠나볼까요?</h2><p>오늘 필요한 문을 골라 다음 장을 열어보세요.</p></div><span className="count">{filtered.length.toString().padStart(2, "0")} DOORS</span></div>
        <div className="toolbar">
          <div className="filters" aria-label="카테고리 필터">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => { setCategory(item); setVisibleCount(12); }} aria-pressed={category === item}>{item}</button>)}</div>
          <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(12); }} placeholder="서비스나 키워드 검색" aria-label="서비스 검색" /></label>
        </div>
        <div className="shortcut-grid">{filtered.slice(0, visibleCount).map((item, index) => <article className="shortcut-card" key={getShortcutId(item)}><div className="card-top"><span className={`shortcut-icon icon-${index % 4}`}>{item.icon}</span><button className={`favorite-toggle ${favoriteIds.includes(getShortcutId(item)) ? "is-active" : ""}`} aria-label={favoriteIds.includes(getShortcutId(item)) ? `${item.title} 즐겨찾기 해제` : `${item.title} 즐겨찾기 추가`} aria-pressed={favoriteIds.includes(getShortcutId(item))} onClick={() => toggleFavorite(item)}>{favoriteIds.includes(getShortcutId(item)) ? "★" : "☆"}</button></div><a className="shortcut-details" href={item.href} target="_blank" rel="noreferrer"><span className="card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><span className="card-arrow">바로가기 ↗</span></a>{item.id && <button className="delete-custom" onClick={() => removeCustomLink(item)}>내 링크 삭제</button>}</article>)}</div>
        {filtered.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount((count) => count + 12)}>링크 더 보기 <span>＋</span></button>}
        {filtered.length === 0 && <div className="no-results">검색 결과가 없어요. 다른 단어나 카테고리를 선택해 보세요.</div>}
      </section>

      <section className="bottom-callout"><div><span className="eyebrow">UNTIL THE NEXT CHAPTER</span><h2>오늘의 여정이 끝나도,<br />이 문은 늘 여기 있어요.</h2></div><a href="#home">첫 장으로 <span>↑</span></a></section>
      <footer><a className="brand" href="#home"><span className="brand-mark">h</span>my-hub</a><span>매일을 여는 작은 현관</span><small>© 2026 my-hub</small></footer>
    </main>
  );
}
