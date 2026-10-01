(function(){
"use strict";

/* -- the areas rated on the radar -- */
var AREAS = [
  {k:"def_back",  n:"Defence from the back",  d:"Reading and returning deep balls."},
  {k:"def_glass", n:"Defence off the glass",  d:"Letting it come off the wall and playing it back."},
  {k:"bandeja",   n:"Bandeja and vibora",     d:"The overheads that hold you at the net."},
  {k:"smash",     n:"Smash and finishing",    d:"Ending the point when it is there to be ended."},
  {k:"net",       n:"Net play and volleys",   d:"Positioning and hands at the net."},
  {k:"chiquita",  n:"Chiquita and drop shot", d:"The low ball to the feet that buys you the net."},
  {k:"serve",     n:"Serve and return",       d:"Starting the point without giving it away."},
  {k:"reading",   n:"Reading the game",       d:"Choosing the right shot, seeing it early."},
  {k:"comms",     n:"Communication",          d:"Calling balls, moving as a pair."}
];

/* -- the seven profiles -- */
var PATTERNS = {
  rusher:{name:"The Front-Court Rusher",
    read:"You are a good front-court player who keeps losing the point before he gets to the front court.",
    pts:["Your volleys are not the problem. What happens between being pushed back and getting the net back is.",
         "You take the ball early off the glass because staying back feels like losing.",
         "It is the most common profile between Playtomic 3.0 and 3.5, and the fastest to move."]},
  wall:{name:"The Wall Player",
    read:"Your shots are grooved. Your choices are not.",
    pts:["The technique repeats and holds up. The decision is what breaks.",
         "Your errors come in the long rallies, not the hard ones.",
         "Decisions move faster than technique ever does, which is the good news."]},
  closer:{name:"The Defender Who Cannot Close",
    read:"You are hard to beat, and you do not win.",
    pts:["You neutralise almost anyone at your level, then the point ends because someone else decided.",
         "The gap is not in your defence. It is in the last two shots.",
         "Finishing is a confidence problem before it is a technical one."]},
  power:{name:"The Power Merchant",
    read:"You have one gear, and everyone at your level has learned to survive it.",
    pts:["You beat opponents who defend badly and lose to everyone who defends well.",
         "The missing shot is the slow one, not a faster one.",
         "Nobody gives up their best shot voluntarily. That is the work."]},
  solo:{name:"The Solo Player",
    read:"Your individual level is higher than your results.",
    pts:["You cover ground that is not yours and leave space that is.",
         "Padel is not two players, it is one pair.",
         "The pair moves faster than you can think it through, which is why reading about it changes nothing."]},
  fade:{name:"The Third-Set Fade",
    read:"Your game does not have a ceiling. It has a duration.",
    pts:["You are the same player as your opponent for an hour, and a different one after.",
         "That is not a padel problem, which makes it the most fixable profile of all.",
         "The twenty seconds between points are worth more to you than any gym session."]},
  plateau:{name:"The Flat Plateau",
    read:"Nothing in your game is broken, and that is exactly the problem.",
    pts:["There is no single weakness to fix, so a weekly hour spreads itself across nine areas and moves none.",
         "A plateau is a volume problem, not a technique problem.",
         "What breaks it is not a new shot. It is volume, and a mirror."]}
};

/* -- steps -- */
var S = [
  {id:"intro", kind:"intro"},

  {id:"level", kind:"one", eyebrow:"Where you are", q:"What does a normal match look like for you?",
   help:"Pick the one that describes a regular Tuesday, not the one you are aiming at.",
   opts:[
    {v:"improver", b:"Improver", s:"I rally slowly with basic strokes and I struggle under pressure.", a:"1.0 \u2013 1.5"},
    {v:"recreational", b:"Recreational", s:"I serve, I rally, I play the occasional match.", a:"2.0"},
    {v:"intermediate", b:"Intermediate", s:"Regular matches, consistent rallies, I cover my side.", a:"2.5 \u2013 3.0"},
    {v:"upper", b:"Upper intermediate", s:"I use the glass in defence and I win at my level.", a:"3.0 \u2013 3.5"},
    {v:"advanced", b:"Advanced", s:"I train weekly and I win amateur tournaments.", a:"3.5 \u2013 4.0"},
    {v:"high", b:"High advanced", s:"I reach the latter stages of serious tournaments.", a:"4.0 \u2013 4.5"},
    {v:"expert", b:"Expert or above", s:"National level, ranking points.", a:"4.5 +"}
   ]},

  {id:"freq", kind:"one", eyebrow:"Where you are", q:"How often do you actually play?",
   opts:[
    {v:"low", b:"Once a week or less"},
    {v:"mid", b:"Two to three times a week"},
    {v:"high", b:"Four times a week or more"}
   ]},

  {id:"years", kind:"one", eyebrow:"Where you are", q:"How long have you been playing padel?",
   opts:[
    {v:"under1", b:"Under a year"},
    {v:"1to2", b:"One to two years"},
    {v:"2to5", b:"Two to five years"},
    {v:"over5", b:"Over five years"}
   ]},

  {id:"side", kind:"one", eyebrow:"Where you are", q:"Which side do you play?",
   opts:[
    {v:"left", b:"Left side"},
    {v:"right", b:"Right side"},
    {v:"both", b:"Both, I alternate"}
   ]},

  {id:"tourn", kind:"one", eyebrow:"Where you are", q:"Do you compete?",
   opts:[
    {v:"none", b:"Never"},
    {v:"few", b:"A few local or club tournaments"},
    {v:"occ", b:"Occasionally, regional or club events"},
    {v:"reg", b:"Regularly"},
    {v:"results", b:"Regularly, with results", s:"Finals or wins at local or regional level."},
    {v:"national", b:"National or international, with ranking points"}
   ]},

  {id:"radar", kind:"radar", eyebrow:"Your profile", q:"Rate yourself, one to five.",
   help:"This is the backbone of the whole thing. Be honest rather than flattering. An accurate 2 is worth more to your coach than a generous 4, and your profile builds itself as you go."},

  {id:"lose", kind:"one", eyebrow:"The diagnostic", q:"When you lose to someone at your level, what actually went wrong?",
   help:"One answer. The one that happens most often, not the one that happened last time.",
   opts:[
    {v:"errors", b:"I made the unforced errors"},
    {v:"finish", b:"I could not finish the points I built"},
    {v:"pushed", b:"I got pushed back and never got the net back"},
    {v:"position", b:"We were out of position, my partner and I were not on the same page"},
    {v:"legs", b:"I ran out of legs or focus in the third set"}
   ]},

  {id:"blocker", kind:"text", eyebrow:"The diagnostic", q:"What is stopping you from getting better right now?",
   help:"Say it the way you would say it to a friend after a bad match. This is the answer your coach reads twice.",
   label:"In your own words", ph:"I feel like I am playing well and then suddenly I am defending for ten minutes and the point is over...", area:true},

  {id:"want", kind:"one", eyebrow:"What you want", q:"What are you actually looking for?",
   opts:[
    {v:"plateau", b:"Break through a level I have been stuck at"},
    {v:"compete", b:"Get ready for competition"},
    {v:"week", b:"Train seriously for a week, somewhere worth travelling to"},
    {v:"all", b:"All three"}
   ]},

  {id:"success", kind:"text", eyebrow:"What you want", q:"Six months after the week, what would make it worth it?",
   help:"Be specific. Name the players you want to beat, the level you want to hold, the thing you want to stop doing.",
   label:"Six months from now", ph:"Beat the same four guys I have been losing to at my club every Tuesday for two years...", area:true},

  {id:"injury", kind:"text", eyebrow:"What you want", q:"Any injury or physical limitation we should know about?",
   label:"Injuries, surgery, limitations", ph:"None", area:false, optional:true},

  {id:"camp", kind:"one", eyebrow:"Your week", q:"Which week could you actually make?",
   help:"One cohort at a time, nine players maximum, selected by level. If neither date works, say so and I will tell you what is opening next.",
   opts:[
    {v:"dubai", b:"Dubai, 18 to 22 November 2026", s:"Five days at Padel One. Breakfast and lunch at the club."},
    {v:"samui", b:"Koh Samui, 14 to 20 December 2026", s:"Seven days at Padel Tropical Club."},
    {v:"both", b:"Either could work", s:"Tell me which one fits my game better."},
    {v:"later", b:"Neither. Tell me about the next ones."},
    {v:"private", b:"I would rather have my own dates", s:"A private week for me and my group."}
   ]},

  {id:"who", kind:"one", eyebrow:"Your week", q:"Are you coming on your own?",
   help:"It changes the pairings, and for a group of four or more it changes the format entirely.",
   opts:[
    {v:"solo", b:"On my own", s:"Most players come alone. You will not be the only one."},
    {v:"pair", b:"With one partner", s:"We play together regularly."},
    {v:"group", b:"With a group of three or more"},
    {v:"unsure", b:"Not decided yet", s:"Someone might join me."}
   ]},

  {id:"stay", kind:"one", eyebrow:"Your week", q:"And where you stay?",
   help:"Palaestra runs the padel end to end. Accommodation is the one piece you can hand over or keep.",
   opts:[
    {v:"own", b:"I book my own", s:"Just tell me where the others are staying."},
    {v:"reco", b:"Send me your recommendation, I will book it", s:"Negotiated rates, you deal with the hotel."},
    {v:"handled", b:"Handle it for me", s:"Room, transfers, the lot. Quoted separately."},
    {v:"undecided", b:"Not sure yet, talk me through it on the call"}
   ]},

  {id:"budget", kind:"one", eyebrow:"Your week", q:"A Palaestra week is 2 300 to 2 500 euros.",
   help:"Coaching, courts, video and recovery included. Flights and accommodation are on you. No hidden extras, and we never discount to fill a seat.",
   opts:[
    {v:"yes", b:"Yes, that works"},
    {v:"maybe", b:"Yes, if the plan convinces me"},
    {v:"no", b:"Not this year"}
   ]},

  {id:"details", kind:"details", eyebrow:"Last thing", q:"Where do we send your Blueprint?",
   help:"Florent writes every one of these himself. Yours comes back within 24 hours."},

  {id:"verdict", kind:"verdict"}
];

/* -- state -- */
var A = {ratings:{}};
var i = 0;

/* Webflow retire les attributs class des elements poses via l'API : la coquille
   est donc construite ici, pour que le markup et la CSS ne puissent pas diverger.
   Cote Webflow il suffit d'un <div id="palaestra-assessment"></div> vide. */
var SHELL =
  '<header class="top"><div class="top-in">'+
    '<span class="mark">PALAESTRA</span>'+
    '<span class="count" id="count">Building your profile</span>'+
  '</div><div class="rail"><div class="rail-fill" id="rail"></div></div></header>'+
  '<main class="stage" id="stage"></main>'+
  '<div class="nav" id="nav"><div class="nav-in">'+
    '<button class="back" id="back" type="button">Back</button>'+
    '<span class="hint" id="hint"></span>'+
    '<button class="next" id="next" type="button">Continue</button>'+
  '</div></div>';

if(!document.getElementById("stage")){
  var mount = document.getElementById("palaestra-assessment");
  if(!mount){
    mount = document.createElement("div");
    mount.id = "palaestra-assessment";
    document.body.appendChild(mount);
  }
  mount.innerHTML = SHELL;
}

var stage = document.getElementById("stage");
var nextBtn = document.getElementById("next");
var backBtn = document.getElementById("back");
var rail = document.getElementById("rail");
var count = document.getElementById("count");
var hint = document.getElementById("hint");
var nav = document.getElementById("nav");

/* la barre est en position fixe : on reserve sa hauteur reelle sous le contenu,
   sinon la derniere ligne passe dessous. Recalcule au redimensionnement, la barre
   change de hauteur quand elle passe sur deux lignes en mobile. */
function navHeight(){
  document.documentElement.style.setProperty("--navh", nav.offsetHeight + "px");
}
window.addEventListener("resize", navHeight);

/* -- coach reactions -- */
function reaction(id){
  var r = A[id];
  if(id === "freq"){
    if(r === "mid" && (A.years === "2to5" || A.years === "over5"))
      return "Twice a week, and more than two years in. That is the exact window where the plateau shows up, and where a week like ours does the most.";
    if(r === "high") return "Four times a week. You are putting in the volume. If the level is not moving, volume is not what is missing.";
    if(r === "low") return "Once a week is a hard place to improve from. Whatever else we find, playing more is the first answer.";
  }
  if(id === "lose"){
    var m = {
      errors:"Errors are a symptom, almost never the disease. What we look for is which decision produces them.",
      finish:"That one is more common than you would think at your level, and it is rarely about power.",
      pushed:"That is the single most common answer we get, and the one that moves fastest once you see it on film.",
      position:"Then your individual level is probably higher than your results say. That gap is worth a lot.",
      legs:"Good news, if it helps. That is the most fixable of the five, by some distance."
    };
    return m[r];
  }
  if(id === "camp"){
    if(r === "dubai") return "Four to five hours of flying for most of Asia and the Gulf, no visa to plan. It is the easiest week of the year to actually make.";
    if(r === "samui") return "Seven days is the full format. More court time, and the group has time to become a group.";
    if(r === "private") return "Then the format changes: your dates, your group, the courts to ourselves. I will price it properly on the call.";
    if(r === "later") return "Noted. I will tell you what is opening next rather than push you onto a date that does not work.";
  }
  if(id === "who"){
    if(r === "solo") return "Good. Most players arrive alone, and by the second evening nobody remembers who came with whom.";
    if(r === "pair") return "Useful to know. I will decide whether to keep you together or split you up, and there are good reasons for both.";
    if(r === "group") return "Four or more opens the private option: your own dates and the courts to yourselves. Worth twenty seconds on the call.";
  }
  if(id === "stay"){
    if(r === "handled") return "We can. It is quoted separately from the coaching, so you see exactly what you are paying for.";
    if(r === "own") return "Fine. I will send you where the others are staying so you are not twenty minutes from the club.";
  }
  if(id === "tourn" && (r === "reg" || r === "results" || r === "national"))
    return "You compete. That changes what we would have you work on, and it changes who we would put you on court against.";
  return null;
}

/* -- pattern detection -- */
function detect(){
  var R = A.ratings, vals = AREAS.map(function(a){return R[a.k] || 3;});
  var spread = Math.max.apply(null,vals) - Math.min.apply(null,vals);
  var avg = vals.reduce(function(s,v){return s+v;},0) / vals.length;
  var lo = function(k){return (R[k]||3) <= 2;};
  var hi = function(k){return (R[k]||3) >= 4;};

  if(spread <= 1 && avg >= 2.4 && avg <= 3.6) return "plateau";
  switch(A.lose){
    case "pushed":   return "rusher";
    case "finish":   return "closer";
    case "position": return "solo";
    case "legs":     return "fade";
    case "errors":   return (hi("smash") && lo("chiquita")) ? "power" : "wall";
  }
  if(lo("def_glass") && hi("net")) return "rusher";
  if(lo("reading") && hi("bandeja")) return "wall";
  if(lo("comms")) return "solo";
  return "plateau";
}

function playtomic(){
  return {improver:"1.0 \u2013 1.5",recreational:"2.0",intermediate:"2.5 \u2013 3.0",upper:"3.0 \u2013 3.5",
          advanced:"3.5 \u2013 4.0",high:"4.0 \u2013 4.5",expert:"4.5 +"}[A.level] || "";
}

/* -- radar svg -- */
var SZ = 340, C = SZ/2, RMAX = 122;
function pt(idx,val){
  var ang = (Math.PI*2*idx/AREAS.length) - Math.PI/2;
  var r = (val/5) * RMAX;
  return [C + Math.cos(ang)*r, C + Math.sin(ang)*r];
}
function radarSVG(){
  var rings = "", axes = "", labels = "";
  [1,2,3,4,5].forEach(function(lv){
    var p = AREAS.map(function(_,k){return pt(k,lv).map(function(n){return n.toFixed(1);}).join(",");}).join(" ");
    rings += '<polygon points="'+p+'" fill="none" stroke="rgba(243,241,234,'+(lv===5?.16:.07)+')" stroke-width="1"/>';
  });
  AREAS.forEach(function(a,k){
    var e = pt(k,5);
    axes += '<line x1="'+C+'" y1="'+C+'" x2="'+e[0].toFixed(1)+'" y2="'+e[1].toFixed(1)+'" stroke="rgba(243,241,234,.09)" stroke-width="1"/>';
    var l = pt(k,5.92), anc = "middle";
    if(l[0] > C+8) anc = "start"; else if(l[0] < C-8) anc = "end";
    var short = a.n.split(" ")[0];
    if(a.k==="def_back") short="Back"; if(a.k==="def_glass") short="Glass";
    if(a.k==="bandeja") short="Bandeja"; if(a.k==="smash") short="Smash";
    if(a.k==="net") short="Net"; if(a.k==="chiquita") short="Chiquita";
    if(a.k==="serve") short="Serve"; if(a.k==="reading") short="Reading"; if(a.k==="comms") short="Pair";
    labels += '<text x="'+l[0].toFixed(1)+'" y="'+(l[1]+4).toFixed(1)+'" text-anchor="'+anc+'" '+
      'font-family="'+"Inter, Helvetica Neue, Arial, sans-serif"+'" font-size="10.5" font-weight="600" '+
      'letter-spacing="1.1" fill="rgba(243,241,234,.42)">'+short.toUpperCase()+'</text>';
  });
  return '<svg viewBox="-34 -22 '+(SZ+68)+' '+(SZ+44)+'" role="img" aria-label="Your player profile">'+
    rings+axes+
    '<polygon id="poly" points="" fill="rgba(201,168,76,.26)" stroke="#C9A84C" stroke-width="2" stroke-linejoin="round"/>'+
    '<g id="pins"></g>'+labels+'</svg>';
}
function drawRadar(){
  var poly = document.getElementById("poly"); if(!poly) return;
  var pins = document.getElementById("pins");
  var n = 0, pts = AREAS.map(function(a,k){
    var v = A.ratings[a.k];
    if(v) n++;
    return pt(k, v || 0.001);
  });
  poly.setAttribute("points", pts.map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1);}).join(" "));
  poly.style.opacity = n ? 1 : 0;
  pins.innerHTML = AREAS.map(function(a,k){
    if(!A.ratings[a.k]) return "";
    var p = pts[k];
    return '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3.4" fill="#D9BC72"/>';
  }).join("");
  var sub = document.getElementById("radarSub");
  if(sub && sub.dataset.live === "1") sub.textContent = n + " of " + AREAS.length + " rated";
  var empty = document.getElementById("radarEmpty");
  if(empty) empty.style.display = n ? "none" : "block";
}

function recapHTML(){
  var camp = {dubai:"Dubai, 18 to 22 November", samui:"Koh Samui, 14 to 20 December",
              both:"Dubai or Koh Samui, to be decided", later:"A later cohort",
              private:"A private week on your own dates"}[A.camp];
  var who  = {solo:"On your own", pair:"With your partner", group:"With your group",
              unsure:"Solo for now"}[A.who];
  var stay = {own:"You book your own stay", reco:"Our recommendation, you book",
              handled:"We handle your stay", undecided:"Accommodation to discuss"}[A.stay];
  var items = [camp, who, stay].filter(Boolean);
  if(!items.length) return "";
  return '<p class="recap-l">Your week, as you set it</p><p class="recap">'+
    items.map(esc).join(' <i>/</i> ')+'</p>';
}

/* -- rendering -- */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

function render(){
  var s = S[i];
  stage.innerHTML = "";
  var el = document.createElement("section");
  el.className = "step on";

  if(s.kind === "intro"){
    el.innerHTML =
      '<p class="eyebrow">Player assessment</p>'+
      '<h1 class="q" style="max-width:25ch">Six minutes, and the week starts being built around you.</h1>'+
      '<p class="help">This is what your coach reads before you arrive. It is how the drills, the pairings and your plan get built around your game instead of around the group average. Think of it as your passport to the coach on court.</p>'+
      '<p class="help">You also set your week here: which camp, who you are coming with, and whether you want us to handle where you stay.</p>'+
      '<p class="help">Florent reads every one of these himself and writes back within 24 hours with your Blueprint: your three priorities for the next ninety days, the drills to work them at your own club, and the one thing you will not fix on your own.</p>'+
      '<p class="help" style="color:var(--au200)">You keep it whether or not you ever train with us.</p>';
    nextBtn.textContent = "Start";
  } else if(s.kind === "one"){
    el.innerHTML =
      '<p class="eyebrow">'+esc(s.eyebrow)+'</p>'+
      '<h2 class="q">'+esc(s.q)+'</h2>'+
      (s.help ? '<p class="help">'+esc(s.help)+'</p>' : '')+
      '<div class="opts" role="group">'+s.opts.map(function(o){
        var sel = A[s.id] === o.v;
        return '<button type="button" class="opt" data-v="'+esc(o.v)+'" aria-pressed="'+sel+'">'+
          '<i class="tick"></i><span style="flex:1"><b>'+esc(o.b)+'</b>'+
          (o.s ? '<span>'+esc(o.s)+'</span>' : '')+'</span>'+
          (o.a ? '<span class="anchor">Playtomic '+esc(o.a)+'</span>' : '')+
          '</button>';
      }).join("")+'</div>'+
      '<div class="coach" id="coach"><span style="flex:1"><p class="cl">Florent</p><p id="coachTxt"></p></span></div>';
    nextBtn.textContent = "Continue";
  } else if(s.kind === "radar"){
    el.innerHTML =
      '<p class="eyebrow">'+esc(s.eyebrow)+'</p>'+
      '<h2 class="q">'+esc(s.q)+'</h2>'+
      '<p class="help">'+esc(s.help)+'</p>'+
      '<div class="radar-wrap">'+
        '<div><div class="rows">'+AREAS.map(function(a){
          return '<div class="row'+(A.ratings[a.k]?" done":"")+'" data-k="'+a.k+'">'+
            '<p class="rn">'+esc(a.n)+'</p>'+
            '<div class="dots">'+[1,2,3,4,5].map(function(v){
              return '<button type="button" class="dot'+(A.ratings[a.k]===v?" set":"")+'" data-v="'+v+'" '+
                'aria-label="'+esc(a.n)+', '+v+' out of 5">'+v+'</button>';
            }).join("")+'</div>'+
            '<p class="rd">'+esc(a.d)+'</p></div>';
        }).join("")+'</div>'+
        '<p class="scale-note"><span>1 &middot; costs me points</span><span>5 &middot; it is a weapon</span></p></div>'+
        '<div class="radar-panel"><div class="radar-card">'+
          '<h3>Your profile</h3><p class="radar-sub" id="radarSub" data-live="1">0 of 9 rated</p>'+
          radarSVG()+
          '<p class="radar-empty" id="radarEmpty">It draws itself as you answer.</p>'+
        '</div></div>'+
      '</div>';
    nextBtn.textContent = "Continue";
  } else if(s.kind === "text"){
    el.innerHTML =
      '<p class="eyebrow">'+esc(s.eyebrow)+'</p>'+
      '<h2 class="q">'+esc(s.q)+'</h2>'+
      (s.help ? '<p class="help">'+esc(s.help)+'</p>' : '')+
      '<div class="field"><label for="tx">'+esc(s.label)+'</label>'+
        (s.area
          ? '<textarea class="inp" id="tx" placeholder="'+esc(s.ph)+'"></textarea>'
          : '<input class="inp" id="tx" type="text" placeholder="'+esc(s.ph)+'">')+
      '</div>';
    nextBtn.textContent = "Continue";
  } else if(s.kind === "details"){
    el.innerHTML =
      '<p class="eyebrow">'+esc(s.eyebrow)+'</p>'+
      '<h2 class="q">'+esc(s.q)+'</h2>'+
      '<p class="help">'+esc(s.help)+'</p>'+
      '<div class="field"><div class="grid2">'+
        '<div><label for="fn">First name</label><input class="inp" id="fn" autocomplete="given-name"></div>'+
        '<div><label for="ln">Last name</label><input class="inp" id="ln" autocomplete="family-name"></div>'+
      '</div></div>'+
      '<div class="field"><label for="em">Email</label><input class="inp" id="em" type="email" autocomplete="email"></div>'+
      '<div class="field"><div class="grid2">'+
        '<div><label for="ph">Phone, with country code</label><input class="inp" id="ph" type="tel" placeholder="+65 ..." autocomplete="tel"></div>'+
        '<div><label for="ci">City and country</label><input class="inp" id="ci" autocomplete="address-level2"></div>'+
      '</div></div>'+
      '<p class="err" id="err">A first name and a valid email, and you are done.</p>';
    nextBtn.textContent = "See my profile";
  } else if(s.kind === "verdict"){
    var p = PATTERNS[detect()];
    el.className = "step on verdict";
    el.innerHTML =
      '<p class="eyebrow" style="justify-content:center">'+esc(A.fn || "Your")+'&rsquo;s profile</p>'+
      '<h2 class="v-name">'+esc(p.name)+'</h2>'+
      '<p class="v-read">'+esc(p.read)+'</p>'+
      '<div class="v-grid">'+
        '<div class="radar-card">'+
          '<h3>Your nine areas</h3><p class="radar-sub" id="radarSub">'+esc(playtomic() ? "Playtomic "+playtomic() : "")+'</p>'+
          radarSVG()+
        '</div>'+
        '<div class="v-list">'+p.pts.map(function(t,k){
          return '<div class="v-item"><i>'+(k+1)+'</i><p>'+esc(t)+'</p></div>';
        }).join("")+'</div>'+
      '</div>'+
      '<div class="v-cta">'+
        recapHTML()+
        '<p>That is the short version. Your full Blueprint, with your three priorities, the drills to work them and the part you will not fix on your own, lands in your inbox within 24 hours.</p>'+
        '<a class="sent" href="https://calendly.com/contact-palaestra/30min">Book your 30 minutes</a>'+
        '<p class="v-foot">We go through your Blueprint together. There is no pitch in that call.</p>'+
      '</div>';
    nav.style.display = "none";
    count.textContent = "Profile complete";
    rail.style.width = "100%";
    stage.appendChild(el);
    drawRadar();
    submit();
    window.scrollTo({top:0,behavior:"smooth"});
    return;
  }

  stage.appendChild(el);
  wire(s);
  syncChrome(s);
  navHeight();
  window.scrollTo({top:0,behavior:"instant" in window ? "instant" : "auto"});
}

function wire(s){
  if(s.kind === "one"){
    Array.prototype.forEach.call(el$(".opt"), function(b){
      b.addEventListener("click", function(){
        A[s.id] = b.dataset.v;
        Array.prototype.forEach.call(el$(".opt"), function(x){x.setAttribute("aria-pressed", x === b);});
        var txt = reaction(s.id), box = document.getElementById("coach");
        if(txt && box){ document.getElementById("coachTxt").textContent = txt; box.classList.add("on"); }
        else if(box){ box.classList.remove("on"); }
        syncChrome(s);
      });
    });
  }
  if(s.kind === "radar"){
    drawRadar();
    Array.prototype.forEach.call(el$(".dot"), function(d){
      d.addEventListener("click", function(){
        var row = d.closest(".row"), k = row.dataset.k, v = +d.dataset.v;
        A.ratings[k] = v;
        row.classList.add("done");
        Array.prototype.forEach.call(row.querySelectorAll(".dot"), function(x){
          x.classList.toggle("set", +x.dataset.v === v);
        });
        drawRadar();
        syncChrome(s);
      });
    });
  }
  if(s.kind === "text"){
    var tx = document.getElementById("tx");
    tx.value = A[s.id] || "";
    tx.addEventListener("input", function(){ A[s.id] = tx.value; syncChrome(s); });
  }
  if(s.kind === "details"){
    [["fn","fn"],["ln","ln"],["em","em"],["ph","ph"],["ci","ci"]].forEach(function(p){
      var f = document.getElementById(p[0]);
      f.value = A[p[1]] || "";
      f.addEventListener("input", function(){ A[p[1]] = f.value.trim(); syncChrome(s); });
    });
  }
}
function el$(sel){ return stage.querySelectorAll(sel); }

function ready(s){
  if(s.kind === "intro" || s.kind === "verdict") return true;
  if(s.kind === "one") return !!A[s.id];
  if(s.kind === "radar") return Object.keys(A.ratings).length === AREAS.length;
  if(s.kind === "text") return s.optional ? true : !!(A[s.id] && A[s.id].trim().length > 2);
  if(s.kind === "details") return !!(A.fn && A.em && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(A.em));
  return true;
}

function setOff(el, off){
  el.setAttribute("aria-disabled", off ? "true" : "false");
  if("disabled" in el) el.disabled = off;          /* vrai <button> */
}
function isOff(el){ return el.getAttribute("aria-disabled") === "true"; }

function syncChrome(s){
  setOff(nextBtn, !ready(s));
  backBtn.style.visibility = i === 0 ? "hidden" : "visible";
  var total = S.length - 2;
  var shown = Math.min(i, total);
  var narrow = window.innerWidth < 620;
  count.textContent = i === 0
    ? (narrow ? "" : "Building your profile")
    : (narrow ? shown + " / " + total : "Building your profile \u00b7 " + shown + " of " + total);
  rail.style.width = (i / (S.length - 1) * 100) + "%";

  if(s.kind === "radar"){
    var n = Object.keys(A.ratings).length;
    hint.textContent = n < AREAS.length ? (AREAS.length - n) + " to go" : "All nine. Your shape is there.";
  } else if(s.kind === "details"){
    hint.textContent = "";
  } else {
    hint.textContent = "";
  }
}

/* -- SUBMIT --
   Branche ici la soumission reelle. Trois options, par ordre de simplicite :
   1. Webflow : remplir un form natif cache sur la page et le submit (garde les
      notifications Webflow et la sync HubSpot existante).
   2. Webhook Zapier : fetch POST vers un catch hook.
   3. HubSpot Forms API.
   Le payload ci-dessous est deja a plat et pret a envoyer.                       */
function payload(){
  var out = {
    first_name:A.fn||"", last_name:A.ln||"", email:A.em||"", phone:A.ph||"", city:A.ci||"",
    level:A.level||"", playtomic_band:playtomic(), play_frequency:A.freq||"", years_playing:A.years||"",
    court_side:A.side||"", tournament_xp:A.tourn||"", loses_because:A.lose||"",
    blocker:A.blocker||"", wants:A.want||"", success_definition:A.success||"", injuries:A.injury||"",
    camp_preference:A.camp||"", coming_with:A.who||"", accommodation:A.stay||"",
    budget_ready:A.budget||"", player_pattern:detect(),
    pattern_name:PATTERNS[detect()].name
  };
  AREAS.forEach(function(a){ out["rating_"+a.k] = A.ratings[a.k] || ""; });
  out.coach_brief = coachBrief();
  out.assessment_score = score();
  out.assessment_tier = out.assessment_score >= 7 ? "A" : (out.assessment_score >= 3 ? "B" : "C");
  return out;
}
function label(map,v){ return map[v] || v || "-"; }
function coachBrief(){
  var R=A.ratings, pat=PATTERNS[detect()], sc=score();
  var tier = sc>=7 ? "A" : (sc>=3 ? "B" : "C");
  var sorted = AREAS.slice().sort(function(a,b){ return (R[a.k]||0)-(R[b.k]||0); });
  var low = sorted.slice(0,3), high = sorted.slice(-2).reverse();
  var L=function(a){ return a.n+" "+(R[a.k]||"-"); };
  var lines=[];
  lines.push(((A.fn||"")+" "+(A.ln||"")).toUpperCase().trim()+"  |  TIER "+tier+"  |  score "+sc);
  lines.push(pat.name.toUpperCase());
  lines.push("");
  lines.push([A.ci||"", label({improver:"Improver",recreational:"Recreational",intermediate:"Intermediate",
    upper:"Upper intermediate",advanced:"Advanced",high:"High advanced",expert:"Expert+"},A.level),
    "Playtomic "+playtomic(),
    label({left:"Left side",right:"Right side",both:"Both sides"},A.side)].filter(Boolean).join("  .  "));
  lines.push([label({low:"Once a week or less",mid:"2 to 3 a week",high:"4+ a week"},A.freq),
    label({under1:"Under a year","1to2":"1 to 2 years","2to5":"2 to 5 years",over5:"Over 5 years"},A.years),
    label({none:"No tournaments",few:"A few local",occ:"Occasional",reg:"Regular",results:"Regular, with results",national:"National level"},A.tourn)].filter(Boolean).join("  .  "));
  lines.push("");
  lines.push("-- HIS WEEK --");
  lines.push([label({dubai:"Dubai 18-22 Nov",samui:"Koh Samui 14-20 Dec",both:"Dubai or Samui",
    later:"A later cohort",private:"Private, own dates"},A.camp),
    label({solo:"On his own",pair:"With a partner",group:"With a group of 3+",unsure:"Undecided"},A.who),
    label({own:"Books his own stay",reco:"Wants our recommendation",handled:"Wants us to handle the stay",
      undecided:"Stay to discuss"},A.stay)].join("  .  "));
  lines.push("Budget 2300-2500: "+label({yes:"YES",maybe:"yes if the plan convinces him",no:"NOT THIS YEAR"},A.budget));
  lines.push("");
  lines.push("-- WEAKEST --  "+low.map(L).join("  .  "));
  lines.push("-- STRONGEST -- "+high.map(L).join("  .  "));
  lines.push("");
  lines.push("-- LOSES BECAUSE --");
  lines.push(label({errors:"He makes the unforced errors",finish:"He cannot finish the points he builds",
    pushed:"He gets pushed back and never gets the net back",
    position:"Out of position, not on the same page as his partner",
    legs:"He runs out of legs or focus in the third set"},A.lose));
  lines.push("");
  lines.push("-- IN HIS WORDS --");
  lines.push('"'+(A.blocker||"")+'"');
  lines.push("");
  lines.push("-- SUCCESS IN SIX MONTHS --");
  lines.push('"'+(A.success||"")+'"');
  lines.push("");
  lines.push("-- INJURIES --  "+(A.injury||"not stated"));
  lines.push("");
  lines.push("-- ALL NINE --  "+AREAS.map(function(a){return a.n+" "+(R[a.k]||"-");}).join("  .  "));
  lines.push("");
  lines.push("-- REACH HIM --  "+[A.em||"",A.ph||""].filter(Boolean).join("  .  "));
  return lines.join("\n");
}
function score(){
  var s = 0;
  if(["intermediate","upper","advanced","high","expert"].indexOf(A.level) > -1) s += 2;
  else if(A.level === "recreational") s += 1; else s -= 4;
  if(A.freq === "mid" || A.freq === "high") s += 2; else s -= 2;
  if(A.budget === "yes") s += 3; else if(A.budget === "maybe") s += 1; else s -= 4;
  if(A.camp === "later") s -= 2; else s += 2;
  if(A.who === "group" || A.camp === "private") s += 2;
  if(A.want === "plateau" || A.want === "compete" || A.want === "all") s += 1;
  return s;
}
function submit(){
  var data = payload();
  if(window.console) console.log("[assessment] payload", data);
  var form = document.getElementById("wf-assessment");   /* form Webflow cache */
  if(form){
    Object.keys(data).forEach(function(k){
      var f = form.querySelector('[name="'+k+'"]');
      if(f) f.value = data[k];
    });
    /* Webflow redirige apres soumission : sans cible, le joueur est ejecte de son
       ecran de profil vers la page de remerciement. On envoie donc la reponse dans
       une iframe cachee, l'ecran final reste a l'ecran. */
    var sink = document.getElementById("pal-sink");
    if(!sink){
      sink = document.createElement("iframe");
      sink.id = "pal-sink"; sink.name = "pal-sink"; sink.title = "submission";
      sink.setAttribute("aria-hidden","true"); sink.tabIndex = -1;
      sink.style.cssText = "position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;border:0;";
      document.body.appendChild(sink);
    }
    form.target = "pal-sink";
    form.submit();          /* .submit() et non .requestSubmit() : on court-circuite
                               l'interception AJAX de Webflow, qui ignore target */
    return;
  }
  if(window.PALAESTRA_WEBHOOK){
    fetch(window.PALAESTRA_WEBHOOK, {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)
    }).catch(function(){});
  }
}

/* -- nav -- */
nextBtn.addEventListener("click", function(e){
  e.preventDefault();                               /* Webflow en fait un <a> */
  if(isOff(nextBtn)) return;
  if(i < S.length - 1){ i++; render(); }
});
backBtn.addEventListener("click", function(e){
  e.preventDefault();
  if(i > 0){ i--; render(); }
});
document.addEventListener("keydown", function(e){
  if(e.key === "Enter" && !e.shiftKey){
    var t = e.target.tagName;
    if(t === "TEXTAREA") return;
    if(!isOff(nextBtn) && nav.style.display !== "none"){ e.preventDefault(); nextBtn.click(); }
  }
});

render();
})();
