import { useEffect, useSyncExternalStore } from 'react'
import './App.css'

const interests = [
  { title: '골프', symbol: '⚑', className: 'golf', description: '제가 좋아하는 운동이에요. 골프에 관한 이야기를 이곳에 담아 갈 거예요.' },
  { title: '음악', symbol: '♪', className: 'music', description: '제가 관심 있는 분야예요. 좋아하는 음악 이야기는 나중에 더 소개할게요.' },
]

function subscribeToNavigation(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentLocation() {
  return window.location.hash
}

function InterestCards() {
  return (
    <div className="interest-grid">
      {interests.map((interest) => (
        <article className={`interest-card ${interest.className}`} key={interest.title}>
          <span className="interest-symbol" aria-hidden="true">{interest.symbol}</span>
          <h3>{interest.title}</h3>
          <p>{interest.description}</p>
        </article>
      ))}
    </div>
  )
}

function GrowthCards() {
  return (
    <div className="growth-grid">
      <article className="growth-card"><span className="example-label">준비 중</span><h3>내가 잘하는 것</h3><p>나의 강점은 아직 소개를 준비하고 있어요.</p></article>
      <article className="growth-card"><span className="example-label">준비 중</span><h3>배우고 싶은 것</h3><p>새롭게 배우고 싶은 것을 정하면 이곳에 적을게요.</p></article>
      <article className="growth-card"><span className="example-label">준비 중</span><h3>앞으로의 목표</h3><p>앞으로 이루고 싶은 목표는 천천히 채워 갈게요.</p></article>
    </div>
  )
}

function ActivityPlaceholder() {
  return (
    <div className="activity-placeholder">
      <span className="placeholder-symbol" aria-hidden="true">＋</span>
      <span className="example-label">준비 중</span>
      <h3>나의 활동과 작품이 들어올 자리</h3>
      <p>아직 등록한 활동이나 작품은 없어요.<br />나중에 사진, 제목, 짧은 설명을 함께 담을 수 있어요.</p>
    </div>
  )
}

function App() {
  const currentLocation = useSyncExternalStore(subscribeToNavigation, getCurrentLocation)
  const isPortfolioPage = currentLocation === '#/portfolio'
  const isAboutPage = currentLocation === '#/about' || currentLocation === '#about'
  const isProjectPage = currentLocation.startsWith('#/portfolio/')
  const isHomePage = !isPortfolioPage && !isAboutPage && !isProjectPage

  useEffect(() => {
    const pageTitle = isProjectPage ? '작품을 찾을 수 없어요' : isPortfolioPage ? '활동과 작품' : isAboutPage ? '자기소개' : ''
    document.title = pageTitle ? `${pageTitle} | 최민성의 소개 페이지` : '최민성의 소개 페이지'

    if (!isHomePage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById(isProjectPage ? 'project-title' : isPortfolioPage ? 'portfolio-title' : 'about-page-title')?.focus({ preventScroll: true })
    } else {
      document.getElementById(currentLocation.slice(1) || 'home')?.scrollIntoView({ block: 'start' })
    }
  }, [currentLocation, isHomePage, isPortfolioPage, isProjectPage, isAboutPage])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus(); document.getElementById('main')?.scrollIntoView({ block: 'start' }) }}>본문으로 바로가기</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="최민성의 소개 페이지 홈"><span className="brand-symbol" aria-hidden="true">✳</span>최민성<span className="brand-dot">.</span></a>
          <nav aria-label="주요 메뉴">
            <a href="#/about" aria-current={isAboutPage ? 'page' : undefined}>자기소개</a>
            <a href="#/portfolio" aria-current={isPortfolioPage || isProjectPage ? 'page' : undefined}>활동과 작품 <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {isHomePage && <>
          <section className="hero page-width" id="home" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> 최민성의 작은 소개 공간</p>
              <h1 id="hero-title">골프와 음악을<br />좋아하는 <span className="underlined">최민성.</span></h1>
              <p className="hero-description">안녕하세요! 제 소개 페이지에 오신 걸 환영해요.<br />제가 좋아하는 것과 앞으로 채워 갈 이야기를 만나 보세요.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#interests">좋아하는 것 보기 <span aria-hidden="true">↓</span></a>
                <a className="text-link" href="#/about">조금 더 알아보기 <span aria-hidden="true">→</span></a>
              </div>
              <p className="hero-note"><span aria-hidden="true">✳</span> 친구와 선생님에게 전하는 나의 이야기</p>
            </div>
            <div className="intro-art" aria-hidden="true">
              <div className="art-sculpture"><div className="art-sphere" /><div className="art-ring" /><div className="art-ring ring-two" /><span className="art-star">✳</span></div>
              <div className="intro-art-heading">반가워요, 저는</div>
              <p className="intro-art-name">최민성<span>.</span></p>
              <div className="intro-art-hobbies"><span>⚑<small>골프</small></span><span>♪<small>음악</small></span></div>
              <p className="intro-art-caption">좋아하는 것부터, 나답게.</p>
            </div>
          </section>
          <div className="section-divider page-width"><span>나의 이야기를 만나 보세요</span><span aria-hidden="true">↓</span></div>
          <section className="story-section page-width" id="interests" aria-labelledby="interests-title">
            <div className="section-heading"><p className="eyebrow">01 / 좋아하는 것</p><h2 id="interests-title">나의 관심사와 취미<span>.</span></h2><p className="list-description">골프와 음악을 좋아해요.</p></div>
            <InterestCards />
          </section>
          <section className="growth-section" aria-labelledby="growth-title">
            <div className="page-width">
              <div className="section-heading"><p className="eyebrow">02 / 나를 알아가는 중</p><h2 id="growth-title">잘하는 것, 배우고 싶은 것<br />그리고 앞으로의 목표<span>.</span></h2><p className="list-description">아직 정하지 못한 이야기는 빈자리로 남겨 두었어요.</p></div>
              <GrowthCards />
            </div>
          </section>
          <section className="story-section page-width" aria-labelledby="activities-title">
            <div className="section-heading"><p className="eyebrow">03 / 활동과 작품</p><h2 id="activities-title">경험을 담아 갈 공간<span>.</span></h2></div>
            <ActivityPlaceholder />
            <a className="text-link about-more" href="#/portfolio">활동과 작품 페이지 보기 <span aria-hidden="true">→</span></a>
          </section>
        </>}
        {isAboutPage && <section className="about-page page-width" aria-labelledby="about-page-title">
          <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
          <div className="about-page-heading"><p className="eyebrow">최민성의 이야기</p><h1 id="about-page-title" tabIndex={-1}>안녕하세요, 최민성입니다<span>.</span></h1><p className="list-description">골프와 음악을 좋아하는 저를 소개합니다.</p></div>
          <div className="story-section"><InterestCards /></div>
          <div className="section-heading"><h2>조금씩 채워 갈 나의 이야기<span>.</span></h2><p className="list-description">강점과 배우고 싶은 것, 목표는 아직 준비 중이에요.</p></div>
          <GrowthCards />
          <a className="button button-primary about-more" href="#/portfolio">활동과 작품 보기 <span aria-hidden="true">↗</span></a>
        </section>}
        {isPortfolioPage && <section className="portfolio-section portfolio-page" aria-labelledby="portfolio-title">
          <div className="page-width">
            <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
            <div className="portfolio-heading"><div><p className="eyebrow">최민성의 기록 공간</p><h1 id="portfolio-title" tabIndex={-1}>활동과 작품<span>.</span></h1><p className="list-description">직접 해 본 활동과 작품을 차근차근 담을 공간이에요.</p></div></div>
            <div className="list-summary"><span>등록한 활동과 작품</span><span>0</span></div>
            <ActivityPlaceholder />
          </div>
        </section>}
        {isProjectPage && <section className="project-detail page-width" aria-labelledby="project-title">
          <a className="text-link list-back" href="#/portfolio"><span aria-hidden="true">←</span> 활동과 작품 목록으로</a>
          <div className="project-not-found"><h1 id="project-title" tabIndex={-1}>작품을 찾을 수 없어요.</h1><p>아직 등록한 작품이 없어요. 활동과 작품 페이지를 확인해 주세요.</p><a className="button button-primary" href="#/portfolio">활동과 작품 보기 <span aria-hidden="true">→</span></a></div>
        </section>}
      </main>
      <footer className="site-footer page-width">
        <a className="wordmark" href="#home" aria-label="최민성의 소개 페이지 홈">최민성<span className="brand-dot">.</span></a>
        <p>골프와 음악, 그리고 앞으로의 이야기.</p>
        <button className="back-top" type="button" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main')?.focus({ preventScroll: true }) }}>맨 위로 <span aria-hidden="true">↑</span></button>
      </footer>
    </>
  )
}

export default App
