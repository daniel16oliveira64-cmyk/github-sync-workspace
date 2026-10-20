// Mount the existing engine's fields inside the current Studio shell.
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const field = (id, label, type = 'text', options = '') => `<div class="field"><label for="${id}">${label}</label>${type === 'textarea' ? `<textarea id="${id}" rows="3"></textarea>` : type === 'select' ? `<select id="${id}">${options}</select>` : `<input id="${id}" type="${type}">`}</div>`;
  const toggle = (id, label) => `<label class="check-row" for="${id}"><input id="${id}" type="checkbox" checked>${label}</label>`;
  const group = (name, html) => `<div class="ws-group"><div class="ws-gt">${name}</div>${html}</div>`;
  const opts = values => values.map(([v,l]) => `<option value="${v}">${l}</option>`).join('');
  const content = group('Business', field('siteBusinessName','Business name') + field('siteEyebrow','Eyebrow') + field('siteHeadline','Headline','textarea') + field('siteSub','Subheadline','textarea') + field('siteCta','CTA')) + group('Services', field('siteServicesTitle','Section title') + field('siteServices','Services · title | description','textarea') + field('siteDifferentials','Differentials · title | description','textarea')) + group('About', field('siteAboutTitle','Section title') + field('siteAbout','About','textarea')) + group('Contact', field('sitePhone','WhatsApp','tel') + field('siteInstagram','Instagram') + field('siteAddress','Address','textarea') + field('siteHours','Opening hours','textarea') + field('siteCity','City / region') + field('siteFinalCta','Final CTA','textarea') + field('siteFooterText','Footer') + toggle('siteMap','Map') + toggle('siteFloatingWhats','WhatsApp shortcut')) + group('Verified information', field('siteTrustLine','Statement') + field('siteRating','Rating') + field('siteReviewCount','Review count') + field('siteStats','Figures · value | label','textarea') + field('siteTestimonials','Testimonials · author | quote','textarea') + field('siteFaq','FAQ · question | answer','textarea')) + group('Content', '<button id="autoSite" class="secondary">Reset content</button>');
  const brand = group('Creative direction', field('siteDirection','Creative Direction','select') + '<div id="creativeBrief"></div>') + group('Palette', field('siteAccent','Primary color','color') + field('siteAccentText','Primary · HEX') + field('siteSecondary','Secondary color','color')) + group('Typography', field('siteTypography','Typography','select',opts([['direction','Creative direction'],['serif','Editorial serif'],['sans','Modern sans'],['humanist','Humanist']]))) + group('Composition', field('siteMood','Mood','select',opts([['auto','Direction default'],['warm','Warm'],['clean','Clean'],['premium','Premium'],['bold','Bold'],['friendly','Friendly']])) + field('siteDensity','Spacing','select',opts([['balanced','Balanced'],['airy','Airy'],['compact','Compact']])) + toggle('siteMotion','Motion') + toggle('siteStickyNav','Sticky navigation'));
  const upload = (id,status,label,multiple=false) => `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="file" accept="image/*" ${multiple?'multiple':''}><span class="mini" id="${status}"></span></div>`;
  const media = group('Logo',field('siteLogo','Logo URL','url') + upload('logoFile','logoFileStatus','Upload logo')) + group('Hero',field('siteImage','Hero image URL','url') + upload('heroFile','heroFileStatus','Upload hero') + field('siteImagePosition','Focal point','select',opts([['center','Center'],['top','Top'],['bottom','Bottom'],['left','Left'],['right','Right']])) + field('siteOverlay','Overlay','range')) + group('About',field('siteAboutImage','About image URL','url') + upload('aboutFile','aboutFileStatus','Upload about image')) + group('Gallery',field('siteGallery','Gallery URLs · one per line','textarea') + upload('galleryFiles','galleryFileStatus','Upload gallery',true));
  const seo = group('Search', field('siteSeoTitle','Page title') + field('siteSeoDescription','Meta description','textarea')) + group('Open Graph',field('siteOgTitle','Open Graph title') + field('siteOgDescription','Open Graph description','textarea') + field('siteOgImage','Open Graph image','url')) + group('LocalBusiness',toggle('siteSchema','LocalBusiness schema'));
  $('wsPanel').innerHTML = Object.entries({content,brand,media,sections:group('Sections','<div id="wsSections" class="ws-secs"></div>'),seo}).map(([key,html])=>`<div class="studio-panel ${key==='content'?'active':''}" data-panel="${key}">${html}</div>`).join('');
  document.querySelectorAll('.ws-tab').forEach(el=>el.classList.add('studio-tab'));
  document.querySelectorAll('.ws-dev').forEach(el=>el.classList.add('device-btn'));
  $('wsStage').classList.add('preview-stage');
  $('siteOverlay').min='0'; $('siteOverlay').max='90'; $('siteOverlay').value='45';
  $('siteFrame').setAttribute('sandbox','allow-scripts allow-popups');
  function fit() {
    const stage=$('wsStage'), canvas=$('wsCanvas');
    const width={desktop:1440,tablet:768,mobile:390}[stage.dataset.device || 'desktop'];
    const scale=Math.min(1,Math.max(0.15,(stage.clientWidth-32)/width));
    canvas.style.width=width+'px'; canvas.style.height=Math.max(500,(stage.clientHeight-32)/scale)+'px';
    canvas.style.transform=`translateX(-50%) scale(${scale})`;
  }
  new ResizeObserver(fit).observe($('wsStage'));
  new MutationObserver(fit).observe($('wsStage'),{attributes:true,attributeFilter:['data-device']});
  $('wsInspToggle').onclick=()=>$('wsRight').classList.toggle('open');
  window.KromaStudioControls={fit};
})();