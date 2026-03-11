function toggleMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) {
    mobileNav.classList.toggle('show');
  }
}

function padZero(num) {
  return String(num).padStart(2, '0');
}

function getWeekdayZh(dayIndex) {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return days[dayIndex];
}

function getLunarMonthName(month) {
  const names = [
    '',
    '正月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '冬月', '臘月'
  ];
  return names[month] || '';
}

function getLunarDayName(day) {
  const names = [
    '',
    '初一', '初二', '初三', '初四', '初五',
    '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五',
    '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五',
    '廿六', '廿七', '廿八', '廿九', '三十'
  ];
  return names[day] || '';
}

function getSolarTerm(date) {
  const year = date.getFullYear();
  const monthDay = `${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;

  const solarTerms = {
    '01-05': '小寒',
    '01-20': '大寒',
    '02-04': '立春',
    '02-19': '雨水',
    '03-05': '驚蟄',
    '03-20': '春分',
    '04-04': '清明',
    '04-20': '穀雨',
    '05-05': '立夏',
    '05-21': '小滿',
    '06-05': '芒種',
    '06-21': '夏至',
    '07-07': '小暑',
    '07-22': '大暑',
    '08-07': '立秋',
    '08-23': '處暑',
    '09-07': '白露',
    '09-23': '秋分',
    '10-08': '寒露',
    '10-23': '霜降',
    '11-07': '立冬',
    '11-22': '小雪',
    '12-07': '大雪',
    '12-21': '冬至'
  };

  if (solarTerms[monthDay]) {
    return solarTerms[monthDay];
  }

  let latestTerm = '';
  let latestDate = '';

  Object.keys(solarTerms).forEach((key) => {
    if (key <= monthDay && key > latestDate) {
      latestDate = key;
      latestTerm = solarTerms[key];
    }
  });

  if (!latestTerm) {
    latestTerm = '冬至';
  }

  return latestTerm;
}

function updateHeaderDateTime() {
  const now = new Date();
  const hkNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));

  const hours = padZero(hkNow.getHours());
  const minutes = padZero(hkNow.getMinutes());

  const solarDate = `${hkNow.getMonth() + 1}月${hkNow.getDate()}日`;
  const weekday = getWeekdayZh(hkNow.getDay());

  const timeEl = document.getElementById('hkTime');
  const solarDateEl = document.getElementById('solarDate');
  const weekdayEl = document.getElementById('weekday');
  const lunarDateEl = document.getElementById('lunarDate');
  const solarTermEl = document.getElementById('solarTerm');

  if (timeEl) {
    timeEl.textContent = `${hours}:${minutes}`;
  }

  if (solarDateEl) {
    solarDateEl.textContent = solarDate;
  }

  if (weekdayEl) {
    weekdayEl.textContent = weekday;
  }

  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    try {
      const lunarFormatter = new Intl.DateTimeFormat('zh-HK-u-ca-chinese', {
        month: 'long',
        day: 'numeric'
      });

      const lunarParts = lunarFormatter.formatToParts(hkNow);
      let lunarMonth = '';
      let lunarDay = '';

      lunarParts.forEach((part) => {
        if (part.type === 'month') {
          lunarMonth = part.value;
        }
        if (part.type === 'day') {
          lunarDay = part.value;
        }
      });

      if (lunarDateEl) {
        if (lunarMonth && lunarDay) {
          lunarDateEl.textContent = `農曆 ${lunarMonth}${lunarDay}`;
        } else {
          lunarDateEl.textContent = '農曆資料';
        }
      }
    } catch (error) {
      if (lunarDateEl) {
        lunarDateEl.textContent = '農曆資料';
      }
    }
  }

  if (solarTermEl) {
    solarTermEl.textContent = getSolarTerm(hkNow);
  }
}

updateHeaderDateTime();
setInterval(updateHeaderDateTime, 1000 * 30);
