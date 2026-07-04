(function () {
  'use strict';

  var STORAGE_KEY = 'tasteMindLitePublicV1';

  var OFFICES = [
    { code: 'B10', name: '서울특별시교육청' },
    { code: 'C10', name: '부산광역시교육청' },
    { code: 'D10', name: '대구광역시교육청' },
    { code: 'E10', name: '인천광역시교육청' },
    { code: 'F10', name: '광주광역시교육청' },
    { code: 'G10', name: '대전광역시교육청' },
    { code: 'H10', name: '울산광역시교육청' },
    { code: 'I10', name: '세종특별자치시교육청' },
    { code: 'J10', name: '경기도교육청' },
    { code: 'K10', name: '강원특별자치도교육청' },
    { code: 'M10', name: '충청북도교육청' },
    { code: 'N10', name: '충청남도교육청' },
    { code: 'P10', name: '전북특별자치도교육청' },
    { code: 'Q10', name: '전라남도교육청' },
    { code: 'R10', name: '경상북도교육청' },
    { code: 'S10', name: '경상남도교육청' },
    { code: 'T10', name: '제주특별자치도교육청' },
  ];

  var SCHOOL_KINDS = ['전체', '초등학교', '중학교', '고등학교', '특수학교'];

  var FEELINGS = [
    '맛있고 편안했어요',
    '조금 낯설었어요',
    '냄새가 어려웠어요',
    '식감이 어려웠어요',
    '생각보다 괜찮았어요',
    '아직 잘 모르겠어요',
  ];

  var DIFFICULTIES = [
    '냄새가 강했어요',
    '식감이 낯설었어요',
    '모양이나 색이 싫었어요',
    '맛이 걱정됐어요',
    '배가 고프지 않았어요',
    '먹는 시간이 부족했어요',
  ];

  var STRATEGIES = [
    '아주 작은 한입으로 맛보기',
    '먼저 냄새와 모양 살펴보기',
    '좋아하는 음식과 함께 먹기',
    '천천히 오래 씹어 보기',
    '친구나 선생님에게 도움받기',
    '다음 기회에 다시 만나 보기',
  ];

  var FEELING_ICONS = {
    '맛있고 편안했어요': '😋',
    '조금 낯설었어요': '😯',
    '냄새가 어려웠어요': '👃',
    '식감이 어려웠어요': '😖',
    '생각보다 괜찮았어요': '🙂',
    '아직 잘 모르겠어요': '🤔',
  };

  var DIFFICULTY_ICONS = {
    '냄새가 강했어요': '👃',
    '식감이 낯설었어요': '😬',
    '모양이나 색이 싫었어요': '👀',
    '맛이 걱정됐어요': '😟',
    '배가 고프지 않았어요': '🍽️',
    '먹는 시간이 부족했어요': '⏰',
  };

  var STRATEGY_ICONS = {
    '아주 작은 한입으로 맛보기': '🥄',
    '먼저 냄새와 모양 살펴보기': '👀',
    '좋아하는 음식과 함께 먹기': '🍚',
    '천천히 오래 씹어 보기': '😌',
    '친구나 선생님에게 도움받기': '🤝',
    '다음 기회에 다시 만나 보기': '🔜',
  };

  var BADGES = [
    { id: 'b1_1', session: 1, icon: '🍽️', name: '급식 관찰가', desc: '1회기 탐험을 완료하고 급식을 자세히 관찰했어요.' },
    { id: 'b1_2', session: 1, icon: '🗣️', name: '마음 표현가', desc: '1회기 탐험에서 내 느낌을 솔직하게 표현했어요.' },
    { id: 'b2_1', session: 2, icon: '👃', name: '감각 탐험가', desc: '2회기 탐험에서 오감으로 음식을 탐험했어요.' },
    { id: 'b2_2', session: 2, icon: '🔍', name: '어려움 발견가', desc: '2회기 탐험에서 나의 어려움을 찾아냈어요.' },
    { id: 'b3_1', session: 3, icon: '🥄', name: '한입 전략가', desc: '3회기 탐험에서 나만의 전략을 세웠어요.' },
    { id: 'b3_2', session: 3, icon: '🛠️', name: '미션 설계가', desc: '3회기 탐험에서 실천 미션을 설계했어요.' },
    { id: 'b4_1', session: 4, icon: '💪', name: '꾸준한 실천가', desc: '4회기 동안 꾸준히 탐험을 이어갔어요.' },
    { id: 'b4_2', session: 4, icon: '🤝', name: '도움 요청가', desc: '4회기 탐험에서 도움을 요청하는 용기를 냈어요.' },
    { id: 'b5_1', session: 5, icon: '🌱', name: '성장 발견가', desc: '5회기 탐험을 마치고 나의 성장을 발견했어요.' },
    { id: 'b5_2', session: 5, icon: '🧭', name: '맛마음 안내자', desc: '5회기 탐험을 모두 마친 맛마음 탐험소의 안내자예요.' },
  ];

  // Direct conversation-starter questions a nutrition teacher can ask the
  // student during counseling, themed to match each session's badge story.
  var TALK_CARDS = {
    1: {
      theme: '관찰과 표현',
      questions: [
        '오늘 급식에서 가장 먼저 눈에 띈 음식은 뭐였어?',
        '그 음식을 보고 어떤 생각이 들었어?',
        '오늘 급식 중에 제일 맛있어 보였던 건 뭐야?',
      ],
    },
    2: {
      theme: '감각과 어려움',
      questions: [
        '그 음식은 냄새, 맛, 식감 중에 뭐가 제일 힘들었어?',
        '비슷하게 힘들었던 음식이 또 있었어?',
        '그 음식을 다시 만나면 어떤 기분이 들 것 같아?',
      ],
    },
    3: {
      theme: '전략과 미션',
      questions: [
        '오늘 세운 전략, 실제로 해보니까 어땠어?',
        '다음에 비슷한 음식을 만나면 어떤 방법을 써볼 수 있을까?',
        '이 전략을 친구한테도 알려준다면 뭐라고 말해줄 거야?',
      ],
    },
    4: {
      theme: '실천과 도움',
      questions: [
        '요즘 꾸준히 해보니까 뭐가 달라진 것 같아?',
        '도움이 필요할 때 누구한테 도움을 요청할 수 있을까?',
        '도움을 요청하는 게 어렵게 느껴질 때는 언제야?',
      ],
    },
    5: {
      theme: '성장과 안내',
      questions: [
        '탐험을 처음 시작했을 때랑 지금이랑 비교하면 뭐가 달라졌어?',
        '지금까지 중에 가장 뿌듯했던 순간은 언제였어?',
        '앞으로 더 도전해보고 싶은 음식이 있어?',
      ],
    },
  };

  var PROGRAM_NAME = '맛마음 탐험 프로그램';

  function curriculumStageName(n) {
    var stage = Math.min(Math.max(n, 1), 5);
    return TALK_CARDS[stage].theme;
  }

  function curriculumStageLabel(n) {
    var stage = Math.min(Math.max(n, 1), 5);
    return stage + '단계 · ' + curriculumStageName(stage);
  }

  // "공감자" mascot: 공감(empathy) + 감자(potato) wordplay — a friend who
  // grows warmer and more expressive as the student's exploration continues.
  var GROWTH_STAGES = [
    { icon: '🥔', label: '낯선 감자', caption: '아직 탐험을 시작하지 않았어요' },
    { icon: '🥔🌱', label: '새싹 난 감자', caption: '작은 새싹이 돋아났어요!' },
    { icon: '🥔✨', label: '반짝이는 감자', caption: '조금씩 반짝이기 시작했어요' },
    { icon: '🥔💪', label: '씩씩한 감자', caption: '씩씩하게 자라고 있어요' },
    { icon: '🥔🌟', label: '빛나는 감자', caption: '눈부시게 빛나고 있어요!' },
    { icon: '🥔👑', label: '완전체 감자', caption: '멋진 감자로 완전히 자랐어요!' },
  ];

  function growthStageFor(record) {
    var count = Math.min(completedSessionCount(record), GROWTH_STAGES.length - 1);
    return GROWTH_STAGES[count];
  }

  var CELEBRATION_STAMPS = [
    { icon: '🌟', text: '최고예요!' },
    { icon: '👏', text: '잘 해냈어요!' },
    { icon: '💪', text: '용기가 자랐어요!' },
    { icon: '🎉', text: '대단해요!' },
    { icon: '✨', text: '오늘도 성장했어요!' },
  ];

  function showCelebration(callback) {
    var stamp = CELEBRATION_STAMPS[Math.floor(Math.random() * CELEBRATION_STAMPS.length)];
    var overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    var confettiHtml = '';
    for (var i = 0; i < 24; i++) {
      var left = Math.random() * 100;
      var delay = Math.random() * 0.4;
      var duration = 1.2 + Math.random() * 0.8;
      var hue = Math.floor(Math.random() * 360);
      confettiHtml +=
        '<span class="confetti-piece" style="left:' + left + '%; animation-delay:' + delay + 's; animation-duration:' + duration + 's; background:hsl(' + hue + ',80%,60%);"></span>';
    }
    overlay.innerHTML =
      '<div class="confetti-layer">' + confettiHtml + '</div>' +
      '<div class="celebration-stamp"><div class="celebration-icon">' + stamp.icon + '</div><div class="celebration-text">' + escapeHtml(stamp.text) + '</div></div>';
    document.body.appendChild(overlay);
    setTimeout(function () {
      overlay.remove();
      callback();
    }, 1600);
  }

  var NEXT_ACTIVITY_SUGGESTIONS = [
    { screen: 'explore', icon: '🧭', text: '오늘의 탐험을 시작해서 급식과 만나보세요!' },
    { screen: 'talkCards', icon: '🔮', text: '오늘의 한마디로 대화를 나눠보세요' },
    { screen: 'gamesList', icon: '🎮', text: '자유게임으로 재미있게 복습해봐요' },
    { screen: 'missionReview', icon: '📝', text: '미션 돌아보기에서 지난 미션을 점검해봐요' },
    { screen: 'notes', icon: '📓', text: '탐험노트에서 나의 성장을 확인해봐요' },
  ];

  function nextSuggestionFor(record) {
    var count = completedSessionCount(record);
    return NEXT_ACTIVITY_SUGGESTIONS[count % NEXT_ACTIVITY_SUGGESTIONS.length];
  }

  var GAMES = [
    {
      id: 'sense',
      type: 'quiz',
      name: '음식 감각 탐정',
      icon: '🕵️',
      desc: '오감으로 음식을 탐정처럼 살펴봐요',
      questions: [
        {
          q: '새로운 음식을 처음 만났을 때, 가장 먼저 사용하기 좋은 감각은 무엇일까요?',
          options: ['냄새와 눈으로 먼저 살펴보기', '무조건 크게 한입 먹기', '쳐다보지 않고 바로 먹기', '친구 것과 바꾸기'],
          answer: 0,
          explain: '새로운 음식은 냄새와 모양을 먼저 살펴보면 마음의 준비를 할 수 있어요.',
        },
        {
          q: '식감이 낯설게 느껴질 때 좋은 방법은?',
          options: ['아주 작은 한 입부터 천천히 씹어보기', '바로 뱉어버리기', '숨을 참고 삼키기만 하기', '쳐다보지도 않기'],
          answer: 0,
          explain: '작은 한 입부터 천천히 맛보면 식감에 익숙해지기 쉬워요.',
        },
        {
          q: '음식의 색이나 모양이 낯설어 보일 때 가장 도움이 되는 태도는?',
          options: ['색과 모양도 음식의 특징 중 하나라고 생각하기', '무조건 안 먹겠다고 하기', '친구를 놀리기', '음식을 던지기'],
          answer: 0,
          explain: '색과 모양은 음식마다 다른 자연스러운 특징이에요.',
        },
      ],
    },
    {
      id: 'tray',
      type: 'quiz',
      name: '식판 친구 찾기',
      icon: '🍱',
      desc: '균형 잡힌 식판을 함께 알아봐요',
      questions: [
        {
          q: '균형 잡힌 식판을 만들 때 꼭 필요한 것은?',
          options: ['밥, 국, 반찬을 골고루 담기', '좋아하는 반찬만 가득 담기', '밥만 담기', '후식만 담기'],
          answer: 0,
          explain: '밥, 국, 반찬을 골고루 담으면 다양한 영양소를 섭취할 수 있어요.',
        },
        {
          q: '채소 반찬을 대하는 좋은 자세는?',
          options: ['한 가지라도 맛보려고 시도하기', '보자마자 남기기', '친구에게 다 주기', '쳐다보지 않기'],
          answer: 0,
          explain: '조금씩이라도 시도해보면 새로운 맛에 익숙해질 수 있어요.',
        },
        {
          q: '급식을 남기지 않으려고 할 때 좋은 방법은?',
          options: ['내가 먹을 수 있는 만큼만 담기', '무조건 많이 담기', '먹기 싫은 건 다 버리기', '친구 것을 가져오기'],
          answer: 0,
          explain: '먹을 수 있는 양만큼 담으면 음식을 골고루, 남김없이 먹기 좋아요.',
        },
      ],
    },
    {
      id: 'rhythm',
      type: 'quiz',
      name: '생활리듬 퀘스트',
      icon: '⏰',
      desc: '규칙적인 식사와 생활 리듬을 알아봐요',
      questions: [
        {
          q: '규칙적인 식사 시간이 중요한 이유는?',
          options: ['몸이 에너지를 규칙적으로 사용할 수 있어서', '배가 안 고파서', '밥맛이 없어서', '특별한 이유가 없다'],
          answer: 0,
          explain: '정해진 시간에 먹으면 몸이 에너지를 잘 관리할 수 있어요.',
        },
        {
          q: '급식 시간에 물을 적당히 마시는 것이 좋은 이유는?',
          options: ['소화를 돕고 몸의 수분을 채워줘서', '배가 더 고파져서', '맛이 없어져서', '특별한 이유가 없다'],
          answer: 0,
          explain: '적당한 물은 소화를 돕고 몸에 필요한 수분을 채워줘요.',
        },
        {
          q: '아침을 거르고 급식을 먹을 때 생길 수 있는 일은?',
          options: ['너무 배고파서 급하게 먹을 수 있어요', '아무 일도 없어요', '더 건강해져요', '맛을 더 잘 느껴요'],
          answer: 0,
          explain: '규칙적으로 식사를 하면 급하게 먹지 않고 편안하게 먹을 수 있어요.',
        },
      ],
    },
    {
      id: 'safety',
      type: 'quiz',
      name: '음식 안전 신호',
      icon: '🛡️',
      desc: '안전하게 먹는 습관을 알아봐요',
      questions: [
        {
          q: '급식을 먹기 전에 꼭 해야 하는 일은?',
          options: ['손을 깨끗이 씻기', '손을 안 씻어도 된다', '장갑만 끼기', '물로 입만 헹구기'],
          answer: 0,
          explain: '손을 깨끗이 씻으면 음식을 더 안전하게 먹을 수 있어요.',
        },
        {
          q: '평소와 다른 냄새나 맛이 느껴지는 음식을 만났을 때는?',
          options: ['선생님께 이야기하고 확인받기', '그냥 참고 먹기', '몰래 버리기', '친구에게 주기'],
          answer: 0,
          explain: '이상하다고 느껴지면 선생님이나 어른에게 확인받는 것이 안전해요.',
        },
        {
          q: '음식을 먹을 때 안전을 위해 지켜야 할 태도는?',
          options: ['천천히 꼭꼭 씹어서 먹기', '장난치며 빨리 먹기', '이야기하며 크게 웃기만 하기', '뛰어다니며 먹기'],
          answer: 0,
          explain: '천천히 꼭꼭 씹어 먹으면 사레들리지 않고 안전하게 먹을 수 있어요.',
        },
      ],
    },
    { id: 'breakout', type: 'breakout', name: '블록깨기', icon: '🧱', desc: '공을 튕겨서 블록을 깨봐요' },
    { id: 'marble', type: 'marble', name: '구슬 튕겨서 넣기', icon: '🔵', desc: '구슬을 튕겨서 골인시켜봐요' },
  ];

  /* ---------------------------------------------------------------- */
  /* Utilities                                                         */
  /* ---------------------------------------------------------------- */

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function nowIso() {
    return new Date().toISOString();
  }

  var loadingCount = 0;
  function showLoading() {
    loadingCount++;
    var el = $('#loadingOverlay');
    if (el) el.hidden = false;
  }
  function hideLoading() {
    loadingCount = Math.max(0, loadingCount - 1);
    if (loadingCount === 0) {
      var el = $('#loadingOverlay');
      if (el) el.hidden = true;
    }
  }

  var toastTimer = null;
  function showToast(message) {
    var el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.hidden = true;
    }, 3200);
  }

  function attachEulReul(word) {
    if (!word) return '';
    var last = word[word.length - 1];
    var code = last.charCodeAt(0);
    if (code < 0xac00 || code > 0xd7a3) return word + '를';
    var hasBatchim = (code - 0xac00) % 28 !== 0;
    return word + (hasBatchim ? '을' : '를');
  }

  var BACKUP_GAME_CAP = 10;
  var BACKUP_TALK_CAP = 5;

  function utf8ToBase64Url(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = '';
    bytes.forEach(function (b) {
      binary += String.fromCharCode(b);
    });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64UrlToUtf8(b64url) {
    var b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function buildBackupCode(record) {
    var compact = {
      v: 1,
      sc: [
        record.schoolInfo.officeCode,
        record.schoolInfo.schoolCode,
        record.schoolInfo.schoolName,
        record.schoolInfo.schoolKind,
        record.nickname || DEFAULT_NICKNAME,
      ],
      s: record.sessions.map(function (s) {
        return [s.sessionNo, s.date, s.food, s.feeling, s.story || '', s.difficulty || '', s.strategy || '', s.mission, s.confidence];
      }),
      mc: record.missionChecks.map(function (c) {
        return [c.sessionNo, c.date, c.status, c.note || ''];
      }),
      gr: record.gameResults.slice(-BACKUP_GAME_CAP).map(function (g) {
        return [g.game, g.score, g.total, (g.playedAt || '').slice(0, 10)];
      }),
      tn: (record.talkNotes || []).slice(-BACKUP_TALK_CAP).map(function (n) {
        return [n.session, n.theme, n.questions, n.answers, (n.savedAt || '').slice(0, 10)];
      }),
    };
    return utf8ToBase64Url(JSON.stringify(compact));
  }

  function parseBackupCode(code) {
    var compact = JSON.parse(base64UrlToUtf8(code));
    if (!compact || compact.v !== 1 || !compact.sc) throw new Error('올바르지 않은 코드입니다.');
    var office = OFFICES.filter(function (o) {
      return o.code === compact.sc[0];
    })[0];
    var schoolInfo = {
      officeCode: compact.sc[0],
      officeName: office ? office.name : '',
      schoolCode: compact.sc[1],
      schoolName: compact.sc[2],
      schoolKind: compact.sc[3],
      address: '',
    };
    var nickname = compact.sc[4] || DEFAULT_NICKNAME;
    var sessions = (compact.s || []).map(function (a) {
      return {
        sessionNo: a[0],
        date: a[1],
        food: a[2],
        feeling: a[3],
        story: a[4],
        difficulty: a[5],
        strategy: a[6],
        mission: a[7],
        confidence: a[8],
        savedAt: a[1] + 'T00:00:00.000Z',
      };
    });
    var missionChecks = (compact.mc || []).map(function (a) {
      return { sessionNo: a[0], date: a[1], status: a[2], note: a[3], checkedAt: a[1] + 'T00:00:00.000Z' };
    });
    var gameResults = (compact.gr || []).map(function (a) {
      var game = GAMES.filter(function (g) {
        return g.id === a[0];
      })[0];
      return { game: a[0], gameName: game ? game.name : a[0], score: a[1], total: a[2], playedAt: a[3] + 'T00:00:00.000Z' };
    });
    var talkNotes = (compact.tn || []).map(function (a) {
      return { session: a[0], theme: a[1], questions: a[2], answers: a[3], savedAt: a[4] + 'T00:00:00.000Z' };
    });
    return {
      schoolInfo: schoolInfo,
      nickname: nickname,
      sessions: sessions,
      missionChecks: missionChecks,
      gameResults: gameResults,
      talkNotes: talkNotes,
    };
  }

  function applyRestoreCode(code) {
    var decoded;
    try {
      decoded = parseBackupCode(code);
    } catch (err) {
      showToast('코드를 불러오지 못했어요. 코드가 올바른지 확인해 주세요.');
      return false;
    }
    var key = schoolKeyOf(decoded.schoolInfo, decoded.nickname);
    var existing = state.store.schools[key];
    if (existing && (existing.sessions.length || existing.missionChecks.length || existing.gameResults.length)) {
      if (!window.confirm(decoded.schoolInfo.schoolName + ' · ' + decoded.nickname + '의 기존 기록을 이 코드의 기록으로 덮어쓸까요? 이 작업은 되돌릴 수 없어요.')) {
        return false;
      }
    }
    state.store.schools[key] = {
      schoolInfo: decoded.schoolInfo,
      nickname: decoded.nickname,
      sessions: decoded.sessions,
      missionChecks: decoded.missionChecks,
      gameResults: decoded.gameResults,
      talkNotes: decoded.talkNotes,
    };
    state.store.currentSchoolKey = key;
    state.wizard = null;
    state.gameSession = null;
    state.todayMeal = null;
    state.talkSession = null;
    saveStore(state.store);
    showToast(decoded.schoolInfo.schoolName + ' · ' + decoded.nickname + '의 기록을 불러왔어요!');
    return true;
  }

  function extractRestoreCode(raw) {
    var qIndex = raw.indexOf('?r=');
    if (qIndex >= 0) return raw.slice(qIndex + 3).split('&')[0];
    try {
      var url = new URL(raw);
      var param = url.searchParams.get('r');
      if (param) return param;
    } catch (err) {
      // not a URL; treat raw input as the code itself
    }
    return raw;
  }

  async function apiGet(path, params) {
    var url = new URL(path, window.location.origin);
    Object.keys(params || {}).forEach(function (k) {
      var v = params[k];
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    });
    var res;
    try {
      res = await fetch(url.toString());
    } catch (err) {
      throw new Error('네트워크 연결을 확인해 주세요.');
    }
    var json;
    try {
      json = await res.json();
    } catch (err) {
      throw new Error('서버 응답을 처리할 수 없습니다.');
    }
    if (!json || json.ok !== true) {
      throw new Error((json && json.error) || '알 수 없는 오류가 발생했습니다.');
    }
    return json.data;
  }

  /* ---------------------------------------------------------------- */
  /* Storage                                                            */
  /* ---------------------------------------------------------------- */

  var DEFAULT_NICKNAME = '기본';

  function emptyStore() {
    return { version: 2, currentSchoolKey: null, schools: {} };
  }

  function migrateLegacyKeys(store) {
    var changed = false;
    Object.keys(store.schools).forEach(function (key) {
      if (key.indexOf('::') === -1) {
        var rec = store.schools[key];
        var newKey = key + '::' + DEFAULT_NICKNAME;
        rec.nickname = DEFAULT_NICKNAME;
        delete store.schools[key];
        store.schools[newKey] = rec;
        if (store.currentSchoolKey === key) store.currentSchoolKey = newKey;
        changed = true;
      }
    });
    return changed;
  }

  function loadStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyStore();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !parsed.schools) {
        return emptyStore();
      }
      if (migrateLegacyKeys(parsed)) {
        parsed.version = 2;
        saveStore(parsed);
      }
      return parsed;
    } catch (err) {
      return emptyStore();
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function schoolKeyOf(info, nickname) {
    return info.officeCode + '_' + info.schoolCode + '::' + nickname;
  }

  function schoolPrefixOf(officeCode, schoolCode) {
    return officeCode + '_' + schoolCode + '::';
  }

  function listNicknamesForSchool(store, officeCode, schoolCode) {
    var prefix = schoolPrefixOf(officeCode, schoolCode);
    return Object.keys(store.schools)
      .filter(function (k) {
        return k.indexOf(prefix) === 0;
      })
      .map(function (k) {
        var rec = store.schools[k];
        return { key: k, nickname: rec.nickname || k.slice(prefix.length), record: rec };
      })
      .sort(function (a, b) {
        return a.nickname.localeCompare(b.nickname, 'ko');
      });
  }

  function ensureSchoolRecord(store, schoolInfo, nickname) {
    var key = schoolKeyOf(schoolInfo, nickname);
    if (!store.schools[key]) {
      store.schools[key] = {
        schoolInfo: schoolInfo,
        nickname: nickname,
        sessions: [],
        missionChecks: [],
        gameResults: [],
        talkNotes: [],
      };
    } else {
      store.schools[key].schoolInfo = schoolInfo;
      store.schools[key].nickname = nickname;
    }
    store.currentSchoolKey = key;
    saveStore(store);
    return store.schools[key];
  }

  function deleteProfile(store, key) {
    delete store.schools[key];
    if (store.currentSchoolKey === key) {
      store.currentSchoolKey = null;
    }
    saveStore(store);
  }

  function getCurrentRecord(store) {
    if (!store.currentSchoolKey) return null;
    return store.schools[store.currentSchoolKey] || null;
  }

  function saveSessionRecord(store, record, sessionData) {
    var existingIndex = -1;
    for (var i = 0; i < record.sessions.length; i++) {
      if (record.sessions[i].date === sessionData.date) {
        existingIndex = i;
        break;
      }
    }
    var sessionNo;
    if (existingIndex >= 0) {
      sessionNo = record.sessions[existingIndex].sessionNo;
      var merged = {};
      Object.keys(sessionData).forEach(function (k) {
        merged[k] = sessionData[k];
      });
      merged.sessionNo = sessionNo;
      merged.savedAt = nowIso();
      record.sessions[existingIndex] = merged;
    } else {
      sessionNo = record.sessions.length + 1;
      var entry = {};
      Object.keys(sessionData).forEach(function (k) {
        entry[k] = sessionData[k];
      });
      entry.sessionNo = sessionNo;
      entry.savedAt = nowIso();
      record.sessions.push(entry);
    }
    saveStore(store);
    return sessionNo;
  }

  function upsertMissionCheck(store, record, check) {
    var existingIndex = -1;
    for (var i = 0; i < record.missionChecks.length; i++) {
      if (record.missionChecks[i].sessionNo === check.sessionNo) {
        existingIndex = i;
        break;
      }
    }
    check.checkedAt = nowIso();
    if (existingIndex >= 0) {
      record.missionChecks[existingIndex] = check;
    } else {
      record.missionChecks.push(check);
    }
    saveStore(store);
  }

  function addGameResult(store, record, result) {
    result.playedAt = nowIso();
    record.gameResults.push(result);
    saveStore(store);
  }

  function completedSessionCount(record) {
    return record ? record.sessions.length : 0;
  }

  function progressLabel(record) {
    return Math.min(completedSessionCount(record), 5) + '/5';
  }

  function unlockedBadgeCount(record) {
    var count = completedSessionCount(record);
    return BADGES.filter(function (b) {
      return b.session <= count;
    }).length;
  }

  function buildAutoMission(food, strategy) {
    if (!food && !strategy) return '';
    if (!food) return '다음 급식에서 "' + strategy + '" 전략을 시도해 봅니다.';
    if (!strategy) return '다음 급식에서 ' + attachEulReul(food) + ' 다시 만나 봅니다.';
    return '다음 급식에서 ' + attachEulReul(food) + ' 만나면 "' + strategy + '" 해봅니다.';
  }

  function buildProfileSummary(record) {
    if (!record || !record.sessions.length) {
      return '아직 탐험 기록이 없어요. "오늘의 탐험"을 시작해 보세요!';
    }
    var foods = [];
    record.sessions.forEach(function (s) {
      if (s.food && foods.indexOf(s.food) === -1) foods.push(s.food);
    });
    var strategies = [];
    record.sessions.forEach(function (s) {
      if (s.strategy && strategies.indexOf(s.strategy) === -1) strategies.push(s.strategy);
    });
    var latest = record.sessions[record.sessions.length - 1];
    var foodsText = foods.slice(0, 3).join(', ');
    var strategiesText = strategies.slice(0, 2).join('와(과) ');
    var text = '나는 ' + foodsText + ' 등 여러 음식을 탐험했고, ';
    if (strategiesText) {
      text += '어려울 때는 ' + strategiesText + '을(를) 활용할 수 있어요. ';
    } else {
      text += '내 마음을 살펴보는 연습을 하고 있어요. ';
    }
    text += '지금 나의 미션은 "' + (latest.mission || '') + '"입니다.';
    return text;
  }

  function buildConfidenceChartSvg(sessionsByOrder) {
    var width = 280;
    var height = 120;
    var padding = 20;
    var minVal = 1;
    var maxVal = 10;
    var stepX = sessionsByOrder.length > 1 ? (width - padding * 2) / (sessionsByOrder.length - 1) : 0;
    var points = sessionsByOrder.map(function (s, i) {
      var x = padding + stepX * i;
      var y = height - padding - ((s.confidence - minVal) / (maxVal - minVal)) * (height - padding * 2);
      return x.toFixed(1) + ',' + y.toFixed(1);
    });
    var circles = points
      .map(function (p) {
        var parts = p.split(',');
        return '<circle cx="' + parts[0] + '" cy="' + parts[1] + '" r="4" fill="var(--color-primary)" />';
      })
      .join('');
    return (
      '<svg viewBox="0 0 ' + width + ' ' + height + '" class="confidence-chart" role="img" aria-label="자신감 변화 그래프">' +
      '<polyline points="' + points.join(' ') + '" fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />' +
      circles +
      '</svg>'
    );
  }

  function buildConfidenceSection(record) {
    if (!record.sessions.length) return '';
    var byOrder = record.sessions.slice().sort(function (a, b) {
      return a.sessionNo - b.sessionNo;
    });
    var first = byOrder[0].confidence;
    var last = byOrder[byOrder.length - 1].confidence;
    var diff = last - first;
    var diffText = diff > 0 ? '+' + diff + '점' : diff < 0 ? diff + '점' : '변화 없음';
    return (
      '<div class="card">' +
      '<h3>자신감 변화</h3>' +
      buildConfidenceChartSvg(byOrder) +
      '<p class="text-muted mb-0">1회기 ' + first + '점 → 최근 ' + last + '점 (' + diffText + ')</p>' +
      '</div>'
    );
  }

  /* ---------------------------------------------------------------- */
  /* App state                                                          */
  /* ---------------------------------------------------------------- */

  var state = {
    store: loadStore(),
    screen: 'loading',
    config: null,
    wizard: null,
    gameSession: null,
    lastSearch: { results: [], loading: false, error: '' },
  };

  function setScreen(name) {
    state.screen = name;
    window.history.pushState({ screen: name }, '', window.location.pathname);
    render();
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- */
  /* Render root                                                        */
  /* ---------------------------------------------------------------- */

  function render() {
    var app = $('#app');
    var changeBtn = $('#changeSchoolBtn');
    var backBtn = $('#backBtn');
    var record = getCurrentRecord(state.store);
    changeBtn.hidden = !record || state.screen === 'schoolSelect' || state.screen === 'nicknameSelect';
    backBtn.hidden = state.screen === 'main' || state.screen === 'schoolSelect' || state.screen === 'onboarding';

    switch (state.screen) {
      case 'onboarding':
        renderOnboarding(app);
        break;
      case 'schoolSelect':
        renderSchoolSelect(app);
        break;
      case 'nicknameSelect':
        renderNicknameSelect(app);
        break;
      case 'main':
        renderMain(app);
        break;
      case 'explore':
        renderExplore(app);
        break;
      case 'missionReview':
        renderMissionReview(app);
        break;
      case 'talkCards':
        renderTalkCards(app);
        break;
      case 'gamesList':
        renderGamesList(app);
        break;
      case 'gamePlay':
        renderGamePlay(app);
        break;
      case 'gameResult':
        renderGameResult(app);
        break;
      case 'badges':
        renderBadges(app);
        break;
      case 'notes':
        renderNotes(app);
        break;
      case 'report':
        renderReport(app);
        break;
      case 'certificate':
        renderCertificate(app);
        break;
      case 'privacy':
        renderPrivacy(app);
        break;
      default:
        app.innerHTML = '<div class="card">불러오는 중이에요...</div>';
    }
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 온보딩 소개                                                 */
  /* ---------------------------------------------------------------- */

  var ONBOARDING_SLIDES = [
    {
      icon: '🍚',
      title: '맛마음 탐험소에 오신 걸 환영해요!',
      body: '전국 학교급식을 기반으로 나의 식생활을 탐험하는 ' + PROGRAM_NAME + '이에요.',
    },
    {
      icon: '🧭',
      title: '이렇게 진행돼요',
      body: '학교 선택 → 별명 만들기 → 오늘의 탐험(느낌 찾기 → 어려움과 전략 → 미션) → 오늘의 한마디로 대화, 이 흐름이 서로 다른 날짜에 5회기 이어져요.',
    },
    {
      icon: '🔒',
      title: '안심하고 사용하세요',
      body: '이름, 학년/반, 학번 등 어떤 개인정보도 수집하지 않아요. 모든 기록은 지금 사용 중인 기기에만 저장돼요.',
    },
  ];

  function renderOnboarding(app) {
    var idx = state.onboardingIndex || 0;
    var slide = ONBOARDING_SLIDES[idx];
    var isLast = idx === ONBOARDING_SLIDES.length - 1;
    var dots = ONBOARDING_SLIDES.map(function (_, i) {
      return '<span class="step-dot' + (i <= idx ? ' active' : '') + '"></span>';
    }).join('');

    app.innerHTML =
      '<div class="screen">' +
      '<div class="step-indicator">' + dots + '</div>' +
      '<div class="card text-center onboarding-card">' +
      '<div class="onboarding-icon">' + slide.icon + '</div>' +
      '<h2>' + escapeHtml(slide.title) + '</h2>' +
      '<p class="text-muted">' + escapeHtml(slide.body) + '</p>' +
      '</div>' +
      '<div class="wizard-actions">' +
      (idx > 0 ? '<button type="button" class="btn btn-outline" id="onboardingPrevBtn">이전</button>' : '') +
      '<button type="button" class="btn" id="onboardingNextBtn">' + (isLast ? '학교 찾기 시작하기' : '다음') + '</button>' +
      '</div>' +
      '</div>';

    var prevBtn = $('#onboardingPrevBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        state.onboardingIndex = idx - 1;
        render();
      });
    }

    $('#onboardingNextBtn').addEventListener('click', function () {
      if (isLast) {
        state.store.onboardingSeen = true;
        saveStore(state.store);
        state.onboardingIndex = 0;
        setScreen('schoolSelect');
      } else {
        state.onboardingIndex = idx + 1;
        render();
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 학교 선택                                                   */
  /* ---------------------------------------------------------------- */

  function renderSchoolSelect(app) {
    var officeOptions = OFFICES.map(function (o) {
      return '<option value="' + o.code + '">' + escapeHtml(o.name) + '</option>';
    }).join('');
    var kindOptions = SCHOOL_KINDS.map(function (k) {
      return '<option value="' + (k === '전체' ? '' : escapeHtml(k)) + '">' + escapeHtml(k) + '</option>';
    }).join('');

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">우리 학교를 찾아요</h2>' +
      '<p class="screen-subtitle">시도교육청과 학교급을 선택하고, 학교 이름을 2글자 이상 입력해 검색해 주세요.</p>' +
      '<div class="card">' +
      '<div class="field"><label for="officeSelect">1. 시도교육청</label>' +
      '<select id="officeSelect">' + officeOptions + '</select></div>' +
      '<div class="field"><label for="schoolKindSelect">2. 학교급</label>' +
      '<select id="schoolKindSelect">' + kindOptions + '</select></div>' +
      '<div class="field"><label for="querySearchInput">3. 학교 이름</label>' +
      '<input type="search" id="querySearchInput" placeholder="예: 한빛초등학교" autocomplete="off" />' +
      '<p class="field-hint">2글자 이상 입력해 주세요.</p></div>' +
      '<button type="button" id="searchSchoolBtn" class="btn btn-block">학교 검색</button>' +
      '</div>' +
      '<div id="schoolSearchStatus"></div>' +
      '<div id="schoolResults" class="card-grid"></div>' +
      '<button type="button" class="btn btn-outline btn-block mt-1" id="showOnboardingBtn">프로그램 소개 다시 보기</button>' +
      '</div>';

    $('#searchSchoolBtn').addEventListener('click', doSchoolSearch);
    $('#querySearchInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSchoolSearch();
    });
    $('#showOnboardingBtn').addEventListener('click', function () {
      state.onboardingIndex = 0;
      setScreen('onboarding');
    });
  }

  async function doSchoolSearch() {
    var query = $('#querySearchInput').value.trim();
    var officeCode = $('#officeSelect').value;
    var schoolKind = $('#schoolKindSelect').value;
    var statusEl = $('#schoolSearchStatus');
    var resultsEl = $('#schoolResults');

    if (query.length < 2) {
      statusEl.innerHTML = '<div class="banner banner-error">학교 이름을 2글자 이상 입력해 주세요.</div>';
      resultsEl.innerHTML = '';
      return;
    }

    statusEl.innerHTML = '';
    resultsEl.innerHTML = '';
    showLoading();
    try {
      var schools = await apiGet('/api/schools', { query: query, officeCode: officeCode, schoolKind: schoolKind });
      if (!schools.length) {
        statusEl.innerHTML = '<div class="banner banner-info">검색 결과가 없어요. 학교 이름을 다시 확인해 주세요.</div>';
        return;
      }
      resultsEl.innerHTML = schools
        .map(function (s, idx) {
          return (
            '<button type="button" class="menu-card" data-idx="' + idx + '">' +
            '<span class="menu-icon">🏫</span>' +
            '<span><span class="menu-title">' + escapeHtml(s.schoolName) + '</span>' +
            '<span class="menu-desc">' + escapeHtml(s.officeName) + ' · ' + escapeHtml(s.schoolKind) + '</span>' +
            '<span class="menu-desc">' + escapeHtml(s.address || '') + '</span></span>' +
            '</button>'
          );
        })
        .join('');
      $all('.menu-card', resultsEl).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = Number(btn.getAttribute('data-idx'));
          selectSchool(schools[idx]);
        });
      });
    } catch (err) {
      statusEl.innerHTML = '<div class="banner banner-error">' + escapeHtml(err.message) + '</div>';
    } finally {
      hideLoading();
    }
  }

  function selectSchool(school) {
    state.pendingSchoolInfo = school;
    setScreen('nicknameSelect');
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 별명 선택                                                   */
  /* ---------------------------------------------------------------- */

  function renderNicknameSelect(app) {
    var current = getCurrentRecord(state.store);
    var schoolInfo = state.pendingSchoolInfo || (current && current.schoolInfo);
    if (!schoolInfo) {
      setScreen('schoolSelect');
      return;
    }
    var siblings = listNicknamesForSchool(state.store, schoolInfo.officeCode, schoolInfo.schoolCode);

    var listHtml = siblings.length
      ? '<h3>이어서 하기</h3><div class="menu-grid">' +
        siblings
          .map(function (s) {
            return (
              '<div class="menu-card nickname-card">' +
              '<span class="menu-icon">🙋</span>' +
              '<button type="button" class="menu-resume-btn" data-nickname-key="' + escapeHtml(s.key) + '">' +
              '<span class="menu-title">' + escapeHtml(s.nickname) + '</span>' +
              '<span class="menu-desc">' + progressLabel(s.record) + ' 진행 · 배지 ' + unlockedBadgeCount(s.record) + '/10</span>' +
              '</button>' +
              '<button type="button" class="icon-btn-danger" data-nickname-delete="' + escapeHtml(s.key) + '" aria-label="별명 삭제">🗑️</button>' +
              '</div>'
            );
          })
          .join('') +
        '</div>'
      : '';

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">' + escapeHtml(schoolInfo.schoolName) + '</h2>' +
      '<p class="screen-subtitle">나만 아는 별명으로 들어가요. 실명 대신 별명을 써주세요.</p>' +
      listHtml +
      '<div class="card mt-1">' +
      '<h3>새 별명으로 시작하기</h3>' +
      '<div class="field"><label for="nicknameInput">별명</label>' +
      '<input type="text" id="nicknameInput" maxlength="12" placeholder="예: 구름이" /></div>' +
      '<button type="button" class="btn btn-block" id="startWithNicknameBtn">이 별명으로 시작하기</button>' +
      '</div>' +
      '</div>';

    $all('[data-nickname-key]', app).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.store.currentSchoolKey = btn.getAttribute('data-nickname-key');
        saveStore(state.store);
        state.pendingSchoolInfo = null;
        state.wizard = null;
        state.gameSession = null;
        state.todayMeal = null;
        state.talkSession = null;
        setScreen('main');
      });
    });

    $all('[data-nickname-delete]', app).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var key = btn.getAttribute('data-nickname-delete');
        var rec = state.store.schools[key];
        if (!rec) return;
        if (!window.confirm((rec.nickname || '') + ' 별명을 완전히 삭제할까요? 이 별명의 모든 기록이 사라지고 목록에서도 없어져요. 되돌릴 수 없어요.')) return;
        deleteProfile(state.store, key);
        showToast('별명을 삭제했어요.');
        render();
      });
    });

    $('#startWithNicknameBtn').addEventListener('click', function () {
      var nickname = $('#nicknameInput').value.trim();
      if (!nickname) {
        showToast('별명을 입력해 주세요.');
        return;
      }
      ensureSchoolRecord(state.store, schoolInfo, nickname);
      state.pendingSchoolInfo = null;
      state.wizard = null;
      state.gameSession = null;
      state.todayMeal = null;
      state.talkSession = null;
      showToast(nickname + '(으)로 시작해요!');
      setScreen('main');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 메인                                                       */
  /* ---------------------------------------------------------------- */

  var MENU_ITEMS = [
    { id: 'explore', icon: '🧭', title: '오늘의 탐험', desc: '급식으로 오늘의 탐험을 시작해요' },
    { id: 'missionReview', icon: '📝', title: '미션 돌아보기', desc: '내가 만든 미션을 점검해요' },
    { id: 'talkCards', icon: '🔮', title: '오늘의 한마디', desc: '카드를 뒤집으며 대화를 나눠봐요' },
    { id: 'gamesList', icon: '🎮', title: '자유게임', desc: '재미있는 식생활 게임을 해요' },
    { id: 'badges', icon: '🏅', title: '나의 배지', desc: '모은 배지를 확인해요' },
    { id: 'notes', icon: '📓', title: '탐험노트', desc: '나의 탐험 기록을 모아봐요' },
    { id: 'report', icon: '🗂️', title: '상담 리포트', desc: '오늘 상담 내용을 한 장으로 확인해요' },
    { id: 'certificate', icon: '🏆', title: '수료증', desc: '5회기를 모두 마치면 수료증을 받아요' },
    { id: 'switchProfile', icon: '🙋', title: '다른 친구로 전환', desc: '이 학교에서 다른 별명으로 바꿔요' },
    { id: 'privacy', icon: '🔒', title: '체험 데이터 안내', desc: '개인정보와 저장 방식을 안내해요' },
  ];

  function renderMain(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var info = record.schoolInfo;
    var latest = record.sessions.length ? record.sessions[record.sessions.length - 1] : null;
    var gameCount = record.gameResults.length;
    var growth = growthStageFor(record);
    var suggestion = nextSuggestionFor(record);
    var nextGrowth = GROWTH_STAGES[Math.min(completedSessionCount(record) + 1, GROWTH_STAGES.length - 1)];
    var atMaxGrowth = completedSessionCount(record) >= GROWTH_STAGES.length - 1;

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">' + escapeHtml(info.schoolName) + ' · ' + escapeHtml(record.nickname || '') + '</h2>' +
      '<p class="screen-subtitle">전국 학교급식 기반 식생활 탐험 웹앱</p>' +
      '<div class="card" id="mealCard"><p class="text-muted">오늘 급식을 불러오는 중이에요...</p></div>' +
      '<div class="card growth-card">' +
      '<div class="growth-icon">' + growth.icon + '</div>' +
      '<div class="growth-info">' +
      '<div class="growth-label">나의 감자 · ' + escapeHtml(growth.label) + '</div>' +
      '<div class="text-muted">' + escapeHtml(growth.caption) + '</div>' +
      (atMaxGrowth ? '' : '<div class="text-muted growth-next">다음 단계(' + nextGrowth.icon + ' ' + escapeHtml(nextGrowth.label) + ')까지 한 회기 남았어요</div>') +
      '</div>' +
      '</div>' +
      '<div class="card">' +
      '<div class="card-grid">' +
      '<div class="stat-tile"><div class="stat-value">' + progressLabel(record) + '</div><div class="stat-label">핵심 탐험 진행</div></div>' +
      '<div class="stat-tile"><div class="stat-value">' + unlockedBadgeCount(record) + '/10</div><div class="stat-label">배지 수</div></div>' +
      '<div class="stat-tile"><div class="stat-value">' + gameCount + '</div><div class="stat-label">게임 기록 수</div></div>' +
      '</div>' +
      '<p class="mt-1 mb-0"><strong>현재 실천 미션</strong><br />' +
      (latest ? escapeHtml(latest.mission) : '아직 만든 미션이 없어요. 오늘의 탐험을 시작해 보세요!') +
      '</p>' +
      '</div>' +
      '<button type="button" class="suggestion-banner" id="suggestionBanner" data-screen="' + suggestion.screen + '">' +
      '<span class="suggestion-icon">' + suggestion.icon + '</span>' +
      '<span>💡 다음엔 이건 어때요?<br />' + escapeHtml(suggestion.text) + '</span>' +
      '</button>' +
      '<div class="menu-grid">' +
      MENU_ITEMS.map(function (m) {
        return (
          '<button type="button" class="menu-card" data-screen="' + m.id + '">' +
          '<span class="menu-icon">' + m.icon + '</span>' +
          '<span><span class="menu-title">' + escapeHtml(m.title) + '</span>' +
          '<span class="menu-desc">' + escapeHtml(m.desc) + '</span></span>' +
          '</button>'
        );
      }).join('') +
      '</div>' +
      '</div>';

    $('#suggestionBanner').addEventListener('click', function () {
      setScreen(suggestion.screen);
    });

    $all('.menu-card[data-screen]', app).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-screen');
        if (target === 'switchProfile') {
          state.pendingSchoolInfo = record.schoolInfo;
          setScreen('nicknameSelect');
          return;
        }
        setScreen(target);
      });
    });

    loadTodayMeal(record);
  }

  async function loadTodayMeal(record) {
    var mealCard = $('#mealCard');
    if (!mealCard) return;
    try {
      var data = await apiGet('/api/meals', {
        officeCode: record.schoolInfo.officeCode,
        schoolCode: record.schoolInfo.schoolCode,
        schoolName: record.schoolInfo.schoolName,
      });
      state.todayMeal = data;
      var html = '<h3>오늘 급식 (' + escapeHtml(data.date) + ')</h3>';
      if (data.hasMeal) {
        html +=
          '<p class="text-muted">' + escapeHtml(data.mealType || '') + '</p>' +
          '<p>' + data.menu.map(escapeHtml).join(', ') + '</p>';
      } else {
        html += '<p class="banner banner-info">오늘 등록된 급식이 없습니다.</p>';
      }
      if (data.nextMealDate) {
        html += '<p class="text-muted">다음 급식일: ' + escapeHtml(data.nextMealDate) + '</p>';
      }
      mealCard.innerHTML = html;
    } catch (err) {
      state.todayMeal = null;
      mealCard.innerHTML = '<div class="banner banner-error">급식 정보를 불러오지 못했어요: ' + escapeHtml(err.message) + '</div>';
    }
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 오늘의 탐험 (3단계)                                          */
  /* ---------------------------------------------------------------- */

  function ensureWizard() {
    if (!state.wizard) {
      var today = new Date().toISOString().slice(0, 10);
      state.wizard = {
        step: 1,
        date: today,
        mealDate: today,
        mealData: state.todayMeal || null,
        mealError: null,
        food: '',
        feeling: '',
        story: '',
        difficulty: '',
        strategy: '',
        mission: '',
        confidence: 5,
      };
    }
    return state.wizard;
  }

  function addDaysToDateString(dateStr, days) {
    var d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function formatMealDateLabel(wizard) {
    if (wizard.mealDate === wizard.date) return '오늘';
    if (wizard.mealDate === addDaysToDateString(wizard.date, 1)) return '내일';
    return wizard.mealDate;
  }

  async function changeWizardMealDate(wizard, dateStr) {
    var record = getCurrentRecord(state.store);
    if (!record) return;
    wizard.mealDate = dateStr;
    wizard.food = '';
    wizard.mealData = null;
    wizard.mealError = null;
    render();
    try {
      var data = await apiGet('/api/meals', {
        officeCode: record.schoolInfo.officeCode,
        schoolCode: record.schoolInfo.schoolCode,
        schoolName: record.schoolInfo.schoolName,
        date: dateStr.replace(/-/g, ''),
      });
      if (!state.wizard || state.wizard.mealDate !== dateStr) return;
      wizard.mealData = data;
    } catch (err) {
      if (!state.wizard || state.wizard.mealDate !== dateStr) return;
      wizard.mealError = err.message;
    }
    render();
  }

  function renderExplore(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var wizard = ensureWizard();
    var stageLabel = curriculumStageLabel(completedSessionCount(record) + 1);
    var stepDots = [1, 2, 3]
      .map(function (n) {
        return '<span class="step-dot' + (n <= wizard.step ? ' active' : '') + '"></span>';
      })
      .join('');

    var body = '';
    if (wizard.step === 1) body = renderExploreStep1(wizard);
    else if (wizard.step === 2) body = renderExploreStep2(wizard);
    else body = renderExploreStep3(wizard);

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">오늘의 탐험</h2>' +
      '<p class="screen-subtitle">' + escapeHtml(PROGRAM_NAME) + ' · ' + escapeHtml(stageLabel) + '</p>' +
      '<div class="step-indicator">' + stepDots + '</div>' +
      '<div class="card" id="wizardCard">' + body + '</div>' +
      '</div>';

    wireExploreStep(wizard);
  }

  function foodEmoji(name) {
    var rules = [
      [/우유|요구르트/, '🥛'],
      [/사과|배|귤|딸기|포도|자두|바나나|수박|참외|복숭아|하우스귤/, '🍎'],
      [/김치/, '🥬'],
      [/치킨|닭/, '🍗'],
      [/고기|불고기|장조림|탕수육|갈비|곰탕/, '🥩'],
      [/생선|고등어|갈치|삼치|동태|명태|맛탕/, '🐟'],
      [/계란|달걀/, '🥚'],
      [/샐러드|무침|나물|생채/, '🥗'],
      [/면|국수|파스타|스파게티/, '🍜'],
      [/빵|토스트/, '🍞'],
      [/국$|탕$|찌개$/, '🍲'],
      [/밥$/, '🍚'],
    ];
    for (var i = 0; i < rules.length; i++) {
      if (rules[i][0].test(name)) return rules[i][1];
    }
    return '🍽️';
  }

  function renderExploreStep1(wizard) {
    var meal = wizard.mealData;
    var isToday = wizard.mealDate === wizard.date;
    var isTomorrow = wizard.mealDate === addDaysToDateString(wizard.date, 1);

    var customFoodInputHtml =
      '<div class="field"><input type="text" id="customFoodInput" placeholder="예: 당근" value="' + escapeHtml(wizard.food) + '" /></div>';

    var foodChoices;
    if (wizard.mealError) {
      foodChoices = '<div class="banner banner-error">급식 정보를 불러오지 못했어요: ' + escapeHtml(wizard.mealError) + '</div>' + customFoodInputHtml;
    } else if (!meal) {
      foodChoices = '<p class="text-muted">급식 정보를 불러오는 중이에요...</p>';
    } else if (meal.hasMeal && meal.menu.length) {
      foodChoices = meal.menu
        .map(function (m) {
          return (
            '<button type="button" class="choice-item choice-item-food" data-group="food" data-value="' +
            escapeHtml(m) +
            '" aria-pressed="' + (wizard.food === m ? 'true' : 'false') + '">' +
            '<span class="choice-icon">' + foodEmoji(m) + '</span>' +
            '<span class="choice-text">' + escapeHtml(m) + '</span>' +
            '</button>'
          );
        })
        .join('');
    } else {
      foodChoices = '<p class="banner banner-info">그 날 등록된 급식이 없어 직접 입력해요.</p>' + customFoodInputHtml;
    }

    var feelingChoices = FEELINGS.map(function (f) {
      return (
        '<button type="button" class="choice-item" data-group="feeling" data-value="' +
        escapeHtml(f) +
        '" aria-pressed="' + (wizard.feeling === f ? 'true' : 'false') + '">' +
        '<span class="choice-icon">' + (FEELING_ICONS[f] || '') + '</span>' +
        '<span class="choice-text">' + escapeHtml(f) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<h3>1단계. 느낌 찾기</h3>' +
      '<p class="text-muted">살펴볼 급식 날짜를 골라보세요.</p>' +
      '<div class="flex-row">' +
      '<button type="button" class="btn btn-sm' + (isToday ? '' : ' btn-outline') + '" id="mealDateTodayBtn">오늘 급식</button>' +
      '<button type="button" class="btn btn-sm' + (isTomorrow ? '' : ' btn-outline') + '" id="mealDateTomorrowBtn">내일 급식</button>' +
      '<input type="date" id="mealDateCustomInput" class="date-input" value="' + escapeHtml(wizard.mealDate) + '" />' +
      '</div>' +
      '<p class="text-muted mt-1">' + escapeHtml(formatMealDateLabel(wizard)) + ' 급식 메뉴 중 가장 기억나는 음식을 골라 보세요.</p>' +
      '<div class="choice-list" id="foodChoices">' + foodChoices + '</div>' +
      '<hr class="section-divider" />' +
      '<h3>그때 느낌은 어땠나요?</h3>' +
      '<div class="choice-list" id="feelingChoices">' + feelingChoices + '</div>' +
      '<div class="field mt-1"><label for="storyInput">한 줄로 이야기해 볼까요? (선택)</label>' +
      '<input type="text" id="storyInput" maxlength="80" value="' + escapeHtml(wizard.story) + '" placeholder="예: 당근 냄새가 낯설었지만 한입 먹어봤어요" /></div>' +
      '<div class="wizard-actions"><button type="button" class="btn" id="step1NextBtn">다음</button></div>'
    );
  }

  function renderExploreStep2(wizard) {
    var difficultyChoices = DIFFICULTIES.map(function (d) {
      return (
        '<button type="button" class="choice-item" data-group="difficulty" data-value="' +
        escapeHtml(d) +
        '" aria-pressed="' + (wizard.difficulty === d ? 'true' : 'false') + '">' +
        '<span class="choice-icon">' + (DIFFICULTY_ICONS[d] || '') + '</span>' +
        '<span class="choice-text">' + escapeHtml(d) + '</span>' +
        '</button>'
      );
    }).join('');
    var strategyChoices = STRATEGIES.map(function (s) {
      return (
        '<button type="button" class="choice-item" data-group="strategy" data-value="' +
        escapeHtml(s) +
        '" aria-pressed="' + (wizard.strategy === s ? 'true' : 'false') + '">' +
        '<span class="choice-icon">' + (STRATEGY_ICONS[s] || '') + '</span>' +
        '<span class="choice-text">' + escapeHtml(s) + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<h3>2단계. 어려움과 전략</h3>' +
      '<p class="text-muted">무엇이 어려웠나요? (선택하지 않아도 괜찮아요)</p>' +
      '<div class="choice-list" id="difficultyChoices">' + difficultyChoices + '</div>' +
      '<hr class="section-divider" />' +
      '<h3>어떤 전략을 써볼까요?</h3>' +
      '<div class="choice-list" id="strategyChoices">' + strategyChoices + '</div>' +
      '<div class="wizard-actions">' +
      '<button type="button" class="btn btn-outline" id="step2PrevBtn">이전</button>' +
      '<button type="button" class="btn" id="step2NextBtn">다음</button>' +
      '</div>'
    );
  }

  function renderExploreStep3(wizard) {
    return (
      '<h3>3단계. 나의 미션</h3>' +
      '<p class="text-muted">작은 실천 미션을 만들어 보세요.</p>' +
      '<button type="button" class="btn btn-secondary btn-sm" id="autoMissionBtn">자동 미션 예시 넣기</button>' +
      '<div class="field mt-1"><label for="missionInput">나의 미션</label>' +
      '<textarea id="missionInput" maxlength="120">' + escapeHtml(wizard.mission) + '</textarea></div>' +
      '<div class="field"><label for="confidenceRange">지금 나의 자신감은?</label>' +
      '<div class="range-row"><input type="range" id="confidenceRange" min="1" max="10" value="' + wizard.confidence + '" />' +
      '<span class="range-value" id="confidenceValue">' + wizard.confidence + '</span></div></div>' +
      '<div class="wizard-actions">' +
      '<button type="button" class="btn btn-outline" id="step3PrevBtn">이전</button>' +
      '<button type="button" class="btn btn-secondary" id="saveExploreBtn">탐험 저장하기</button>' +
      '</div>'
    );
  }

  function wireChoiceGroup(container, groupName, onSelect) {
    $all('.choice-item[data-group="' + groupName + '"]', container).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $all('.choice-item[data-group="' + groupName + '"]', container).forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });
        btn.setAttribute('aria-pressed', 'true');
        onSelect(btn.getAttribute('data-value'));
      });
    });
  }

  function wireExploreStep(wizard) {
    var card = $('#wizardCard');

    if (wizard.step === 1) {
      wireChoiceGroup(card, 'food', function (v) {
        wizard.food = v;
      });
      wireChoiceGroup(card, 'feeling', function (v) {
        wizard.feeling = v;
      });
      var customFood = $('#customFoodInput');
      if (customFood) {
        customFood.addEventListener('input', function () {
          wizard.food = customFood.value.trim();
        });
      }
      var storyInput = $('#storyInput');
      storyInput.addEventListener('input', function () {
        wizard.story = storyInput.value;
      });
      var tomorrow = addDaysToDateString(wizard.date, 1);
      $('#mealDateTodayBtn').addEventListener('click', function () {
        if (wizard.mealDate !== wizard.date) changeWizardMealDate(wizard, wizard.date);
      });
      $('#mealDateTomorrowBtn').addEventListener('click', function () {
        if (wizard.mealDate !== tomorrow) changeWizardMealDate(wizard, tomorrow);
      });
      $('#mealDateCustomInput').addEventListener('change', function (e) {
        if (e.target.value && e.target.value !== wizard.mealDate) changeWizardMealDate(wizard, e.target.value);
      });
      $('#step1NextBtn').addEventListener('click', function () {
        if (!wizard.food) {
          showToast('음식을 선택하거나 입력해 주세요.');
          return;
        }
        if (!wizard.feeling) {
          showToast('느낌을 선택해 주세요.');
          return;
        }
        wizard.story = storyInput.value;
        wizard.step = 2;
        render();
      });
    } else if (wizard.step === 2) {
      wireChoiceGroup(card, 'difficulty', function (v) {
        wizard.difficulty = v;
      });
      wireChoiceGroup(card, 'strategy', function (v) {
        wizard.strategy = v;
      });
      $('#step2PrevBtn').addEventListener('click', function () {
        wizard.step = 1;
        render();
      });
      $('#step2NextBtn').addEventListener('click', function () {
        wizard.step = 3;
        render();
      });
    } else {
      var missionInput = $('#missionInput');
      missionInput.addEventListener('input', function () {
        wizard.mission = missionInput.value;
      });
      $('#autoMissionBtn').addEventListener('click', function () {
        missionInput.value = buildAutoMission(wizard.food, wizard.strategy);
        wizard.mission = missionInput.value;
      });
      var range = $('#confidenceRange');
      var rangeValue = $('#confidenceValue');
      range.addEventListener('input', function () {
        rangeValue.textContent = range.value;
        wizard.confidence = Number(range.value);
      });
      $('#step3PrevBtn').addEventListener('click', function () {
        wizard.mission = missionInput.value;
        wizard.step = 2;
        render();
      });
      $('#saveExploreBtn').addEventListener('click', function () {
        wizard.mission = missionInput.value.trim();
        if (!wizard.mission) {
          showToast('나의 미션을 입력해 주세요.');
          return;
        }
        finishExplore(wizard);
      });
    }
  }

  function finishExplore(wizard) {
    var record = getCurrentRecord(state.store);
    var sessionNo = saveSessionRecord(state.store, record, {
      date: wizard.date,
      food: wizard.food,
      feeling: wizard.feeling,
      story: wizard.story,
      difficulty: wizard.difficulty,
      strategy: wizard.strategy,
      mission: wizard.mission,
      confidence: wizard.confidence,
    });
    state.wizard = null;
    showCelebration(function () {
      showToast(sessionNo + '회기 탐험을 저장했어요!');
      setScreen('main');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 미션 돌아보기                                               */
  /* ---------------------------------------------------------------- */

  var CHECK_STATUSES = ['해냈어요', '조금 해봤어요', '아직 못했어요'];

  function renderMissionReview(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var recent = record.sessions.slice(-3).reverse();
    var checksById = {};
    record.missionChecks.forEach(function (c) {
      checksById[c.sessionNo] = c;
    });

    var reviewCards = recent.length
      ? recent
          .map(function (s) {
            var existing = checksById[s.sessionNo];
            var statusButtons = CHECK_STATUSES.map(function (st) {
              return (
                '<button type="button" class="choice-item" data-group="status-' + s.sessionNo + '" data-value="' +
                escapeHtml(st) + '" aria-pressed="' + (existing && existing.status === st ? 'true' : 'false') + '">' +
                escapeHtml(st) + '</button>'
              );
            }).join('');
            return (
              '<div class="card" data-session="' + s.sessionNo + '">' +
              '<h3>' + s.sessionNo + '회기 · ' + escapeHtml(curriculumStageName(s.sessionNo)) + ' · ' + escapeHtml(s.date) + '</h3>' +
              '<p><strong>미션:</strong> ' + escapeHtml(s.mission) + '</p>' +
              '<div class="choice-list">' + statusButtons + '</div>' +
              '<div class="field mt-1"><label for="note-' + s.sessionNo + '">한 줄 돌아보기</label>' +
              '<input type="text" id="note-' + s.sessionNo + '" maxlength="80" value="' + escapeHtml(existing ? existing.note : '') + '" /></div>' +
              '<button type="button" class="btn btn-sm" data-save-check="' + s.sessionNo + '">점검 저장하기</button>' +
              '</div>'
            );
          })
          .join('')
      : '<div class="card">아직 만든 미션이 없어요. 오늘의 탐험을 먼저 시작해 보세요!</div>';

    var historyItems = record.missionChecks
      .slice()
      .sort(function (a, b) {
        return b.checkedAt.localeCompare(a.checkedAt);
      })
      .slice(0, 5)
      .map(function (c) {
        return (
          '<div class="note-entry"><div class="note-meta">' + c.sessionNo + '회기 점검</div>' +
          '<p class="mb-0"><strong>' + escapeHtml(c.status) + '</strong>' +
          (c.note ? ' · ' + escapeHtml(c.note) : '') + '</p></div>'
        );
      })
      .join('');

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">미션 돌아보기</h2>' +
      '<p class="screen-subtitle">내가 만든 미션을 점검해요.</p>' +
      reviewCards +
      '<h3 class="mt-1">최근 점검 기록</h3>' +
      (historyItems || '<p class="text-muted">아직 점검 기록이 없어요.</p>') +
      '</div>';

    recent.forEach(function (s) {
      wireChoiceGroup($('[data-session="' + s.sessionNo + '"]'), 'status-' + s.sessionNo, function (v) {
        $('[data-session="' + s.sessionNo + '"]').setAttribute('data-selected-status', v);
      });
    });

    $all('[data-save-check]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sessionNo = Number(btn.getAttribute('data-save-check'));
        var cardEl = $('[data-session="' + sessionNo + '"]');
        var status = cardEl.getAttribute('data-selected-status') || (checksById[sessionNo] && checksById[sessionNo].status);
        if (!status) {
          showToast('점검 결과를 선택해 주세요.');
          return;
        }
        var note = $('#note-' + sessionNo).value.trim();
        upsertMissionCheck(state.store, record, { sessionNo: sessionNo, date: new Date().toISOString().slice(0, 10), status: status, note: note });
        showToast('점검을 저장했어요!');
        render();
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 오늘의 한마디 (질문 카드)                                     */
  /* ---------------------------------------------------------------- */

  function talkThemeKeyFor(record) {
    return Math.min(Math.max(completedSessionCount(record), 1), 5);
  }

  function ensureTalkSession(record) {
    if (!state.talkSession) {
      var themeKey = talkThemeKeyFor(record);
      var count = TALK_CARDS[themeKey].questions.length;
      state.talkSession = {
        themeKey: themeKey,
        flipped: new Array(count).fill(false),
        answers: new Array(count).fill(''),
      };
    }
    return state.talkSession;
  }

  function renderTalkHistory(record) {
    var notes = (record.talkNotes || [])
      .slice()
      .reverse()
      .slice(0, 3);
    if (!notes.length) return '';
    var items = notes
      .map(function (n) {
        var lines = n.questions
          .map(function (q, i) {
            var a = n.answers[i];
            return '<dt>' + escapeHtml(q) + '</dt><dd>' + (a ? escapeHtml(a) : '<span class="text-muted">(기록 없음)</span>') + '</dd>';
          })
          .join('');
        return '<div class="note-entry"><div class="note-meta">' + n.session + '회기 테마 · ' + escapeHtml(n.theme) + '</div><dl>' + lines + '</dl></div>';
      })
      .join('');
    return '<h3 class="mt-1">최근 기록</h3>' + items;
  }

  function renderTalkCards(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var session = ensureTalkSession(record);
    var theme = TALK_CARDS[session.themeKey];

    var cardsHtml = theme.questions
      .map(function (q, i) {
        var flipped = session.flipped[i];
        return (
          '<div class="tarot-card' + (flipped ? ' flipped' : '') + '" data-tarot-idx="' + i + '">' +
          '<div class="tarot-card-inner">' +
          '<div class="tarot-face tarot-back">✨</div>' +
          '<div class="tarot-face tarot-front">' +
          '<p class="tarot-question">' + escapeHtml(q) + '</p>' +
          '<input type="text" class="tarot-answer-input" data-tarot-answer="' + i + '" maxlength="80" value="' + escapeHtml(session.answers[i]) + '" placeholder="한 줄로 적어볼까요? (선택)" />' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">오늘의 한마디</h2>' +
      '<p class="screen-subtitle">' + session.themeKey + '회기 테마 · ' + escapeHtml(theme.theme) + ' — 카드를 눌러 뒤집어 보세요</p>' +
      '<div class="card">' +
      '<div class="tarot-grid">' + cardsHtml + '</div>' +
      '<div class="wizard-actions mt-1"><button type="button" class="btn btn-block" id="finishTalkBtn">기록하고 마치기</button></div>' +
      '</div>' +
      renderTalkHistory(record) +
      '</div>';

    $all('.tarot-card', app).forEach(function (cardEl) {
      cardEl.addEventListener('click', function (e) {
        if (e.target.closest('.tarot-answer-input')) return;
        var idx = Number(cardEl.getAttribute('data-tarot-idx'));
        if (session.flipped[idx]) return;
        session.flipped[idx] = true;
        render();
      });
    });

    $all('[data-tarot-answer]', app).forEach(function (input) {
      input.addEventListener('input', function () {
        var idx = Number(input.getAttribute('data-tarot-answer'));
        session.answers[idx] = input.value;
      });
      input.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

    $('#finishTalkBtn').addEventListener('click', function () {
      var anyFlipped = session.flipped.some(Boolean);
      if (!anyFlipped) {
        showToast('카드를 하나 이상 뒤집어 봐주세요.');
        return;
      }
      record.talkNotes = record.talkNotes || [];
      record.talkNotes.push({
        session: session.themeKey,
        theme: theme.theme,
        questions: theme.questions.filter(function (_, i) {
          return session.flipped[i];
        }),
        answers: session.answers.filter(function (_, i) {
          return session.flipped[i];
        }),
        savedAt: nowIso(),
      });
      saveStore(state.store);
      state.talkSession = null;
      showToast('오늘의 한마디를 기록했어요!');
      setScreen('main');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 자유게임                                                    */
  /* ---------------------------------------------------------------- */

  var TIME_ATTACK_SECONDS = 10;

  function clearGameTimer() {
    if (state.timeAttackIntervalId) {
      clearInterval(state.timeAttackIntervalId);
      state.timeAttackIntervalId = null;
    }
  }

  function clearCanvasGame() {
    if (state.canvasGameCleanup) {
      state.canvasGameCleanup();
      state.canvasGameCleanup = null;
    }
    if (state.canvasAnimId) {
      cancelAnimationFrame(state.canvasAnimId);
      state.canvasAnimId = null;
    }
  }

  function renderGamesList(app) {
    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">자유게임</h2>' +
      '<p class="screen-subtitle">재미있는 식생활 게임으로 탐험을 이어가요.</p>' +
      '<label class="toggle-row"><input type="checkbox" id="timeAttackToggle"' + (state.timeAttackMode ? ' checked' : '') + ' /> ⏱️ 타임어택 모드 (문제당 ' + TIME_ATTACK_SECONDS + '초 제한, 퀴즈 게임에만 적용돼요)</label>' +
      '<div class="menu-grid">' +
      GAMES.map(function (g) {
        return (
          '<button type="button" class="menu-card" data-game="' + g.id + '">' +
          '<span class="menu-icon">' + g.icon + '</span>' +
          '<span><span class="menu-title">' + escapeHtml(g.name) + '</span>' +
          '<span class="menu-desc">' + escapeHtml(g.desc) + '</span></span>' +
          '</button>'
        );
      }).join('') +
      '</div></div>';

    $('#timeAttackToggle').addEventListener('change', function (e) {
      state.timeAttackMode = e.target.checked;
    });

    $all('.menu-card[data-game]', app).forEach(function (btn) {
      btn.addEventListener('click', function () {
        startGame(btn.getAttribute('data-game'));
      });
    });
  }

  function startGame(gameId) {
    var game = GAMES.filter(function (g) {
      return g.id === gameId;
    })[0];
    if (game.type === 'breakout' || game.type === 'marble') {
      state.gameSession = { gameId: gameId };
    } else {
      state.gameSession = { gameId: gameId, qIndex: 0, score: 0, answered: false, timeAttack: !!state.timeAttackMode };
    }
    setScreen('gamePlay');
  }

  function revealGameAnswer(session, question, chosenIdx) {
    clearGameTimer();
    session.answered = true;
    if (chosenIdx === question.answer) session.score++;
    $all('#gameOptions .game-option').forEach(function (b, i) {
      b.disabled = true;
      if (i === question.answer) b.classList.add('correct');
      else if (i === chosenIdx) b.classList.add('wrong');
    });
    $('#gameExplain').innerHTML = '<div class="game-explain">' + escapeHtml(question.explain) + '</div>';
    $('#gameNextWrap').hidden = false;
  }

  function renderGamePlay(app) {
    clearGameTimer();
    clearCanvasGame();
    var session = state.gameSession;
    if (!session) {
      setScreen('gamesList');
      return;
    }
    var game = GAMES.filter(function (g) {
      return g.id === session.gameId;
    })[0];

    if (game.type === 'breakout') {
      renderBreakoutGame(app, game);
      return;
    }
    if (game.type === 'marble') {
      renderMarbleGame(app, game);
      return;
    }

    var question = game.questions[session.qIndex];

    var options = question.options
      .map(function (opt, idx) {
        return '<button type="button" class="game-option" data-idx="' + idx + '">' + escapeHtml(opt) + '</button>';
      })
      .join('');

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">' + game.icon + ' ' + escapeHtml(game.name) + '</h2>' +
      '<p class="screen-subtitle">문제 ' + (session.qIndex + 1) + ' / ' + game.questions.length +
      (session.timeAttack ? ' · <span class="timer-badge" id="timeAttackTimer">' + TIME_ATTACK_SECONDS + '초</span>' : '') +
      '</p>' +
      '<div class="card">' +
      '<p class="game-question">' + escapeHtml(question.q) + '</p>' +
      '<div id="gameOptions">' + options + '</div>' +
      '<div id="gameExplain"></div>' +
      '<div class="wizard-actions" id="gameNextWrap" hidden>' +
      '<button type="button" class="btn btn-block" id="gameNextBtn">' +
      (session.qIndex === game.questions.length - 1 ? '결과 보기' : '다음 문제') +
      '</button></div>' +
      '</div></div>';

    $all('#gameOptions .game-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (session.answered) return;
        var idx = Number(btn.getAttribute('data-idx'));
        revealGameAnswer(session, question, idx);
      });
    });

    if (session.timeAttack) {
      var timeLeft = TIME_ATTACK_SECONDS;
      var timerEl = $('#timeAttackTimer');
      state.timeAttackIntervalId = setInterval(function () {
        timeLeft--;
        if (timerEl) timerEl.textContent = timeLeft + '초';
        if (timeLeft <= 0) {
          clearGameTimer();
          if (!session.answered) revealGameAnswer(session, question, -1);
        }
      }, 1000);
    }

    $('#gameNextBtn').addEventListener('click', function () {
      if (session.qIndex < game.questions.length - 1) {
        session.qIndex++;
        session.answered = false;
        render();
      } else {
        addGameResult(state.store, getCurrentRecord(state.store), {
          game: game.id,
          gameName: game.name,
          score: session.score,
          total: game.questions.length,
          mode: session.timeAttack ? 'timeAttack' : 'normal',
        });
        setScreen('gameResult');
      }
    });
  }

  function renderGameResult(app) {
    var session = state.gameSession;
    if (!session) {
      setScreen('gamesList');
      return;
    }
    var game = GAMES.filter(function (g) {
      return g.id === session.gameId;
    })[0];
    var total = session.total || (game.questions && game.questions.length) || 0;
    var statLabel = game.type === 'breakout' ? '깬 블록 수' : game.type === 'marble' ? '골인 횟수' : '맞힌 문제 수';

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">게임 결과</h2>' +
      '<div class="card text-center">' +
      '<p class="game-question">' + game.icon + ' ' + escapeHtml(game.name) + (session.timeAttack ? ' <span class="timer-badge">⏱️ 타임어택</span>' : '') + '</p>' +
      '<div class="stat-tile"><div class="stat-value">' + session.score + ' / ' + total + '</div>' +
      '<div class="stat-label">' + statLabel + '</div></div>' +
      '<div class="wizard-actions mt-1">' +
      '<button type="button" class="btn btn-outline" id="retryBtn">다시 하기</button>' +
      '<button type="button" class="btn btn-secondary" id="otherGameBtn">다른 게임</button>' +
      '</div>' +
      '<button type="button" class="btn btn-block mt-1" id="homeFromGameBtn">홈으로</button>' +
      '</div></div>';

    $('#retryBtn').addEventListener('click', function () {
      startGame(session.gameId);
    });
    $('#otherGameBtn').addEventListener('click', function () {
      state.gameSession = null;
      setScreen('gamesList');
    });
    $('#homeFromGameBtn').addEventListener('click', function () {
      state.gameSession = null;
      setScreen('main');
    });
  }

  function canvasScreenMarkup(game, statusText) {
    return (
      '<div class="screen">' +
      '<h2 class="screen-title">' + game.icon + ' ' + escapeHtml(game.name) + '</h2>' +
      '<p class="screen-subtitle" id="canvasStatus">' + escapeHtml(statusText) + '</p>' +
      '<div class="card canvas-card"><canvas id="gameCanvas" width="300" height="400"></canvas></div>' +
      '<div class="wizard-actions" id="canvasResultWrap" hidden>' +
      '<button type="button" class="btn btn-block" id="canvasResultBtn">결과 보기</button>' +
      '</div>' +
      '</div>'
    );
  }

  function renderBreakoutGame(app, game) {
    app.innerHTML = canvasScreenMarkup(game, '화면을 드래그해서 패들을 움직여요. 공을 튕겨서 블록을 모두 깨보세요!');

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    var paddleWidth = 70;
    var paddleHeight = 12;
    var paddleX = (width - paddleWidth) / 2;

    var ballRadius = 7;
    var ballX = width / 2;
    var ballY = height - 30;
    var dx = 2.2;
    var dy = -2.8;

    var rowCount = 4;
    var colCount = 6;
    var brickWidth = 40;
    var brickHeight = 16;
    var brickPadding = 6;
    var brickOffsetTop = 30;
    var brickOffsetLeft = (width - (colCount * (brickWidth + brickPadding) - brickPadding)) / 2;

    var bricks = [];
    for (var c = 0; c < colCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < rowCount; r++) {
        bricks[c][r] = { alive: true };
      }
    }

    var totalBricks = rowCount * colCount;
    var brokenCount = 0;
    var ended = false;

    function collisionDetection() {
      for (var c = 0; c < colCount; c++) {
        for (var r = 0; r < rowCount; r++) {
          var b = bricks[c][r];
          if (!b.alive) continue;
          var bx = brickOffsetLeft + c * (brickWidth + brickPadding);
          var by = brickOffsetTop + r * (brickHeight + brickPadding);
          if (ballX > bx && ballX < bx + brickWidth && ballY > by && ballY < by + brickHeight) {
            dy = -dy;
            b.alive = false;
            brokenCount++;
          }
        }
      }
    }

    function drawBricks() {
      for (var c = 0; c < colCount; c++) {
        for (var r = 0; r < rowCount; r++) {
          var b = bricks[c][r];
          if (!b.alive) continue;
          var bx = brickOffsetLeft + c * (brickWidth + brickPadding);
          var by = brickOffsetTop + r * (brickHeight + brickPadding);
          ctx.fillStyle = '#7c4dff';
          ctx.fillRect(bx, by, brickWidth, brickHeight);
        }
      }
    }

    function endGame(win) {
      if (ended) return;
      ended = true;
      state.gameSession.score = brokenCount;
      state.gameSession.total = totalBricks;
      addGameResult(state.store, getCurrentRecord(state.store), {
        game: game.id,
        gameName: game.name,
        score: brokenCount,
        total: totalBricks,
        mode: 'arcade',
      });
      var statusEl = document.getElementById('canvasStatus');
      if (statusEl) statusEl.textContent = win ? '블록을 모두 깼어요! 최고예요 🎉' : '공을 놓쳤어요! 결과를 확인해보세요.';
      var wrap = document.getElementById('canvasResultWrap');
      if (wrap) wrap.hidden = false;
    }

    function draw() {
      if (ended) return;
      ctx.clearRect(0, 0, width, height);
      drawBricks();

      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#e2971f';
      ctx.fill();

      ctx.fillStyle = '#22b573';
      ctx.fillRect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);

      collisionDetection();

      if (brokenCount >= totalBricks) {
        endGame(true);
        return;
      }

      if (ballX + dx > width - ballRadius || ballX + dx < ballRadius) dx = -dx;
      if (ballY + dy < ballRadius) {
        dy = -dy;
      } else if (dy > 0 && ballY + dy > height - ballRadius - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          dy = -dy;
        } else if (ballY + dy > height - ballRadius) {
          endGame(false);
          return;
        }
      }

      ballX += dx;
      ballY += dy;

      state.canvasAnimId = requestAnimationFrame(draw);
    }

    function pointerX(e) {
      var rect = canvas.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return (clientX - rect.left) * (width / rect.width);
    }

    function onPointerMove(e) {
      e.preventDefault();
      var x = pointerX(e) - paddleWidth / 2;
      paddleX = Math.max(0, Math.min(width - paddleWidth, x));
    }

    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });

    state.canvasGameCleanup = function () {
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('touchmove', onPointerMove);
    };

    draw();

    document.getElementById('canvasResultBtn').addEventListener('click', function () {
      setScreen('gameResult');
    });
  }

  function renderMarbleGame(app, game) {
    var TOTAL_ROUNDS = 3;
    app.innerHTML = canvasScreenMarkup(game, '구슬을 당겼다 놓아서 구멍에 넣어보세요! (1 / ' + TOTAL_ROUNDS + ' 라운드)');

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var statusEl = document.getElementById('canvasStatus');

    var marbleRadius = 10;
    var holeRadius = 16;
    var startX = width / 2;
    var startY = height - 40;

    var round = 0;
    var successes = 0;
    var marbleX = startX;
    var marbleY = startY;
    var vx = 0;
    var vy = 0;
    var holeX = 0;
    var holeY = 0;
    var dragging = false;
    var dragCurrent = null;
    var moving = false;
    var ended = false;

    function newHole() {
      holeX = 60 + Math.random() * (width - 120);
      holeY = 60 + Math.random() * (height - 220);
    }

    function resetRound() {
      marbleX = startX;
      marbleY = startY;
      vx = 0;
      vy = 0;
      moving = false;
      newHole();
      if (statusEl) statusEl.textContent = '구슬을 당겼다 놓아서 구멍에 넣어보세요! (' + (round + 1) + ' / ' + TOTAL_ROUNDS + ' 라운드)';
    }

    resetRound();

    function pointerPos(e) {
      var rect = canvas.getBoundingClientRect();
      var t = e.touches && e.touches.length ? e.touches[0] : e;
      return {
        x: (t.clientX - rect.left) * (width / rect.width),
        y: (t.clientY - rect.top) * (height / rect.height),
      };
    }

    function onDown(e) {
      if (moving || ended) return;
      var p = pointerPos(e);
      if (Math.hypot(p.x - marbleX, p.y - marbleY) < marbleRadius * 3) {
        dragging = true;
        dragCurrent = p;
        e.preventDefault();
      }
    }

    function onMove(e) {
      if (!dragging) return;
      dragCurrent = pointerPos(e);
      e.preventDefault();
    }

    function onUp(e) {
      if (!dragging) return;
      dragging = false;
      var p = dragCurrent || pointerPos(e);
      var pullX = marbleX - p.x;
      var pullY = marbleY - p.y;
      var mag = Math.hypot(pullX, pullY) || 1;
      var power = Math.min(mag, 90) / 90;
      vx = (pullX / mag) * power * 11;
      vy = (pullY / mag) * power * 11;
      if (power > 0.05) moving = true;
      dragCurrent = null;
    }

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onUp);

    function finishGame() {
      ended = true;
      state.gameSession.score = successes;
      state.gameSession.total = TOTAL_ROUNDS;
      addGameResult(state.store, getCurrentRecord(state.store), {
        game: game.id,
        gameName: game.name,
        score: successes,
        total: TOTAL_ROUNDS,
        mode: 'arcade',
      });
      if (statusEl) statusEl.textContent = '게임 종료! ' + successes + ' / ' + TOTAL_ROUNDS + '번 골인했어요.';
      var wrap = document.getElementById('canvasResultWrap');
      if (wrap) wrap.hidden = false;
    }

    function advanceRound(success) {
      if (success) successes++;
      moving = false;
      round++;
      if (round >= TOTAL_ROUNDS) {
        finishGame();
      } else {
        setTimeout(resetRound, 400);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.arc(holeX, holeY, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#26213a';
      ctx.fill();

      if (dragging && dragCurrent) {
        ctx.beginPath();
        ctx.moveTo(marbleX, marbleY);
        ctx.lineTo(dragCurrent.x, dragCurrent.y);
        ctx.strokeStyle = '#d64545';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(marbleX, marbleY, marbleRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#7c4dff';
      ctx.fill();

      if (moving) {
        marbleX += vx;
        marbleY += vy;
        vx *= 0.985;
        vy *= 0.985;

        if (marbleX < marbleRadius) {
          marbleX = marbleRadius;
          vx = -vx * 0.7;
        }
        if (marbleX > width - marbleRadius) {
          marbleX = width - marbleRadius;
          vx = -vx * 0.7;
        }
        if (marbleY < marbleRadius) {
          marbleY = marbleRadius;
          vy = -vy * 0.7;
        }
        if (marbleY > height - marbleRadius) {
          marbleY = height - marbleRadius;
          vy = -vy * 0.7;
        }

        var speed = Math.hypot(vx, vy);
        var distToHole = Math.hypot(marbleX - holeX, marbleY - holeY);

        if (distToHole < holeRadius - marbleRadius * 0.4) {
          advanceRound(true);
        } else if (speed < 0.05) {
          advanceRound(false);
        }
      }

      if (!ended) state.canvasAnimId = requestAnimationFrame(draw);
    }

    state.canvasGameCleanup = function () {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onUp);
    };

    draw();

    document.getElementById('canvasResultBtn').addEventListener('click', function () {
      setScreen('gameResult');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 나의 배지                                                   */
  /* ---------------------------------------------------------------- */

  function renderBadges(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var count = completedSessionCount(record);

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">나의 배지</h2>' +
      '<p class="screen-subtitle">' + escapeHtml(PROGRAM_NAME) + ' · ' + unlockedBadgeCount(record) + ' / 10개 획득</p>' +
      '<div class="badge-grid">' +
      BADGES.map(function (b) {
        var unlocked = b.session <= count;
        return (
          '<div class="badge-tile ' + (unlocked ? 'unlocked' : 'locked') + '">' +
          '<span class="badge-icon" aria-hidden="true">' + (unlocked ? b.icon : '🔒') + '</span>' +
          '<div class="badge-name">' + escapeHtml(b.name) + '</div>' +
          '<div class="badge-state">' + (unlocked ? '✅ 획득' : '잠김 · ' + b.session + '회기') + '</div>' +
          '</div>'
        );
      }).join('') +
      '</div></div>';
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 탐험노트                                                    */
  /* ---------------------------------------------------------------- */

  function renderNotes(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    if (!state.notesSort) state.notesSort = 'newest';

    var sessions = record.sessions.slice();
    sessions.sort(function (a, b) {
      return state.notesSort === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });

    var entries = sessions.length
      ? sessions
          .map(function (s) {
            return (
              '<div class="note-entry">' +
              '<div class="note-meta">' + s.sessionNo + '회기 · ' + escapeHtml(curriculumStageName(s.sessionNo)) + ' · ' + escapeHtml(s.date) + '</div>' +
              '<dl>' +
              '<dt>음식</dt><dd>' + escapeHtml(s.food) + '</dd>' +
              '<dt>느낌</dt><dd>' + escapeHtml(s.feeling) + '</dd>' +
              (s.story ? '<dt>이야기</dt><dd>' + escapeHtml(s.story) + '</dd>' : '') +
              (s.strategy ? '<dt>전략</dt><dd>' + escapeHtml(s.strategy) + '</dd>' : '') +
              '<dt>미션</dt><dd>' + escapeHtml(s.mission) + '</dd>' +
              '<dt>자신감</dt><dd>' + escapeHtml(s.confidence) + ' / 10</dd>' +
              '</dl></div>'
            );
          })
          .join('')
      : '<div class="card">아직 탐험 기록이 없어요.</div>';

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">탐험노트</h2>' +
      '<div class="card"><h3>나의 음식생활 설명서</h3><p class="mb-0">' + escapeHtml(buildProfileSummary(record)) + '</p></div>' +
      buildConfidenceSection(record) +
      '<div class="flex-row mt-1">' +
      '<button type="button" class="btn btn-sm ' + (state.notesSort === 'newest' ? '' : 'btn-outline') + '" id="sortNewestBtn">최신순</button>' +
      '<button type="button" class="btn btn-sm ' + (state.notesSort === 'oldest' ? '' : 'btn-outline') + '" id="sortOldestBtn">시간순</button>' +
      '</div>' +
      '<div class="mt-1">' + entries + '</div>' +
      '</div>';

    $('#sortNewestBtn').addEventListener('click', function () {
      state.notesSort = 'newest';
      render();
    });
    $('#sortOldestBtn').addEventListener('click', function () {
      state.notesSort = 'oldest';
      render();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 상담 리포트                                                 */
  /* ---------------------------------------------------------------- */

  function renderReport(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }

    if (!record.sessions.length) {
      app.innerHTML =
        '<div class="screen">' +
        '<h2 class="screen-title">상담 리포트</h2>' +
        '<div class="card">아직 탐험 기록이 없어요. "오늘의 탐험"을 먼저 완료해 주세요.</div>' +
        '</div>';
      return;
    }

    var byOrder = record.sessions.slice().sort(function (a, b) {
      return a.sessionNo - b.sessionNo;
    });
    var latest = byOrder[byOrder.length - 1];
    var latestTalk = (record.talkNotes || [])
      .slice()
      .sort(function (a, b) {
        return (a.savedAt || '').localeCompare(b.savedAt || '');
      })
      .pop();

    var talkSection = '';
    if (latestTalk) {
      var talkLines = latestTalk.questions
        .map(function (q, i) {
          var a = latestTalk.answers[i];
          return '<p class="mb-0"><em>' + escapeHtml(q) + '</em><br />' + (a ? escapeHtml(a) : '<span class="text-muted">(기록 없음)</span>') + '</p>';
        })
        .join('');
      talkSection = '<hr class="section-divider" /><p><strong>오늘의 한마디</strong></p>' + talkLines;
    }

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">상담 리포트</h2>' +
      '<p class="screen-subtitle">' + escapeHtml(PROGRAM_NAME) + ' · 인쇄하거나 화면으로 보여주세요</p>' +
      '<div class="card report-card" id="reportCard">' +
      '<div class="report-header">' +
      '<div>' +
      '<div class="report-title">맛마음 탐험 상담 리포트</div>' +
      '<div class="text-muted">' + escapeHtml(record.schoolInfo.schoolName) + ' · ' + escapeHtml(record.nickname || '') + '</div>' +
      '</div>' +
      '<div class="text-muted">' + escapeHtml(latest.date) + '</div>' +
      '</div>' +
      '<hr class="section-divider" />' +
      '<p class="mb-0"><strong>' + latest.sessionNo + '회기 · ' + escapeHtml(curriculumStageName(latest.sessionNo)) + '</strong></p>' +
      '<dl class="report-dl">' +
      '<dt>오늘의 음식</dt><dd>' + escapeHtml(latest.food) + '</dd>' +
      '<dt>느낌</dt><dd>' + escapeHtml(latest.feeling) + '</dd>' +
      (latest.difficulty ? '<dt>어려움</dt><dd>' + escapeHtml(latest.difficulty) + '</dd>' : '') +
      (latest.strategy ? '<dt>전략</dt><dd>' + escapeHtml(latest.strategy) + '</dd>' : '') +
      '<dt>실천 미션</dt><dd>' + escapeHtml(latest.mission) + '</dd>' +
      '<dt>자신감</dt><dd>' + latest.confidence + ' / 10</dd>' +
      '</dl>' +
      talkSection +
      '</div>' +
      '<button type="button" class="btn btn-block mt-1" id="printReportBtn">인쇄하기 / 저장하기</button>' +
      '</div>';

    $('#printReportBtn').addEventListener('click', function () {
      window.print();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 수료증                                                     */
  /* ---------------------------------------------------------------- */

  function renderCertificate(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var count = completedSessionCount(record);

    if (count < 5) {
      app.innerHTML =
        '<div class="screen">' +
        '<h2 class="screen-title">수료증</h2>' +
        '<div class="card text-center">' +
        '<div class="onboarding-icon">🔒</div>' +
        '<p>아직 진행 중이에요! <strong>' + progressLabel(record) + '</strong> 회기를 마치면 수료증을 받을 수 있어요.</p>' +
        '</div>' +
        '</div>';
      return;
    }

    var byOrder = record.sessions.slice().sort(function (a, b) {
      return a.sessionNo - b.sessionNo;
    });
    var completedDate = byOrder[4] ? byOrder[4].date : byOrder[byOrder.length - 1].date;

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">수료증</h2>' +
      '<div class="card certificate-card" id="certificateCard">' +
      '<div class="certificate-seal">🏆</div>' +
      '<div class="certificate-title">수 료 증</div>' +
      '<p class="certificate-name">' + escapeHtml(record.nickname || '') + '</p>' +
      '<p class="certificate-body">' +
      '위 학생은 <strong>' + escapeHtml(record.schoolInfo.schoolName) + '</strong>에서 진행한<br />' +
      escapeHtml(PROGRAM_NAME) + ' 전 5단계(관찰과 표현 → 감각과 어려움 → 전략과 미션 → 실천과 도움 → 성장과 안내)를<br />' +
      '모두 성실히 수행하여 이를 수료하였음을 증명합니다.' +
      '</p>' +
      '<p class="text-muted">획득 배지 ' + unlockedBadgeCount(record) + ' / 10 · 수료일 ' + escapeHtml(completedDate) + '</p>' +
      '<div class="certificate-signature">🥔 맛마음 탐험소장 감자</div>' +
      '</div>' +
      '<button type="button" class="btn btn-block mt-1" id="printCertBtn">인쇄하기 / 저장하기</button>' +
      '</div>';

    $('#printCertBtn').addEventListener('click', function () {
      window.print();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 체험 데이터 안내                                             */
  /* ---------------------------------------------------------------- */

  function renderPrivacy(app) {
    var record = getCurrentRecord(state.store);

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">체험 데이터 안내</h2>' +
      '<div class="card">' +
      '<ul class="privacy-list">' +
      '<li>학생 이름을 수집하지 않아요.</li>' +
      '<li>학년, 반, 번호를 수집하지 않아요.</li>' +
      '<li>보호자 정보나 상담정보를 수집하지 않아요.</li>' +
      '<li>이메일이나 회원가입 정보를 받지 않아요.</li>' +
      '<li>서버나 데이터베이스에 탐험기록을 저장하지 않아요.</li>' +
      '<li>기록은 지금 사용 중인 브라우저의 localStorage에만 저장돼요.</li>' +
      '<li>브라우저나 기기를 바꾸면 기록이 이어지지 않아요. (아래 백업 큐알을 쓰면 이어갈 수 있어요)</li>' +
      '<li>같은 기기에서도 별명별로 기록이 나뉘어 저장돼요. 이름 대신 자유롭게 지은 별명을 써주세요.</li>' +
      '<li>시크릿(비공개) 모드는 창을 닫으면 기록이 사라질 수 있어요.</li>' +
      '</ul>' +
      '</div>' +
      '<div class="card">' +
      '<h3>내 기록 백업 큐알</h3>' +
      '<p class="text-muted">지금까지의 탐험 기록을 큐알이나 주소로 만들어두면, 다른 기기나 브라우저에서도 이어갈 수 있어요. 이 큐알 안에 기록이 그대로 담기는 방식이라 서버에는 여전히 아무것도 저장되지 않아요. 큐알이나 주소를 잃어버리면 그 기록도 함께 사라지니 잘 보관해 주세요.</p>' +
      '<button type="button" class="btn btn-secondary" id="makeBackupBtn"' + (record ? '' : ' disabled') + '>백업 큐알 만들기</button>' +
      '<div id="backupOutput" class="mt-1"></div>' +
      '</div>' +
      '<div class="card">' +
      '<h3>코드로 기록 불러오기</h3>' +
      '<p class="text-muted">받은 백업 코드나 주소를 붙여넣으면 그 기록을 불러와요. 해당 학교의 기존 기록이 있다면 덮어씁니다.</p>' +
      '<div class="field"><textarea id="restoreCodeInput" placeholder="백업 코드 또는 주소를 붙여넣으세요"></textarea></div>' +
      '<button type="button" class="btn btn-outline" id="restoreCodeBtn">코드 불러오기</button>' +
      '</div>' +
      '<div class="card">' +
      '<h3>현재 별명 기록 초기화</h3>' +
      '<p class="text-muted">' +
      (record ? escapeHtml(record.schoolInfo.schoolName) + ' · ' + escapeHtml(record.nickname || '') : '선택된 학교') +
      '의 탐험기록, 점검기록, 게임기록을 0부터 다시 시작해요. 별명 자체는 목록에 그대로 남아요.</p>' +
      '<button type="button" class="btn btn-danger" id="deleteRecordBtn"' + (record ? '' : ' disabled') + '>현재 별명 기록 초기화</button>' +
      '</div>' +
      '<div class="card">' +
      '<h3>현재 별명 완전히 삭제</h3>' +
      '<p class="text-muted">' +
      (record ? escapeHtml(record.schoolInfo.schoolName) + ' · ' + escapeHtml(record.nickname || '') : '선택된 학교') +
      ' 별명 자체를 목록에서 없애요. 위 초기화와 달리, 다음에 "다른 친구로 전환"에서 이 별명이 더 이상 보이지 않아요.</p>' +
      '<button type="button" class="btn btn-danger" id="deleteNicknameBtn"' + (record ? '' : ' disabled') + '>현재 별명 완전히 삭제</button>' +
      '</div>' +
      '</div>';

    var deleteBtn = $('#deleteRecordBtn');
    if (deleteBtn && record) {
      deleteBtn.addEventListener('click', function () {
        if (!window.confirm('정말 현재 별명의 모든 체험기록을 초기화할까요? 이 작업은 되돌릴 수 없어요.')) return;
        record.sessions = [];
        record.missionChecks = [];
        record.gameResults = [];
        record.talkNotes = [];
        saveStore(state.store);
        showToast('체험기록을 초기화했어요.');
        setScreen('main');
      });
    }

    var deleteNicknameBtn = $('#deleteNicknameBtn');
    if (deleteNicknameBtn && record) {
      deleteNicknameBtn.addEventListener('click', function () {
        if (!window.confirm(record.schoolInfo.schoolName + ' · ' + record.nickname + ' 별명을 완전히 삭제할까요? 모든 기록이 사라지고 목록에서도 없어져요. 되돌릴 수 없어요.')) return;
        var schoolInfo = record.schoolInfo;
        var key = state.store.currentSchoolKey;
        deleteProfile(state.store, key);
        state.wizard = null;
        state.gameSession = null;
        state.todayMeal = null;
        state.talkSession = null;
        showToast('별명을 삭제했어요.');
        var siblings = listNicknamesForSchool(state.store, schoolInfo.officeCode, schoolInfo.schoolCode);
        if (siblings.length) {
          state.pendingSchoolInfo = schoolInfo;
          setScreen('nicknameSelect');
        } else {
          setScreen('schoolSelect');
        }
      });
    }

    var makeBackupBtn = $('#makeBackupBtn');
    if (makeBackupBtn && record) {
      makeBackupBtn.addEventListener('click', function () {
        try {
          var code = buildBackupCode(record);
          var url = window.location.origin + window.location.pathname + '?r=' + code;
          var qr = qrcode(0, 'M');
          qr.addData(url);
          qr.make();
          $('#backupOutput').innerHTML =
            '<div class="qr-wrap">' + qr.createSvgTag(4, 8) + '</div>' +
            '<div class="field mt-1"><label for="backupUrlOutput">백업 주소</label>' +
            '<input type="text" id="backupUrlOutput" readonly value="' + escapeHtml(url) + '" /></div>' +
            '<button type="button" class="btn btn-sm btn-outline" id="copyBackupUrlBtn">주소 복사하기</button>';
          var copyBtn = $('#copyBackupUrlBtn');
          copyBtn.addEventListener('click', function () {
            var input = $('#backupUrlOutput');
            input.select();
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard
                .writeText(url)
                .then(function () {
                  showToast('주소를 복사했어요!');
                })
                .catch(function () {
                  showToast('복사에 실패했어요. 직접 선택해 복사해 주세요.');
                });
            } else {
              try {
                document.execCommand('copy');
                showToast('주소를 복사했어요!');
              } catch (err) {
                showToast('복사에 실패했어요. 직접 선택해 복사해 주세요.');
              }
            }
          });
        } catch (err) {
          showToast('백업 큐알을 만들지 못했어요. 게임기록이 많다면 조금 줄여보세요.');
        }
      });
    }

    var restoreBtn = $('#restoreCodeBtn');
    if (restoreBtn) {
      restoreBtn.addEventListener('click', function () {
        var raw = $('#restoreCodeInput').value.trim();
        if (!raw) {
          showToast('코드나 주소를 입력해 주세요.');
          return;
        }
        if (applyRestoreCode(extractRestoreCode(raw))) {
          setScreen('main');
        }
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Bootstrap                                                          */
  /* ---------------------------------------------------------------- */

  async function loadConfig() {
    try {
      state.config = await apiGet('/api/config', {});
    } catch (err) {
      state.config = null;
    }
  }

  function init() {
    $('#backBtn').addEventListener('click', function () {
      window.history.back();
    });
    $('#homeBtn').addEventListener('click', function () {
      clearGameTimer();
      clearCanvasGame();
      state.wizard = null;
      state.gameSession = null;
      state.talkSession = null;
      setScreen(getCurrentRecord(state.store) ? 'main' : 'schoolSelect');
    });
    $('#changeSchoolBtn').addEventListener('click', function () {
      clearGameTimer();
      clearCanvasGame();
      state.store.currentSchoolKey = null;
      saveStore(state.store);
      state.wizard = null;
      state.gameSession = null;
      state.todayMeal = null;
      state.talkSession = null;
      setScreen('schoolSelect');
    });

    loadConfig();

    var restoreCode = new URLSearchParams(window.location.search).get('r');
    if (restoreCode) {
      applyRestoreCode(restoreCode);
      window.history.replaceState({}, '', window.location.origin + window.location.pathname);
    }

    var record = getCurrentRecord(state.store);
    var isFreshVisit = !record && Object.keys(state.store.schools).length === 0 && !state.store.onboardingSeen;
    var initialScreen = record ? 'main' : isFreshVisit ? 'onboarding' : 'schoolSelect';
    state.screen = initialScreen;
    window.history.replaceState({ screen: initialScreen }, '', window.location.pathname);
    render();

    window.addEventListener('popstate', function (e) {
      clearGameTimer();
      clearCanvasGame();
      state.wizard = null;
      state.gameSession = null;
      state.talkSession = null;
      state.screen = (e.state && e.state.screen) || (getCurrentRecord(state.store) ? 'main' : 'schoolSelect');
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
