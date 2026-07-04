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

  var GAMES = [
    {
      id: 'sense',
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
      sc: [record.schoolInfo.officeCode, record.schoolInfo.schoolCode, record.schoolInfo.schoolName, record.schoolInfo.schoolKind],
      s: record.sessions.map(function (s) {
        return [s.sessionNo, s.date, s.food, s.feeling, s.story || '', s.difficulty || '', s.strategy || '', s.mission, s.confidence];
      }),
      mc: record.missionChecks.map(function (c) {
        return [c.sessionNo, c.date, c.status, c.note || ''];
      }),
      gr: record.gameResults.slice(-BACKUP_GAME_CAP).map(function (g) {
        return [g.game, g.score, g.total, (g.playedAt || '').slice(0, 10)];
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
    return { schoolInfo: schoolInfo, sessions: sessions, missionChecks: missionChecks, gameResults: gameResults };
  }

  function applyRestoreCode(code) {
    var decoded;
    try {
      decoded = parseBackupCode(code);
    } catch (err) {
      showToast('코드를 불러오지 못했어요. 코드가 올바른지 확인해 주세요.');
      return false;
    }
    var key = schoolKeyOf(decoded.schoolInfo);
    var existing = state.store.schools[key];
    if (existing && (existing.sessions.length || existing.missionChecks.length || existing.gameResults.length)) {
      if (!window.confirm(decoded.schoolInfo.schoolName + '의 기존 기록을 이 코드의 기록으로 덮어쓸까요? 이 작업은 되돌릴 수 없어요.')) {
        return false;
      }
    }
    state.store.schools[key] = {
      schoolInfo: decoded.schoolInfo,
      sessions: decoded.sessions,
      missionChecks: decoded.missionChecks,
      gameResults: decoded.gameResults,
    };
    state.store.currentSchoolKey = key;
    saveStore(state.store);
    showToast(decoded.schoolInfo.schoolName + '의 기록을 불러왔어요!');
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

  function loadStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version: 1, currentSchoolKey: null, schools: {} };
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !parsed.schools) {
        return { version: 1, currentSchoolKey: null, schools: {} };
      }
      return parsed;
    } catch (err) {
      return { version: 1, currentSchoolKey: null, schools: {} };
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function schoolKeyOf(info) {
    return info.officeCode + '_' + info.schoolCode;
  }

  function ensureSchoolRecord(store, schoolInfo) {
    var key = schoolKeyOf(schoolInfo);
    if (!store.schools[key]) {
      store.schools[key] = {
        schoolInfo: schoolInfo,
        sessions: [],
        missionChecks: [],
        gameResults: [],
      };
    } else {
      store.schools[key].schoolInfo = schoolInfo;
    }
    store.currentSchoolKey = key;
    saveStore(store);
    return store.schools[key];
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
    render();
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- */
  /* Render root                                                        */
  /* ---------------------------------------------------------------- */

  function render() {
    var app = $('#app');
    var changeBtn = $('#changeSchoolBtn');
    var record = getCurrentRecord(state.store);
    changeBtn.hidden = !record || state.screen === 'schoolSelect';

    switch (state.screen) {
      case 'schoolSelect':
        renderSchoolSelect(app);
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
      case 'privacy':
        renderPrivacy(app);
        break;
      default:
        app.innerHTML = '<div class="card">불러오는 중이에요...</div>';
    }
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
      '<button type="button" id="searchSchoolBtn" class="btn btn-block">4. 학교 검색</button>' +
      '</div>' +
      '<div id="schoolSearchStatus"></div>' +
      '<div id="schoolResults" class="card-grid"></div>' +
      '</div>';

    $('#searchSchoolBtn').addEventListener('click', doSchoolSearch);
    $('#querySearchInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSchoolSearch();
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
    ensureSchoolRecord(state.store, school);
    showToast(school.schoolName + '(으)로 입장했어요!');
    setScreen('main');
  }

  /* ---------------------------------------------------------------- */
  /* Screen: 메인                                                       */
  /* ---------------------------------------------------------------- */

  var MENU_ITEMS = [
    { id: 'explore', icon: '🧭', title: '오늘의 탐험', desc: '급식으로 오늘의 탐험을 시작해요' },
    { id: 'missionReview', icon: '📝', title: '미션 돌아보기', desc: '내가 만든 미션을 점검해요' },
    { id: 'gamesList', icon: '🎮', title: '자유게임', desc: '재미있는 식생활 게임을 해요' },
    { id: 'badges', icon: '🏅', title: '나의 배지', desc: '모은 배지를 확인해요' },
    { id: 'notes', icon: '📓', title: '탐험노트', desc: '나의 탐험 기록을 모아봐요' },
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

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">' + escapeHtml(info.schoolName) + '</h2>' +
      '<p class="screen-subtitle">전국 학교급식 기반 식생활 탐험 웹앱</p>' +
      '<div class="card" id="mealCard"><p class="text-muted">오늘 급식을 불러오는 중이에요...</p></div>' +
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

    $all('.menu-card[data-screen]', app).forEach(function (btn) {
      btn.addEventListener('click', function () {
        setScreen(btn.getAttribute('data-screen'));
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
      state.wizard = {
        step: 1,
        date: new Date().toISOString().slice(0, 10),
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

  function renderExplore(app) {
    var record = getCurrentRecord(state.store);
    if (!record) {
      setScreen('schoolSelect');
      return;
    }
    var wizard = ensureWizard();
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
      '<div class="step-indicator">' + stepDots + '</div>' +
      '<div class="card" id="wizardCard">' + body + '</div>' +
      '</div>';

    wireExploreStep(wizard);
  }

  function renderExploreStep1(wizard) {
    var meal = state.todayMeal;
    var foodChoices = '';
    if (meal && meal.hasMeal && meal.menu.length) {
      foodChoices = meal.menu
        .map(function (m) {
          return (
            '<button type="button" class="choice-item" data-group="food" data-value="' +
            escapeHtml(m) +
            '" aria-pressed="' + (wizard.food === m ? 'true' : 'false') + '">' +
            escapeHtml(m) +
            '</button>'
          );
        })
        .join('');
    } else {
      foodChoices =
        '<p class="banner banner-info">오늘 등록된 급식이 없어 직접 입력해요.</p>' +
        '<div class="field"><input type="text" id="customFoodInput" placeholder="예: 당근" value="' +
        escapeHtml(wizard.food) +
        '" /></div>';
    }

    var feelingChoices = FEELINGS.map(function (f) {
      return (
        '<button type="button" class="choice-item" data-group="feeling" data-value="' +
        escapeHtml(f) +
        '" aria-pressed="' + (wizard.feeling === f ? 'true' : 'false') + '">' +
        escapeHtml(f) +
        '</button>'
      );
    }).join('');

    return (
      '<h3>1단계. 느낌 찾기</h3>' +
      '<p class="text-muted">오늘 급식 메뉴 중 가장 기억나는 음식을 골라 보세요.</p>' +
      '<div class="choice-list" id="foodChoices">' + foodChoices + '</div>' +
      '<h3 class="mt-1">그때 느낌은 어땠나요?</h3>' +
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
        escapeHtml(d) +
        '</button>'
      );
    }).join('');
    var strategyChoices = STRATEGIES.map(function (s) {
      return (
        '<button type="button" class="choice-item" data-group="strategy" data-value="' +
        escapeHtml(s) +
        '" aria-pressed="' + (wizard.strategy === s ? 'true' : 'false') + '">' +
        escapeHtml(s) +
        '</button>'
      );
    }).join('');

    return (
      '<h3>2단계. 어려움과 전략</h3>' +
      '<p class="text-muted">무엇이 어려웠나요? (선택하지 않아도 괜찮아요)</p>' +
      '<div class="choice-list" id="difficultyChoices">' + difficultyChoices + '</div>' +
      '<h3 class="mt-1">어떤 전략을 써볼까요?</h3>' +
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
    showToast(sessionNo + '회기 탐험을 저장했어요!');
    setScreen('main');
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
              '<h3>' + s.sessionNo + '회기 · ' + escapeHtml(s.date) + '</h3>' +
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
  /* Screen: 자유게임                                                    */
  /* ---------------------------------------------------------------- */

  function renderGamesList(app) {
    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">자유게임</h2>' +
      '<p class="screen-subtitle">재미있는 식생활 게임으로 탐험을 이어가요.</p>' +
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

    $all('.menu-card[data-game]', app).forEach(function (btn) {
      btn.addEventListener('click', function () {
        startGame(btn.getAttribute('data-game'));
      });
    });
  }

  function startGame(gameId) {
    state.gameSession = { gameId: gameId, qIndex: 0, score: 0, answered: false };
    setScreen('gamePlay');
  }

  function renderGamePlay(app) {
    var session = state.gameSession;
    if (!session) {
      setScreen('gamesList');
      return;
    }
    var game = GAMES.filter(function (g) {
      return g.id === session.gameId;
    })[0];
    var question = game.questions[session.qIndex];

    var options = question.options
      .map(function (opt, idx) {
        return '<button type="button" class="game-option" data-idx="' + idx + '">' + escapeHtml(opt) + '</button>';
      })
      .join('');

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">' + game.icon + ' ' + escapeHtml(game.name) + '</h2>' +
      '<p class="screen-subtitle">문제 ' + (session.qIndex + 1) + ' / ' + game.questions.length + '</p>' +
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
        session.answered = true;
        var idx = Number(btn.getAttribute('data-idx'));
        var correct = idx === question.answer;
        if (correct) session.score++;
        $all('#gameOptions .game-option').forEach(function (b, i) {
          b.disabled = true;
          if (i === question.answer) b.classList.add('correct');
          else if (i === idx) b.classList.add('wrong');
        });
        $('#gameExplain').innerHTML = '<div class="game-explain">' + escapeHtml(question.explain) + '</div>';
        $('#gameNextWrap').hidden = false;
      });
    });

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

    app.innerHTML =
      '<div class="screen">' +
      '<h2 class="screen-title">게임 결과</h2>' +
      '<div class="card text-center">' +
      '<p class="game-question">' + game.icon + ' ' + escapeHtml(game.name) + '</p>' +
      '<div class="stat-tile"><div class="stat-value">' + session.score + ' / ' + game.questions.length + '</div>' +
      '<div class="stat-label">맞힌 문제 수</div></div>' +
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
      '<p class="screen-subtitle">' + unlockedBadgeCount(record) + ' / 10개 획득</p>' +
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
              '<div class="note-meta">' + s.sessionNo + '회기 · ' + escapeHtml(s.date) + '</div>' +
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
      '<h3>현재 학교 체험기록 삭제</h3>' +
      '<p class="text-muted">' + (record ? escapeHtml(record.schoolInfo.schoolName) : '선택된 학교') + '의 탐험기록, 점검기록, 게임기록을 모두 삭제해요.</p>' +
      '<button type="button" class="btn btn-danger" id="deleteRecordBtn"' + (record ? '' : ' disabled') + '>현재 학교 체험기록 삭제</button>' +
      '</div>' +
      '</div>';

    var deleteBtn = $('#deleteRecordBtn');
    if (deleteBtn && record) {
      deleteBtn.addEventListener('click', function () {
        if (!window.confirm('정말 현재 학교의 모든 체험기록을 삭제할까요? 이 작업은 되돌릴 수 없어요.')) return;
        record.sessions = [];
        record.missionChecks = [];
        record.gameResults = [];
        saveStore(state.store);
        showToast('체험기록을 삭제했어요.');
        setScreen('main');
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
    $('#homeBtn').addEventListener('click', function () {
      state.wizard = null;
      state.gameSession = null;
      setScreen(getCurrentRecord(state.store) ? 'main' : 'schoolSelect');
    });
    $('#changeSchoolBtn').addEventListener('click', function () {
      state.store.currentSchoolKey = null;
      saveStore(state.store);
      state.wizard = null;
      state.gameSession = null;
      setScreen('schoolSelect');
    });

    loadConfig();

    var restoreCode = new URLSearchParams(window.location.search).get('r');
    if (restoreCode) {
      applyRestoreCode(restoreCode);
      window.history.replaceState({}, '', window.location.origin + window.location.pathname);
    }

    var record = getCurrentRecord(state.store);
    setScreen(record ? 'main' : 'schoolSelect');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
