// ── Providers ──
var providers = [
  { id: '1337x', label: '1337x', url: 'https://1337x.to' },
  { id: 'rarbg_torrentbay', label: 'RARBG Torrentbay', url: 'https://rarbg.torrentbay.st' },
  { id: 'kickass', label: 'KickAss', url: 'https://kickasstorrent.cr' },
  { id: 'limetorrents', label: 'LimeTorrents', url: 'https://www.limetorrents.lol' },
  { id: 'eztv', label: 'EZTV', url: 'https://eztv.re' },
  { id: 'tpb', label: 'The Pirate Bay', url: 'https://tpb.party' },
  { id: 'nyaa', label: 'Nyaa', url: 'https://nyaa.si' },
  { id: 'magnetdl', label: 'MagnetDL', url: 'https://www.magnetdl.com' },
];

// ── AnPlayer bridge ──
var isAnPlayer = (function () {
  try { return !!anPlayer; } catch (e) { return false; }
})();

function loadConfig() {
  try {
    return JSON.parse(anPlayer.getConfiguration());
  } catch (e) {
    return {};
  }
}

var config = isAnPlayer ? loadConfig() : {};

// ── Theme ──
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  var resolved = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', resolved);
  document.getElementById('themeToggle').textContent = resolved === 'dark' ? '🌙' : '☀️';
}

var currentTheme = localStorage.getItem('torrentie-theme') || 'system';
applyTheme(currentTheme);

document.getElementById('themeToggle').addEventListener('click', function () {
  var resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme;
  currentTheme = resolved === 'dark' ? 'light' : 'dark';
  localStorage.setItem('torrentie-theme', currentTheme);
  applyTheme(currentTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
  if (currentTheme === 'system') applyTheme('system');
});

// ── Render providers ──
var providersEl = document.getElementById('providers');
var enabledProviders = config.providers || providers.map(function (p) { return p.id; });

providers.forEach(function (p) {
  var checked = enabledProviders.indexOf(p.id) !== -1;
  var row = document.createElement('div');
  row.className = 'toggle-row';
  row.innerHTML =
    '<div>' +
      '<div class="toggle-label">' + p.label + '</div>' +
      '<div class="toggle-sublabel">' + p.url + '</div>' +
    '</div>' +
    '<label class="toggle">' +
      '<input type="checkbox" data-provider="' + p.id + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="toggle-track"></span>' +
    '</label>';
  providersEl.appendChild(row);
});

// ── Restore config values ──
if (config.sorting) {
  var radio = document.querySelector('input[name="sorting"][value="' + config.sorting + '"]');
  if (radio) radio.checked = true;
}

if (config.excludeKeywords) {
  document.getElementById('excludeKeywords').value = config.excludeKeywords.join(',');
}

if (config.rdApiKey) {
  document.getElementById('rdApiKey').value = config.rdApiKey;
}

if (config.adApiKey) {
  document.getElementById('adApiKey').value = config.adApiKey;
}

if (config.ytsEnabled === false) {
  document.getElementById('ytsEnabled').checked = false;
}

if (config.relevanceSort) {
  document.getElementById('relevanceSort').checked = true;
}

if (config.scraperTimeout) {
  document.getElementById('scraperTimeout').value = config.scraperTimeout / 1000;
}

if (config.debridService === 'alldebrid') {
  document.querySelector('input[name="debridService"][value="alldebrid"]').checked = true;
  document.getElementById('rdFields').classList.add('hidden');
  document.getElementById('adFields').classList.remove('hidden');
}

if (config.jackett) {
  document.getElementById('jackettEnabled').checked = true;
  document.getElementById('jackettFields').classList.remove('hidden');
  document.getElementById('jackettUrl').value = config.jackett.url || '';
  document.getElementById('jackettApiKey').value = config.jackett.apiKey || '';
}

// ── Adult content filter ──
var defaultAdultKeywords = [
  'xxx', 'porn', 'porno', 'pornstar', 'pornographic',
  'adult', 'nsfw', 'erotic', 'erotica', 'erotics',
  'hentai', 'ecchi', 'milf', 'dilf', 'gilf',
  'hardcore', 'softcore', 'threesome', 'foursome', 'gangbang',
  'orgy', 'anal', 'creampie', 'cumshot', 'facial',
  'blowjob', 'handjob', 'footjob', 'deepthroat', 'titjob',
  'bondage', 'bdsm', 'fetish', 'femdom', 'domination',
  'submissive', 'slave', 'whip', 'latex', 'leather',
  'stripper', 'striptease', 'escort', 'hooker', 'brothel',
  'nude', 'naked', 'topless', 'nudist', 'nudity',
  'playboy', 'penthouse', 'hustler', 'brazzers', 'bangbros',
  'naughtyamerica', 'realitykings', 'mofos', 'tushy', 'vixen',
  'blacked', 'babes.com', 'digitalplayground', 'wicked', 'vivid',
  'xvideos', 'xhamster', 'pornhub', 'redtube', 'youporn',
  'xnxx', 'spankbang', 'eporner', 'tube8', 'xtube',
  'cam4', 'chaturbate', 'livejasmin', 'bongacams', 'myfreecams',
  'onlyfans', 'fansly', 'manyvids', 'clips4sale', 'iwantclips',
  'jav', 'javhd', 'caribbeancom', 'tokyo-hot', 'heyzo',
  'sextape', 'sexvid', 'sextoy', 'vibrator', 'dildo',
  'orgasm', 'squirt', 'lesbian', 'scissoring', 'tribbing',
];

var adultKeywordsEl = document.getElementById('adultKeywords');
var blockAdultEl = document.getElementById('blockAdult');
var adultFieldEl = document.getElementById('adultKeywordsField');

if (config.adultKeywords) {
  blockAdultEl.checked = true;
  adultKeywordsEl.value = config.adultKeywords.join(', ');
  adultFieldEl.classList.remove('hidden');
}

blockAdultEl.addEventListener('change', function () {
  if (this.checked) {
    if (!adultKeywordsEl.value.trim()) {
      adultKeywordsEl.value = defaultAdultKeywords.join(', ');
    }
    adultFieldEl.classList.remove('hidden');
  } else {
    adultFieldEl.classList.add('hidden');
  }
});

// ── Debrid toggle ──
document.querySelectorAll('input[name="debridService"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    var isRd = this.value === 'realdebrid';
    document.getElementById('rdFields').classList.toggle('hidden', !isRd);
    document.getElementById('adFields').classList.toggle('hidden', isRd);
  });
});

// ── Jackett toggle ──
document.getElementById('jackettEnabled').addEventListener('change', function () {
  document.getElementById('jackettFields').classList.toggle('hidden', !this.checked);
});

// ── Build config ──
function buildConfig() {
  var selectedProviders = [];
  document.querySelectorAll('[data-provider]').forEach(function (cb) {
    if (cb.checked) selectedProviders.push(cb.getAttribute('data-provider'));
  });

  var sorting = document.querySelector('input[name="sorting"]:checked').value;
  var excludeRaw = document.getElementById('excludeKeywords').value.trim();
  var excludeKeywords = excludeRaw ? excludeRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];

  var blockAdult = document.getElementById('blockAdult').checked;
  var adultKw = [];
  if (blockAdult) {
    var adultRaw = document.getElementById('adultKeywords').value.trim();
    adultKw = adultRaw ? adultRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
  }

  var allExcluded = excludeKeywords.concat(adultKw);
  var uniqueExcluded = allExcluded.filter(function (v, i, a) { return a.indexOf(v) === i; });
  excludeKeywords = uniqueExcluded.length ? uniqueExcluded : undefined;

  var debridService = document.querySelector('input[name="debridService"]:checked').value;
  var rdApiKey = document.getElementById('rdApiKey').value.trim() || undefined;
  var adApiKey = document.getElementById('adApiKey').value.trim() || undefined;

  var ytsEnabled = document.getElementById('ytsEnabled').checked;
  var relevanceSort = document.getElementById('relevanceSort').checked;
  var scraperTimeoutSec = parseInt(document.getElementById('scraperTimeout').value, 10);
  var scraperTimeout = (!isNaN(scraperTimeoutSec) && scraperTimeoutSec > 0) ? scraperTimeoutSec * 1000 : undefined;

  var jackettEnabled = document.getElementById('jackettEnabled').checked;
  var jackett = undefined;
  if (jackettEnabled) {
    var jUrl = document.getElementById('jackettUrl').value.trim();
    var jKey = document.getElementById('jackettApiKey').value.trim();
    if (jUrl && jKey) {
      jackett = { url: jUrl, apiKey: jKey };
    }
  }

  var result = {
    providers: selectedProviders,
    sorting: sorting,
    debridService: debridService,
  };

  if (excludeKeywords) result.excludeKeywords = excludeKeywords;
  if (blockAdult && adultKw.length) result.adultKeywords = adultKw;
  if (rdApiKey) result.rdApiKey = rdApiKey;
  if (adApiKey) result.adApiKey = adApiKey;
  if (!ytsEnabled) result.ytsEnabled = false;
  if (relevanceSort) result.relevanceSort = true;
  if (scraperTimeout) result.scraperTimeout = scraperTimeout;
  if (jackett) result.jackett = jackett;

  return result;
}

// ── Actions ──
var actionsEl = document.getElementById('actions');

if (isAnPlayer) {
  var saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', function () {
    var cfg = buildConfig();
    var ok = anPlayer.setConfiguration(JSON.stringify(cfg));
    if (ok) anPlayer.finish();
  });
  actionsEl.appendChild(saveBtn);
} else {
  var dlBtn = document.createElement('button');
  dlBtn.className = 'btn btn-outline';
  dlBtn.textContent = 'Download';
  dlBtn.addEventListener('click', function () {
    var cfg = buildConfig();
    var plugin = Object.assign({}, window._pluginData || {}, { config: JSON.stringify(cfg) });
    var blob = new Blob([JSON.stringify(plugin)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'torrentie-' + (cfg.rdApiKey || cfg.adApiKey || 'config') + '.json';
    a.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(url);
  });
  actionsEl.appendChild(dlBtn);

  var installBtn = document.createElement('button');
  installBtn.className = 'btn btn-primary';
  installBtn.textContent = 'Install';
  installBtn.addEventListener('click', function () {
    var cfg = buildConfig();
    var downloadUrl = 'https://androidplayer1.github.io/tmdb-ui/assets/torrentie.json';
    var params = encodeQueryData({
      config: JSON.stringify(cfg),
      downloadUrl: downloadUrl,
    });
    window.open('anplayer://plugin/install?' + params, '_blank');
  });
  actionsEl.appendChild(installBtn);
}

// ── Load plugin JSON ──
fetch('./assets/torrentie.json')
  .then(function (r) { return r.json(); })
  .then(function (data) { window._pluginData = data; })
  .catch(function () {});

// ── Util ──
function encodeQueryData(data) {
  var parts = [];
  for (var key in data) {
    parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  return parts.join('&');
}
