function toggleMenu() {
  const nav = document.getElementById("mobileNav");
  if (!nav) return;
  nav.classList.toggle("show");
}

function padZero(num) {
  return String(num).padStart(2, "0");
}

function getHongKongNow() {
  const now = new Date();
  const hkString = now.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });
  return new Date(hkString);
}

function formatWeekday(day) {
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  return weekdays[day];
}

function getLunarDisplay(date) {
  try {
    const lunarFormatter = new Intl.DateTimeFormat("zh-HK-u-ca-chinese", {
      month: "long",
      day: "numeric"
    });

    const parts = lunarFormatter.formatToParts(date);
    let month = "";
    let day = "";

    parts.forEach(part => {
      if (part.type === "month") month = part.value;
      if (part.type === "day") day = part.value;
    });

    if (month && day) {
      return `農曆 ${month}${day}`;
    }
  } catch (error) {}

  return "農曆資料";
}

function getSolarTerm(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const md = month * 100 + day;

  const solarTerms = [
    { start: 106, end: 119, name: "小寒" },
    { start: 120, end: 203, name: "大寒" },
    { start: 204, end: 218, name: "立春" },
    { start: 219, end: 304, name: "雨水" },
    { start: 305, end: 319, name: "驚蟄" },
    { start: 320, end: 403, name: "春分" },
    { start: 404, end: 418, name: "清明" },
    { start: 419, end: 504, name: "穀雨" },
    { start: 505, end: 519, name: "立夏" },
    { start: 520, end: 605, name: "小滿" },
    { start: 606, end: 620, name: "芒種" },
    { start: 621, end: 706, name: "夏至" },
    { start: 707, end: 722, name: "小暑" },
    { start: 723, end: 807, name: "大暑" },
    { start: 808, end: 822, name: "立秋" },
    { start: 823, end: 907, name: "處暑" },
    { start: 908, end: 922, name: "白露" },
    { start: 923, end: 1007, name: "秋分" },
    { start: 1008, end: 1022, name: "寒露" },
    { start: 1023, end: 1106, name: "霜降" },
    { start: 1107, end: 1121, name: "立冬" },
    { start: 1122, end: 1206, name: "小雪" },
    { start: 1207, end: 1221, name: "大雪" },
    { start: 1222, end: 105, name: "冬至" }
  ];

  for (const term of solarTerms) {
    if (term.start <= term.end) {
      if (md >= term.start && md <= term.end) return term.name;
    } else {
      if (md >= term.start || md <= term.end) return term.name;
    }
  }

  return "";
}

function updateDateTime() {
  const hkNow = getHongKongNow();

  const hour = padZero(hkNow.getHours());
  const minute = padZero(hkNow.getMinutes());

  const hkTime = document.getElementById("hkTime");
  const solarDate = document.getElementById("solarDate");
  const weekday = document.getElementById("weekday");
  const lunarDate = document.getElementById("lunarDate");
  const solarTerm = document.getElementById("solarTerm");

  if (hkTime) {
    hkTime.textContent = `${hour}:${minute}`;
  }

  if (solarDate) {
    solarDate.textContent = `${hkNow.getMonth() + 1}月${hkNow.getDate()}日`;
  }

  if (weekday) {
    weekday.textContent = formatWeekday(hkNow.getDay());
  }

  if (lunarDate) {
    lunarDate.textContent = getLunarDisplay(hkNow);
  }

  if (solarTerm) {
    solarTerm.textContent = getSolarTerm(hkNow);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateDateTime();
  setInterval(updateDateTime, 30000);
});
