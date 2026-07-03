const STORAGE_KEY='tasteMindLitePublicV1';

const BADGES=[
  {id:'S1A',session:1,icon:'👀',name:'급식 관찰가',desc:'오늘 급식에서 기억나는 음식을 찾아보았어요.'},
  {id:'S1B',session:1,icon:'💬',name:'마음 표현가',desc:'음식을 만났을 때 내 느낌을 말해 보았어요.'},
  {id:'S2A',session:2,icon:'👃',name:'감각 탐험가',desc:'맛·냄새·식감처럼 음식의 감각을 살펴보았어요.'},
  {id:'S2B',session:2,icon:'🔎',name:'어려움 발견가',desc:'내가 어려워하는 점을 구체적으로 찾아보았어요.'},
  {id:'S3A',session:3,icon:'🧩',name:'한입 전략가',desc:'나에게 맞는 작은 한입 방법을 선택했어요.'},
  {id:'S3B',session:3,icon:'🎯',name:'미션 설계가',desc:'실제로 해 볼 수 있는 미션을 만들었어요.'},
  {id:'S4A',session:4,icon:'💪',name:'꾸준한 실천가',desc:'내 미션을 돌아보고 다시 도전했어요.'},
  {id:'S4B',session:4,icon:'🤝',name:'도움 요청가',desc:'필요한 도움을 떠올리고 활용했어요.'},
  {id:'S5A',session:5,icon:'🌱',name:'성장 발견가',desc:'나의 변화를 돌아보고 성장한 점을 찾았어요.'},
  {id:'S5B',session:5,icon:'📘',name:'맛마음 안내자',desc:'나에게 맞는 음식생활 설명서를 완성했어요.'}
];

const GAMES=[
  {
    id:'sense',
    icon:'👃',
    name:'음식 감각 탐정',
    desc:'맛·냄새·촉감·소리를 구분해요.',
    questions:[
      {
        q:'사과를 한입 베어 물었을 때 “아삭”은 어떤 감각일까요?',
        options:['색','소리와 식감','온도'],
        answer:1,
        explain:'아삭은 귀로 듣는 소리이면서 입안에서 느끼는 식감이에요.'
      },
      {
        q:'새 음식을 바로 많이 먹기 어렵다면 가장 작은 탐험은?',
        options:['냄새 맡아 보기','억지로 한 그릇 먹기','보지 않기'],
        answer:0,
        explain:'보기와 냄새 맡기도 충분한 음식 탐험이에요.'
      },
      {
        q:'음식의 감각을 표현하는 말은?',
        options:['부드럽다','정답이다','성공이다'],
        answer:0,
        explain:'부드럽다, 바삭하다, 향긋하다처럼 구체적으로 표현할 수 있어요.'
      }
    ]
  },
  {
    id:'plate',
    icon:'🍱',
    name:'식판 친구 찾기',
    desc:'여러 음식이 하는 일을 연결해요.',
    questions:[
      {
        q:'밥이나 빵처럼 우리 몸이 움직일 힘을 주는 음식은?',
        options:['주식','후식만','물만'],
        answer:0,
        explain:'밥·빵·면 같은 주식은 활동에 필요한 에너지를 줘요.'
      },
      {
        q:'채소 반찬을 만났을 때 해 볼 수 있는 탐험은?',
        options:['색과 모양 관찰하기','무조건 버리기','친구 것을 숨기기'],
        answer:0,
        explain:'색·모양·냄새를 살펴보는 것도 중요한 첫걸음이에요.'
      },
      {
        q:'균형 있는 식판에 가장 가까운 것은?',
        options:['한 종류만 가득','여러 종류를 알맞게','간식만 가득'],
        answer:1,
        explain:'서로 다른 음식이 함께 있을 때 다양한 영양소를 만날 수 있어요.'
      }
    ]
  },
  {
    id:'rhythm',
    icon:'⏰',
    name:'생활리듬 퀘스트',
    desc:'식사와 생활습관의 연결을 살펴봐요.',
    questions:[
      {
        q:'아침을 먹기 힘들 때 시도할 수 있는 작은 방법은?',
        options:['전날 조금 일찍 자기','밤새기','아무것도 준비하지 않기'],
        answer:0,
        explain:'수면과 아침 준비시간을 함께 살펴보면 도움이 돼요.'
      },
      {
        q:'배고픔을 알아차리는 방법은?',
        options:['몸의 느낌 살펴보기','친구만 따라 먹기','시계만 보기'],
        answer:0,
        explain:'배에서 나는 느낌, 집중력, 기분 등 몸의 신호를 살펴볼 수 있어요.'
      },
      {
        q:'급식을 너무 빨리 먹는다면?',
        options:['한입 먹고 잠깐 내려놓기','더 빨리 먹기','씹지 않기'],
        answer:0,
        explain:'작은 멈춤을 만들면 속도와 배부름을 알아차리기 쉬워요.'
      }
    ]
  },
  {
    id:'safety',
    icon:'🛡️',
    name:'음식 안전 신호',
    desc:'알레르기와 위생 상황에서 안전한 행동을 찾아요.',
    questions:[
      {
        q:'알레르기가 있는 음식인지 확실하지 않을 때는?',
        options:['선생님이나 어른에게 확인하기','그냥 먹기','친구에게 대신 먹이기'],
        answer:0,
        explain:'먹기 전에 성분과 알레르기 정보를 확인해야 해요.'
      },
      {
        q:'손을 씻어야 하는 때는?',
        options:['식사 전','일주일에 한 번','손이 보이지 않을 때만'],
        answer:0,
        explain:'식사 전 손 씻기는 음식 안전의 기본이에요.'
      },
      {
        q:'친구가 음식 알레르기 증상을 보이면?',
        options:['즉시 어른에게 알리기','조용히 기다리기','장난으로 보기'],
        answer:0,
        explain:'알레르기 증상은 빠르게 어른에게 알려 도움을 받아야 해요.'
      }
    ]
  }
];

const FEELINGS=[
  '맛있고 편안했어요',
  '조금 낯설었어요',
  '냄새가 어려웠어요',
  '식감이 어려웠어요',
  '생각보다 괜찮았어요',
  '아직 잘 모르겠어요'
];

const BARRIERS=[
  '냄새가 강했어요',
  '식감이 낯설었어요',
  '모양이나 색이 싫었어요',
  '맛이 걱정됐어요',
  '배가 고프지 않았어요',
  '먹는 시간이 부족했어요'
];

const STRATEGIES=[
  '아주 작은 한입으로 맛보기',
  '먼저 냄새와 모양 살펴보기',
  '좋아하는 음식과 함께 먹기',
  '천천히 오래 씹어 보기',
  '친구나 선생님에게 도움받기',
  '다음 기회에 다시 만나 보기'
];

const state={
  config:null,
  store:null,
  school:null,
  meal:null,
  draft:{},
  currentStep:1,
  currentGame:null,
  quizIndex:0,
  quizScore:0,
  quizLocked:false
};

function $(id){
  return document.getElementById(id);
}

document.addEventListener('DOMContentLoaded',async()=>{
  state.store=loadStore();

  try{
    const config=await apiGet('/api/config');

    state.config=config;
    $('systemName').textContent=
      config.systemName||
      '맛마음 탐험소 Lite';

    if(!config.apiKeyRegistered){
      $('apiNotice').classList.remove('hidden');
      $('apiNotice').textContent=
        '운영자가 아직 나이스 인증키를 등록하지 않았습니다. Cloudflare Worker의 Variables and Secrets에서 NEIS_API_KEY를 등록해야 합니다.';
    }

    if(state.store.selectedSchool){
      state.school=state.store.selectedSchool;
      openApp();
    }else{
      showSchoolSetup();
    }
  }catch(error){
    showPageError(
      'schoolSearchMessage',
      error
    );
  }
});

function defaultStore(){
  return {
    version:1,
    selectedSchool:null,
    profiles:{}
  };
}

function loadStore(){
  try{
    const raw=
      localStorage.getItem(
        STORAGE_KEY
      );

    if(!raw)return defaultStore();

    const parsed=JSON.parse(raw);

    return {
      version:1,
      selectedSchool:
        parsed.selectedSchool||null,
      profiles:
        parsed.profiles||{}
    };
  }catch(error){
    return defaultStore();
  }
}

function saveStore(){
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.store)
  );
}

function schoolKey(school){
  return [
    school.officeCode,
    school.schoolCode
  ].join('-');
}

function getProfile(){
  if(!state.school){
    return {
      records:[],
      missionChecks:[],
      gameResults:[]
    };
  }

  const key=schoolKey(state.school);

  if(!state.store.profiles[key]){
    state.store.profiles[key]={
      records:[],
      missionChecks:[],
      gameResults:[]
    };
  }

  return state.store.profiles[key];
}

function setLoading(show){
  $('loading').classList.toggle(
    'show',
    Boolean(show)
  );
}

function hideViews(){
  [
    'homeView',
    'exploreView',
    'missionView',
    'gamesView',
    'quizView',
    'badgesView',
    'notebookView',
    'privacyView'
  ].forEach(id=>
    $(id).classList.add('hidden')
  );
}

function showSchoolSetup(){
  $('schoolView').classList.remove('hidden');
  $('appView').classList.add('hidden');
  $('homeBtn').classList.add('hidden');
  $('schoolBtn').classList.add('hidden');
  $('resetBtn').classList.add('hidden');

  $('schoolName').textContent=
    state.school
      ?state.school.schoolName+
       ' · 다른 학교 선택'
      :'학교를 선택해 주세요';

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

function searchSchools(){
  const payload={
    officeCode:
      $('officeCode').value,
    schoolKind:
      $('schoolKind').value,
    query:
      $('schoolQuery').value.trim()
  };

  $('schoolResults').innerHTML='';
  $('schoolSearchMessage').innerHTML='';

  if(payload.query.length<2){
    showPageError(
      'schoolSearchMessage',
      '학교 이름을 2글자 이상 입력하세요.'
    );
    return;
  }

  setLoading(true);

  const params=new URLSearchParams({
    query:payload.query,
    officeCode:payload.officeCode,
    schoolKind:payload.schoolKind
  });

  apiGet('/api/schools?'+params.toString())
    .then(rows=>{
      setLoading(false);
      renderSchoolResults(rows||[]);
    })
    .catch(error=>{
      setLoading(false);
      showPageError(
        'schoolSearchMessage',
        error
      );
    });
}

function renderSchoolResults(rows){
  if(!rows.length){
    $('schoolResults').innerHTML=
      '<div class="empty">검색된 학교가 없습니다. 시도교육청이나 학교급을 다시 확인하세요.</div>';
    return;
  }

  $('schoolResults').innerHTML=
    rows.map((row,index)=>`
      <button
        class="school-result"
        onclick="selectSchool(${index})"
      >
        <span>
          <strong>${escapeHtml(row.schoolName)}</strong>
          <small>
            ${escapeHtml(row.officeName)}
            · ${escapeHtml(row.schoolKind)}
            <br>
            ${escapeHtml(row.address||'주소 정보 없음')}
          </small>
        </span>
        <span class="status">선택</span>
      </button>
    `).join('');

  state.schoolSearchResults=rows;
}

function selectSchool(index){
  const school=
    state.schoolSearchResults[index];

  if(!school)return;

  state.school=school;
  state.store.selectedSchool=school;
  saveStore();

  openApp();
}

function openApp(){
  $('schoolView').classList.add('hidden');
  $('appView').classList.remove('hidden');
  $('homeBtn').classList.remove('hidden');
  $('schoolBtn').classList.remove('hidden');
  $('resetBtn').classList.remove('hidden');

  $('schoolName').textContent=
    state.school.schoolName+
    ' · 공용 체험형';

  loadMeal();
}

function loadMeal(){
  setLoading(true);

  const params=new URLSearchParams({
    officeCode:state.school.officeCode,
    schoolCode:state.school.schoolCode,
    schoolName:state.school.schoolName,
    date:
      state.config&&state.config.today
        ?state.config.today
        :''
  });

  apiGet('/api/meals?'+params.toString())
    .then(result=>{
      setLoading(false);
      state.meal=result;
      showHome();
    })
    .catch(error=>{
      setLoading(false);
      state.meal=null;
      showHome();
      showPageError(
        'mealSummary',
        error
      );
    });
}

function showHome(){
  hideViews();
  $('homeView').classList.remove('hidden');
  renderHome();

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

function renderHome(){
  const profile=getProfile();
  const records=sortedRecords(profile);
  const count=Math.min(5,records.length);
  const badges=earnedBadges(count);
  const gameCount=
    profile.gameResults.length;
  const latest=
    records[records.length-1]||null;
  const todayKey=
    state.config&&state.config.today
      ?state.config.today
      :localDateKey(new Date());
  const todayRecord=
    records.find(row=>
      row.date===todayKey
    );

  $('homeGreeting').textContent=
    state.school.schoolName+
    '의 오늘 맛마음 지도';

  $('homeLead').textContent=
    count>=5
      ?'다섯 번의 핵심 탐험을 모두 마쳤어요. 탐험노트에서 나의 음식생활 설명서를 확인해 보세요.'
      :(todayRecord
        ?'오늘 탐험 기록이 저장되어 있어요. 미션을 돌아보거나 게임에 도전해 보세요.'
        :(count+1)+'번째 핵심 탐험을 시작할 준비가 되었어요.');

  $('sessionStat').textContent=
    count+'/5';

  $('badgeStat').textContent=
    badges.length+'/10';

  $('gameStat').textContent=
    gameCount;

  $('currentMissionText').textContent=
    latest&&latest.mission
      ?latest.mission
      :'오늘의 탐험을 완료하면 작은 실천 미션이 생겨요.';

  $('explorationCardText').textContent=
    todayRecord
      ?'오늘 약속: '+todayRecord.mission
      :'오늘 급식 경험을 돌아보고 다음 한입을 정해요.';

  $('explorationCardStatus').textContent=
    todayRecord
      ?'오늘 기록 다시 보기'
      :(count>=5
        ?'5회기 완성 · 추가 체험'
        :(count+1)+'회기 시작');

  $('missionCardStatus').textContent=
    latest&&latest.mission
      ?'점검하기'
      :'미션 만들기';

  $('gameCardStatus').textContent=
    gameCount
      ?gameCount+'회 기록'
      :'바로 도전';

  $('badgeCardStatus').textContent=
    badges.length+'/10';

  $('notebookCardStatus').textContent=
    records.length
      ?records.length+'개 기록'
      :'기록 없음';

  renderMealSummary();
}

function renderMealSummary(){
  const result=state.meal;

  if(!result){
    $('mealSummary').innerHTML=
      '<div class="empty">급식정보를 불러오지 못했습니다. 학교 선택이나 인증키 설정을 확인하세요.</div>';
    return;
  }

  const today=
    renderMealCard(
      result.today,
      '오늘 급식',
      false
    );

  const next=
    renderMealCard(
      result.next,
      result.nextLabel||
      '다음 급식일',
      true
    );

  $('mealSummary').innerHTML=
    `<div class="meal-grid">${today}${next}</div>`;
}

function renderMealCard(meal,label,isNext){
  if(!meal){
    return `
      <div class="meal-card ${isNext?'next':''}">
        <h3>${escapeHtml(label)}</h3>
        <div class="empty">
          등록된 급식이 없습니다.
        </div>
      </div>
    `;
  }

  return `
    <div class="meal-card ${isNext?'next':''}">
      <span class="status">${escapeHtml(label)}</span>
      <h3 style="margin-top:10px">
        ${escapeHtml(meal.dateLabel||'')}
      </h3>
      <div class="menu-list">
        ${(meal.menu||[]).map(item=>
          `<div class="menu-item">${escapeHtml(item)}</div>`
        ).join('')}
      </div>
      <div class="muted" style="margin-top:10px">
        ${escapeHtml(meal.calories||'')}
      </div>
    </div>
  `;
}

function startExploration(){
  hideViews();
  $('exploreView').classList.remove('hidden');

  const profile=getProfile();
  const records=sortedRecords(profile);
  const todayKey=
    state.config&&state.config.today
      ?state.config.today
      :localDateKey(new Date());

  const old=
    records.find(row=>
      row.date===todayKey
    );

  state.draft={
    date:todayKey,
    menu:old&&old.menu||'',
    feeling:old&&old.feeling||'',
    statement:old&&old.statement||'',
    barrier:old&&old.barrier||'',
    strategy:old&&old.strategy||'',
    mission:old&&old.mission||'',
    confidence:old&&old.confidence||7
  };

  const sessionNo=
    Math.min(
      5,
      old
        ?old.sessionNo
        :records.length+1
    );

  $('exploreTitle').textContent=
    sessionNo+
    '회기 · 오늘의 맛마음 탐험';

  renderExploreChoices();
  goExploreStep(1);

  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
}

function renderExploreChoices(){
  const menu=
    state.meal&&state.meal.today
      ?state.meal.today.menu||[]
      :[];

  $('todayMenuChoices').innerHTML=
    (
      menu.length
        ?menu
        :['급식이 없는 날','직접 떠올린 음식']
    )
      .map(item=>
        choiceButton(
          item,
          state.draft.menu===item,
          `selectDraft('menu','${escapeJs(item)}');renderExploreChoices()`
        )
      )
      .join('');

  $('feelingChoices').innerHTML=
    FEELINGS.map(item=>
      choiceButton(
        item,
        state.draft.feeling===item,
        `selectDraft('feeling','${escapeJs(item)}');renderExploreChoices()`
      )
    ).join('');

  $('barrierChoices').innerHTML=
    BARRIERS.map(item=>
      choiceButton(
        item,
        state.draft.barrier===item,
        `selectDraft('barrier','${escapeJs(item)}');renderExploreChoices()`
      )
    ).join('');

  $('strategyChoices').innerHTML=
    STRATEGIES.map(item=>
      choiceButton(
        item,
        state.draft.strategy===item,
        `selectDraft('strategy','${escapeJs(item)}');renderExploreChoices()`
      )
    ).join('');

  $('studentStatement').value=
    state.draft.statement||'';

  $('missionSentence').value=
    state.draft.mission||
    makeMissionSuggestion();

  $('confidence').value=
    state.draft.confidence||7;

  $('confidenceNumber').textContent=
    state.draft.confidence||7;
}

function choiceButton(
  text,
  selected,
  click
){
  return `
    <button
      type="button"
      class="choice ${selected?'selected':''}"
      onclick="${click}"
    >
      ${escapeHtml(text)}
    </button>
  `;
}

function selectDraft(key,value){
  state.draft[key]=value;
}

function makeMissionSuggestion(){
  if(!state.draft.strategy){
    return '';
  }

  const menu=
    state.draft.menu||
    '낯선 음식';

  return (
    '다음 급식에서 '+
    menu+
    '을(를) 만나면 '+
    state.draft.strategy+
    '.'
  );
}

function goExploreStep(step){
  if(step===2){
    state.draft.statement=
      $('studentStatement').value.trim();

    if(
      !state.draft.menu ||
      !state.draft.feeling
    ){
      alert(
        '기억나는 음식과 느낌을 선택하세요.'
      );
      return;
    }
  }

  if(step===3){
    if(
      !state.draft.barrier ||
      !state.draft.strategy
    ){
      alert(
        '어려웠던 점과 다음 전략을 선택하세요.'
      );
      return;
    }

    const oldText=
      $('missionSentence').value.trim();

    $('missionSentence').value=
      oldText||
      makeMissionSuggestion();
  }

  state.currentStep=step;

  [1,2,3].forEach(number=>{
    $('exploreStep'+number)
      .classList.toggle(
        'hidden',
        number!==step
      );

    $('step'+number)
      .classList.toggle(
        'active',
        number===step
      );

    $('step'+number)
      .classList.toggle(
        'done',
        number<step
      );
  });
}

function saveExploration(){
  const mission=
    $('missionSentence').value.trim();

  if(!mission){
    alert(
      '나의 작은 실천 미션을 입력하세요.'
    );
    return;
  }

  state.draft.statement=
    $('studentStatement').value.trim();

  state.draft.mission=
    mission;

  state.draft.confidence=
    Number(
      $('confidence').value||7
    );

  const profile=getProfile();
  const records=
    profile.records||[];

  const existingIndex=
    records.findIndex(row=>
      row.date===state.draft.date
    );

  const uniqueDates=
    new Set(
      records.map(row=>row.date)
    );

  const sessionNo=
    existingIndex>=0
      ?records[existingIndex].sessionNo
      :Math.min(
          5,
          uniqueDates.size+1
        );

  const record={
    id:
      existingIndex>=0
        ?records[existingIndex].id
        :makeId('EXP'),
    date:
      state.draft.date,
    savedAt:
      new Date().toISOString(),
    sessionNo:sessionNo,
    schoolName:
      state.school.schoolName,
    menu:
      state.draft.menu,
    feeling:
      state.draft.feeling,
    statement:
      state.draft.statement,
    barrier:
      state.draft.barrier,
    strategy:
      state.draft.strategy,
    mission:
      state.draft.mission,
    confidence:
      state.draft.confidence
  };

  if(existingIndex>=0){
    records[existingIndex]=record;
  }else{
    records.push(record);
  }

  profile.records=records;
  saveStore();

  const newBadges=
    BADGES.filter(item=>
      item.session===sessionNo
    );

  $('exploreSaveMessage').innerHTML=`
    <div class="notice ok">
      <b>${sessionNo}회기 탐험을 저장했어요.</b><br>
      ${newBadges.map(item=>
        item.icon+' '+escapeHtml(item.name)
      ).join(' · ')}
      배지를 확인해 보세요.
    </div>
    <div class="actions">
      <button class="btn primary" onclick="showHome()">
        홈으로
      </button>
      <button class="btn soft" onclick="showBadges()">
        배지 보기
      </button>
    </div>
  `;

  renderHome();
}

function showMission(){
  hideViews();
  $('missionView').classList.remove('hidden');

  const profile=getProfile();
  const records=sortedRecords(profile);
  const latest=
    records[records.length-1]||null;

  if(!latest||!latest.mission){
    $('missionContent').innerHTML=`
      <div class="empty">
        아직 미션이 없어요.<br>
        오늘의 탐험에서 작은 실천을 먼저 정해 보세요.
      </div>
      <div class="actions">
        <button class="btn primary" onclick="startExploration()">
          오늘의 탐험 시작
        </button>
      </div>
    `;
    return;
  }

  const recentChecks=
    (profile.missionChecks||[])
      .filter(row=>
        row.mission===latest.mission
      )
      .slice()
      .sort((a,b)=>
        b.savedAt.localeCompare(a.savedAt)
      );

  $('missionContent').innerHTML=`
    <div class="mission-box">
      <b>현재 미션</b>
      <p>${escapeHtml(latest.mission)}</p>
    </div>

    <div style="margin-top:18px">
      <h3>오늘 실천해 보았나요?</h3>
      <div class="choice-grid">
        ${['해냈어요','조금 해봤어요','아직 못했어요'].map(item=>
          `<button class="choice" onclick="selectMissionResult('${escapeJs(item)}',this)">${escapeHtml(item)}</button>`
        ).join('')}
      </div>
    </div>

    <div style="margin-top:15px">
      <label>한 줄 돌아보기</label>
      <textarea
        id="missionReflection"
        placeholder="어떤 점이 쉬웠거나 어려웠나요?"
      ></textarea>
    </div>

    <div class="actions">
      <button class="btn success" onclick="saveMissionCheck()">
        점검 저장
      </button>
    </div>

    <div id="missionSaveMessage"></div>

    <h3 style="margin-top:25px">최근 점검</h3>
    ${
      recentChecks.length
        ?`<div class="timeline">
            ${recentChecks.slice(0,5).map(row=>`
              <div class="timeline-item">
                <b>${escapeHtml(row.result)}</b>
                <div class="muted">${escapeHtml(formatLocalDateTime(row.savedAt))}</div>
                ${row.reflection?`<p style="margin:8px 0 0">${escapeHtml(row.reflection)}</p>`:''}
              </div>
            `).join('')}
          </div>`
        :'<div class="empty">아직 미션 점검 기록이 없습니다.</div>'
    }
  `;

  state.selectedMissionResult='';
  window.scrollTo({top:0,behavior:'smooth'});
}

function selectMissionResult(
  value,
  button
){
  state.selectedMissionResult=value;

  document.querySelectorAll(
    '#missionView .choice'
  ).forEach(item=>
    item.classList.remove('selected')
  );

  button.classList.add('selected');
}

function saveMissionCheck(){
  if(!state.selectedMissionResult){
    alert(
      '오늘의 실천결과를 선택하세요.'
    );
    return;
  }

  const profile=getProfile();
  const records=sortedRecords(profile);
  const latest=
    records[records.length-1];

  profile.missionChecks.push({
    id:makeId('CHK'),
    mission:latest.mission,
    result:
      state.selectedMissionResult,
    reflection:
      $('missionReflection').value.trim(),
    savedAt:
      new Date().toISOString()
  });

  saveStore();

  $('missionSaveMessage').innerHTML=`
    <div class="notice ok">
      미션 점검을 저장했어요. 결과보다 다시 돌아본 것이 더 중요해요.
    </div>
  `;

  setTimeout(showMission,500);
}

function showGames(){
  hideViews();
  $('gamesView').classList.remove('hidden');

  const profile=getProfile();

  $('gameHub').innerHTML=
    GAMES.map(game=>{
      const results=
        profile.gameResults.filter(row=>
          row.gameId===game.id
        );

      const best=
        results.length
          ?Math.max(
              ...results.map(row=>
                Number(row.score||0)
              )
            )
          :0;

      return `
        <button class="game-card" onclick="startGame('${escapeJs(game.id)}')">
          <div class="game-icon">${game.icon}</div>
          <h3>${escapeHtml(game.name)}</h3>
          <p class="muted">${escapeHtml(game.desc)}</p>
          <span class="status">
            ${results.length
              ?'최고 '+best+'/'+game.questions.length
              :'처음 도전'}
          </span>
        </button>
      `;
    }).join('');

  window.scrollTo({top:0,behavior:'smooth'});
}

function startGame(gameId){
  state.currentGame=
    GAMES.find(game=>
      game.id===gameId
    );

  if(!state.currentGame)return;

  state.quizIndex=0;
  state.quizScore=0;
  state.quizLocked=false;

  hideViews();
  $('quizView').classList.remove('hidden');

  renderQuiz();
}

function renderQuiz(){
  const game=state.currentGame;
  const question=
    game.questions[state.quizIndex];

  $('quizTitle').textContent=
    game.icon+' '+game.name;

  $('quizProgress').textContent=
    (state.quizIndex+1)+
    ' / '+
    game.questions.length;

  $('quizContent').innerHTML=`
    <h3>${escapeHtml(question.q)}</h3>
    <div class="quiz-options">
      ${question.options.map((option,index)=>`
        <button
          class="quiz-option"
          onclick="answerQuiz(${index},this)"
        >
          ${escapeHtml(option)}
        </button>
      `).join('')}
    </div>
    <div id="quizExplain"></div>
  `;
}

function answerQuiz(index,button){
  if(state.quizLocked)return;

  state.quizLocked=true;

  const question=
    state.currentGame
      .questions[state.quizIndex];

  const buttons=
    document.querySelectorAll(
      '.quiz-option'
    );

  buttons.forEach(
    (item,itemIndex)=>{
      if(itemIndex===question.answer){
        item.classList.add('correct');
      }else if(itemIndex===index){
        item.classList.add('wrong');
      }

      item.disabled=true;
    }
  );

  if(index===question.answer){
    state.quizScore+=1;
  }

  const isLast=
    state.quizIndex===
    state.currentGame.questions.length-1;

  $('quizExplain').innerHTML=`
    <div class="notice ${index===question.answer?'ok':'warn'}">
      <b>${index===question.answer?'정답이에요!':'함께 알아봐요.'}</b><br>
      ${escapeHtml(question.explain)}
    </div>
    <div class="actions">
      <button class="btn primary" onclick="${isLast?'finishGame()':'nextQuiz()'}">
        ${isLast?'결과 보기':'다음 문제'}
      </button>
    </div>
  `;
}

function nextQuiz(){
  state.quizIndex+=1;
  state.quizLocked=false;
  renderQuiz();
}

function finishGame(){
  const profile=getProfile();

  profile.gameResults.push({
    id:makeId('GAME'),
    gameId:
      state.currentGame.id,
    gameName:
      state.currentGame.name,
    score:
      state.quizScore,
    maxScore:
      state.currentGame.questions.length,
    savedAt:
      new Date().toISOString()
  });

  saveStore();

  $('quizContent').innerHTML=`
    <div class="guide-box">
      <div style="font-size:57px;text-align:center">
        ${state.currentGame.icon}
      </div>
      <h2 style="text-align:center">
        ${state.quizScore}/${state.currentGame.questions.length}
      </h2>
      <p class="lead" style="text-align:center">
        점수와 관계없이 세 가지 상황을 모두 생각해 보았어요.
      </p>
    </div>
    <div class="actions">
      <button class="btn primary" onclick="showGames()">
        다른 게임
      </button>
      <button class="btn secondary" onclick="showHome()">
        홈으로
      </button>
    </div>
  `;
}

function showBadges(){
  hideViews();
  $('badgesView').classList.remove('hidden');

  const count=
    Math.min(
      5,
      sortedRecords(getProfile()).length
    );

  const earned=
    new Set(
      earnedBadges(count).map(item=>
        item.id
      )
    );

  $('badgeBook').innerHTML=
    BADGES.map(item=>`
      <div class="badge-card ${earned.has(item.id)?'earned':'locked'}">
        <div class="badge-icon">${item.icon}</div>
        <div>
          <span class="status">${item.session}회기</span>
          <h3 style="font-size:18px;margin-top:8px">
            ${escapeHtml(item.name)}
          </h3>
          <p class="muted">
            ${escapeHtml(item.desc)}
          </p>
        </div>
      </div>
    `).join('');

  window.scrollTo({top:0,behavior:'smooth'});
}

function earnedBadges(sessionCount){
  return BADGES.filter(item=>
    item.session<=sessionCount
  );
}

function showNotebook(){
  hideViews();
  $('notebookView').classList.remove('hidden');

  const profile=getProfile();
  const records=sortedRecords(profile);
  const checks=
    profile.missionChecks||[];

  if(!records.length){
    $('notebookContent').innerHTML=`
      <div class="empty">
        아직 탐험기록이 없습니다.<br>
        오늘의 탐험을 완료하면 이곳에 기록이 쌓여요.
      </div>
    `;
    return;
  }

  const favoriteMenus=
    unique(
      records.map(row=>row.menu)
    ).slice(0,5);

  const strategies=
    unique(
      records.map(row=>row.strategy)
    ).slice(0,5);

  const latest=
    records[records.length-1];

  $('notebookContent').innerHTML=`
    <div class="guide-box">
      <h3>나의 음식생활 설명서</h3>
      <p>
        나는 <b>${escapeHtml(favoriteMenus.join(', ')||'여러 음식')}</b>을(를)
        탐험했고, 어려울 때는
        <b>${escapeHtml(strategies.join(', ')||'작은 방법')}</b>을(를)
        활용해 볼 수 있어요.
      </p>
      <p>
        지금 나의 미션은
        <b>${escapeHtml(latest.mission)}</b>입니다.
      </p>
      <p class="muted">
        핵심 탐험 ${Math.min(5,records.length)}/5 ·
        미션 점검 ${checks.length}회 ·
        게임 ${profile.gameResults.length}회
      </p>
    </div>

    <h3 style="margin-top:23px">탐험 타임라인</h3>
    <div class="timeline">
      ${records.slice().reverse().map(row=>`
        <div class="timeline-item">
          <span class="status">${row.sessionNo}회기 · ${escapeHtml(row.date)}</span>
          <h3 style="font-size:18px;margin-top:9px">
            ${escapeHtml(row.menu||'급식 탐험')}
          </h3>
          <p>
            <b>느낌:</b> ${escapeHtml(row.feeling)}
          </p>
          ${row.statement?`<p><b>나의 말:</b> ${escapeHtml(row.statement)}</p>`:''}
          <p>
            <b>전략:</b> ${escapeHtml(row.strategy)}
          </p>
          <p>
            <b>미션:</b> ${escapeHtml(row.mission)}
          </p>
          <div class="muted">
            자신감 ${Number(row.confidence||0)}/10
          </div>
        </div>
      `).join('')}
    </div>
  `;

  window.scrollTo({top:0,behavior:'smooth'});
}

function showPrivacy(){
  hideViews();
  $('privacyView').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}

function sortedRecords(profile){
  return (profile.records||[])
    .slice()
    .sort((a,b)=>
      a.date.localeCompare(b.date)
    );
}

function resetCurrentSchoolData(){
  if(!state.school)return;

  if(!confirm(
    state.school.schoolName+
    '에서 저장한 탐험기록·미션·배지·게임 결과를 모두 삭제할까요?\n학교 선택 정보는 유지됩니다.'
  )){
    return;
  }

  state.store.profiles[
    schoolKey(state.school)
  ]={
    records:[],
    missionChecks:[],
    gameResults:[]
  };

  saveStore();
  showHome();

  alert(
    '현재 학교의 체험기록을 삭제했습니다.'
  );
}

function showPageError(id,error){
  const text=
    error&&error.message
      ?error.message
      :String(error||'오류가 발생했습니다.');

  $(id).innerHTML=
    '<div class="error">'+
    escapeHtml(text)
      .replace(/\n/g,'<br>')+
    '</div>';
}

function makeId(prefix){
  return prefix+'-'+
    Date.now()+'-'+
    Math.random()
      .toString(36)
      .slice(2,8);
}

function localDateKey(date){
  const year=date.getFullYear();
  const month=
    String(date.getMonth()+1)
      .padStart(2,'0');
  const day=
    String(date.getDate())
      .padStart(2,'0');

  return year+'-'+month+'-'+day;
}

function formatLocalDateTime(value){
  const date=new Date(value);

  if(isNaN(date.getTime())){
    return value||'';
  }

  return date.toLocaleString(
    'ko-KR',
    {
      year:'numeric',
      month:'numeric',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    }
  );
}

function unique(values){
  return Array.from(
    new Set(
      values.filter(Boolean)
    )
  );
}


async function apiGet(url){
  const response=await fetch(url,{
    method:'GET',
    headers:{
      'Accept':'application/json'
    },
    credentials:'same-origin'
  });

  let payload=null;

  try{
    payload=await response.json();
  }catch(error){
    throw new Error(
      '서버 응답을 읽지 못했습니다.'
    );
  }

  if(!response.ok||payload.ok===false){
    throw new Error(
      payload&&payload.error
        ?payload.error
        :'요청 처리 중 오류가 발생했습니다.'
    );
  }

  return Object.prototype.hasOwnProperty.call(payload,'data')
    ?payload.data
    :payload;
}

function escapeHtml(value){
  return String(value??'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

function escapeJs(value){
  return String(value??'')
    .replace(/\\/g,'\\\\')
    .replace(/'/g,"\\'")
    .replace(/\r?\n/g,' ');
}
