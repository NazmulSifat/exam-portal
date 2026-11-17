(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var filter = "all", query = "";

  /* ---------- time zone helpers ---------- */
  var TZ = (typeof settings !== "undefined" && settings.timezone) || "Asia/Dhaka";
  try { new Intl.DateTimeFormat("en-US", { timeZone: TZ }); }
  catch (e) { console.warn("Invalid timezone, using Asia/Dhaka"); TZ = "Asia/Dhaka"; }

  function tzOffset(ts, zone) {
    var p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit",
      day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(new Date(ts)).forEach(function (x) { p[x.type] = x.value; });
    return Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(ts / 1000) * 1000;
  }
  // Wall-clock time in the configured zone -> UTC timestamp
  function toUtc(d, t) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d), n = /^(\d{1,2}):(\d{2})$/.exec(t);
    if (!m || !n) return NaN;
    var g = Date.UTC(+m[1], m[2] - 1, +m[3], +n[1], +n[2]);
    var u = g - tzOffset(g, TZ);
    return g - tzOffset(u, TZ);
  }
  function todayKey() { return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date()); }
  var fDate = new Intl.DateTimeFormat("bn-BD", { timeZone: TZ, day: "numeric", month: "long" });
  var fDay = new Intl.DateTimeFormat("bn-BD", { timeZone: TZ, weekday: "long" });
  var fTime = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });

  /* ---------- data ---------- */
  function safeUrl(s) {
    try { var u = new URL(String(s).trim()); return (u.protocol === "https:" || u.protocol === "http:") ? u.href : null; }
    catch (e) { return null; }
  }
  var items = (typeof exams !== "undefined" && Array.isArray(exams) ? exams : []).reduce(function (a, e) {
    if (!e || e.enabled === false) return a;               // disabled exams are not shown
    var start = toUtc(e.date, e.startTime), dur = Number(e.duration);
    if (isNaN(start) || !(dur > 0)) { console.warn("Skipped invalid exam:", e && e.id); return a; }
    a.push({ id: e.id, date: e.date, group: e.group || "", title: String(e.title || "Untitled exam"),
      subject: String(e.subject || ""), syllabus: String(e.syllabus || ""), duration: dur,
      start: start, end: start + dur * 60000, url: safeUrl(e.examLink) });
    return a;
  }, []).sort(function (a, b) { return a.start - b.start; });

  function statusOf(e, now) { return now < e.start ? "upcoming" : now < e.end ? "active" : "completed"; }
  function delta(ms) {
    var m = Math.max(1, Math.round(ms / 60000)), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60);
    return (d ? d + "d " : "") + (h ? h + "h " : "") + (m % 60) + "m";
  }

  /* ---------- DOM helpers (no innerHTML) ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  var toastTimer;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); }
      document.body.removeChild(ta);
    });
  }

  /* ---------- rendering ---------- */
  function card(e, st, now) {
    var label = st[0].toUpperCase() + st.slice(1);
    var art = el("article", "exam");
    var info = el("div", "exam-info"), top = el("div", "exam-top");
    top.appendChild(el("h3", "", e.title));
    top.appendChild(el("span", "badge " + st, label));
    info.appendChild(top);
    if (e.subject) info.appendChild(el("p", "subject", e.subject));
    if (e.syllabus) info.appendChild(el("p", "syllabus", e.syllabus));
    var meta = el("div", "meta");
    [["Start: ", fTime.format(new Date(e.start))], ["Duration: ", e.duration + " min"]].forEach(function (x) {
      var s = el("span", "", x[0]); s.appendChild(el("b", "", x[1])); meta.appendChild(s);
    });
    if (st === "upcoming") meta.appendChild(el("span", "", "Starts in " + delta(e.start - now)));
    if (st === "active") meta.appendChild(el("span", "", "Ends in " + delta(e.end - now)));
    info.appendChild(meta);

    var side = el("div", "exam-side");
    side.appendChild(el("span", "badge " + st, label));
    var act = el("div", "actions"), start;
    if (st === "active" && e.url) {
      start = el("a", "btn btn-primary", "Start Exam");
      start.href = e.url; start.target = "_blank"; start.rel = "noopener noreferrer";
    } else {
      start = el("button", "btn btn-primary", st === "completed" ? "Exam Ended" : e.url ? "Start Exam" : "Link Unavailable");
      start.disabled = true; start.type = "button";
      if (st === "upcoming") start.title = "Available when the exam starts";
    }
    var cp = el("button", "btn btn-ghost", "Copy Link"); cp.type = "button";
    if (e.url) {
      cp.addEventListener("click", function () {
        copyText(e.url).then(function () { toast("Exam link copied!"); }, function () { toast("Could not copy the link."); });
      });
    } else cp.disabled = true;
    act.appendChild(start); act.appendChild(cp); side.appendChild(act);
    art.appendChild(info); art.appendChild(side);
    return art;
  }

  function render() {
    var now = Date.now(), today = todayKey(), q = query.trim().toLowerCase();
    var all = items.map(function (e) { return { e: e, st: statusOf(e, now) }; });
    var cnt = { upcoming: 0, active: 0, completed: 0 };
    all.forEach(function (x) { cnt[x.st]++; });
    $("stat-total").textContent = all.length; $("stat-active").textContent = cnt.active;
    $("stat-upcoming").textContent = cnt.upcoming; $("stat-completed").textContent = cnt.completed;

    var vis = all.filter(function (x) {
      return (filter === "all" || x.st === filter) &&
        (!q || (x.e.title + " " + x.e.subject + " " + x.e.syllabus).toLowerCase().indexOf(q) > -1);
    });
    var root = $("routine"); root.replaceChildren();
    if (!vis.length) {
      root.appendChild(el("p", "empty", items.length ? "No exams match your search or filter." : "No examinations are scheduled yet."));
      return;
    }
    var groups = [], gmap = {};
    vis.forEach(function (x) {
      var g = gmap[x.e.group]; if (!g) { g = gmap[x.e.group] = { name: x.e.group, days: [], dmap: {} }; groups.push(g); }
      var d = g.dmap[x.e.date]; if (!d) { d = g.dmap[x.e.date] = { date: x.e.date, list: [] }; g.days.push(d); }
      d.list.push(x);
    });
    groups.forEach(function (g) {
      var sec = el("section", "group");
      if (g.name) sec.appendChild(el("h3", "group-head", g.name));
      g.days.forEach(function (d) {
        var first = d.list[0].e, row = el("div", "row" + (d.date === today ? " today" : ""));
        var day = el("div", "day");
        day.appendChild(el("span", "", fDate.format(new Date(first.start))));
        day.appendChild(el("small", "", fDay.format(new Date(first.start))));
        if (d.date === today) day.appendChild(el("span", "today-tag", "Today"));
        var box = el("div", "exams");
        d.list.forEach(function (x) { box.appendChild(card(x.e, x.st, now)); });
        row.appendChild(day); row.appendChild(box); sec.appendChild(row);
      });
      root.appendChild(sec);
    });
  }

  /* ---------- init ---------- */
  var c = (typeof course !== "undefined" && course) || {};
  $("course-name").textContent = c.name || "Prostuti Exams";
  $("course-title").firstChild.textContent = c.title || "Examination Routine";
  $("course-desc").textContent = c.description || "";
  $("tz-label").textContent = TZ;
  $("year").textContent = new Date().getFullYear();
  document.title = (c.name ? c.name + " – " : "") + "Prostuti Exam Portal";

  $("search").addEventListener("input", function (ev) { query = ev.target.value; render(); });
  document.querySelectorAll(".chip").forEach(function (b) {
    b.addEventListener("click", function () {
      filter = b.dataset.filter;
      document.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render();
    });
  });
  render();
  setInterval(render, 30000);   // keep status live
})();
