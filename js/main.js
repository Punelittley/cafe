/**
 * Грузинское кафе «Счастье Саперави» (г. Пермь)
 * Главный скрипт: фотоменю, фильтрация по категориям, админка и синхронизация с Redis
 */

// Базовые данные меню по умолчанию с богатым выбором для всех категорий
// Базовые данные меню по умолчанию в стиле референса
const DEFAULT_MENU_DATA = [
  // Хачапури и Хинкали
  {
    id: 'khinkali-tel-svin',
    title: 'Хинкали с телятиной и свининой',
    category: 'khinkali',
    categoryName: 'Хачапури и хинкали',
    price: 330,
    weight: '3 шт. / 280 г',
    desc: 'Настоящие грузинские хинкали с сочной начинкой и ароматным бульоном внутри',
    image: 'assets/images/khinkali.jpg',
    badge: 'ХИТ',
    badgeType: 'hit'
  },
  {
    id: 'khachapuri-megruli',
    title: 'Хачапури Мегрули',
    category: 'khinkali',
    categoryName: 'Хачапури и хинкали',
    price: 450,
    weight: '350 г',
    desc: 'Традиционный грузинский хачапури с двойным слоем сыра и нежным тестом',
    image: 'assets/images/khachapuri-megruli.jpg',
    badge: 'ЛИДЕР ПРОДАЖ',
    badgeType: 'leader'
  },
  {
    id: 'khachapuri-penovani',
    title: 'Хачапури Пеновани Тбилисский',
    category: 'khinkali',
    categoryName: 'Хачапури и хинкали',
    price: 370,
    weight: '250 г',
    desc: 'Сытный грузинский пирог с сочной начинкой и золотистой корочкой',
    image: 'assets/images/khachapuri-penovani.jpg',
    badge: 'НОВИНКА',
    badgeType: 'new'
  },
  {
    id: 'khachapuri-spinach',
    title: 'Аджарская со шпинатом',
    category: 'khinkali',
    categoryName: 'Хачапури и хинкали',
    price: 550,
    weight: '320 г',
    desc: 'Аджарский хачапури с сыром, шпинатом и яйцом',
    image: 'assets/images/khachapuri-spinach.jpg',
    badge: 'НОВИНКА',
    badgeType: 'new'
  },

  // Горячие блюда и Гриль
  {
    id: 'chicken-tapaka',
    title: 'Цыпленок Тапака',
    category: 'hot',
    categoryName: 'Горячие блюда',
    price: 950,
    weight: '450 г',
    desc: 'Маринованный цыпленок по-грузински, обжаренный до золотистой корочки, подается с отварным картофелем и соусом ткемали',
    image: 'assets/images/chicken-tapaka.jpg',
    badge: 'ХИТ',
    badgeType: 'hit'
  },
  {
    id: 'shashlik-pork',
    title: 'Шашлык из свиной шеи',
    category: 'hot',
    categoryName: 'Горячие блюда',
    price: 490,
    weight: '200 / 50 / 30 г',
    desc: 'Сочный и ароматный шашлык из отборного мяса с грузинскими специями',
    image: 'assets/images/shashlyk.jpg',
    badge: '',
    badgeType: ''
  },
  {
    id: 'steak-salmon',
    title: 'Стейк из лосося с овощами гриль',
    category: 'hot',
    categoryName: 'Горячие блюда',
    price: 550,
    weight: '100 г / 290 ₽ овощи',
    desc: 'Стейк атлантического лосося на гриле с лимоном, свежим укропом, сезонными овощами и белым соусом.',
    image: 'assets/images/salmon-steak.jpg',
    badge: 'ШЕФ-ВЫБОР',
    badgeType: 'hit'
  },
  {
    id: 'trout-grill',
    title: 'Форель гриль с соусом мацони',
    category: 'hot',
    categoryName: 'Горячие блюда',
    price: 400,
    weight: 'за 100 г',
    desc: 'Цельная радужная форель, запеченная на решетке с пряными травами, рукколой и домашним соусом мацони.',
    image: 'assets/images/trout-grill.jpg',
    badge: 'НА ГРИЛЕ',
    badgeType: 'leader'
  },

  // Супы
  {
    id: 'kharcho-veal',
    title: 'Харчо из телятины',
    category: 'soups',
    categoryName: 'Супы',
    price: 590,
    weight: '350 мл',
    desc: 'Густой суп из отборной телятины с рисом, грецкими орехами, ткемали, свежей кинзой и перчиком чили.',
    image: 'assets/images/kharcho.jpg',
    badge: 'ТРАДИЦИЯ',
    badgeType: 'gold'
  },
  {
    id: 'borsh-trad',
    title: 'Традиционный домашний суп',
    category: 'soups',
    categoryName: 'Супы',
    price: 450,
    weight: '350 мл',
    desc: 'Наваристый мясной суп со сметаной, свежей зеленью и хрустящим чесночным лавашом.',
    image: 'assets/images/borsh.png',
    badge: 'НАВАРИСТЫЙ',
    badgeType: 'gold'
  },

  // Холодные закуски и Салаты
  {
    id: 'salmon-salad',
    title: 'Салат «Лосось слабой соли»',
    category: 'salads',
    categoryName: 'Холодные закуски',
    price: 780,
    weight: '240 г',
    desc: 'Слайсы слабосоленого лосося с миксом хрустящей зелени, томатами черри, персиком и сырным кремом.',
    image: 'assets/images/salmon-salad.jpg',
    badge: 'ПРЕМИУМ',
    badgeType: 'hit'
  },
  {
    id: 'adyghe-cheese',
    title: 'Жареный Адыгейский сыр с вялеными томатами',
    category: 'salads',
    categoryName: 'Холодные закуски',
    price: 430,
    weight: '200 г',
    desc: 'Ломтики сыра на гриле с пикантными вялеными томатами, свежим базиликом и зёрнами граната.',
    image: 'assets/images/adyghe-cheese.jpg',
    badge: 'ЗАКУСКА',
    badgeType: 'gold'
  }
];

const DEFAULT_LUNCH_INFO = {
  activeWeek: 'Текущая неделя (Пн–Пт, 12:00 – 16:00)',
  discountText: '-15% на основное меню по будням',
  items: [
    { title: 'Грузинский салат со свежими томатами и зеленью', weight: '150 г' },
    { title: 'Суп Харчо из телятины / Куриный суп с лапшой', weight: '250 мл' },
    { title: 'Люля-кебаб из цыпленка с соусом сацебели', weight: '120/100 г' },
    { title: 'Мини-хачапури по-имеретински / Свежий лаваш', weight: '120 г' },
    { title: 'Горный чай с чабрецом / Домашний морс', weight: '200 мл' }
  ]
};

const AppState = {
  menu: [],
  lunch: {},
  cloudConfig: {
    enabled: false,
    restUrl: '',
    restToken: ''
  },
  currentCategory: 'all',
  searchQuery: '',
  isAdminLoggedIn: false
};

document.addEventListener('DOMContentLoaded', async () => {
  loadLocalData();
  initNavbar();
  initOpenStatus();
  initMenuRenderer();
  initBookingModal();
  initLightbox();
  initEventSlider();
  initAdminModule();
  initSmoothScroll();

  await syncFromCloudRedis();
});

function initOpenStatus() {
  const statusEl = document.getElementById('contact-live-status');
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTotalMin = hours * 60 + minutes;

  const isWeekend = (day === 0 || day === 6);
  const openMin = isWeekend ? (12 * 60) : (10 * 60);
  const closeMin = 24 * 60;

  const isOpen = (currentTotalMin >= openMin && currentTotalMin < closeMin);

  if (isOpen) {
    statusEl.className = 'contact-status-live';
    statusEl.innerHTML = '<span class="status-dot-pulse"></span> Открыто до 00:00';
  } else {
    statusEl.className = 'contact-status-live closed';
    const nextOpen = isWeekend ? '12:00' : '10:00';
    statusEl.innerHTML = `<span class="status-dot-pulse"></span> Откроемся в ${nextOpen}`;
  }
}

function loadLocalData() {
  try {
    const MENU_VERSION = 'v7_added_chicken_khachapuri';
    const savedVersion = localStorage.getItem('saperavi_menu_version');
    const savedMenu = localStorage.getItem('saperavi_menu_data');

    if (savedMenu && savedVersion === MENU_VERSION) {
      const parsed = JSON.parse(savedMenu);
      if (Array.isArray(parsed) && parsed.length > 0) {
        AppState.menu = parsed;
      } else {
        AppState.menu = [...DEFAULT_MENU_DATA];
      }
    } else {
      AppState.menu = [...DEFAULT_MENU_DATA];
      localStorage.setItem('saperavi_menu_data', JSON.stringify(AppState.menu));
      localStorage.setItem('saperavi_menu_version', MENU_VERSION);
      // Если есть конфиг облака, автоматически обновим и там при старте
      setTimeout(() => {
        if (AppState.cloudConfig && AppState.cloudConfig.enabled) {
          saveToCloudRedis().then(() => console.log('Defaults synced to cloud after version bump'));
        }
      }, 2000);
    }

    const savedLunch = localStorage.getItem('saperavi_lunch_info');
    AppState.lunch = savedLunch ? JSON.parse(savedLunch) : { ...DEFAULT_LUNCH_INFO };

    const savedCloud = localStorage.getItem('saperavi_cloud_config');
    if (savedCloud) {
      AppState.cloudConfig = JSON.parse(savedCloud);
    }
  } catch (e) {
    console.error('Ошибка загрузки локальных данных:', e);
    AppState.menu = [...DEFAULT_MENU_DATA];
    AppState.lunch = { ...DEFAULT_LUNCH_INFO };
  }
}

async function saveData() {
  try {
    localStorage.setItem('saperavi_menu_data', JSON.stringify(AppState.menu));
    localStorage.setItem('saperavi_lunch_info', JSON.stringify(AppState.lunch));
    localStorage.setItem('saperavi_cloud_config', JSON.stringify(AppState.cloudConfig));

    if (AppState.cloudConfig.enabled && AppState.cloudConfig.restUrl && AppState.cloudConfig.restToken) {
      await saveToCloudRedis();
    }
  } catch (e) {
    console.error('Ошибка сохранения данных:', e);
  }
}

async function syncFromCloudRedis() {
  if (!AppState.cloudConfig.enabled || !AppState.cloudConfig.restUrl || !AppState.cloudConfig.restToken) {
    return;
  }

  try {
    const url = `${AppState.cloudConfig.restUrl.replace(/\/$/, '')}/get/saperavi_menu_data`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AppState.cloudConfig.restToken}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        const cloudMenu = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        if (Array.isArray(cloudMenu) && cloudMenu.length > 0) {
          AppState.menu = cloudMenu;
          localStorage.setItem('saperavi_menu_data', JSON.stringify(cloudMenu));
          if (window.refreshMenuGrid) window.refreshMenuGrid();
        }
      }
    }
  } catch (err) {
    console.warn('Локальный режим (Redis не настроен):', err);
  }
}

async function saveToCloudRedis() {
  if (!AppState.cloudConfig.restUrl || !AppState.cloudConfig.restToken) return false;

  try {
    const url = `${AppState.cloudConfig.restUrl.replace(/\/$/, '')}/set/saperavi_menu_data`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AppState.cloudConfig.restToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([JSON.stringify(AppState.menu)])
    });

    return res.ok;
  } catch (e) {
    console.error('Ошибка отправки в Redis:', e);
    return false;
  }
}

function initNavbar() {
  const navbar = document.querySelector('.site-navbar');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-links-list');
  const navLinks = document.querySelectorAll('.nav-item-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== toggleBtn) {
        navMenu.classList.remove('open');
        toggleBtn.textContent = '☰';
      }
    });
  }
}

// Глобальная функция фильтрации по категории для 100% надежности клика
window.setMenuCategory = function(cat, btnEl) {
  AppState.currentCategory = cat || 'all';

  const allBtns = document.querySelectorAll('.cat-icon-tab-btn, .cat-pill-btn');
  allBtns.forEach(b => b.classList.remove('active'));

  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    allBtns.forEach(b => {
      if (b.dataset.category === cat) b.classList.add('active');
    });
  }

  if (window.refreshMenuGrid) {
    window.refreshMenuGrid();
  }
};

function initMenuRenderer() {
  const container = document.getElementById('menu-items-grid');
  const filterBtns = document.querySelectorAll('.cat-icon-tab-btn, .cat-pill-btn');
  const searchInput = document.getElementById('menu-search-input');

  function render() {
    if (!container) return;

    let items = AppState.menu;

    if (AppState.currentCategory !== 'all') {
      items = items.filter(item => item.category === AppState.currentCategory);
    }

    if (AppState.searchQuery.trim()) {
      const q = AppState.searchQuery.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q)
      );
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--c-paper-300);">
          <p style="font-size: 1.05rem; color: var(--c-text-muted); margin-bottom: 10px;">В этой категории пока нет позиций</p>
          <button class="btn btn-outline-dark" onclick="window.setMenuCategory('all')">Показать все меню</button>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(dish => {
      return `
        <div class="dish-gastro-card" data-id="${dish.id}">
          <div class="dish-photo-frame">
            <img src="${dish.image}" alt="${escapeHtml(dish.title)}" class="dish-photo" loading="lazy" onerror="this.src='assets/images/brand-card.jpg'">

            <!-- Золотая плавная волна разделитель -->
            <div class="dish-wave-divider">
              <svg viewBox="0 0 400 36" preserveAspectRatio="none" class="dish-wave-svg">
                <path d="M0,20 C120,38 280,0 400,22 L400,36 L0,36 Z" fill="#ffffff"/>
                <path d="M0,20 C120,38 280,0 400,22" fill="none" stroke="#d4af37" stroke-width="1.8" opacity="0.85"/>
              </svg>
            </div>
          </div>

          <div class="dish-gastro-body">
            <div>
              <h3 class="dish-title-text">${escapeHtml(dish.title)}</h3>
              <p class="dish-desc-text">${escapeHtml(dish.desc)}</p>
            </div>

            <div class="dish-card-foot">
              <div class="dish-price-val">${dish.price} ₽</div>
              <button class="dish-quick-order-pill" onclick="openOrderForDish('${dish.id}')">
                <span>Подробнее</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const cat = this.getAttribute('data-category') || 'all';
      window.setMenuCategory(cat, this);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      render();
    });
  }

  window.resetMenuFilter = function() {
    window.setMenuCategory('all');
    if (searchInput) searchInput.value = '';
  };

  window.refreshMenuGrid = render;
  render();
}

function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('booking-modal-close');

  window.openBookingModal = function(title = 'Кафе «Счастье Саперави»', sub = 'Позвоните нам или напишите в удобный мессенджер — быстро забронируем столик или примем заказ!') {
    if (!modal) return;
    const titleEl = document.getElementById('booking-modal-title');
    const subEl = document.getElementById('booking-modal-sub');
    if (titleEl && title) titleEl.textContent = title;
    if (subEl && sub) subEl.textContent = sub;
    modal.classList.add('active');
  };

  window.closeBookingModal = function() {
    if (modal) modal.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeBookingModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBookingModal();
    });
  }

  window.openOrderForDish = function(dishId) {
    const dish = AppState.menu.find(d => d.id === dishId);
    if (dish) {
      openBookingModal(`Заказ: «${dish.title}»`, `Стоимость: ${dish.price} ₽. Позвоните нам или напишите в WhatsApp / соцсети для оформления заказа:`);
    } else {
      openBookingModal('Оформление заказа', 'Позвоните нам или напишите в WhatsApp:');
    }
  };
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  const galleryItems = document.querySelectorAll('.gallery-tile');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-tile-text')?.textContent || '';
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
      }
    });
  });

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }
}

function initAdminModule() {
  const trigger = document.getElementById('admin-trigger-btn');
  const modal = document.getElementById('admin-modal');
  const closeBtn = document.getElementById('admin-modal-close');
  const contentArea = document.getElementById('admin-content-area');

  const ADMIN_PIN = '7777';
  let currentAdminTab = 'menu';

  if (trigger) {
    trigger.addEventListener('click', () => {
      if (!AppState.isAdminLoggedIn) {
        const pin = prompt('Введите пароль администратора (по умолчанию: 7777):');
        if (pin === ADMIN_PIN || pin === 'saperavi') {
          AppState.isAdminLoggedIn = true;
          openAdminModal();
        } else if (pin !== null) {
          alert('Неверный пароль!');
        }
      } else {
        openAdminModal();
      }
    });
  }

  function openAdminModal() {
    if (!modal) return;
    modal.classList.add('active');
    renderAdminUI();
  }

  function closeAdminModal() {
    if (modal) modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeAdminModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAdminModal();
    });
  }

  function renderAdminUI() {
    if (!contentArea) return;

    contentArea.innerHTML = `
      <div class="admin-tabs">
        <button class="admin-tab-btn ${currentAdminTab === 'menu' ? 'active' : ''}" onclick="switchAdminTab('menu')">Меню и цены</button>
        <button class="admin-tab-btn ${currentAdminTab === 'redis' ? 'active' : ''}" onclick="switchAdminTab('redis')">Облачная БД Redis</button>
      </div>

      ${currentAdminTab === 'menu' ? renderMenuTabHTML() : renderRedisTabHTML()}
    `;
  }

  window.switchAdminTab = function(tab) {
    currentAdminTab = tab;
    renderAdminUI();
  };

  function renderMenuTabHTML() {
    const cloudBadge = AppState.cloudConfig.enabled 
      ? '<span style="color: #15803d; font-weight: 600; font-size: 0.82rem;">Синхронизация с Redis активна</span>'
      : '<span style="color: #888; font-size: 0.82rem;">Локальный режим</span>';

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
        <div>
          <h4 style="font-size: 1rem; color: var(--c-wine-900); display: inline-block; margin-right: 10px;">Позиции меню</h4>
          ${cloudBadge}
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-wine" style="padding: 5px 12px; font-size: 0.8rem;" onclick="addNewDishPrompt()">+ Блюдо</button>
          <button class="btn btn-outline-dark" style="padding: 5px 12px; font-size: 0.8rem;" onclick="exportMenuJson()">Скачать JSON</button>
          <button class="btn btn-outline-dark" style="padding: 5px 12px; font-size: 0.8rem;" onclick="resetToDefaults()">Сброс</button>
        </div>
      </div>

      <div style="overflow-x: auto; max-height: 420px; overflow-y: auto;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена (₽)</th>
              <th>Граммовка</th>
              <th>Ссылка на фото / видео</th>
              <th>Бейдж</th>
              <th>✕</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.menu.map((item, idx) => `
              <tr>
                <td><input type="text" class="admin-editable-input" value="${escapeHtml(item.title)}" onchange="updateMenuItem(${idx}, 'title', this.value)"></td>
                <td>
                  <select class="admin-editable-input" onchange="updateMenuItem(${idx}, 'category', this.value)">
                    <option value="khinkali" ${item.category === 'khinkali' ? 'selected' : ''}>Хинкали / Хачапури</option>
                    <option value="hot" ${item.category === 'hot' ? 'selected' : ''}>Горячее / Гриль</option>
                    <option value="soups" ${item.category === 'soups' ? 'selected' : ''}>Супы</option>
                    <option value="salads" ${item.category === 'salads' ? 'selected' : ''}>Салаты / Закуски</option>
                  </select>
                </td>
                <td style="width: 85px;"><input type="number" class="admin-editable-input" value="${item.price}" onchange="updateMenuItem(${idx}, 'price', Number(this.value))"></td>
                <td style="width: 100px;"><input type="text" class="admin-editable-input" value="${escapeHtml(item.weight || '')}" onchange="updateMenuItem(${idx}, 'weight', this.value)"></td>
                <td style="width: 140px;"><input type="text" class="admin-editable-input" placeholder="URL фото" value="${escapeHtml(item.image || '')}" onchange="updateMenuItem(${idx}, 'image', this.value)"></td>
                <td style="width: 90px;"><input type="text" class="admin-editable-input" value="${escapeHtml(item.badge || '')}" onchange="updateMenuItem(${idx}, 'badge', this.value)"></td>
                <td style="width: 35px;"><button style="color: #c62828; cursor: pointer; background: none; font-weight: bold;" onclick="deleteMenuItem(${idx})">✕</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p style="font-size: 0.78rem; color: var(--c-text-muted); margin-top: 8px;">
        Изменения сохраняются моментально и сразу обновляются для всех гостей сайта.
      </p>
    `;
  }

  function renderRedisTabHTML() {
    return `
      <div style="background: var(--c-paper-100); padding: 16px; border-radius: var(--radius-xs); border: 1px solid var(--c-paper-200); margin-bottom: 16px;">
        <h4 style="color: var(--c-wine-900); font-size: 0.95rem; margin-bottom: 4px;">Настройка Upstash Redis</h4>
        <p style="font-size: 0.82rem; color: var(--c-text-muted); line-height: 1.4;">
          1. Зарегистрируйтесь на <a href="https://upstash.com" target="_blank" style="color: var(--c-wine-800); text-decoration: underline; font-weight: 600;">Upstash.com</a>.<br>
          2. Создайте базу данных Redis и прокрутите вниз до раздела <strong>REST API</strong>.<br>
          3. Скопируйте <code>UPSTASH_REDIS_REST_URL</code> и <code>UPSTASH_REDIS_REST_TOKEN</code>.
        </p>
      </div>

      <div class="form-field">
        <label class="form-label-title">UPSTASH_REDIS_REST_URL:</label>
        <input type="text" id="redis-url-input" class="form-input-el" placeholder="https://xxxx.upstash.io" value="${escapeHtml(AppState.cloudConfig.restUrl)}">
      </div>

      <div class="form-field">
        <label class="form-label-title">UPSTASH_REDIS_REST_TOKEN:</label>
        <input type="password" id="redis-token-input" class="form-input-el" placeholder="AXXX..." value="${escapeHtml(AppState.cloudConfig.restToken)}">
      </div>

      <div class="form-field">
        <label class="calc-check-box" style="background: #ffffff; border: 1px solid var(--c-paper-200);">
          <input type="checkbox" id="redis-enable-check" ${AppState.cloudConfig.enabled ? 'checked' : ''}>
          <span>Включить синхронизацию меню через облако Redis</span>
        </label>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
        <button class="btn btn-wine" onclick="saveRedisSettings()">Сохранить и отправить меню в Redis</button>
        <button class="btn btn-outline-dark" onclick="testRedisConnection()">Проверить связь</button>
      </div>

      <div id="redis-status-msg" style="margin-top: 10px; font-size: 0.84rem; font-weight: 600;"></div>
    `;
  }

  window.saveRedisSettings = async function() {
    const url = document.getElementById('redis-url-input')?.value.trim() || '';
    const token = document.getElementById('redis-token-input')?.value.trim() || '';
    const enabled = document.getElementById('redis-enable-check')?.checked || false;

    AppState.cloudConfig = { enabled, restUrl: url, restToken: token };
    localStorage.setItem('saperavi_cloud_config', JSON.stringify(AppState.cloudConfig));

    const statusEl = document.getElementById('redis-status-msg');
    if (statusEl) statusEl.innerHTML = 'Отправляем меню в Redis...';

    if (enabled && url && token) {
      const ok = await saveToCloudRedis();
      if (ok) {
        if (statusEl) statusEl.innerHTML = '<span style="color: #15803d;">Меню успешно выгружено в Redis и доступно всем гостям!</span>';
      } else {
        if (statusEl) statusEl.innerHTML = '<span style="color: #c62828;">Ошибка: проверьте URL и Token!</span>';
      }
    } else {
      if (statusEl) statusEl.innerHTML = '<span style="color: #666;">Настройки сохранены локально.</span>';
    }
  };

  window.testRedisConnection = async function() {
    const statusEl = document.getElementById('redis-status-msg');
    if (statusEl) statusEl.innerHTML = 'Проверяем связь...';

    const url = document.getElementById('redis-url-input')?.value.trim() || '';
    const token = document.getElementById('redis-token-input')?.value.trim() || '';

    if (!url || !token) {
      if (statusEl) statusEl.innerHTML = '<span style="color: #c62828;">Введите URL и Token!</span>';
      return;
    }

    try {
      const res = await fetch(`${url.replace(/\/$/, '')}/ping`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.result === 'PONG') {
          if (statusEl) statusEl.innerHTML = '<span style="color: #15803d;">Соединение успешно (PONG)! База Redis работает.</span>';
          return;
        }
      }
      if (statusEl) statusEl.innerHTML = '<span style="color: #c62828;">Не удалось подключиться к Redis. Проверьте токен.</span>';
    } catch (e) {
      if (statusEl) statusEl.innerHTML = `<span style="color: #c62828;">Ошибка сети: ${e.message}</span>`;
    }
  };

  window.updateMenuItem = function(idx, field, value) {
    if (AppState.menu[idx]) {
      AppState.menu[idx][field] = value;
      saveData();
      window.refreshMenuGrid();
    }
  };

  window.deleteMenuItem = function(idx) {
    if (confirm(`Удалить блюдо «${AppState.menu[idx].title}»?`)) {
      AppState.menu.splice(idx, 1);
      saveData();
      window.refreshMenuGrid();
      renderAdminUI();
    }
  };

  window.addNewDishPrompt = function() {
    const title = prompt('Введите название нового блюда:');
    if (!title) return;
    const price = parseInt(prompt('Введите цену (₽):') || '0', 10);
    const weight = prompt('Граммовка/порция:') || '250 г';
    const image = prompt('Ссылка на фото:') || 'assets/images/brand-card.jpg';
    const desc = prompt('Краткое описание:') || 'Аппетитное кавказское блюдо.';

    const newDish = {
      id: 'dish-' + Date.now(),
      title,
      category: 'hot',
      categoryName: 'Горячие блюда',
      price,
      weight,
      desc,
      image,
      badge: 'Новинка'
    };

    AppState.menu.unshift(newDish);
    saveData();
    window.refreshMenuGrid();
    renderAdminUI();
  };

  window.resetToDefaults = function() {
    if (confirm('Сбросить меню к первоначальным стандартным значениям?')) {
      AppState.menu = [...DEFAULT_MENU_DATA];
      AppState.lunch = { ...DEFAULT_LUNCH_INFO };
      saveData();
      window.refreshMenuGrid();
      renderAdminUI();
    }
  };

  window.exportMenuJson = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.menu, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "saperavi-menu-backup.json");
    dlAnchor.click();
  };
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initEventSlider() {
  const slider = document.getElementById('events-slider');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dotsContainer = document.getElementById('slider-dots-container');
  if (!slider) return;

  const slides = slider.querySelectorAll('.events-slide');
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  // Clear dots just in case
  dotsContainer.innerHTML = '';

  // Create indicator dots
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
    dot.addEventListener('click', () => showSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  function showSlide(index) {
    resetAutoSlide();

    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');

    startAutoSlide();
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000); // Auto change every 5 seconds
  }

  function resetAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  startAutoSlide();
}
