/* ==========================================================================
   PATRICIO SALINAS - PORTFOLIO INTERACTION ENGINE
   Handles project modals, category filtering, theme toggle, and forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Dynamic Year
  // ------------------------------------------------------------------------
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. Theme Toggle (Dark / Light) with Persistence
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'success');
    });
  }

  // ------------------------------------------------------------------------
  // 3. Navbar Scroll Spy & Scrolled Class
  // ------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add scrolled class for shadow & glass tint
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    // Scroll Spy: highlight active nav link
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. Mobile Drawer Navigation
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Cursor Glow Effect
  // ------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
      cursorGlow.style.opacity = '1';
    });

    window.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  }

  // ------------------------------------------------------------------------
  // 6. Project Filtering System
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. Project Deep Dive Modal System
  // ------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalContent');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  // Rich project detailed dossiers
  const projectDossiers = {
    sapi: {
      title: 'SAPI_WATCHER: Enterprise Order Ingestion Bot & Pipeline',
      subtitle: 'Engineered during Software Engineering Internship at Sapi Technologies LLC',
      logoType: 'sapi',
      image: 'assets/images/logos/sapi_logo.jpg',
      tags: ['Python', 'Flask', 'Node.js', 'PostgreSQL', 'MS SQL Server', 'PyODBC', 'CustomTkinter', 'WhatsApp API'],
      github: 'https://github.com/PatricioSal/ColinasOrder',
      overview: `SAPI_WATCHER is a mission-critical automated order ingestion system engineered to eliminate manual data entry from customer communications. It automatically captures incoming orders, parses unstructured text and PDF purchase attachments, performs fuzzy NLP catalog matching, and allows warehouse operators to verify and synchronize orders directly with production Microsoft SQL Server ERP databases.`,
      architecture: [
        { num: '1', title: 'WhatsApp Inbound Channel', desc: 'Node.js listener (whatsapp-web.js) captures incoming messages, group chat alerts, and PDF invoices on port :3000.' },
        { num: '2', title: 'Flask Webhook & Extraction', desc: 'Python Flask backend (:5050) ingests payload, runs PyMuPDF on attachments, and parses order line items.' },
        { num: '3', title: 'Fuzzy NLP Catalog Matching', desc: 'Custom fuzzy string algorithms match colloquial item names and customer aliases against the master product database.' },
        { num: '4', title: 'Staging & Review Queue', desc: 'Pending orders are staged in local PostgreSQL and displayed live inside a CustomTkinter desktop dashboard.' },
        { num: '5', title: 'Production SQL Server Sync', desc: 'Upon operator approval, full customer profiles and tiered pricing are pre-filled and committed to remote SQL Server ERP.' }
      ],
      keyAccomplishments: [
        'Automated order processing time from minutes per order down to sub-second ingestion.',
        'Engineered CustomTkinter GUI featuring QR code authentication, live streaming logs, review modals, and one-click database commits.',
        'Designed dual-database architecture: PostgreSQL for local fast caching and staging, remote MS SQL for production ERP transactions.',
        'Built automated setup assistant script (SAPI_WATCHER.bat & setup_prerequisites.ps1) ensuring self-healing package installs for warehouse operators.'
      ]
    },
    hvac: {
      title: 'Residential HVAC Air Duct & Ventilation Engineering',
      subtitle: 'Designed at New Results Heating and Cooling for New Home Construction',
      logoType: 'newresults',
      image: 'assets/images/logos/new_results_logo.png',
      tags: ['ACCA Manual D & J', 'CFM Airflow Sizing', 'CAD Blueprints', 'External Static Pressure', 'System Balancing'],
      github: null,
      overview: `At New Results Heating and Cooling, designed complete residential air distribution networks for new two-story and single-family home constructions. The engineering process transformed architectural blueprints into fully calculated, energy-compliant HVAC duct systems that balance room temperatures, minimize duct static pressure loss, and fit within structural wall framing.`,
      architecture: [
        { num: '1', title: 'Load Calculation (Manual J)', desc: 'Analyzed square footage, insulation ratings, window orientations, and ceiling heights to compute room heating and cooling loads.' },
        { num: '2', title: 'CFM Air Distribution', desc: 'Calculated required Cubic Feet per Minute (CFM) for each living area (bedrooms, living rooms, kitchens, offices).' },
        { num: '3', title: 'Duct Sizing & Friction Rate (Manual D)', desc: 'Determined available static pressure and friction rates to calculate trunk and branch diameters for optimal velocity.' },
        { num: '4', title: 'Spatial Blueprint Routing', desc: 'Drafted duct pathways through joist bays, attics, and vertical chases to avoid load-bearing beams and plumbing risers.' },
        { num: '5', title: 'Field Commissioning & Balancing', desc: 'Coordinated with framing contractors and installers to verify damper positions and ensure whisper-quiet airflow.' }
      ],
      keyAccomplishments: [
        'Designed compliant duct layouts according to International Residential Code (IRC) and ACCA standards.',
        'Prevented costly framing alterations by proactively identifying interference between duct trunks and engineered roof trusses.',
        'Optimized return air sizing to prevent air handler vacuum starvation and reduce seasonal electricity consumption.'
      ]
    },
    atx: {
      title: 'ATX Teens Need Jobs: Community Opportunity Board',
      subtitle: 'Full-Stack Web Application Connecting Austin Youth with Employment',
      logoType: 'atx',
      image: 'assets/images/logos/atx_teens_logo.png',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Supabase', 'PostgreSQL', 'Admin Portal', 'RESTful API'],
      github: 'https://github.com/PatricioSal/ATX-Teens-Need-Jobs',
      overview: `A modern, community-centric web application designed specifically to empower teens in the Austin area with accessible employment opportunities, internship listings, and mentorship programs. Features an intuitive job discovery interface and an administrative management dashboard.`,
      architecture: [
        { num: '1', title: 'Interactive Client Portal', desc: 'Clean, responsive UI with real-time category filtering (part-time, summer internships, youth programs).' },
        { num: '2', title: 'Supabase Database Backend', desc: 'Relational database schema managing job postings, employer credentials, and youth applications with row-level security.' },
        { num: '3', title: 'Administrative Dashboard', desc: 'Dedicated admin.html panel for approving, editing, and archiving community employer submissions.' }
      ],
      keyAccomplishments: [
        'Created accessible mobile-first interface optimized for fast loading on all devices.',
        'Integrated Supabase client for seamless live data updates and applicant tracking.',
        'Formulated database schema for efficient indexing of employer categories and wages.'
      ]
    },
    evo: {
      title: 'EVO App: Real-Time Mobile Team Synchronization',
      subtitle: 'React Native & Node.js Application Built for UT Dallas CS1200',
      logoType: 'evo',
      image: 'assets/images/logos/evo_logo.png',
      tags: ['JavaScript', 'React Native', 'Node.js', 'Express', 'State Sync', 'CS1200'],
      github: 'https://github.com/PatricioSal/EVO_App',
      overview: `Developed as part of the CS1200 curriculum at The University of Texas at Dallas, EVO App is a collaborative mobile tool and backend server that provides real-time user presence tracking, team member directories, and event synchronization.`,
      architecture: [
        { num: '1', title: 'React Native Mobile Interface', desc: 'Fluid mobile application UI displaying active team members, activity feeds, and sync triggers.' },
        { num: '2', title: 'Node.js Synchronization Server', desc: 'Express backend managing user registries, authentication status, and active connection tracking.' },
        { num: '3', title: 'State Synchronization Protocol', desc: 'Engineered synchronization routines (syncUsers.js, userSyncServer.js) ensuring reliable multi-device state consistency.' }
      ],
      keyAccomplishments: [
        'Delivered responsive multi-platform mobile application interface using Expo / React Native.',
        'Implemented lightweight synchronization protocols to keep team member status up to date with low network overhead.',
        'Collaborated effectively within an agile student engineering team at UTD.'
      ]
    }
  };

  function openModal(projectId) {
    const data = projectDossiers[projectId];
    if (!data) return;

    let archHtml = '';
    if (data.architecture && data.architecture.length > 0) {
      archHtml = `
        <div class="modal-section">
          <h4>System Flow & Architecture</h4>
          <div class="arch-diagram">
            <div class="arch-steps">
              ${data.architecture.map((step, idx) => `
                <div class="arch-step-item">
                  <div class="step-num">${step.num}</div>
                  <div>
                    <strong>${step.title}:</strong> ${step.desc}
                  </div>
                </div>
                ${idx < data.architecture.length - 1 ? '<div class="arch-arrow">↓</div>' : ''}
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    let heroBannerHtml = '';
    if (data.logoType === 'sapi') {
      heroBannerHtml = `
        <div class="modal-hero-brand modal-sapi">
          <img src="${data.image}" alt="${data.title}">
        </div>
      `;
    } else if (data.logoType === 'newresults') {
      heroBannerHtml = `
        <div class="modal-hero-brand modal-newresults">
          <div class="logo-card-frame">
            <img src="${data.image}" alt="${data.title}">
          </div>
        </div>
      `;
    } else if (data.logoType === 'atx') {
      heroBannerHtml = `
        <div class="modal-hero-brand modal-atx">
          <div class="logo-card-frame">
            <img src="${data.image}" alt="${data.title}">
          </div>
        </div>
      `;
    } else if (data.logoType === 'evo') {
      heroBannerHtml = `
        <div class="modal-hero-brand modal-evo">
          <img src="${data.image}" alt="${data.title}">
        </div>
      `;
    } else {
      heroBannerHtml = `<img src="${data.image}" alt="${data.title}" class="modal-hero-img">`;
    }

    modalContent.innerHTML = `
      ${heroBannerHtml}
      <h3 class="modal-title">${data.title}</h3>
      <div class="modal-subtitle">${data.subtitle}</div>

      <div class="modal-section">
        <h4>Project Overview</h4>
        <p>${data.overview}</p>
      </div>

      ${archHtml}

      <div class="modal-section">
        <h4>Key Technical Highlights</h4>
        <ul>
          ${data.keyAccomplishments.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4>Technologies & Tooling</h4>
        <div class="project-tech-list">
          ${data.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions">
        ${data.github ? `
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>View Source on GitHub</span>
          </a>
        ` : ''}
        <button class="btn btn-glass" onclick="document.getElementById('projectModal').classList.remove('open')">
          Close Window
        </button>
      </div>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 8. Contact Form Submission
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const subject = document.getElementById('subjectInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Pre-populate mailto link so user's email client opens ready to send
      const mailtoUrl = `mailto:pato.sallopez14@gmail.com?subject=${encodeURIComponent(subject || 'Website Inquiry')}&body=${encodeURIComponent(`Hi Patricio,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

      showToast(`Thank you, ${name}! Opening mail client...`, 'success');

      // Small delay then open mailto
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 700);
    });
  }

  // ------------------------------------------------------------------------
  // 9. Toast Notification Helper
  // ------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : '⚠️'}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutToast 0.3s forwards ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }
});
