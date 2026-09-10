/**
 * CommitCode - Multi-Category Career Learning Platform
 * Reorganized across 7 Core Career Learning Groups:
 * 1. IT & Technology
 * 2. Non-IT & Professional Skills
 * 3. Math & Analytics
 * 4. Management & Business
 * 5. Design & Creative
 * 6. Marketing & Sales
 * 7. Career & Placement
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Store
  const state = {
    currentView: 'website', // 'website', 'student-dashboard', 'daily-task', 'staff-portal', 'admin-dashboard'
    selectedCategory: 'all',
    selectedTab: 'all', // 'all', 'popular', 'featured', 'new'
    searchQuery: '',
    selectedLevel: 'all',
    selectedPrice: 'all', // 'all', 'under-15k', '15k-25k', '25k-35k', 'above-35k'
    selectedSort: 'featured', // 'featured', 'popular', 'newest', 'rating', 'price-low', 'price-high', 'duration'
    selectedCourseForModal: null,
    enrolledCourse: COMMIT_CODE_DATA.courses.find(c => c.id === COMMIT_CODE_DATA.student.enrolledCourseId) || COMMIT_CODE_DATA.courses[0],
    student: { ...COMMIT_CODE_DATA.student },
    staffQueue: [...COMMIT_CODE_DATA.staffQueue],
    studentDoubts: [...COMMIT_CODE_DATA.studentDoubts],
    permissionHistory: [...COMMIT_CODE_DATA.permissionHistory],
    adminMetrics: { ...COMMIT_CODE_DATA.adminMetrics },
    taskSubmittedToday: false,
    todaySubmissionData: null,
    timerSeconds: COMMIT_CODE_DATA.student.nextTaskAvailableInSeconds || 31335
  };

  // Utility: Currency Formatter (INR)
  const formatINR = (val) => {
    return '₹' + Number(val).toLocaleString('en-IN');
  };

  // Utility: Format Time String (HH:MM:SS)
  const formatSecondsToTime = (totalSeconds) => {
    if (totalSeconds < 0) totalSeconds = 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // SVG Icon Map for Categories
  const categoryIconMap = {
    'it-tech': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    'non-it-skills': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
    'math-analytics': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    'mgmt-business': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    'design-creative': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
    'marketing-sales': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    'career-placement': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
  };

  // SVG Icon Map for Career Goals
  const goalIconMap = {
    'code': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    'bar-chart-2': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    'zap': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    'briefcase': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    'dollar-sign': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    'trending-up': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    'message-circle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    'check-circle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    'layout': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  };

  // =========================================================================
  // Toast Notification System
  // =========================================================================
  const showToast = (message, type = 'info') => {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-stack';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    
    let iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // =========================================================================
  // View Router
  // =========================================================================
  const switchView = (targetView) => {
    state.currentView = targetView;

    // Update Role Switcher tabs
    document.querySelectorAll('.role-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-view') === targetView) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Main Views Visibility
    const viewElements = {
      'website': document.getElementById('view-website'),
      'student-dashboard': document.getElementById('view-student-dashboard'),
      'daily-task': document.getElementById('view-daily-task'),
      'staff-portal': document.getElementById('view-staff-portal'),
      'admin-dashboard': document.getElementById('view-admin-dashboard')
    };

    Object.keys(viewElements).forEach(viewKey => {
      const el = viewElements[viewKey];
      if (el) {
        if (viewKey === targetView) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
    });

    // Re-render view specific dynamic components
    if (targetView === 'student-dashboard') {
      renderStudentDashboard();
    } else if (targetView === 'daily-task') {
      renderDailyTaskView();
    } else if (targetView === 'staff-portal') {
      renderStaffPortal();
    } else if (targetView === 'admin-dashboard') {
      renderAdminDashboard();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Setup Event Listeners for Role Switcher & Nav
  document.querySelectorAll('.role-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  // Mobile navigation drawer toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (mobileToggle && mobileNavMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = mobileNavMenu.style.display === 'block';
      mobileNavMenu.style.display = isVisible ? 'none' : 'block';
    });
  }

  // Smooth scroll for nav anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      if (state.currentView !== 'website') {
        switchView('website');
        setTimeout(() => {
          const target = document.querySelector(targetId);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (mobileNavMenu) mobileNavMenu.style.display = 'none';
    });
  });

  // Global Quick Action Buttons
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action === 'switch-view') {
        const target = btn.getAttribute('data-target');
        switchView(target);
      } else if (action === 'explore-courses') {
        switchView('website');
        setTimeout(() => {
          const target = document.getElementById('courses');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (action === 'how-it-works') {
        switchView('website');
        setTimeout(() => {
          const target = document.getElementById('how-it-works');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (action === 'open-calc') {
        switchView('website');
        setTimeout(() => {
          const target = document.getElementById('refund-calculator');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  });

  // =========================================================================
  // Navigation Dropdown & Category Quick Selectors
  // =========================================================================
  const setupNavDropdowns = () => {
    const dropdownMenu = document.getElementById('nav-courses-dropdown-menu');
    const mobileCoursesList = document.getElementById('mobile-courses-category-list');
    const mainCategories = COMMIT_CODE_DATA.categories.filter(c => c.id !== 'all');

    if (dropdownMenu) {
      dropdownMenu.innerHTML = mainCategories.map(cat => {
        const count = COMMIT_CODE_DATA.courses.filter(c => c.mainCategoryId === cat.id).length;
        return `
          <div class="nav-dropdown-item" data-cat-id="${cat.id}">
            <span>${cat.name}</span>
            <span class="nav-drop-count">${count} Courses</span>
          </div>
        `;
      }).join('');

      dropdownMenu.querySelectorAll('.nav-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          const catId = item.getAttribute('data-cat-id');
          selectCategoryFilter(catId);
        });
      });
    }

    if (mobileCoursesList) {
      mobileCoursesList.innerHTML = mainCategories.map(cat => {
        const count = COMMIT_CODE_DATA.courses.filter(c => c.mainCategoryId === cat.id).length;
        return `
          <a href="#courses" class="nav-link" data-cat-id="${cat.id}" style="padding-left: 14px; font-size: 0.875rem;">
            ↳ ${cat.name} (${count})
          </a>
        `;
      }).join('');

      mobileCoursesList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', (e) => {
          const catId = a.getAttribute('data-cat-id');
          selectCategoryFilter(catId);
          if (mobileNavMenu) mobileNavMenu.style.display = 'none';
        });
      });
    }
  };

  const selectCategoryFilter = (catId) => {
    state.selectedCategory = catId;
    state.selectedTab = 'all';
    renderTopMarketplaceCategoryCards();
    renderCategoryPills();
    renderCourses();
    const coursesElem = document.getElementById('courses');
    if (coursesElem) coursesElem.scrollIntoView({ behavior: 'smooth' });
  };

  // =========================================================================
  // Homepage Section 1: "Choose Your Learning Path" (7 Main Categories)
  // =========================================================================
  const renderLearningPathCards = () => {
    const container = document.getElementById('learning-paths-container');
    if (!container) return;

    const mainCats = COMMIT_CODE_DATA.categories.filter(c => c.id !== 'all');

    container.innerHTML = mainCats.map(cat => {
      const catCourses = COMMIT_CODE_DATA.courses.filter(c => c.mainCategoryId === cat.id);
      const subcatsPreview = (cat.subcategories || []).slice(0, 4);

      return `
        <div class="learning-path-card" data-cat-id="${cat.id}">
          <div class="learning-path-icon-wrap">
            ${categoryIconMap[cat.id] || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`}
          </div>
          <h3 class="learning-path-title">${cat.name}</h3>
          <p class="learning-path-desc">${cat.description}</p>
          
          <div class="learning-path-subcats">
            ${subcatsPreview.map(sub => `<span class="subcat-chip">${sub}</span>`).join('')}
            ${(cat.subcategories && cat.subcategories.length > 4) ? `<span class="subcat-chip">+${cat.subcategories.length - 4} more</span>` : ''}
          </div>

          <div class="learning-path-footer">
            <span>${catCourses.length} Programs</span>
            <span style="display: flex; align-items: center; gap: 4px;">Explore Path →</span>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.learning-path-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat-id');
        selectCategoryFilter(catId);
      });
    });
  };

  // =========================================================================
  // Homepage Section 2: "Explore Courses by Career Goal" (9 Goals)
  // =========================================================================
  const renderCareerGoals = () => {
    const container = document.getElementById('career-goals-container');
    if (!container) return;

    container.innerHTML = COMMIT_CODE_DATA.careerGoals.map(goal => {
      return `
        <div class="career-goal-card" data-cat-id="${goal.categoryId}" data-course-id="${goal.recommendedCourseId}">
          <div class="goal-card-top">
            <div class="goal-icon-box">
              ${goalIconMap[goal.icon] || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`}
            </div>
            <div>
              <h4 class="goal-title">${goal.title}</h4>
              <span style="font-size: 0.775rem; color: var(--primary-600); font-weight: 700;">Explore Goal Path →</span>
            </div>
          </div>
          <div class="goal-tags-row">
            ${goal.tags.map(t => `<span class="goal-tag-pill">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.career-goal-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat-id');
        selectCategoryFilter(catId);
      });
    });
  };

  // =========================================================================
  // Top of Courses Page: Large 7 Category Cards
  // =========================================================================
  const renderTopMarketplaceCategoryCards = () => {
    const container = document.getElementById('marketplace-top-categories-grid');
    if (!container) return;

    const mainCats = COMMIT_CODE_DATA.categories.filter(c => c.id !== 'all');

    container.innerHTML = mainCats.map(cat => {
      const catCourses = COMMIT_CODE_DATA.courses.filter(c => c.mainCategoryId === cat.id);
      const isActive = state.selectedCategory === cat.id;

      return `
        <div class="marketplace-cat-card ${isActive ? 'active' : ''}" data-cat-id="${cat.id}">
          <div class="market-cat-icon">
            ${categoryIconMap[cat.id] || `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`}
          </div>
          <h4 class="market-cat-title">${cat.name}</h4>
          <p class="market-cat-desc">${cat.description}</p>
          <div class="market-cat-footer">
            <span class="market-cat-count">${catCourses.length} Courses</span>
            <button class="btn-explore-cat">
              <span>${isActive ? 'Selected ✓' : 'Explore'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.marketplace-cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat-id');
        state.selectedCategory = state.selectedCategory === catId ? 'all' : catId;
        renderTopMarketplaceCategoryCards();
        renderCategoryPills();
        renderCourses();
      });
    });
  };

  // =========================================================================
  // Course Catalog Rendering, Tabs & Multi-Filters
  // =========================================================================
  const renderCatalogSectionTabs = () => {
    const tabsContainer = document.getElementById('catalog-section-tabs-bar');
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll('.cat-tab-btn').forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      if (tab === state.selectedTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }

      btn.onclick = () => {
        state.selectedTab = tab;
        renderCatalogSectionTabs();
        renderCourses();
      };
    });
  };

  const renderCategoryPills = () => {
    const container = document.getElementById('category-pills-container');
    if (!container) return;

    container.innerHTML = COMMIT_CODE_DATA.categories.map(cat => {
      const count = cat.id === 'all' 
        ? COMMIT_CODE_DATA.courses.length 
        : COMMIT_CODE_DATA.courses.filter(c => c.mainCategoryId === cat.id).length;

      const label = cat.shortName || cat.name;

      return `
        <button class="cat-pill-btn ${state.selectedCategory === cat.id ? 'active' : ''}" data-cat-id="${cat.id}">
          <span>${label} (${count})</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.getAttribute('data-cat-id');
        renderTopMarketplaceCategoryCards();
        renderCategoryPills();
        renderCourses();
      });
    });
  };

  const filterAndSortCourses = () => {
    let list = [...COMMIT_CODE_DATA.courses];

    // Section Tab Filter (All, Popular, Featured, New)
    if (state.selectedTab === 'popular') {
      list = list.filter(c => c.isPopular);
    } else if (state.selectedTab === 'featured') {
      list = list.filter(c => c.isFeatured);
    } else if (state.selectedTab === 'new') {
      list = list.filter(c => c.isNew);
    }

    // Category Filter (7 Main Groups)
    if (state.selectedCategory !== 'all') {
      list = list.filter(c => c.mainCategoryId === state.selectedCategory || c.category === state.selectedCategory);
    }

    // Global Search Query Filter
    if (state.searchQuery.trim() !== '') {
      const query = state.searchQuery.toLowerCase();
      list = list.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.mainCategory.toLowerCase().includes(query) ||
        (c.subCategory && c.subCategory.toLowerCase().includes(query)) ||
        (c.outcomes && c.outcomes.some(o => o.toLowerCase().includes(query)))
      );
    }

    // Price Filter
    if (state.selectedPrice === 'under-15k') {
      list = list.filter(c => c.price < 15000);
    } else if (state.selectedPrice === '15k-25k') {
      list = list.filter(c => c.price >= 15000 && c.price <= 25000);
    } else if (state.selectedPrice === '25k-35k') {
      list = list.filter(c => c.price > 25000 && c.price <= 35000);
    } else if (state.selectedPrice === 'above-35k') {
      list = list.filter(c => c.price > 35000);
    }

    // Level Filter
    if (state.selectedLevel !== 'all') {
      list = list.filter(c => c.level.toLowerCase().includes(state.selectedLevel.toLowerCase()));
    }

    // Sorting
    if (state.selectedSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (state.selectedSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (state.selectedSort === 'popular') {
      list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    } else if (state.selectedSort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (state.selectedSort === 'duration') {
      list.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    } else if (state.selectedSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  };

  const renderCourses = () => {
    const grid = document.getElementById('courses-grid-container');
    const countBadge = document.getElementById('courses-found-count');
    if (!grid) return;

    const filtered = filterAndSortCourses();
    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${COMMIT_CODE_DATA.courses.length} courses`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: 16px; border: 1px solid var(--bg-border);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" style="margin: 0 auto 16px auto;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h4 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">No matching courses found</h4>
          <p style="color: var(--text-muted); font-size: 0.9375rem; margin-bottom: 20px;">Try searching for keywords like "Java", "Python", "Tally", "Math", "Management", or "Design".</p>
          <button class="btn btn-outline" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.selectedCategory = 'all';
          state.selectedTab = 'all';
          state.searchQuery = '';
          state.selectedPrice = 'all';
          state.selectedLevel = 'all';
          state.selectedSort = 'featured';

          const searchInput = document.getElementById('course-search-input');
          const priceSelect = document.getElementById('course-price-filter');
          const levelSelect = document.getElementById('course-level-filter');
          const sortSelect = document.getElementById('course-sort-filter');

          if (searchInput) searchInput.value = '';
          if (priceSelect) priceSelect.value = 'all';
          if (levelSelect) levelSelect.value = 'all';
          if (sortSelect) sortSelect.value = 'featured';

          renderTopMarketplaceCategoryCards();
          renderCatalogSectionTabs();
          renderCategoryPills();
          renderCourses();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(course => {
      // Dynamic Potential Refund Calculation: Course Fee * 50%
      const maxRefundAmount = Math.round(course.price * 0.5);

      return `
        <div class="course-card">
          <div class="course-card-badge-row">
            <div style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center;">
              <span class="course-cat-tag">${course.mainCategory}</span>
              ${course.subCategory ? `<span class="subcat-chip" style="font-size: 0.7rem; background: var(--bg-surface);">${course.subCategory}</span>` : ''}
            </div>
            <span class="course-promo-badge">${course.badge || 'Verified'}</span>
          </div>

          <h3 class="course-card-title">${course.title}</h3>
          <p class="course-card-desc">${course.description}</p>

          <div class="course-meta-tags">
            <span class="meta-tag-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${course.duration}
            </span>
            <span class="meta-tag-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              ${course.modules || course.modulesCount || 4} Modules
            </span>
            <span class="meta-tag-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              ${course.tasks || course.dailyTasks} Daily Tasks
            </span>
            <span class="meta-tag-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              ${course.videos || course.recordedVideos} Videos
            </span>
            <span class="meta-tag-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              ${course.level}
            </span>
            <span class="meta-tag-item" style="color: var(--primary-700); font-weight: 700;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Staff Support (15m SLA)
            </span>
          </div>

          <div class="course-card-pricing-box">
            <div class="pricing-row">
              <span class="course-price-label">Course Fee</span>
              <span class="course-price-val">${formatINR(course.price)}</span>
            </div>
            <div class="refund-callout-pill">
              <span>Potential Completion Refund</span>
              <span style="font-weight: 800;">Up to ${formatINR(maxRefundAmount)} (50%)</span>
            </div>
            <div class="refund-disclaimer-micro">Eligibility is subject to course completion requirements and Refund Policy.</div>
          </div>

          <div class="course-card-actions">
            <button class="btn btn-outline btn-sm btn-view-course" data-course-id="${course.id}">
              View Details
            </button>
            <button class="btn btn-primary btn-sm btn-enroll-course" data-course-id="${course.id}">
              Enroll Now
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Click Events to Cards
    grid.querySelectorAll('.btn-view-course').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-course-id');
        openCourseDetailsModal(cId);
      });
    });

    grid.querySelectorAll('.btn-enroll-course').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-course-id');
        openEnrollmentModal(cId);
      });
    });
  };

  // Search and Filter Listeners
  const searchInput = document.getElementById('course-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCourses();
    });
  }

  const priceSelect = document.getElementById('course-price-filter');
  if (priceSelect) {
    priceSelect.addEventListener('change', (e) => {
      state.selectedPrice = e.target.value;
      renderCourses();
    });
  }

  const levelSelect = document.getElementById('course-level-filter');
  if (levelSelect) {
    levelSelect.addEventListener('change', (e) => {
      state.selectedLevel = e.target.value;
      renderCourses();
    });
  }

  const sortSelect = document.getElementById('course-sort-filter');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.selectedSort = e.target.value;
      renderCourses();
    });
  }

  // =========================================================================
  // Interactive Completion Refund Calculator (Synced with 7 Categories)
  // =========================================================================
  const initRefundCalculator = () => {
    const courseSelect = document.getElementById('calc-course-select');
    const consistencySlider = document.getElementById('calc-consistency-slider');
    const sliderValBadge = document.getElementById('calc-slider-val-badge');
    
    // Output Elements
    const outFee = document.getElementById('calc-out-fee');
    const outTasks = document.getElementById('calc-out-tasks');
    const outPermissions = document.getElementById('calc-out-perms');
    const outRefund = document.getElementById('calc-out-refund');
    const outNetInvest = document.getElementById('calc-out-net');
    const outStatus = document.getElementById('calc-out-status');

    if (!courseSelect) return;

    // Populate course select options with all courses grouped by main Category
    const categoriesMap = {};
    COMMIT_CODE_DATA.courses.forEach(c => {
      if (!categoriesMap[c.mainCategory]) {
        categoriesMap[c.mainCategory] = [];
      }
      categoriesMap[c.mainCategory].push(c);
    });

    let optionsHtml = '';
    Object.keys(categoriesMap).forEach(catName => {
      optionsHtml += `<optgroup label="${catName}">`;
      categoriesMap[catName].forEach(c => {
        optionsHtml += `<option value="${c.id}">${c.title} — ${formatINR(c.price)}</option>`;
      });
      optionsHtml += `</optgroup>`;
    });

    courseSelect.innerHTML = optionsHtml;

    const updateCalculations = () => {
      const selectedId = courseSelect.value;
      const course = COMMIT_CODE_DATA.courses.find(c => c.id === selectedId) || COMMIT_CODE_DATA.courses[0];
      const consistency = parseInt(consistencySlider.value);

      if (sliderValBadge) {
        sliderValBadge.textContent = `${consistency}%`;
      }

      const totalTasks = course.tasks || course.dailyTasks;
      const tasksToComplete = Math.round(totalTasks * (consistency / 100));

      if (outFee) outFee.textContent = formatINR(course.price);
      if (outTasks) outTasks.textContent = `${tasksToComplete} / ${totalTasks} Tasks`;
      if (outPermissions) outPermissions.textContent = `${COMMIT_CODE_DATA.platform.freePermissions} Free Included`;

      if (consistency === 100) {
        const maxRefund = Math.round(course.price * 0.5);
        const netCost = course.price - maxRefund;
        if (outRefund) outRefund.textContent = `Potential: Up to ${formatINR(maxRefund)}`;
        if (outNetInvest) outNetInvest.textContent = formatINR(netCost);
        if (outStatus) {
          outStatus.innerHTML = `<span style="color: #34D399; font-weight: 700;">Eligible for 50% Completion Refund</span>`;
        }
      } else {
        if (outRefund) outRefund.textContent = `₹0 (Requires 100%)`;
        if (outNetInvest) outNetInvest.textContent = formatINR(course.price);
        if (outStatus) {
          outStatus.innerHTML = `<span style="color: #F87171; font-weight: 700;">Ineligible (100% completion required)</span>`;
        }
      }
    };

    courseSelect.addEventListener('change', updateCalculations);
    if (consistencySlider) consistencySlider.addEventListener('input', updateCalculations);

    updateCalculations();
  };

  // =========================================================================
  // Permission System Interactive Counter
  // =========================================================================
  const renderPermissionShowcase = () => {
    const container = document.getElementById('permission-slots-container');
    if (!container) return;

    const total = state.student.totalPermissions;
    const used = state.student.permissionsUsed;

    let html = '';
    for (let i = 1; i <= total; i++) {
      const isUsed = i <= used;
      html += `
        <div class="permission-slot-card ${isUsed ? 'used' : 'available'}">
          <div class="perm-slot-icon">
            ${isUsed 
              ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
              : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`
            }
          </div>
          <div class="perm-slot-title">Permission ${i}</div>
          <div class="perm-slot-status">${isUsed ? 'Used (Approved)' : 'Available'}</div>
        </div>
      `;
    }

    container.innerHTML = html;

    const remainingCounter = document.getElementById('permission-remaining-count-badge');
    if (remainingCounter) {
      remainingCounter.textContent = `${state.student.permissionsRemaining} Available`;
    }
  };

  // =========================================================================
  // Live Countdown Timer
  // =========================================================================
  const startCountdownTimer = () => {
    setInterval(() => {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
      }

      const formatted = formatSecondsToTime(state.timerSeconds);

      document.querySelectorAll('.live-countdown-display').forEach(el => {
        el.textContent = formatted;
      });
    }, 1000);
  };

  // =========================================================================
  // Student Dashboard View Rendering
  // =========================================================================
  const renderStudentDashboard = () => {
    const s = state.student;
    
    const nameEl = document.getElementById('student-banner-name');
    const courseEl = document.getElementById('student-banner-course');
    const progressFill = document.getElementById('student-dash-progress-fill');
    const progressTxt = document.getElementById('student-dash-progress-text');
    const streakTxt = document.getElementById('student-dash-streak-text');
    const permsTxt = document.getElementById('student-dash-perms-text');
    const refundStatusTxt = document.getElementById('student-dash-refund-status');
    const tasksCountTxt = document.getElementById('student-dash-tasks-count');

    if (nameEl) nameEl.textContent = s.name;
    if (courseEl) courseEl.textContent = `${s.courseTitle} (${s.progressPercent}% Complete)`;
    if (progressFill) progressFill.style.width = `${s.progressPercent}%`;
    if (progressTxt) progressTxt.textContent = `${s.progressPercent}%`;
    if (streakTxt) streakTxt.textContent = `${s.currentStreak} Days 🔥`;
    if (permsTxt) permsTxt.textContent = `${s.permissionsRemaining} of ${s.totalPermissions} Left`;
    if (tasksCountTxt) tasksCountTxt.textContent = `${s.tasksCompleted} / ${s.totalTasks}`;
    if (refundStatusTxt) refundStatusTxt.textContent = s.refundStatus;

    const histTable = document.getElementById('student-permission-history-tbody');
    if (histTable) {
      histTable.innerHTML = state.permissionHistory.map(item => `
        <tr>
          <td><strong style="color: var(--text-primary);">${item.id.toUpperCase()}</strong></td>
          <td>${item.date}</td>
          <td>${item.reason}</td>
          <td>
            <span class="task-meta-pill" style="background: ${item.status === 'Used' ? '#FEF2F2; color: #DC2626;' : '#ECFDF5; color: #059669;'}">
              ${item.status}
            </span>
          </td>
        </tr>
      `).join('');
    }
  };

  // =========================================================================
  // Daily Task Workspace View
  // =========================================================================
  const renderDailyTaskView = () => {
    const task = COMMIT_CODE_DATA.todayTask;
    const taskTitleEl = document.getElementById('task-view-title');
    const taskDescEl = document.getElementById('task-view-desc');
    const taskObjectivesEl = document.getElementById('task-view-objectives');
    const taskInstructionsEl = document.getElementById('task-view-instructions');
    const codeSnippetEl = document.getElementById('task-code-snippet');
    const submissionFormStatus = document.getElementById('task-submission-status-alert');

    if (taskTitleEl) taskTitleEl.textContent = task.title;
    if (taskDescEl) taskDescEl.textContent = task.description;

    if (taskObjectivesEl) {
      taskObjectivesEl.innerHTML = task.objectives.map(obj => `
        <div class="obj-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${obj}</span>
        </div>
      `).join('');
    }

    if (taskInstructionsEl) {
      taskInstructionsEl.innerHTML = task.instructions.map((inst, idx) => `
        <li style="margin-bottom: 8px; font-size: 0.9rem; color: var(--text-secondary);">
          <strong>Step ${idx + 1}:</strong> ${inst}
        </li>
      `).join('');
    }

    if (codeSnippetEl) {
      codeSnippetEl.textContent = task.starterCodeSnippet;
    }

    if (submissionFormStatus) {
      if (state.taskSubmittedToday) {
        submissionFormStatus.className = 'submission-status-alert waiting';
        submissionFormStatus.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          <span><strong>Status: Submitted</strong> — Waiting for Staff Technical Review. Submitted at ${state.todaySubmissionData ? state.todaySubmissionData.time : 'Just now'}.</span>
        `;
      } else {
        submissionFormStatus.className = 'submission-status-alert';
        submissionFormStatus.style.background = 'var(--primary-50)';
        submissionFormStatus.style.color = 'var(--primary-700)';
        submissionFormStatus.style.border = '1px solid var(--primary-200)';
        submissionFormStatus.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span><strong>Action Required:</strong> Submit your solution before the 24h deadline to maintain your 12-day streak.</span>
        `;
      }
    }
  };

  const btnCopyCode = document.getElementById('btn-copy-starter-code');
  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      const code = COMMIT_CODE_DATA.todayTask.starterCodeSnippet;
      navigator.clipboard.writeText(code).then(() => {
        showToast('Starter code copied to clipboard!', 'success');
      });
    });
  }

  const submitTaskForm = document.getElementById('daily-task-submit-form');
  if (submitTaskForm) {
    submitTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const githubInput = document.getElementById('task-github-url-input');
      const notesInput = document.getElementById('task-notes-input');

      if (!githubInput || !githubInput.value.trim()) {
        showToast('Please provide a valid GitHub repository URL', 'info');
        return;
      }

      state.taskSubmittedToday = true;
      state.todaySubmissionData = {
        githubUrl: githubInput.value.trim(),
        notes: notesInput ? notesInput.value.trim() : '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      state.staffQueue.unshift({
        id: `sub-${Date.now().toString().slice(-4)}`,
        studentName: state.student.name,
        studentId: "STU-8842",
        courseName: state.student.courseTitle,
        taskTitle: COMMIT_CODE_DATA.todayTask.title,
        submittedAt: "Just now",
        status: "Pending Review",
        githubUrl: state.todaySubmissionData.githubUrl,
        notes: state.todaySubmissionData.notes || "Completed all Stream API filters and concurrent grouping tests.",
        codeSnippet: `// Submitted by Rahul Sharma\npublic List<Transaction> findTopTransactions(List<Transaction> transactions, String category, int limit) {\n    return transactions.stream()\n        .filter(t -> t.category().equalsIgnoreCase(category))\n        .sorted(Comparator.comparing(Transaction::amount).reversed())\n        .limit(limit)\n        .toList();\n}`
      });

      renderDailyTaskView();
      showToast('Task submitted successfully! Staff review pending.', 'success');
    });
  }

  // =========================================================================
  // Staff Portal View
  // =========================================================================
  const renderStaffPortal = () => {
    const tbody = document.getElementById('staff-submissions-tbody');
    const doubtsContainer = document.getElementById('staff-doubts-list');
    const pendingBadge = document.getElementById('staff-pending-count-badge');

    const pendingList = state.staffQueue.filter(s => s.status === 'Pending Review');
    if (pendingBadge) pendingBadge.textContent = `${pendingList.length} Pending`;

    if (tbody) {
      tbody.innerHTML = state.staffQueue.map(item => `
        <tr>
          <td>
            <div style="font-weight: 700; color: var(--text-primary);">${item.studentName}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${item.studentId} • ${item.courseName}</div>
          </td>
          <td>
            <div style="font-weight: 600; color: var(--text-primary);">${item.taskTitle}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Submitted ${item.submittedAt}</div>
          </td>
          <td>
            <span class="task-meta-pill" style="background: ${item.status === 'Approved' ? '#ECFDF5; color: #059669;' : '#FFFBEB; color: #D97706;'}">
              ${item.status}
            </span>
          </td>
          <td>
            <button class="btn btn-outline btn-sm btn-staff-review" data-sub-id="${item.id}">
              ${item.status === 'Approved' ? 'View Details' : 'Review & Verify'}
            </button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('.btn-staff-review').forEach(btn => {
        btn.addEventListener('click', () => {
          const subId = btn.getAttribute('data-sub-id');
          openStaffReviewModal(subId);
        });
      });
    }

    if (doubtsContainer) {
      doubtsContainer.innerHTML = state.studentDoubts.map(d => `
        <div style="background: var(--bg-surface); border: 1px solid var(--bg-border); border-radius: 12px; padding: 18px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <strong style="color: var(--text-primary); font-size: 0.95rem;">${d.studentName} (${d.courseName})</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${d.timeAgo}</span>
          </div>
          <div style="font-size: 0.8125rem; color: var(--primary-700); font-weight: 700; margin-bottom: 6px;">Ref: ${d.taskRef}</div>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">"${d.question}"</p>
          ${d.status === 'Answered' 
            ? `<div style="background: #ECFDF5; border-left: 3px solid #10B981; padding: 10px 14px; font-size: 0.8125rem; color: #065F46;">
                <strong>Staff Answer:</strong> ${d.answer}
               </div>`
            : `<button class="btn btn-primary btn-sm btn-reply-doubt" data-doubt-id="${d.id}">Reply to Student (SLA < 15m)</button>`
          }
        </div>
      `).join('');

      doubtsContainer.querySelectorAll('.btn-reply-doubt').forEach(btn => {
        btn.addEventListener('click', () => {
          const doubtId = btn.getAttribute('data-doubt-id');
          const doubt = state.studentDoubts.find(x => x.id === doubtId);
          if (doubt) {
            const reply = prompt(`Reply to ${doubt.studentName}'s doubt:\n\n"${doubt.question}"`, "Review the accumulator logic in your collector implementation.");
            if (reply) {
              doubt.status = 'Answered';
              doubt.answer = reply;
              renderStaffPortal();
              showToast(`Reply sent to ${doubt.studentName}!`, 'success');
            }
          }
        });
      });
    }
  };

  const openStaffReviewModal = (subId) => {
    const item = state.staffQueue.find(s => s.id === subId);
    if (!item) return;

    const modal = document.getElementById('modal-staff-review');
    const modalBody = document.getElementById('modal-staff-review-body');
    const approveBtn = document.getElementById('btn-staff-approve-sub');
    const rejectBtn = document.getElementById('btn-staff-reject-sub');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary);">${item.taskTitle}</h3>
          <span class="task-meta-pill" style="background: #EFF6FF; color: #1D4ED8;">${item.studentId}</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-muted);">Student: <strong>${item.studentName}</strong> • Course: <strong>${item.courseName}</strong></p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--bg-border); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 0.775rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">GitHub / Solution Link</div>
        <a href="${item.githubUrl}" target="_blank" style="color: var(--primary-600); font-weight: 600; text-decoration: underline; font-size: 0.9rem; word-break: break-all;">
          ${item.githubUrl}
        </a>
      </div>

      <div style="margin-bottom: 20px;">
        <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Student Submission Notes:</div>
        <p style="font-size: 0.875rem; color: var(--text-secondary); background: var(--bg-surface); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--bg-border-light);">
          ${item.notes}
        </p>
      </div>

      <div>
        <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Code Snapshot / Solution:</div>
        <pre style="background: #0F172A; color: #E2E8F0; padding: 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8125rem; overflow-x: auto;"><code>${item.codeSnippet}</code></pre>
      </div>
    `;

    modal.classList.add('open');

    if (approveBtn) {
      approveBtn.onclick = () => {
        item.status = 'Approved';
        if (item.studentName === state.student.name) {
          state.student.tasksCompleted = 69;
          state.student.progressPercent = 69;
          state.student.tasksRemaining = 31;
          state.student.currentStreak = 13;
        }
        modal.classList.remove('open');
        renderStaffPortal();
        showToast(`Submission by ${item.studentName} approved!`, 'success');
      };
    }

    if (rejectBtn) {
      rejectBtn.onclick = () => {
        const reason = prompt('Specify feedback/reason for revision request:', 'Edge case validation tests were incomplete.');
        if (reason) {
          item.status = 'Revision Requested';
          modal.classList.remove('open');
          renderStaffPortal();
          showToast(`Revision requested for ${item.studentName}.`, 'info');
        }
      };
    }
  };

  // =========================================================================
  // Admin & Executive Dashboard
  // =========================================================================
  const renderAdminDashboard = () => {
    const m = state.adminMetrics;
    const revEl = document.getElementById('admin-kpi-revenue');
    const studentsEl = document.getElementById('admin-kpi-students');
    const compEl = document.getElementById('admin-kpi-completion');
    const permRevEl = document.getElementById('admin-kpi-perm-rev');
    const refundCountEl = document.getElementById('admin-kpi-refund-eligible');

    if (revEl) revEl.textContent = formatINR(m.totalRevenueInr);
    if (studentsEl) studentsEl.textContent = m.totalStudents.toLocaleString();
    if (compEl) compEl.textContent = `${m.completionRatePercent}%`;
    if (permRevEl) permRevEl.textContent = formatINR(m.permissionSalesRevenue);
    if (refundCountEl) refundCountEl.textContent = m.refundEligibleStudents.toLocaleString();

    const chartBox = document.getElementById('admin-revenue-chart-svg');
    if (chartBox) {
      chartBox.innerHTML = `
        <svg viewBox="0 0 600 240" width="100%" height="240" style="overflow: visible;">
          <defs>
            <linearGradient id="gradRevenue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0"/>
            </linearGradient>
            <linearGradient id="gradRefunds" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
            </linearGradient>
          </defs>

          <line x1="40" y1="20" x2="580" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>
          <line x1="40" y1="70" x2="580" y2="70" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>
          <line x1="40" y1="120" x2="580" y2="120" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>
          <line x1="40" y1="170" x2="580" y2="170" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>
          <line x1="40" y1="210" x2="580" y2="210" stroke="#94A3B8" stroke-width="1.5"/>

          <text x="30" y="25" fill="#94A3B8" font-size="11" text-anchor="end">₹3Cr</text>
          <text x="30" y="75" fill="#94A3B8" font-size="11" text-anchor="end">₹2Cr</text>
          <text x="30" y="125" fill="#94A3B8" font-size="11" text-anchor="end">₹1Cr</text>
          <text x="30" y="175" fill="#94A3B8" font-size="11" text-anchor="end">₹50L</text>
          <text x="30" y="215" fill="#94A3B8" font-size="11" text-anchor="end">₹0</text>

          <path d="M 60 180 Q 140 140, 220 110 T 380 60 T 540 30 L 540 210 L 60 210 Z" fill="url(#gradRevenue)"/>
          <path d="M 60 180 Q 140 140, 220 110 T 380 60 T 540 30" fill="none" stroke="#2563EB" stroke-width="3.5"/>

          <path d="M 60 200 Q 140 180, 220 150 T 380 120 T 540 85 L 540 210 L 60 210 Z" fill="url(#gradRefunds)"/>
          <path d="M 60 200 Q 140 180, 220 150 T 380 120 T 540 85" fill="none" stroke="#10B981" stroke-width="3" stroke-dasharray="3 3"/>

          <text x="60" y="230" fill="#64748B" font-size="12" text-anchor="middle">Mar</text>
          <text x="180" y="230" fill="#64748B" font-size="12" text-anchor="middle">Apr</text>
          <text x="300" y="230" fill="#64748B" font-size="12" text-anchor="middle">May</text>
          <text x="420" y="230" fill="#64748B" font-size="12" text-anchor="middle">Jun</text>
          <text x="540" y="230" fill="#64748B" font-size="12" text-anchor="middle">Jul (Curr)</text>
        </svg>
      `;
    }
  };

  // =========================================================================
  // Course Details Modal (With Complete Syllabus & Exact Disclaimer)
  // =========================================================================
  const openCourseDetailsModal = (courseId) => {
    const course = COMMIT_CODE_DATA.courses.find(c => c.id === courseId);
    if (!course) return;

    state.selectedCourseForModal = course;
    const modal = document.getElementById('modal-course-details');
    const modalBody = document.getElementById('modal-course-details-body');
    const modalTitle = document.getElementById('modal-course-details-title');

    if (!modal || !modalBody) return;

    if (modalTitle) modalTitle.textContent = course.title;

    const maxRefund = Math.round(course.price * 0.5);

    modalBody.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <span class="course-cat-tag">${course.mainCategory}</span>
          ${course.subCategory ? `<span class="subcat-chip">${course.subCategory}</span>` : ''}
          <span class="course-promo-badge">${course.level}</span>
          <span class="task-meta-pill" style="background: #EFF6FF; color: #1D4ED8;">⏱ ${course.duration}</span>
          <span class="task-meta-pill" style="background: #ECFDF5; color: #059669;">★ ${course.rating} (${course.reviewCount} reviews)</span>
        </div>
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${course.description}</p>
      </div>

      <!-- Financial Commitment & Potential Refund Card -->
      <div style="background: linear-gradient(135deg, #1E293B, #0F172A); color: #FFFFFF; border-radius: 16px; padding: 24px; margin-bottom: 28px; box-shadow: var(--shadow-md);">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
          <div>
            <div style="font-size: 0.775rem; text-transform: uppercase; color: #94A3B8; font-weight: 700;">Course Fee</div>
            <div style="font-size: 1.85rem; font-weight: 800; color: #FFFFFF;">${formatINR(course.price)}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.775rem; text-transform: uppercase; color: #34D399; font-weight: 700;">Potential Completion Refund</div>
            <div style="font-size: 1.85rem; font-weight: 800; color: #34D399;">Up to ${formatINR(maxRefund)}</div>
          </div>
        </div>
        <div style="font-size: 0.8125rem; color: #E2E8F0; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 14px;">
          <strong>Refund Policy Notice:</strong><br>
          “Complete 100% of the defined course requirements and become eligible for a completion refund of up to 50%, subject to the course Refund Policy and Terms & Conditions. Eligibility is subject to course completion requirements and Refund Policy.”
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px;">
        <div style="background: var(--bg-surface); padding: 14px; border-radius: 10px; border: 1px solid var(--bg-border); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">DAILY TASKS</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-700);">${course.tasks || course.dailyTasks}</div>
        </div>
        <div style="background: var(--bg-surface); padding: 14px; border-radius: 10px; border: 1px solid var(--bg-border); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">MODULES</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--purple-700);">${course.modules || course.modulesCount || 4}</div>
        </div>
        <div style="background: var(--bg-surface); padding: 14px; border-radius: 10px; border: 1px solid var(--bg-border); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">RECORDED VIDEOS</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--cyan-700);">${course.videos || course.recordedVideos}</div>
        </div>
        <div style="background: var(--bg-surface); padding: 14px; border-radius: 10px; border: 1px solid var(--bg-border); text-align: center;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">PERMISSIONS</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--emerald-600);">5 Free</div>
        </div>
      </div>

      <!-- What You Will Learn -->
      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 14px;">What You Will Learn</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${course.outcomes ? course.outcomes.map(o => `
            <div style="display: flex; gap: 8px; font-size: 0.875rem; color: var(--text-secondary);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" style="flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${o}</span>
            </div>
          `).join('') : '<p>Comprehensive hands-on curriculum covered daily.</p>'}
        </div>
      </div>

      <!-- Curriculum Syllabus Accordion -->
      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 14px;">Course Curriculum & Practical Modules</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${course.curriculum ? course.curriculum.map((mod) => `
            <div style="background: var(--bg-surface); border: 1px solid var(--bg-border); border-radius: 10px; padding: 14px 18px;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                <span>${mod.module}</span>
                <span style="font-size: 0.775rem; color: var(--primary-700);">${mod.lessons}</span>
              </div>
              <ul style="padding-left: 16px; list-style-type: disc; font-size: 0.8125rem; color: var(--text-muted);">
                ${mod.topics.map(t => `<li style="margin-bottom: 3px;">${t}</li>`).join('')}
              </ul>
            </div>
          `).join('') : '<p>Detailed module syllabus available upon enrollment.</p>'}
        </div>
      </div>

      <!-- Staff Mentorship & SLA -->
      <div style="background: var(--primary-50); border: 1px solid var(--primary-200); border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 16px;">
        <div style="width: 44px; height: 44px; background: var(--primary-600); color: #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div>
          <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-900);">Dedicated Staff Mentorship (15-Min SLA) & 5 Free Permissions</h5>
          <p style="font-size: 0.8125rem; color: var(--primary-700);">Every task is evaluated by staff. 5 free permissions protect you against emergency disruptions.</p>
        </div>
      </div>
    `;

    modal.classList.add('open');

    const enrollFromModalBtn = document.getElementById('btn-enroll-from-modal');
    if (enrollFromModalBtn) {
      enrollFromModalBtn.onclick = () => {
        modal.classList.remove('open');
        openEnrollmentModal(course.id);
      };
    }
  };

  // =========================================================================
  // Enrollment Checkout Modal
  // =========================================================================
  const openEnrollmentModal = (courseId) => {
    const course = COMMIT_CODE_DATA.courses.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById('modal-enroll');
    const modalBody = document.getElementById('modal-enroll-body');
    if (!modal || !modalBody) return;

    const maxRefund = Math.round(course.price * 0.5);

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">${course.title}</h4>
        <p style="font-size: 0.875rem; color: var(--text-muted);">${course.mainCategory} • ${course.duration} • ${course.tasks || course.dailyTasks} Daily Tasks • 5 Free Permissions</p>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--bg-border); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9375rem;">
          <span style="color: var(--text-secondary);">Course Tuition Fee</span>
          <strong style="color: var(--text-primary);">${formatINR(course.price)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9375rem;">
          <span style="color: var(--text-secondary);">5 Free Permissions Included</span>
          <strong style="color: #059669;">FREE (₹0)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 0.9375rem; border-top: 1px solid var(--bg-border-light); padding-top: 10px;">
          <span style="font-weight: 700; color: var(--text-primary);">Total Payable Today</span>
          <strong style="font-size: 1.35rem; color: var(--primary-700); font-weight: 800;">${formatINR(course.price)}</strong>
        </div>
        <div style="background: var(--emerald-50); border: 1px solid var(--emerald-200); border-radius: 8px; padding: 10px 14px; font-size: 0.8125rem; color: #065F46;">
          <strong>Potential Completion Refund:</strong> Complete 100% of defined daily tasks to earn back <strong>Up to ${formatINR(maxRefund)}</strong> upon verified course completion. Eligibility is subject to course completion requirements and Refund Policy.
        </div>
      </div>

      <form id="form-mock-enroll">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" required value="${state.student.name}" placeholder="Your full legal name">
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" required value="${state.student.email}" placeholder="you@company.com">
        </div>
        <div class="form-group">
          <label class="form-label">Payment Method</label>
          <select class="form-input">
            <option>UPI / Net Banking / Credit Card (Instant Unlock)</option>
            <option>Corporate Sponsorship Invoice</option>
          </select>
        </div>

        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: flex-start;">
          <input type="checkbox" id="enroll-tc-agree" required style="margin-top: 4px;">
          <label for="enroll-tc-agree" style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
            I acknowledge that completion refund eligibility is contingent upon 100% verified task completion and adhering to the 5-permission policy. I understand this is not guaranteed income or a financial loan product. Eligibility is subject to course completion requirements and Refund Policy.
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem;">
          Complete Enrollment & Start Day 1
        </button>
      </form>
    `;

    modal.classList.add('open');

    const form = document.getElementById('form-mock-enroll');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        modal.classList.remove('open');
        state.student.enrolledCourseId = course.id;
        state.student.courseTitle = course.title;
        state.student.mainCategory = course.mainCategory;
        state.student.courseFee = course.price;
        state.student.totalTasks = course.tasks || course.dailyTasks;
        state.student.maxEligibleRefund = maxRefund;
        state.student.tasksCompleted = 0;
        state.student.tasksRemaining = course.tasks || course.dailyTasks;
        state.student.progressPercent = 0;
        state.student.currentStreak = 1;
        state.student.permissionsRemaining = 5;
        state.student.permissionsUsed = 0;

        showToast(`Successfully enrolled in ${course.title}! Welcome aboard.`, 'success');
        switchView('student-dashboard');
      };
    }
  };

  // Close Modals Helper
  document.querySelectorAll('.modal-close-btn, .btn-modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  // Ask Staff a Doubt Drawer / Modal
  const btnAskDoubt = document.getElementById('btn-ask-staff-doubt');
  if (btnAskDoubt) {
    btnAskDoubt.addEventListener('click', () => {
      const modal = document.getElementById('modal-ask-doubt');
      if (modal) modal.classList.add('open');
    });
  }

  const formDoubt = document.getElementById('form-submit-doubt');
  if (formDoubt) {
    formDoubt.addEventListener('submit', (e) => {
      e.preventDefault();
      const questionInput = document.getElementById('doubt-question-input');
      if (!questionInput || !questionInput.value.trim()) return;

      const newDoubt = {
        id: `doubt-${Date.now().toString().slice(-4)}`,
        studentName: state.student.name,
        courseName: state.student.courseTitle,
        taskRef: COMMIT_CODE_DATA.todayTask.title.split('—')[0].trim(),
        question: questionInput.value.trim(),
        timeAgo: "Just now",
        status: "Unanswered",
        urgency: "Medium"
      };

      state.studentDoubts.unshift(newDoubt);
      questionInput.value = '';
      
      const modal = document.getElementById('modal-ask-doubt');
      if (modal) modal.classList.remove('open');

      showToast('Doubt submitted! Staff will respond within 15 minutes.', 'success');
      
      setTimeout(() => {
        newDoubt.status = 'Answered';
        newDoubt.answer = "Staff Mentor Verified: For your question on stream filtering, make sure your collector uses `Collectors.toMap` with a merge function for duplicates.";
        showToast(`Staff responded to your doubt on ${newDoubt.taskRef}!`, 'info');
      }, 6000);
    });
  }

  // Permission Store / Request Modal
  const btnBuyPermissions = document.querySelectorAll('.btn-trigger-buy-permissions');
  btnBuyPermissions.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('modal-buy-permissions');
      if (modal) modal.classList.add('open');
    });
  });

  const formBuyPerm = document.getElementById('form-purchase-permission');
  if (formBuyPerm) {
    formBuyPerm.addEventListener('submit', (e) => {
      e.preventDefault();
      const countSelect = document.getElementById('perm-purchase-qty');
      const count = parseInt(countSelect.value || 1);

      state.student.totalPermissions += count;
      state.student.permissionsRemaining += count;
      state.student.purchasedPermissions += count;

      state.permissionHistory.push({
        id: `perm-${state.student.totalPermissions}`,
        date: new Date().toISOString().split('T')[0],
        dayNumber: COMMIT_CODE_DATA.todayTask.dayNumber,
        reason: "Purchased Supplementary Flexibility Permission",
        status: "Available",
        type: "Purchased"
      });

      const modal = document.getElementById('modal-buy-permissions');
      if (modal) modal.classList.remove('open');

      renderPermissionShowcase();
      renderStudentDashboard();
      showToast(`Added ${count} supplemental permission(s) to your balance!`, 'success');
    });
  }

  const btnUsePermSim = document.getElementById('btn-use-permission-sim');
  if (btnUsePermSim) {
    btnUsePermSim.addEventListener('click', () => {
      if (state.student.permissionsRemaining <= 0) {
        showToast('You have 0 permissions remaining. Please purchase additional permissions.', 'info');
        return;
      }

      state.student.permissionsRemaining--;
      state.student.permissionsUsed++;
      state.timerSeconds += 86400; // Add 24 hours

      state.permissionHistory.push({
        id: `perm-${state.student.permissionsUsed}`,
        date: new Date().toISOString().split('T')[0],
        dayNumber: COMMIT_CODE_DATA.todayTask.dayNumber,
        reason: "Activated 24-Hour Emergency Task Extension",
        status: "Used",
        type: "Self-Service"
      });

      renderPermissionShowcase();
      renderStudentDashboard();
      showToast('Permission activated! 24-hour extension applied without streak penalty.', 'success');
    });
  }

  // =========================================================================
  // FAQ Accordion
  // =========================================================================
  const renderFAQs = () => {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;

    container.innerHTML = COMMIT_CODE_DATA.faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <button class="faq-question-btn">
          <span>${faq.question}</span>
          <svg class="faq-chevron-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer-pane">
          <p class="faq-answer-text">${faq.answer}</p>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  };

  // =========================================================================
  // Testimonials Rendering
  // =========================================================================
  const renderTestimonials = () => {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = COMMIT_CODE_DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <span class="sample-badge-tag">Sample Testimonial</span>
        <p class="test-quote-text">"${t.quote}"</p>
        <div class="test-user-row">
          <img src="${t.avatar}" alt="${t.name}" class="test-user-avatar">
          <div>
            <div class="test-user-name">${t.name}</div>
            <div class="test-user-role">${t.role} • ${t.course}</div>
          </div>
        </div>
        <div class="test-outcome-pill">
          <span>${t.refundReceived}</span>
          <span>🔥 ${t.streakRecord}</span>
        </div>
      </div>
    `).join('');
  };

  // =========================================================================
  // Initialization Sequence
  // =========================================================================
  setupNavDropdowns();
  renderLearningPathCards();
  renderCareerGoals();
  renderTopMarketplaceCategoryCards();
  renderCatalogSectionTabs();
  renderCategoryPills();
  renderCourses();
  initRefundCalculator();
  renderPermissionShowcase();
  renderTestimonials();
  renderFAQs();
  startCountdownTimer();
  renderStudentDashboard();
  renderDailyTaskView();
  renderStaffPortal();
  renderAdminDashboard();
});
