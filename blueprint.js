/* ══════════════════════════════════════════════════════════════════════════
   PALAESTRA - PLAYER BLUEPRINT, moteur de rendu
   ---------------------------------------------------------------------------
   Une seule page Webflow par joueur. Elle ne contient qu'un bloc Embed avec
   window.PARTICIPANT = {...} et <div id="palaestra-blueprint"></div>.
   Ce fichier et blueprint.css sont partages par tous les joueurs.
   Pour un nouveau joueur : dupliquer la page, remplacer le bloc de donnees.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var P = window.PARTICIPANT;
  var root = document.getElementById("palaestra-blueprint");
  if (!P || !root) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function paras(list, cls) {
    return (list || []).map(function (t, i) {
      var c = cls && i === 0 ? ' class="' + cls + '"' : "";
      return "<p" + c + ">" + esc(t) + "</p>";
    }).join("");
  }
  function wordmark() {
    return '<span class="wordmark"><span class="wm-name">PALAESTRA</span>' +
           '<span class="wm-sub">PADEL</span></span>';
  }

  /* -- couverture -- */
  function cover() {
    var stand = (P.stand || []).map(function (s) {
      return '<div class="stand-item"><p class="sl">' + esc(s.l) + '</p>' +
             '<p class="sv">' + esc(s.v) + "</p></div>";
    }).join("");
    return '<header class="cover"><div class="wrap">' +
      '<div class="cover-top">' + wordmark() +
        '<span class="dateline">' + esc(P.dateline) + "</span></div>" +
      '<p class="cover-kicker">Player Blueprint</p>' +
      '<h1 class="cover-name">' + esc(P.name) + "</h1>" +
      (P.hook ? '<p class="cover-hook">' + esc(P.hook) + "</p>" : "") +
      (P.meta ? '<p class="cover-meta">' + esc(P.meta) + "</p>" : "") +
      (stand ? '<div class="stand"><div class="stand-grid">' + stand + "</div></div>" : "") +
      "</div></header>";
  }

  /* -- mot du coach -- */
  function coach() {
    var c = P.coach; if (!c) return "";
    return '<section class="section"><div class="wrap">' +
      '<p class="kicker">A note from your coach</p>' +
      '<p class="greet">' + esc(c.greet || (P.firstName + ",")) + "</p>" +
      '<div class="prose">' + paras(c.before, "lead") +
        (c.verbatim
          ? '<div class="quote"><p class="ql">In your own words</p><p>"' +
            esc(c.verbatim) + '"</p></div>'
          : "") +
        paras(c.after) +
      "</div>" +
      '<div class="sign"><p class="so">See you on court,</p><p class="sn">Florent</p></div>' +
      "</div></section>";
  }

  /* -- le profil -- */
  function pattern() {
    var p = P.pattern; if (!p) return "";
    var jump = (p.from && p.to)
      ? '<div class="jump"><p class="jump-row"><span class="jf">' + esc(p.from) +
        '</span><span class="ja">&rarr;</span><span class="jt">' + esc(p.to) +
        '</span></p><p class="jl">Realistic, ninety days</p></div>'
      : "";
    return '<section class="section dark"><div class="wrap">' +
      '<p class="kicker">Your pattern</p>' +
      '<div class="pattern-head"><h2 class="pattern-name">' + esc(p.name) + "</h2>" + jump + "</div>" +
      '<div class="prose">' + paras([p.lead], "lead") + paras(p.paras) + "</div>" +
      "</div></section>";
  }

  /* -- les neuf axes -- */
  function bars() {
    var list = P.bars || []; if (!list.length) return "";
    var rows = list.slice().sort(function (a, b) { return a.now - b.now; }).map(function (b) {
      var now = Math.max(0, Math.min(5, b.now)) * 20;
      var tgt = Math.max(0, Math.min(5, b.target == null ? b.now : b.target)) * 20;
      return '<div class="bar-row"><p class="bar-name">' + esc(b.name) + "</p>" +
        '<div class="bar-track">' +
          '<span class="bar-target" style="left:' + now + "%; right:" + (100 - tgt) + '%;"></span>' +
          '<span class="bar-now" style="width:' + now + '%;"></span>' +
        "</div>" +
        (b.note ? '<p class="bar-note">' + esc(b.note) + "</p>" : "") +
      "</div>";
    }).join("");
    return '<section class="section"><div class="wrap">' +
      '<p class="kicker">Every area, measured</p>' +
      '<h2 class="title">Where you are, and where ninety days can take you</h2>' +
      '<p class="prose" style="margin-top:22px;">These are your own ratings. The gold is what is ' +
        'realistically reachable if you work the three priorities below and nothing else.</p>' +
      '<div class="bars">' + rows + "</div>" +
      '<p class="legend"><span><i class="swatch sw-now"></i>Today</span>' +
        '<span><i class="swatch sw-tgt"></i>Reachable in ninety days</span></p>' +
      "</div></section>";
  }

  /* -- les trois priorites -- */
  function priorities() {
    var list = P.priorities || []; if (!list.length) return "";
    var items = list.map(function (p, i) {
      return '<article class="prio"><p class="prio-num">' + (i + 1) + "</p><div>" +
        "<h3>" + esc(p.title) + "</h3><p>" + esc(p.body) + "</p>" +
        (p.cue ? '<p class="cue">Cue &middot; ' + esc(p.cue) + "</p>" : "") +
      "</div></article>";
    }).join("");
    return '<section class="section tint"><div class="wrap">' +
      '<p class="kicker">Your next ninety days</p>' +
      '<h2 class="title">Three things. Ignore everything else.</h2>' +
      '<div class="prios">' + items + "</div></div></section>";
  }

  /* -- les drills -- */
  function drills() {
    var list = P.drills || []; if (!list.length) return "";
    var cards = list.map(function (d) {
      return '<article class="drill"><p class="dn">' + esc(d.tag) + "</p>" +
        "<h4>" + esc(d.title) + "</h4><p>" + esc(d.body) + "</p></article>";
    }).join("");
    return '<section class="section"><div class="wrap">' +
      '<p class="kicker">Work it yourself</p>' +
      '<h2 class="title">Six weeks of this, at your own club, costs you nothing</h2>' +
      '<p class="prose" style="margin-top:22px;">You do not need us to start. Take these into your ' +
        'next game and they will already move something.</p>' +
      '<div class="drills">' + cards + "</div></div></section>";
  }

  /* -- la partie honnete -- */
  function honest() {
    var h = P.honest; if (!h) return "";
    return '<section class="section dark"><div class="wrap">' +
      '<p class="kicker">The honest part</p>' +
      '<h2 class="title">' + esc(h.title || "What you will not fix on your own") + "</h2>" +
      '<div class="prose">' + paras([h.lead], "lead") + paras(h.paras) + "</div>" +
      "</div></section>";
  }

  /* -- la semaine et la CTA -- */
  function week() {
    var w = P.week; if (!w) return "";
    var facts = (w.facts || []).map(function (f) {
      return '<div class="fact"><p class="fl">' + esc(f.l) + '</p><p class="fv">' + esc(f.v) + "</p></div>";
    }).join("");
    return '<section class="section dark" style="background:var(--g800); padding-top:0;"><div class="wrap">' +
      '<p class="kicker">Your week</p>' +
      '<h2 class="title">' + esc(w.title) + "</h2>" +
      '<div class="prose">' + paras(w.paras) + "</div>" +
      (facts ? '<div class="facts">' + facts + "</div>" : "") +
      '<a class="cta" href="' + esc(w.ctaHref || "https://calendly.com/contact-palaestra/30min") + '">' +
        esc(w.cta || "Book your 30 minutes") + "</a>" +
      '<p class="cta-sub">' + esc(w.ctaSub ||
        "We go through this document together. There is no pitch in that call.") + "</p>" +
      "</div></section>";
  }

  function foot() {
    return '<footer class="foot"><div class="wrap">' + wordmark() +
      "<p>Prepared for " + esc(P.name) + " &middot; " + esc(P.dateline) + "</p></div></footer>";
  }

  root.innerHTML = cover() + coach() + pattern() + bars() +
                   priorities() + drills() + honest() + week() + foot();
})();
