(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();let D=[],O=1,Y=!1,q=!0,m=[],k="",I="",h="score",g="desc",x="",c=1960,d=new Date().getFullYear(),l=0,r=10,ie="grid",R=[],L=!1,v=localStorage.getItem("darkTheme")==="true",E=JSON.parse(localStorage.getItem("favorites")||"[]");const fe=document.body,N=document.getElementById("cursor"),H=document.getElementById("cursor-blur"),ve=document.getElementById("filterPanel"),Me=document.getElementById("filterToggle"),Te=document.getElementById("closeFilters"),me=document.getElementById("genreSelect"),P=document.getElementById("genreOptions"),ne=document.getElementById("selectedGenres"),j=document.getElementById("typeSelect"),A=document.getElementById("statusSelect"),_=document.getElementById("sortSelect"),ae=document.getElementById("sortOrderSelect"),p=document.getElementById("yearMinInput"),B=document.getElementById("yearMaxInput"),X=document.getElementById("yearMin"),J=document.getElementById("yearMax"),y=document.getElementById("ratingMinInput"),C=document.getElementById("ratingMaxInput"),U=document.getElementById("ratingMin"),W=document.getElementById("ratingMax"),$e=document.getElementById("resetFilters"),Se=document.getElementById("applyFilters"),K=document.getElementById("searchInput"),be=document.getElementById("searchClear"),Fe=document.getElementById("activeFilters"),pe=document.querySelector(".active-filters-scroll"),z=document.getElementById("gridView"),G=document.getElementById("listView"),Pe=document.getElementById("resultsCount"),M=document.getElementById("animeGrid"),V=document.getElementById("loadingContainer"),le=document.getElementById("noResults"),je=document.getElementById("clearFiltersBtn"),oe=document.getElementById("toTopButton"),Ae=document.getElementById("themeToggle"),Q=document.getElementById("modal"),_e=document.getElementById("modalTitle"),Ne=document.getElementById("modalTitleJp"),ge=document.getElementById("modalImage"),He=document.getElementById("modalSynopsis"),Ye=document.getElementById("modalType"),De=document.getElementById("modalScore"),Oe=document.getElementById("modalStatus"),qe=document.getElementById("modalEpisodes"),Re=document.getElementById("modalSeason"),ze=document.getElementById("modalYear"),Ge=document.getElementById("modalStudios"),Ve=document.getElementById("modalSource"),Xe=document.getElementById("modalRating"),Je=document.getElementById("modalDuration"),se=document.getElementById("modalGenres"),b=document.getElementById("modalCharacters"),F=document.getElementById("modalStaff"),Ue=document.getElementById("modalExternalLink"),w=document.getElementById("modalAddToFavorites"),ye=document.getElementById("closeModal"),he=document.querySelectorAll(".tab-button");v&&fe.classList.add("dark-theme");localStorage.getItem("viewMode")==="list"&&(ie="list",M.classList.add("list-view"),z.classList.remove("active"),G.classList.add("active"));xe();window.addEventListener("load",We);window.addEventListener("scroll",it);window.addEventListener("mousemove",Ke);document.addEventListener("click",Qe);Me.addEventListener("click",et);Te.addEventListener("click",ee);Se.addEventListener("click",tt);$e.addEventListener("click",ke);je.addEventListener("click",ke);p.addEventListener("input",Ee);B.addEventListener("input",Ee);y.addEventListener("input",Le);C.addEventListener("input",Le);K.addEventListener("input",xt(st,500));be.addEventListener("click",ot);z.addEventListener("click",()=>Ie("grid"));G.addEventListener("click",()=>Ie("list"));ye.addEventListener("click",ce);Q.querySelector(".modal-backdrop").addEventListener("click",ce);he.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;Be(t)})});w.addEventListener("click",ft);oe.addEventListener("click",lt);window.addEventListener("scroll",at);Ae.addEventListener("click",rt);async function We(){await ct(),Ze(),$(),await re(),document.addEventListener("keydown",e=>{e.key==="Escape"&&(Q.classList.contains("hidden")?L&&ee():ce())})}function xe(){const e=document.getElementById("particles"),t=e.getContext("2d");let n=[];function s(){e.width=window.innerWidth,e.height=window.innerHeight}s(),window.addEventListener("resize",s);function o(){n=[];const i=Math.min(Math.floor(window.innerWidth/10),100);for(let u=0;u<i;u++)n.push({x:Math.random()*e.width,y:Math.random()*e.height,radius:Math.random()*2+1,color:v?`hsla(${Math.random()*60+240}, 70%, 70%, ${Math.random()*.3+.1})`:`hsla(${Math.random()*60+240}, 80%, 60%, ${Math.random()*.3+.1})`,speedX:Math.random()*.5-.25,speedY:Math.random()*.5-.25,directionChangeTime:Math.random()*200+50})}o();function a(){t.clearRect(0,0,e.width,e.height),n.forEach(i=>{i.x+=i.speedX,i.y+=i.speedY,(i.x<0||i.x>e.width)&&(i.speedX*=-1),(i.y<0||i.y>e.height)&&(i.speedY*=-1),Math.random()*1e3<i.directionChangeTime&&(i.speedX=Math.random()*.5-.25,i.speedY=Math.random()*.5-.25),t.beginPath(),t.arc(i.x,i.y,i.radius,0,Math.PI*2),t.fillStyle=i.color,t.fill()});for(let i=0;i<n.length;i++)for(let u=i+1;u<n.length;u++){const de=n[i].x-n[u].x,ue=n[i].y-n[u].y,te=Math.sqrt(de*de+ue*ue);te<100&&(t.beginPath(),t.strokeStyle=v?`rgba(255, 255, 255, ${.1*(1-te/100)})`:`rgba(0, 0, 0, ${.1*(1-te/100)})`,t.lineWidth=.5,t.moveTo(n[i].x,n[i].y),t.lineTo(n[u].x,n[u].y),t.stroke())}requestAnimationFrame(a)}a()}function Ke(e){N.style.left=`${e.clientX}px`,N.style.top=`${e.clientY}px`,H.style.left=`${e.clientX}px`,H.style.top=`${e.clientY}px`;const t=e.target;t.tagName==="BUTTON"||t.tagName==="A"||t.tagName==="INPUT"||t.tagName==="SELECT"||t.closest(".anime-card")||t.closest(".option-item")||t.closest(".filter-tag")||t.closest(".genre-tag")?(N.classList.add("clickable"),H.classList.add("clickable")):(N.classList.remove("clickable"),H.classList.remove("clickable"))}function Qe(e){const t=e.target;if(t.classList.contains("button")||t.classList.contains("icon-button")||t.classList.contains("view-button")){const n=document.createElement("span");n.classList.add("ripple"),t.appendChild(n);const s=t.getBoundingClientRect(),o=Math.max(s.width,s.height);n.style.width=n.style.height=`${o}px`,n.style.left=`${e.clientX-s.left-o/2}px`,n.style.top=`${e.clientY-s.top-o/2}px`,n.classList.add("active"),setTimeout(()=>{n.remove()},600)}if(t.closest("#genreSelect")||t.closest("#genreOptions")){if(t.closest("#genreSelect")&&(P.classList.toggle("active"),me.classList.toggle("active")),t.closest(".option-item")){const n=t.closest(".option-item").dataset.value;we(n)}}else P.classList.remove("active"),me.classList.remove("active")}function Ze(){p.value=c,B.value=d,X.textContent=c,J.textContent=d,y.value=l,C.value=r,U.textContent=l,W.textContent=r,T(),Z()}function Ee(){c=parseInt(p.value),d=parseInt(B.value),c>d&&(this===p?(c=d,p.value=c):(d=c,B.value=d)),X.textContent=c,J.textContent=d,T()}function Le(){l=parseFloat(y.value),r=parseFloat(C.value),l>r&&(this===y?(l=r,y.value=l):(r=l,C.value=r)),U.textContent=l,W.textContent=r,T()}function T(){const e=document.querySelector("#yearMinInput").closest(".range-slider").querySelector(".range-progress"),t=(c-1960)/(new Date().getFullYear()-1960)*100,n=(d-1960)/(new Date().getFullYear()-1960)*100;e.style.left=`${t}%`,e.style.width=`${n-t}%`;const s=document.querySelector("#ratingMinInput").closest(".range-slider").querySelector(".range-progress"),o=l/10*100,a=r/10*100;s.style.left=`${o}%`,s.style.width=`${a-o}%`}function we(e){const t=m.indexOf(e);t===-1?m.push(e):m.splice(t,1),Z()}function Z(){if(P.querySelectorAll(".option-item").forEach(t=>{const n=t.dataset.value;m.includes(n)?t.classList.add("selected"):t.classList.remove("selected")}),ne.innerHTML="",m.length===0){const t=document.createElement("span");t.textContent="Выберите жанры",t.classList.add("placeholder"),ne.appendChild(t)}else m.forEach(t=>{const n=R.find(s=>s.mal_id.toString()===t);if(n){const s=document.createElement("div");s.classList.add("selected-option"),s.innerHTML=`
          ${n.name}
          <button class="remove-option" data-genre-id="${t}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        `,ne.appendChild(s),s.querySelector(".remove-option").addEventListener("click",a=>{a.stopPropagation(),we(t)})}})}function et(){L=!L,ve.classList.toggle("active",L),document.body.style.overflow=L?"hidden":""}function ee(){L=!1,ve.classList.remove("active"),document.body.style.overflow=""}function tt(){k=j.value,I=A.value,h=_.value,g=ae.value,ee(),$(),S()}function $(){pe.innerHTML="";let e=!1;if(x&&(f("Поиск",x),e=!0),m.length>0&&m.forEach(t=>{const n=R.find(s=>s.mal_id.toString()===t);n&&(f("Жанр",n.name,t),e=!0)}),k&&(f("Тип",j.options[j.selectedIndex].text,"type"),e=!0),I&&(f("Статус",A.options[A.selectedIndex].text,"status"),e=!0),(c>1960||d<new Date().getFullYear())&&(f("Год",`${c} - ${d}`,"year"),e=!0),(l>0||r<10)&&(f("Рейтинг",`${l} - ${r}`,"rating"),e=!0),h!=="score"||g!=="desc"){const t=_.options[_.selectedIndex].text;f("Сортировка",`${t} ${g==="desc"?"↓":"↑"}`,"sort"),e=!0}Fe.style.display=e?"block":"none"}function f(e,t,n){const s=document.createElement("div");s.classList.add("filter-tag"),s.innerHTML=`
    <span class="filter-tag-label">${e}:</span>
    <span class="filter-tag-value">${t}</span>
    <button class="filter-tag-remove" data-filter-id="${n}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `,pe.appendChild(s),s.querySelector(".filter-tag-remove").addEventListener("click",()=>{nt(n)})}function nt(e){if(e==="type")k="",j.value="";else if(e==="status")I="",A.value="";else if(e==="year")c=1960,d=new Date().getFullYear(),p.value=c,B.value=d,X.textContent=c,J.textContent=d,T();else if(e==="rating")l=0,r=10,y.value=l,C.value=r,U.textContent=l,W.textContent=r,T();else if(e==="sort")h="score",g="desc",_.value=h,ae.value=g;else if(typeof e=="string"&&e.match(/^\d+$/)){const t=m.indexOf(e);t!==-1&&(m.splice(t,1),Z())}$(),S()}function ke(){m=[],k="",I="",h="score",g="desc",c=1960,d=new Date().getFullYear(),l=0,r=10,x="",j.value="",A.value="",_.value=h,ae.value=g,p.value=c,B.value=d,X.textContent=c,J.textContent=d,y.value=l,C.value=r,U.textContent=l,W.textContent=r,K.value="",T(),Z(),$(),ee(),S()}function st(){x=K.value.trim(),$(),S()}function ot(){K.value="",x="",$(),S()}function Ie(e){ie=e,localStorage.setItem("viewMode",e),e==="grid"?(M.classList.remove("list-view"),z.classList.add("active"),G.classList.remove("active")):(M.classList.add("list-view"),z.classList.remove("active"),G.classList.add("active"))}function S(){D=[],M.innerHTML="",O=1,q=!0,re()}function it(){window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&!Y&&q&&(O++,re())}function at(){window.scrollY>500?oe.classList.add("visible"):oe.classList.remove("visible")}function lt(){window.scrollTo({top:0,behavior:"smooth"})}function rt(){v=!v,fe.classList.toggle("dark-theme",v),localStorage.setItem("darkTheme",v),xe()}async function ct(){try{R=(await(await fetch("https://api.jikan.moe/v4/genres/anime")).json()).data,P.innerHTML="",R.forEach(n=>{const s=document.createElement("div");s.classList.add("option-item"),s.dataset.value=n.mal_id,s.innerHTML=`
        <div class="option-checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="option-label">${n.name}</div>
      `,P.appendChild(s)})}catch(e){console.error("Error fetching genres:",e),Ce("Не удалось загрузить жанры. Пожалуйста, попробуйте позже.")}}async function re(){if(!Y){Y=!0,vt();try{const e=new URL("https://api.jikan.moe/v4/anime");e.searchParams.set("page",O.toString()),e.searchParams.set("limit","24"),e.searchParams.set("order_by",h),e.searchParams.set("sort",g),m.length>0&&e.searchParams.set("genres",m.join(",")),k&&e.searchParams.set("type",k),I&&e.searchParams.set("status",I),x&&e.searchParams.set("q",x),c>1960&&e.searchParams.set("start_date",`${c}-01-01`),d<new Date().getFullYear()&&e.searchParams.set("end_date",`${d}-12-31`),l>0&&e.searchParams.set("min_score",l.toString()),l<10&&e.searchParams.set("max_score",r.toString()),await new Promise(o=>setTimeout(o,500));const t=await fetch(e);if(!t.ok)throw new Error(`API responded with status: ${t.status}`);const n=await t.json();let s=n.data;if(r<10&&(s=s.filter(o=>!o.score||o.score<=r)),s.length===0)q=!1,O===1&&yt();else{dt(s),q=n.pagination.has_next_page;const o=n.pagination.items.total;Pe.querySelector("span").textContent=o}}catch(e){console.error("Error fetching anime:",e),Ce("Не удалось загрузить аниме. Пожалуйста, попробуйте позже.")}finally{Y=!1,pt()}}}function dt(e){le.classList.add("hidden"),e.forEach((t,n)=>{var a,i;const s=document.createElement("div");s.className="anime-card",s.style.animationDelay=`${.05*(n%12)}s`;const o=(a=t.aired)!=null&&a.from?new Date(t.aired.from).getFullYear():"N/A";ie==="list"?s.innerHTML=`
        <div class="card-image">
          <img src="${t.images.jpg.large_image_url||t.images.jpg.image_url}" alt="${t.title}" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${t.title}</h3>
          <div class="card-info">
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
              ${t.type||"N/A"}
            </div>
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${o}
            </div>
            ${t.score?`
              <div class="card-info-item card-score">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${t.score}
              </div>
            `:""}
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${t.episodes?`${t.episodes} эп.`:"N/A"}
            </div>
          </div>
          <p class="card-synopsis">${t.synopsis||"Описание отсутствует"}</p>
          <div class="card-genres">
            ${((i=t.genres)==null?void 0:i.slice(0,3).map(u=>`<span class="card-genre">${u.name}</span>`).join(""))||""}
          </div>
        </div>
      `:s.innerHTML=`
        <div class="card-image">
          <img src="${t.images.jpg.large_image_url||t.images.jpg.image_url}" alt="${t.title}" loading="lazy" />
          <div class="card-overlay"></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${t.title}</h3>
          <div class="card-info">
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
              </svg>
              ${t.type||"N/A"}
            </div>
            <div class="card-info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${o}
            </div>
            ${t.score?`
              <div class="card-info-item card-score">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                ${t.score}
              </div>
            `:""}
          </div>
        </div>
      `,s.addEventListener("click",()=>ut(t)),M.appendChild(s)}),D=[...D,...e]}function ut(e){var s,o,a;_e.textContent=e.title,Ne.textContent=e.title_japanese||"",ge.src=e.images.jpg.large_image_url||e.images.jpg.image_url,ge.alt=e.title,He.textContent=e.synopsis||"Описание отсутствует",Ye.textContent=e.type||"N/A",De.textContent=e.score?e.score.toFixed(2):"N/A",Oe.textContent=e.status||"N/A",qe.textContent=e.episodes||"N/A";const t=(s=e.aired)!=null&&s.from?new Date(e.aired.from).getFullYear():"N/A";ze.textContent=t,Re.textContent=e.season?`${ht(e.season)} ${t}`:"N/A",Ge.textContent=((o=e.studios)==null?void 0:o.length)>0?e.studios.map(i=>i.name).join(", "):"N/A",Ve.textContent=e.source||"N/A",Xe.textContent=e.rating||"N/A",Je.textContent=e.duration||"N/A",se.innerHTML="",((a=e.genres)==null?void 0:a.length)>0?e.genres.forEach(i=>{const u=document.createElement("span");u.className="genre-tag",u.textContent=i.name,se.appendChild(u)}):se.textContent="Жанры не указаны",Ue.href=e.url||"#";const n=E.some(i=>i.mal_id===e.mal_id);w.innerHTML=n?`
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    Удалить из избранного
  `:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    Добавить в избранное
  `,w.dataset.animeId=e.mal_id,Be("info"),mt(e.mal_id),gt(e.mal_id),Q.classList.remove("hidden"),document.body.style.overflow="hidden",setTimeout(()=>{ye.focus()},100)}async function mt(e){b.innerHTML=`
    <div class="loading-placeholder">
      <div class="loading-circle small"></div>
      <p>Загрузка персонажей...</p>
    </div>
  `;try{const n=await(await fetch(`https://api.jikan.moe/v4/anime/${e}/characters`)).json();if(n.data.length===0){b.innerHTML='<p class="no-data">Информация о персонажах отсутствует</p>';return}b.innerHTML="",n.data.slice(0,12).forEach(o=>{const a=document.createElement("div");a.className="character-card",a.innerHTML=`
        <div class="character-image">
          <img src="${o.character.images.jpg.image_url}" alt="${o.character.name}" loading="lazy" />
        </div>
        <div class="character-info">
          <div class="character-name">${o.character.name}</div>
          <div class="character-role">${o.role}</div>
        </div>
      `,b.appendChild(a)})}catch(t){console.error("Error fetching characters:",t),b.innerHTML='<p class="no-data">Не удалось загрузить персонажей</p>'}}async function gt(e){F.innerHTML=`
    <div class="loading-placeholder">
      <div class="loading-circle small"></div>
      <p>Загрузка информации о создателях...</p>
    </div>
  `;try{const n=await(await fetch(`https://api.jikan.moe/v4/anime/${e}/staff`)).json();if(n.data.length===0){F.innerHTML='<p class="no-data">Информация о создателях отсутствует</p>';return}F.innerHTML="",n.data.slice(0,12).forEach(o=>{const a=document.createElement("div");a.className="staff-card",a.innerHTML=`
        <div class="staff-image">
          <img src="${o.person.images.jpg.image_url}" alt="${o.person.name}" loading="lazy" />
        </div>
        <div class="staff-info">
          <div class="staff-name">${o.person.name}</div>
          <div class="staff-role">${o.positions.join(", ")}</div>
        </div>
      `,F.appendChild(a)})}catch(t){console.error("Error fetching staff:",t),F.innerHTML='<p class="no-data">Не удалось загрузить информацию о создателях</p>'}}function Be(e){he.forEach(n=>{n.dataset.tab===e?n.classList.add("active"):n.classList.remove("active")}),document.querySelectorAll(".tab-pane").forEach(n=>{n.id===`${e}-tab`?n.classList.add("active"):n.classList.remove("active")})}function ft(){const e=parseInt(w.dataset.animeId),t=D.find(s=>s.mal_id===e);if(!t)return;if(E.some(s=>s.mal_id===e))E=E.filter(s=>s.mal_id!==e),w.innerHTML=`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      Добавить в избранное
    `;else{const s={mal_id:t.mal_id,title:t.title,image_url:t.images.jpg.image_url,type:t.type,score:t.score};E.push(s),w.innerHTML=`
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      Удалить из избранного
    `}localStorage.setItem("favorites",JSON.stringify(E))}function ce(){Q.classList.add("hidden"),document.body.style.overflow=""}function vt(){V.style.display="flex",le.classList.add("hidden")}function pt(){V.style.display="none"}function yt(){le.classList.remove("hidden"),M.innerHTML=""}function Ce(e){V.style.display="flex",V.innerHTML=`
    <div class="error-message">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>${e}</p>
      <button id="retryButton" class="button secondary">Попробовать снова</button>
    </div>
  `;const t=document.getElementById("retryButton");t&&t.addEventListener("click",S)}function ht(e){return e.charAt(0).toUpperCase()+e.slice(1)}function xt(e,t){let n;return(...s)=>{n&&clearTimeout(n),n=setTimeout(()=>{e.apply(null,s)},t)}}
