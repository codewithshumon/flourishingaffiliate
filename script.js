window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = 'none';
    }
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity   = '1';
        spans[2].style.transform = 'none';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Add animate-on-scroll class to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to sections
    const sections = document.querySelectorAll('.section-header, .video-container, .affiliates-benefits, .cta-section, .bottom-card');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add animation to benefit cards with staggered delays
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${0.1 + index * 0.15}s`;
    });
});

// Scroll animation observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }, 100);
});

// Add floating particles to hero
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${10 + Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
        
        hero.appendChild(particlesContainer);
    }
});

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect on scroll (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
});

// Scroll indicator click to scroll down
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
}


function initialisePlayer(suffix) {

    const player    = document.getElementById('apcPlayer'   + suffix);
    const video     = document.getElementById('apcVideo'    + suffix);
    const overlay   = document.getElementById('apcOverlay'  + suffix);
    const playBtn   = document.getElementById('apcPlayBtn'  + suffix);
    const playIcon  = document.getElementById('apcPlayIcon' + suffix);
    const muteBtn   = document.getElementById('apcMuteBtn'  + suffix);
    const volIcon   = document.getElementById('apcVolIcon'  + suffix);
    const volSlider = document.getElementById('apcVol'      + suffix);
    const seekBar   = document.getElementById('apcSeek'     + suffix);
    const played    = document.getElementById('apcPlayed'   + suffix);
    const buffered  = document.getElementById('apcBuffered' + suffix);
    const thumb     = document.getElementById('apcThumb'    + suffix);
    const curEl     = document.getElementById('apcCur'      + suffix);
    const durEl     = document.getElementById('apcDur'      + suffix);
    const fsBtn     = document.getElementById('apcFsBtn'    + suffix);
    const fsIcon    = document.getElementById('apcFsIcon'   + suffix);
    const spinner   = document.getElementById('apcSpinner'  + suffix);
    const speedBtn  = document.getElementById('apcSpeedBtn' + suffix);
    const speedMenu = document.getElementById('apcSpeedMenu'+ suffix);
    const flashL    = document.getElementById('flashLeft'   + suffix);
    const flashR    = document.getElementById('flashRight'  + suffix);

    if (!player || !video) return;

    let idleTimer, dragging = false;

    // ── Helpers ──────────────────────────────
    const fmt = s => {
        s = Math.floor(s || 0);
        const m = Math.floor(s / 60), sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    const setProgress = pct => {
        played.style.width = pct + '%';
        thumb.style.left   = pct + '%';
    };

    const showFlash = el => {
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 500);
    };

    // ── Play / Pause ─────────────────────────
    const togglePlay = () => video.paused ? video.play() : video.pause();

    video.addEventListener('play', () => {
        playIcon.className = 'fas fa-pause';
        overlay.classList.add('hidden');
        resetIdleTimer();
    });

    video.addEventListener('pause', () => {
        playIcon.className = 'fas fa-play';
        player.classList.remove('idle');
        clearTimeout(idleTimer);
        if (video.ended) overlay.classList.remove('hidden');
    });

    video.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
        player.classList.remove('idle');
    });

    playBtn.addEventListener('click', e => { e.stopPropagation(); togglePlay(); });
    overlay.addEventListener('click', togglePlay);
    video.addEventListener('click',   togglePlay);

    // ── Time update ──────────────────────────
    video.addEventListener('timeupdate', () => {
        if (dragging) return;
        const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
        setProgress(pct);
        curEl.textContent = fmt(video.currentTime);
    });

    video.addEventListener('loadedmetadata', () => {
        durEl.textContent = fmt(video.duration);
    });

    // ── Buffered ─────────────────────────────
    video.addEventListener('progress', () => {
        if (video.duration && video.buffered.length) {
            const pct = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
            buffered.style.width = pct + '%';
        }
    });

    // ── Seek bar ─────────────────────────────
    const seekTo = e => {
        const rect = seekBar.getBoundingClientRect();
        const pct  = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        video.currentTime = pct * video.duration;
        setProgress(pct * 100);
    };

    seekBar.addEventListener('mousedown', e => {
        dragging = true;
        thumb.classList.add('dragging');
        seekTo(e);
    });

    // Touch support for seek
    seekBar.addEventListener('touchstart', e => {
        dragging = true;
        thumb.classList.add('dragging');
        seekTo(e.touches[0]);
    }, { passive: true });

    document.addEventListener('mousemove', e => { if (dragging) seekTo(e); });
    document.addEventListener('mouseup',   () => {
        if (dragging) { dragging = false; thumb.classList.remove('dragging'); }
    });

    document.addEventListener('touchmove', e => { if (dragging) seekTo(e.touches[0]); }, { passive: true });
    document.addEventListener('touchend',  () => {
        if (dragging) { dragging = false; thumb.classList.remove('dragging'); }
    });

    seekBar.addEventListener('click', seekTo);

    // ── Volume ───────────────────────────────
    const updateVolIcon = () => {
        const v = video.volume;
        volIcon.className = (video.muted || v === 0)
            ? 'fas fa-volume-xmark'
            : v < 0.5 ? 'fas fa-volume-low' : 'fas fa-volume-high';
    };

    volSlider.addEventListener('input', () => {
        video.volume = parseFloat(volSlider.value);
        video.muted  = video.volume === 0;
        updateVolIcon();
    });

    muteBtn.addEventListener('click', e => {
        e.stopPropagation();
        video.muted      = !video.muted;
        volSlider.value  = video.muted ? 0 : video.volume;
        updateVolIcon();
    });

    // ── Playback speed ───────────────────────
    speedBtn.addEventListener('click', e => {
        e.stopPropagation();
        speedMenu.classList.toggle('open');
    });

    speedMenu.querySelectorAll('.apc-speed-opt').forEach(opt => {
        opt.addEventListener('click', e => {
            e.stopPropagation();
            const spd = parseFloat(opt.dataset.speed);
            video.playbackRate    = spd;
            speedBtn.textContent  = spd === 1 ? '1×' : spd + '×';
            speedMenu.querySelectorAll('.apc-speed-opt').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            speedMenu.classList.remove('open');
        });
    });

    // Close speed menu when clicking elsewhere
    document.addEventListener('click', () => speedMenu.classList.remove('open'));

    // ── Fullscreen ───────────────────────────
    fsBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
            player.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        // Only update icon for the player that triggered fullscreen
        if (document.fullscreenElement === player) {
            fsIcon.className = 'fas fa-compress';
        } else if (!document.fullscreenElement) {
            fsIcon.className = 'fas fa-expand';
        }
    });

    // ── Keyboard shortcuts (active player only) ──
    player.addEventListener('keydown', e => {
        switch (e.code) {
            case 'Space':       e.preventDefault(); togglePlay(); break;
            case 'ArrowRight':  video.currentTime += 10; showFlash(flashR); break;
            case 'ArrowLeft':   video.currentTime -= 10; showFlash(flashL); break;
            case 'ArrowUp':     video.volume = Math.min(1, video.volume + 0.1); volSlider.value = video.volume; updateVolIcon(); break;
            case 'ArrowDown':   video.volume = Math.max(0, video.volume - 0.1); volSlider.value = video.volume; updateVolIcon(); break;
            case 'KeyF':        fsBtn.click(); break;
            case 'KeyM':        muteBtn.click(); break;
        }
    });

    // Make player focusable for keyboard
    player.setAttribute('tabindex', '0');

    // ── Idle controls hiding ──────────────────
    const resetIdleTimer = () => {
        player.classList.remove('idle');
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            if (!video.paused) player.classList.add('idle');
        }, 2800);
    };

    player.addEventListener('mousemove',  resetIdleTimer);
    player.addEventListener('touchstart', resetIdleTimer, { passive: true });
    player.addEventListener('mouseleave', () => {
        if (!video.paused) player.classList.add('idle');
    });

    // ── Spinner ───────────────────────────────
    video.addEventListener('waiting', () => spinner.classList.add('visible'));
    video.addEventListener('canplay', () => spinner.classList.remove('visible'));
}

// Initialise both player instances
initialisePlayer('1');
initialisePlayer('2');
initialisePlayer('3');
