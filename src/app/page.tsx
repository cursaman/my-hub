"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

const categories = ["전체", "생활", "학습", "생산성", "공공·금융", "쇼핑", "뉴스", "여행", "엔터테인먼트", "개발"];
const zodiacSigns = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
const zodiacTimes: Record<string, string> = {
  "쥐": "자시 · 23:00–01:00", "소": "축시 · 01:00–03:00", "호랑이": "인시 · 03:00–05:00",
  "토끼": "묘시 · 05:00–07:00", "용": "진시 · 07:00–09:00", "뱀": "사시 · 09:00–11:00",
  "말": "오시 · 11:00–13:00", "양": "미시 · 13:00–15:00", "원숭이": "신시 · 15:00–17:00",
  "닭": "유시 · 17:00–19:00", "개": "술시 · 19:00–21:00", "돼지": "해시 · 21:00–23:00",
};
const dailyQuotes = [
  "작은 시작이 오늘의 방향을 바꿔요.",
  "천천히 가도, 나에게 맞는 길이면 괜찮아요.",
  "좋은 하루는 거창한 계획보다 작은 여유에서 시작돼요.",
  "오늘 해낸 작은 일도 내일의 나를 돕는 발판이에요.",
  "잠깐 멈춰 바라보면 새로운 길이 보일 수 있어요.",
  "마음을 다해 고른 한 가지가 하루를 단단하게 만들어요.",
  "잘 쉬는 것도 앞으로 나아가는 방법이에요.",
  "익숙한 하루에도 반가운 발견은 숨어 있어요.",
  "모든 것을 한 번에 하지 않아도 충분해요.",
  "나만의 속도로 쌓은 시간이 결국 길을 만들어요.",
  "오늘의 친절은 가장 가까운 나에게서 시작해도 좋아요.",
  "한 걸음 내디뎠다면 이미 시작한 거예요.",
  "마음이 머무는 곳에 오늘의 답이 있어요.",
  "비교 대신 어제의 나를 바라봐요.",
  "깊게 숨을 쉬면 생각도 한결 맑아져요.",
  "잘 모르겠다면 잠시 쉬어가도 괜찮아요.",
  "정답보다 나다운 선택이 더 오래 빛나요.",
  "작은 변화가 익숙한 풍경을 새롭게 만들어요.",
  "너무 늦은 시작은 없어요.",
  "오늘의 계획에 여백도 남겨두세요.",
  "누군가의 속도보다 내 호흡을 따라가요.",
  "마무리한 한 가지가 마음의 공간을 만들어요.",
  "좋은 질문 하나가 새로운 문을 열어요.",
  "따뜻한 말은 오래 기억되는 선물이 돼요.",
  "실수는 다음 걸음을 알려주는 표지판이에요.",
  "바쁜 날에도 물 한 잔의 여유를 챙겨요.",
  "매일의 반복 속에서도 조금씩 자라고 있어요.",
  "기다림도 준비의 한 부분일 수 있어요.",
  "오늘 마음에 든 것을 조금 더 오래 바라봐요.",
  "필요한 도움을 청하는 것도 용기예요.",
  "하고 싶은 일도 오늘의 계획에 적어봐요.",
  "평범한 하루를 돌보는 일이 큰 힘이 돼요.",
  "작은 친절은 생각보다 멀리 퍼져요.",
  "새로운 길은 익숙한 질문에서 시작돼요.",
  "잠깐의 산책이 마음을 환기해줄 거예요.",
  "끝내지 못한 일도 다시 시작할 수 있어요.",
  "오늘 마음에 다정한 기준을 세워요.",
  "경험은 천천히 나만의 지혜가 돼요.",
  "눈앞의 한 걸음에 집중하면 충분해요.",
  "쉼표를 찍어도 이야기는 계속돼요.",
  "좋은 생각은 적어둘 때 더 가까워져요.",
  "내가 고른 방향을 믿고 걸어가요.",
  "서로 다른 생각이 더 나은 답을 만들어요.",
  "오늘 만난 작은 기쁨을 기억해둬요.",
  "완벽보다 꾸준함이 더 멀리 데려가요.",
  "익숙함 속에서 새로운 즐거움을 찾아봐요.",
  "마음이 복잡할 땐 가장 쉬운 일부터 해요.",
  "다시 해보는 용기가 하루를 바꿔요.",
  "작은 성공을 스스로 축하해 주세요.",
  "당신의 속도에도 분명한 이유가 있어요.",
];
const zodiacMessages: Record<string, string> = {
  "쥐": "눈치 빠른 감각이 빛나요. 좋은 정보를 발견하면 메모해 두세요.",
  "소": "차근차근 해온 일이 힘을 발휘해요. 서두르지 말고 한 가지씩 마무리해요.",
  "호랑이": "먼저 움직이면 기회가 따라와요. 작은 제안에도 귀 기울여 보세요.",
  "토끼": "부드러운 말 한마디가 좋은 흐름을 만들어요. 편안한 대화를 나눠보세요.",
  "용": "아이디어를 현실로 옮기기 좋은 날이에요. 첫 단계를 작게 잡아보세요.",
  "뱀": "차분한 판단이 도움이 돼요. 결정 전 한 번 더 살펴보면 든든해요.",
  "말": "활기가 도는 날이에요. 하고 싶었던 일을 가볍게 시작해 보세요.",
  "양": "주변과 호흡을 맞추면 일이 수월해져요. 도움을 주고받아 보세요.",
  "원숭이": "재치 있는 생각이 막힌 일을 풀어줄 수 있어요. 다른 방법도 시도해 보세요.",
  "닭": "정리와 점검에 운이 따르는 날이에요. 미뤄둔 작은 일을 마쳐보세요.",
  "개": "믿음직한 태도가 좋은 인연을 만들어요. 약속을 소중히 챙겨보세요.",
  "돼지": "작은 즐거움을 누리기 좋은 날이에요. 좋아하는 것으로 기운을 채워요.",
};
const dailyFortunes = [
  "작은 제안이나 새 소식이 눈에 띄는 날이에요. 조건을 찬찬히 살펴보세요.",
  "미뤄둔 일을 하나 마치면 마음이 한결 가벼워질 거예요.",
  "주변 사람의 이야기에 귀 기울이면 좋은 실마리를 얻을 수 있어요.",
  "서두르기보다 순서를 정하면 일이 매끄럽게 풀려요.",
  "새로운 만남보다 익숙한 인연을 챙기면 따뜻한 하루예요.",
  "배움에 좋은 기운이 있어요. 궁금했던 것을 찾아보세요.",
  "작은 정리가 생각보다 큰 여유를 만들어줘요.",
  "계획을 조금 느슨하게 잡으면 예상 밖의 즐거움이 생겨요.",
  "오늘은 듣는 쪽에 머물러도 충분히 좋은 대화를 나눌 수 있어요.",
  "꾸준히 해오던 일에서 작은 진전을 발견할 수 있어요.",
  "새로운 방법을 하나 시도해보면 막힌 흐름이 달라질 수 있어요.",
  "가까운 사람에게 먼저 안부를 건네보세요.",
  "작은 선택도 충분히 의미 있어요. 마음이 편한 쪽을 골라보세요.",
  "휴식이 필요한 날이에요. 잠깐의 여유를 일정에 넣어보세요.",
  "아이디어가 떠오르면 짧게라도 기록해 두세요.",
  "도움이 필요하면 편하게 손을 내밀어도 괜찮아요.",
  "차분히 확인하는 태도가 실수를 줄여줘요.",
  "오늘의 대화에서 새로운 관점을 만날 수 있어요.",
  "작은 성취를 알아차리면 자신감이 자라요.",
  "익숙한 길에서 반가운 발견을 할 수 있는 날이에요.",
  "마무리와 정리에 좋은 흐름이 있어요.",
  "가벼운 산책이나 환기가 기분 전환에 도움이 돼요.",
  "오래 고민한 일은 기준을 적어보면 결정이 쉬워져요.",
  "주변의 친절을 기쁘게 받아들이고 고마움을 표현해보세요.",
  "작은 호기심을 따라가면 유용한 정보를 만날 수 있어요.",
  "오늘은 한 번에 하나씩 집중하는 편이 좋아요.",
  "새로운 소식은 확인한 뒤 천천히 판단해도 늦지 않아요.",
  "함께하는 일에서 좋은 호흡을 맞출 수 있어요.",
  "가벼운 정돈이 다음 계획을 세우는 데 도움을 줘요.",
  "마음에 둔 목표를 아주 작은 단계로 시작해보세요.",
  "평소 지나쳤던 곳에서 기분 좋은 변화를 발견할 수 있어요.",
  "고민을 나누면 생각이 정리될 수 있어요.",
  "오늘은 속도보다 방향을 점검하는 데 좋은 날이에요.",
  "새로운 도구나 정보를 익혀두면 나중에 도움이 돼요.",
  "뜻밖의 칭찬이나 고마운 말을 들을 수 있어요.",
  "몸과 마음의 리듬을 살피며 무리하지 않도록 해요.",
  "정직하고 단순한 선택이 마음을 편안하게 해줘요.",
  "작은 약속을 지키면 신뢰가 한층 단단해져요.",
  "잠시 멈추면 놓쳤던 좋은 생각이 떠오를 수 있어요.",
  "반복되는 일에서 더 나은 방법을 찾을 수 있어요.",
  "좋아하는 일에 짧은 시간을 내어 기운을 채워보세요.",
  "하나를 내려놓으면 중요한 일에 집중하기 쉬워져요.",
  "기다리던 답이 늦어져도 오늘 할 수 있는 일을 해보세요.",
  "작은 호의가 좋은 기분으로 돌아오는 날이에요.",
  "새로운 계획은 충분히 살펴본 뒤 가볍게 첫발을 떼세요.",
  "자신의 경험을 믿되, 다른 의견도 열어두면 좋아요.",
  "뜻밖의 여유가 생기면 잠깐 쉬어가도 좋아요.",
  "대화를 부드럽게 시작하면 협력이 수월해질 수 있어요.",
  "오늘의 작은 배려가 다음 만남을 따뜻하게 만들어요.",
  "차근차근 쌓은 노력이 든든함으로 이어지는 날이에요.",
];
const storySlides = [
  { chapter: "CHAPTER 01", title: "아침을 살펴요", description: "오늘의 날씨와 필요한 정보를 확인하며 하루의 문을 열어요.", image: "/hub-art/morning-door.svg", alt: "햇살이 비치는 작은 현관" },
  { chapter: "CHAPTER 02", title: "나만의 길을 골라요", description: "배우고, 정리하고, 쉬어갈 곳까지 한눈에 찾아요.", image: "/hub-art/connected-doors.svg", alt: "여러 서비스로 이어지는 허브" },
  { chapter: "CHAPTER 03", title: "가벼운 마음으로 떠나요", description: "작은 바로가기 하나가 오늘의 좋은 흐름이 되도록.", image: "/hub-art/personal-desk.svg", alt: "나만의 바로가기가 정리된 책상" },
];
type Shortcut = { id?: string; title: string; description: string; category: string; icon: string; href: string };
type ProjectShowcase = { id?: string; title: string; description: string; type: string; href: string };
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
const storageKey = "my-hub:personal-links:v2";
const legacyStorageKey = "my-hub:personal-links:v1";
const maxFavorites = 9;
const linkCollections = [
  { title: "아침 준비", description: "하루의 시작에 필요한 곳을 한데 모았어요.", icon: "☀️", links: ["https://www.weather.go.kr/", "https://map.naver.com/", "https://calendar.google.com/"] },
  { title: "공부 시작", description: "찾고, 번역하고, 배울 때 자주 쓰는 도구예요.", icon: "📚", links: ["https://dict.naver.com/", "https://papago.naver.com/", "https://www.kmooc.kr/"] },
  { title: "개발과 배포", description: "코드 작성부터 배포와 백엔드까지 이어져요.", icon: "🛠️", links: ["https://github.com/", "https://vercel.com/", "https://supabase.com/"] },
  { title: "생활 행정", description: "필요한 공공 서비스를 빠르게 찾아가요.", icon: "🏛️", links: ["https://www.gov.kr/", "https://www.hometax.go.kr/", "https://www.nhis.or.kr/"] },
];
const projectShowcases = [
  { title: "정부지원사업 모아봄", description: "정부·공공기관 지원사업 탐색 포털", type: "SUPPORT PORTAL", href: "https://gov-support-mu.vercel.app/" },
  { title: "AI Together", description: "소상공인을 위한 AI 홍보 실습", type: "AI LEARNING", href: "https://ai-together-mu.vercel.app/" },
  { title: "AutoSites", description: "아이디어를 웹사이트로 만드는 제작 흐름", type: "WEB AUTOMATION", href: "https://autosites-drab.vercel.app/" },
  { title: "Cursamanworks", description: "홈페이지와 기업 업무 개선 서비스", type: "BUSINESS WEBSITE", href: "https://cursamanworks.kr/" },
];

export default function Home() {
  const [vercelProjects, setVercelProjects] = useState<ProjectShowcase[]>([]);
  const [vercelSync, setVercelSync] = useState<"loading" | "connected" | "fallback">("loading");
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(shortcuts.slice(0, maxFavorites).map((item) => item.href));
  const [customLinks, setCustomLinks] = useState<Shortcut[]>([]);
  const [zodiac, setZodiac] = useState("소");
  const [dayIndex, setDayIndex] = useState(0);
  const [todayLabel, setTodayLabel] = useState("");
  const [activeStory, setActiveStory] = useState(0);
  const [storyHovered, setStoryHovered] = useState(false);
  const [storyFocused, setStoryFocused] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [editingFavorites, setEditingFavorites] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("생활");
  const [formError, setFormError] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const allLinks = useMemo(() => [...shortcuts, ...customLinks], [customLinks]);
  const collections = useMemo(() => linkCollections.map((collection) => ({
    ...collection,
    items: collection.links.map((href) => allLinks.find((item) => item.href === href)).filter((item): item is Shortcut => Boolean(item)),
  })), [allLinks]);
  const favorites = useMemo(() => favoriteIds.map((id) => allLinks.find((item) => getShortcutId(item) === id)).filter((item): item is Shortcut => Boolean(item)), [favoriteIds, allLinks]);
  const zodiacYears = Array.from({ length: 5 }, (_, index) => 2020 + zodiacSigns.indexOf(zodiac) - (4 - index) * 12);
  const filtered = useMemo(() => allLinks.filter((item) =>
    (category === "전체" || item.category === category) &&
    `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  ), [allLinks, category, query]);

  useEffect(() => {
    let active = true;
    fetch("/api/vercel-projects")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Vercel API request failed")))
      .then((data: { projects?: ProjectShowcase[] }) => {
        if (!active) return;
        const projects = Array.isArray(data.projects) ? data.projects : [];
        setVercelProjects(projects);
        setVercelSync(projects.length ? "connected" : "fallback");
      })
      .catch(() => { if (active) setVercelSync("fallback"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    try {
      const currentStored = window.localStorage.getItem(storageKey);
      const stored = currentStored ?? window.localStorage.getItem(legacyStorageKey);
      if (stored) {
        const data = JSON.parse(stored) as { favorites?: string[]; customLinks?: Shortcut[]; zodiac?: string };
        if (Array.isArray(data.favorites)) {
          const savedFavorites = data.favorites.slice(0, maxFavorites);
          if (!currentStored) {
            for (const item of shortcuts) {
              if (savedFavorites.length >= maxFavorites) break;
              if (!savedFavorites.includes(item.href)) savedFavorites.push(item.href);
            }
          }
          setFavoriteIds(savedFavorites);
        }
        if (Array.isArray(data.customLinks)) setCustomLinks(data.customLinks);
        if (typeof data.zodiac === "string" && zodiacSigns.includes(data.zodiac)) setZodiac(data.zodiac);
      }
    } catch {
      // Keep the starter links available if browser storage is unavailable or invalid.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000);
    setDayIndex(dayNumber);
    setTodayLabel(new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(now));
  }, []);

  useEffect(() => {
    if (storyHovered || storyFocused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveStory((current) => (current + 1) % storySlides.length), 2000);
    return () => window.clearInterval(timer);
  }, [storyHovered, storyFocused]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ favorites: favoriteIds, customLinks, zodiac }));
    } catch {
      // The page remains usable when browser storage is blocked or full.
    }
  }, [favoriteIds, customLinks, zodiac, storageReady]);

  const toggleFavorite = (item: Shortcut) => {
    const id = getShortcutId(item);
    if (favoriteIds.includes(id)) {
      setFavoriteIds((current) => current.filter((savedId) => savedId !== id));
      setFavoriteMessage("");
      return;
    }
    if (favoriteIds.length >= maxFavorites) {
      setFavoriteMessage("즐겨찾기는 최대 9개까지 담을 수 있어요. 먼저 하나를 정리해 주세요.");
      return;
    }
    setFavoriteIds((current) => [...current, id]);
    setFavoriteMessage("");
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
      if (favoriteIds.length < maxFavorites) setFavoriteIds((current) => [...current, getShortcutId(item)]);
      else setFavoriteMessage("링크는 저장했어요. 즐겨찾기 9개 중 하나를 정리하면 추가할 수 있어요.");
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
        <nav aria-label="주요 메뉴"><a href="#my-sites">내 프로젝트</a><a href="#favorites">즐겨찾기</a><a href="#collections">작업별 모음</a><a href="#shortcuts">전체 링크</a><a href="#today">오늘의 재미</a></nav>
        <a className="header-link" href="#favorites">내 포털 <span>↗</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><i /> A LITTLE DOOR TO YOUR DAY</span>
          <h1>오늘의 작업과<br />자주 쓰는 도구를<br /><em>한곳에서.</em></h1>
          <p>내 프로젝트를 살펴보고, 자주 쓰는 도구를<br className="desktop-break" /> 빠르게 열어보세요.</p>
          <a className="primary-button" href="#my-sites">내 프로젝트 보기 <span>↓</span></a>
          <div className="hero-caption"><span>작업으로 이어지는 나만의 시작 화면</span><span>YOUR WORKSPACE</span></div>
        </div>
        <div className="hero-visual">
          <div className="story-carousel hero-carousel" role="region" aria-roledescription="carousel" aria-label="my-hub 이야기 이미지" onMouseEnter={() => setStoryHovered(true)} onMouseLeave={() => setStoryHovered(false)} onFocus={() => setStoryFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setStoryFocused(false); }}>
            <article className="story-slide" key={activeStory} role="group" aria-roledescription="slide" aria-label={`${activeStory + 1} / ${storySlides.length}`}>
              <img src={storySlides[activeStory].image} alt={storySlides[activeStory].alt} />
              <div className="story-slide-copy"><span className="chapter">{storySlides[activeStory].chapter}</span><h3>{storySlides[activeStory].title}</h3><p>{storySlides[activeStory].description}</p><div className="story-slide-controls"><button type="button" aria-label="이전 이미지" onClick={() => setActiveStory((current) => (current - 1 + storySlides.length) % storySlides.length)}>←</button><div className="story-dots">{storySlides.map((slide, index) => <button type="button" key={slide.chapter} className={index === activeStory ? "active" : ""} aria-label={`${index + 1}번째 이미지 보기`} aria-current={index === activeStory ? "true" : undefined} onClick={() => setActiveStory(index)} />)}</div><button type="button" aria-label="다음 이미지" onClick={() => setActiveStory((current) => (current + 1) % storySlides.length)}>→</button></div><span className="story-auto-note">2초마다 다음 장면으로 넘어가요</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="welcome-strip" id="about"><span>오늘의 작업과 자주 쓰는 도구를 한곳에서</span><span>프로젝트 · 바로가기 · 작업별 모음</span></section>

      <section className="project-showcase" id="my-sites">
        <div className="section-heading"><div><span className="eyebrow">MY PROJECTS</span><h2>내 프로젝트</h2><p>직접 만든 사이트를 미리 보고 방문해 보세요.</p></div><span className="count">{(vercelProjects.length ? vercelProjects.length : projectShowcases.length).toString().padStart(2, "0")} PROJECTS</span></div>
        <p className="project-sync-note" aria-live="polite">{vercelSync === "loading" ? "Vercel 프로젝트를 확인하고 있어요…" : vercelSync === "connected" ? "Vercel에서 프로젝트 목록을 가져왔어요." : "기본 프로젝트 목록을 보여드려요."}</p>
        <div className="project-grid">{(vercelProjects.length ? vercelProjects : projectShowcases).map((project) => <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.id ?? project.href}><div className="project-image-wrap"><img src={`https://image.thum.io/get/width/1000/crop/700/noanimate/${project.href}`} alt={`${project.title} 사이트 화면 캡처`} loading="lazy"/><span className="project-open">사이트 방문 ↗</span></div><div className="project-meta"><span>{project.type}</span><h3>{project.title}</h3><p>{project.description}</p></div></a>)}</div>
      </section>

      <section className="favorites-section" id="favorites">
        <div className="favorites-heading"><div><span className="eyebrow">YOUR PERSONAL HUB</span><h2>즐겨찾기 9개</h2><p>자주 쓰는 도구를 직접 고르고 순서를 정해보세요.</p></div><div className="favorite-actions"><button className="soft-button" onClick={() => setEditingFavorites((value) => !value)}>{editingFavorites ? "정리 끝" : "순서 정리"}</button><button className="add-button" onClick={() => { setAddingLink((value) => !value); setFormError(""); }}>{addingLink ? "닫기" : "+ 링크 추가"}</button></div></div>
        {favoriteMessage && <p className="favorite-message" role="status">{favoriteMessage}</p>}
        {addingLink && <form className="add-link-form" onSubmit={addCustomLink}><label>링크 이름<input required maxLength={30} value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="예: 나의 작업공간" /></label><label>웹사이트 주소<input required type="url" value={newUrl} onChange={(event) => setNewUrl(event.target.value)} placeholder="https://example.com" /></label><label>분류<select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>{categories.filter((item) => item !== "전체").map((item) => <option key={item}>{item}</option>)}</select></label><button className="add-button" type="submit">즐겨찾기에 추가</button>{formError && <p className="form-error" role="alert">{formError}</p>}</form>}
        {favorites.length > 0 ? <div className="favorite-grid">{favorites.map((item, index) => <article className="favorite-card" key={getShortcutId(item)}><a className="favorite-main" href={item.href} target="_blank" rel="noreferrer"><span className="favorite-icon">{item.icon}</span><span className="favorite-text"><small>{item.category}</small><strong>{item.title}</strong></span><span className="favorite-arrow">↗</span></a>{editingFavorites && <div className="favorite-controls"><button aria-label={`${item.title} 위로`} disabled={index === 0} onClick={() => moveFavorite(index, -1)}>↑</button><button aria-label={`${item.title} 아래로`} disabled={index === favorites.length - 1} onClick={() => moveFavorite(index, 1)}>↓</button><button aria-label={`${item.title} 즐겨찾기 해제`} onClick={() => toggleFavorite(item)}>×</button></div>}</article>)}</div> : <div className="favorites-empty"><span>✦</span><p>아직 즐겨찾기가 비어 있어요. 아래 목록에서 별표를 눌러 자주 가는 곳을 담아보세요.</p><a href="#shortcuts">링크 둘러보기 ↓</a></div>}
      </section>

      <section className="link-collections" id="collections">
        <div className="section-heading"><div><span className="eyebrow">A GOOD PLACE TO START</span><h2>상황에 맞게 모아봤어요</h2><p>자주 이어 쓰는 사이트를 한 번에 열어보세요.</p></div><span className="count">4 COLLECTIONS</span></div>
        <div className="collection-grid">{collections.map((collection, index) => <article className={`collection-card collection-${index}`} key={collection.title}><div className="collection-title"><span>{collection.icon}</span><div><h3>{collection.title}</h3><p>{collection.description}</p></div></div><div className="collection-links">{collection.items.map((item) => <a href={item.href} target="_blank" rel="noreferrer" key={item.href}><span>{item.icon}</span><b>{item.title}</b><i>↗</i></a>)}</div></article>)}</div>
      </section>

      <section className="shortcuts" id="shortcuts">
        <div className="section-heading"><div><span className="eyebrow">ALL LINKS</span><h2>전체 링크</h2><p>검색과 카테고리로 필요한 도구를 찾아보세요.</p></div><span className="count">{filtered.length.toString().padStart(2, "0")} LINKS</span></div>
        <div className="toolbar">
          <div className="filters" aria-label="카테고리 필터">{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => { setCategory(item); setVisibleCount(12); }} aria-pressed={category === item}>{item}</button>)}</div>
          <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(12); }} placeholder="서비스나 키워드 검색" aria-label="서비스 검색" /></label>
        </div>
        <div className="shortcut-grid">{filtered.slice(0, visibleCount).map((item, index) => <article className="shortcut-card" key={getShortcutId(item)}><div className="card-top"><span className={`shortcut-icon icon-${index % 4}`}>{item.icon}</span><button className={`favorite-toggle ${favoriteIds.includes(getShortcutId(item)) ? "is-active" : ""}`} aria-label={favoriteIds.includes(getShortcutId(item)) ? `${item.title} 즐겨찾기 해제` : `${item.title} 즐겨찾기 추가`} aria-pressed={favoriteIds.includes(getShortcutId(item))} onClick={() => toggleFavorite(item)}>{favoriteIds.includes(getShortcutId(item)) ? "★" : "☆"}</button></div><a className="shortcut-details" href={item.href} target="_blank" rel="noreferrer"><span className="card-category">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><span className="card-arrow">바로가기 ↗</span></a>{item.id && <button className="delete-custom" onClick={() => removeCustomLink(item)}>내 링크 삭제</button>}</article>)}</div>
        {filtered.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount((count) => count + 12)}>링크 더 보기 <span>＋</span></button>}
        {filtered.length === 0 && <div className="no-results">검색 결과가 없어요. 다른 단어나 카테고리를 선택해 보세요.</div>}
      </section>

      <section className="daily-wisdom" id="today">
        <div className="daily-heading"><div><span className="eyebrow">A LITTLE EXTRA</span><h2>오늘의 작은 재미</h2></div><span className="today-date">{todayLabel || "오늘"}</span></div>
        <div className="daily-cards">
          <article className="quote-card"><span className="daily-label">오늘의 한 문장 <i>✦</i></span><blockquote>“{dailyQuotes[dayIndex % dailyQuotes.length]}”</blockquote><small>my-hub의 오리지널 문장 · 50개 순환</small></article>
          <article className="fortune-card"><div className="fortune-top"><span className="daily-label">오늘의 띠 운세</span><label className="zodiac-picker"><span className="sr-only">띠 선택</span><select value={zodiac} onChange={(event) => setZodiac(event.target.value)}>{zodiacSigns.map((sign) => <option key={sign} value={sign}>{sign}띠</option>)}</select></label></div><h3>{zodiac}띠, 오늘은</h3><div className="zodiac-detail"><span>{zodiacYears.join(" · ")}년생</span><span>{zodiacTimes[zodiac]}</span></div><p>{zodiacMessages[zodiac]} {dailyFortunes[dayIndex % dailyFortunes.length]}</p><small>띠 해는 음력 설을 기준으로 달라질 수 있어요. 운세는 재미로 봐주세요.</small></article>
        </div>
      </section>

      <section className="bottom-callout"><div><span className="eyebrow">UNTIL THE NEXT CHAPTER</span><h2>오늘의 여정이 끝나도,<br />이 문은 늘 여기 있어요.</h2></div><a href="#home">첫 장으로 <span>↑</span></a></section>
      <footer><a className="brand" href="#home"><span className="brand-mark">h</span>my-hub</a><span>매일을 여는 작은 현관</span><small>© 2026 my-hub</small></footer>
    </main>
  );
}
