const POSTS = [
  {
    id: 1,
    author: 'שרה לוי',
    title: 'Senior Product Manager | SaaS | B2B',
    avatar: 'https://i.pravatar.cc/48?img=5',
    time: 'לפני 2 שעות',
    text: 'זה עתה סיימתי את הספר "Inspired" של Marty Cagan — ממליצה בחום לכל מנהל מוצר!\n\nהתובנה החשובה ביותר שלקחתי: המוצר הטוב ביותר לא מגיע ממי שמוסיף הכי הרבה פיצ\'רים, אלא ממי שיודע להגיד לא.',
    image: null,
    reactions: { likes: 142, comments: 28, reposts: 14 },
    reactionEmojis: ['👍','❤️','🎉'],
    comments: [
      { author: 'דני כהן', avatar: 'https://i.pravatar.cc/36?img=12', text: 'ספר מצוין! שינה לי לחלוטין את הגישה לניהול מוצר.', time: 'לפני שעה' },
      { author: 'מיכל ברק', avatar: 'https://i.pravatar.cc/36?img=9', text: 'אחד הספרים שעל כל מנהל מוצר לקרוא. תודה שהזכרת!', time: 'לפני 30 דקות' },
    ]
  },
  {
    id: 2,
    author: 'אלון מזרחי',
    title: 'Software Engineer @ Google | Golang · Kubernetes',
    avatar: 'https://i.pravatar.cc/48?img=7',
    time: 'לפני 5 שעות',
    text: '🚀 שמח לשתף: קיבלתי הצעה וקיבלתי! אני מתחיל שבוע הבא כ-Senior Engineer ב-Google!\n\nהדרך הייתה ארוכה — 6 חודשי הכנה, 5 ראיונות, המון דחיות בעבר. אם אתם בתהליך גיוס, אל תוותרו. ✊',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&q=80',
    reactions: { likes: 843, comments: 97, reposts: 62 },
    reactionEmojis: ['🎉','👍','❤️'],
    comments: [
      { author: 'נועה שמש', avatar: 'https://i.pravatar.cc/36?img=20', text: 'מזל טוב!! מרשים מאוד 🎊', time: 'לפני 4 שעות' },
      { author: 'יוסי אברהם', avatar: 'https://i.pravatar.cc/36?img=15', text: 'כל הכבוד! תספר איך נראו הראיונות הטכניים?', time: 'לפני 3 שעות' },
      { author: 'רינת גל', avatar: 'https://i.pravatar.cc/36?img=22', text: 'סיפור מעורר השראה. הצלחה רבה!', time: 'לפני שעתיים' },
    ]
  },
  {
    id: 3,
    author: 'ד"ר רחל פרידמן',
    title: 'AI Researcher | NLP | Tel Aviv University',
    avatar: 'https://i.pravatar.cc/48?img=16',
    time: 'לפני 8 שעות',
    text: 'שאלה לקהילה: מה לדעתכם הכי חשוב בעתיד של בינה מלאכותית?\n\n🔵 בטיחות ו-Alignment\n🟢 ביצועים ומהירות\n🟡 נגישות לכלל האוכלוסייה\n🔴 אינטגרציה עם מערכות קיימות\n\nשתפו בתגובות!',
    image: null,
    reactions: { likes: 317, comments: 54, reposts: 29 },
    reactionEmojis: ['👍','💡','❤️'],
    comments: [
      { author: 'גיל שפירו', avatar: 'https://i.pravatar.cc/36?img=33', text: 'בטיחות בוודאי! בלי זה כל שאר ההתקדמות מסוכנת.', time: 'לפני 7 שעות' },
      { author: 'תמר ניסים', avatar: 'https://i.pravatar.cc/36?img=41', text: 'נגישות — הטכנולוגיה צריכה לעבוד בשביל כולם, לא רק לאנשי טק.', time: 'לפני 6 שעות' },
    ]
  },
  {
    id: 4,
    author: 'עומר בן-דוד',
    title: 'Startup Founder | Fintech | Ex-Wix',
    avatar: 'https://i.pravatar.cc/48?img=60',
    time: 'לפני יום',
    text: '5 דברים שלמדתי אחרי שגייסתי 2 מיליון דולר:\n\n1️⃣ המשקיעים קונים אתכם, לא רק את המוצר\n2️⃣ "לא" אחד לא אומר כלום — המשיכו הלאה\n3️⃣ הכינו את ה-deck בצורה שגם ילד בן 10 יבין\n4️⃣ הראו traction — מספרים מדברים יותר מכל\n5️⃣ בחרו משקיע שמאמין בוויזיה, לא רק ב-ROI',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
    reactions: { likes: 521, comments: 73, reposts: 88 },
    reactionEmojis: ['👍','🎉','💡'],
    comments: [
      { author: 'נדב קלנר', avatar: 'https://i.pravatar.cc/36?img=51', text: 'זהב טהור. בעיקר נקודה 1 — ניסיון אישי.', time: 'לפני 20 שעות' },
    ]
  },
];

let likedPosts = new Set();
let currentPostId = null;
let commentsData = {};

POSTS.forEach(p => { commentsData[p.id] = [...p.comments]; });

function renderFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';
  POSTS.forEach(post => {
    const el = createPostCard(post);
    feed.appendChild(el);
  });
}

function createPostCard(post) {
  const div = document.createElement('div');
  div.className = 'post-card';
  div.dataset.id = post.id;

  const liked = likedPosts.has(post.id);
  const likes = post.reactions.likes + (liked ? 1 : 0);
  const commentsCount = commentsData[post.id].length;

  const shortText = post.text.length > 200;
  const displayText = shortText ? post.text.slice(0, 200) + '...' : post.text;

  div.innerHTML = `
    <div class="post-header">
      <img src="${post.avatar}" alt="${post.author}" />
      <div class="post-header-info">
        <div class="post-author">${post.author}</div>
        <div class="post-title">${post.title}</div>
        <div class="post-time">${post.time}</div>
      </div>
      <button class="post-menu">···</button>
    </div>
    <div class="post-text">
      ${displayText.replace(/\n/g, '<br/>')}
      ${shortText ? `<span class="see-more">...ראה עוד</span>` : ''}
    </div>
    ${post.image ? `<img class="post-image" src="${post.image}" alt="תמונת פוסט" loading="lazy" />` : ''}
    <div class="post-stats">
      <div class="reactions-count">
        <div class="reaction-emojis">${post.reactionEmojis.map(e => `<span>${e}</span>`).join('')}</div>
        <span>${likes.toLocaleString()}</span>
      </div>
      <div class="comments-count" onclick="openComments(${post.id})">
        ${commentsCount} תגובות · ${post.reactions.reposts} שיתופים
      </div>
    </div>
    <div class="post-actions">
      <button class="action-btn ${liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="${liked ? '#0a66c2' : 'none'}" stroke="${liked ? '#0a66c2' : 'currentColor'}" stroke-width="1.8">
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
          <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
        </svg>
        ${liked ? 'אהבתי ✓' : 'אהבתי'}
      </button>
      <button class="action-btn" onclick="openComments(${post.id})">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        תגובה
      </button>
      <button class="action-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/>
        </svg>
        שתף
      </button>
      <button class="action-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
        </svg>
        שלח
      </button>
    </div>
  `;

  return div;
}

function toggleLike(postId) {
  if (likedPosts.has(postId)) {
    likedPosts.delete(postId);
  } else {
    likedPosts.add(postId);
  }
  renderFeed();
}

function openComments(postId) {
  currentPostId = postId;
  const post = POSTS.find(p => p.id === postId);

  // הצג את הפוסט במודל
  const modalPost = document.getElementById('modalPost');
  modalPost.innerHTML = `
    <div class="post-header" style="padding:0 0 8px 0">
      <img src="${post.avatar}" alt="${post.author}" />
      <div class="post-header-info">
        <div class="post-author">${post.author}</div>
        <div class="post-title">${post.title}</div>
        <div class="post-time">${post.time}</div>
      </div>
    </div>
    <div class="post-text" style="padding:0">${post.text.replace(/\n/g, '<br/>')}</div>
    ${post.image ? `<img class="post-image" src="${post.image}" style="margin-top:10px;border-radius:8px" />` : ''}
  `;

  renderComments();

  document.getElementById('commentsOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('commentInput').focus(), 300);
}

function renderComments() {
  const list = document.getElementById('commentsList');
  const comments = commentsData[currentPostId];
  list.innerHTML = '';
  if (comments.length === 0) {
    list.innerHTML = '<p style="color:#999;font-size:14px;text-align:center;padding:20px">היה הראשון להגיב!</p>';
    return;
  }
  comments.forEach(c => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
      <img src="${c.avatar}" alt="${c.author}" />
      <div class="comment-bubble">
        <strong>${c.author}</strong>
        <p>${c.text}</p>
        <div class="comment-time">${c.time}</div>
      </div>
    `;
    list.appendChild(item);
  });
  list.scrollTop = list.scrollHeight;
}

function closeCommentsBtn() {
  closeOverlay();
}

function closeComments(e) {
  if (e.target === document.getElementById('commentsOverlay')) {
    closeOverlay();
  }
}

function closeOverlay() {
  document.getElementById('commentsOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentPostId = null;
}

function sendComment() {
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text || !currentPostId) return;

  commentsData[currentPostId].push({
    author: 'נחום ישראלי',
    avatar: 'https://i.pravatar.cc/36?img=3',
    text: text,
    time: 'עכשיו'
  });

  input.value = '';
  renderComments();
  renderFeed();
}

function submitComment(e) {
  if (e.key === 'Enter') sendComment();
}

function openComposer() {
  alert('כאן יפתח עורך הפוסטים 📝');
}

// הרץ
renderFeed();
