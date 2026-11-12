// Freeby Réplica — páginas internas (Tienda, ¿Quieres Vender?, Envía Nacionalmente, ¡Síguenos en redes!, Marketplace)
// Requiere en localStorage: FB_DATA (MEDIA, CATS), FB_TOP, FB_FOOT, FB_TESTI (secciones copiadas de la portada).
// Guarda FB_PAGES = { idPagina: [contenedores de Elementor] }.
(() => {
const { MEDIA, CATS } = JSON.parse(localStorage.getItem('FB_DATA'));
const TOPJ = JSON.parse(localStorage.getItem('FB_TOP'));
const FOOTJ = JSON.parse(localStorage.getItem('FB_FOOT'));
const TESTIJ = JSON.parse(localStorage.getItem('FB_TESTI'));
const B = 'http://localhost/freeby-replica';
const U = id => MEDIA[id];
const rid = () => Math.random().toString(16).slice(2, 9);
const reid = el => { const o = JSON.parse(JSON.stringify(el)); const walk = e => { e.id = rid(); (e.elements || []).forEach(walk); }; walk(o); return o; };
const px = (t, r, b, l) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
const W = (type, settings) => ({ id: rid(), elType: 'widget', widgetType: type, settings, elements: [] });
const C = (settings, elements, inner = false) => ({ id: rid(), elType: 'container', isInner: inner,
  settings: Object.assign({ content_width: 'boxed', boxed_width: { unit: 'px', size: 1150, sizes: [] }, flex_direction: 'column', padding: px(0, 15, 0, 15), flex_gap: { unit: 'px', size: 0, column: '0', row: '0' } }, settings), elements });
const H = html => W('html', { html });
const SC = sc => W('shortcode', { shortcode: sc });
const FULL = { content_width: 'full', padding: px(0, 0, 0, 0) };
const I = (d, s = 24, sw = 1.6) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC = {
  truck: '<path d="M2 5h12v10H2zM14 9h4l3 3.5V15h-7z"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/><path d="M1 8h4M1 11h3"/>',
  dollar: '<circle cx="12" cy="12" r="9.5"/><path d="M14.8 9.3c-.4-.9-1.4-1.5-2.8-1.5-1.6 0-2.7.8-2.7 1.9 0 2.6 5.6 1.4 5.6 4.2 0 1.1-1.2 2-2.9 2-1.4 0-2.5-.6-2.9-1.6M12 6.2v1.6M12 16v1.7"/>',
  h24: '<path d="M20.5 12A8.5 8.5 0 1 1 18 6"/><path d="M20.5 3.5V7H17"/><text x="12" y="15" text-anchor="middle" font-family="Poppins,sans-serif" font-size="7.5" font-weight="700" fill="currentColor" stroke="none">24</text>',
  secure: '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3M3 15h18M10 18h4"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h14V9.5"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/>',
  store: '<path d="M3 9 5 4h14l2 5"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v8h14v-8M10 20v-5h4v5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>'
};

// ---------- CSS compartido de las páginas internas ----------
const CSS = `<style id="fb-pages">
.fb-bc{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;text-transform:uppercase;color:#777;padding:18px 0 0;letter-spacing:.3px}
.fb-bc a{color:#777;display:flex}.fb-bc a:hover{color:#FFA500}.fb-bc svg{width:14px;height:14px}
.fb-hero{position:relative;overflow:hidden;background:radial-gradient(ellipse 60% 90% at 70% 30%,#fdd6a6 0%,#fbe8d4 40%,#f4f2f0 75%)}
.fb-hero.lila{background:radial-gradient(ellipse 40% 70% at 45% 20%,#ead9f7 0%,#efe8f6 35%,#efeff1 70%)}
.fb-hero .in{max-width:1150px;margin:0 auto;padding:110px 15px 100px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px}
.fb-hero .tx{position:relative;padding-left:105px}
.fb-hero .tx:before{content:"";position:absolute;left:58px;top:8px;width:11px;height:105px;background-image:radial-gradient(#333 1.6px,transparent 1.7px);background-size:11px 11px;opacity:.8}
.fb-hero h1{font-family:Lexend;font-weight:700;font-size:52px;line-height:1.05;color:#222529;margin:0 0 16px}
.fb-hero p{font-size:15px;line-height:1.75;color:#666;margin:0;max-width:440px}
.fb-blob{justify-self:center;width:420px;height:400px;border-radius:58% 42% 55% 45%/52% 48% 52% 48%;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.08)}
.fb-blob img{width:100%;height:100%;object-fit:cover;display:block}
.fb-band{background:#FF8A00;overflow:hidden;white-space:nowrap;height:58px;display:flex;align-items:center}
.fb-band div{display:inline-block;animation:fbm2 40s linear infinite;font-family:Lexend;font-weight:600;font-size:17px;color:#fff;text-transform:uppercase;letter-spacing:.5px}
@keyframes fbm2{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.fb-steps{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.fb-card{background:#fff;border-radius:18px;box-shadow:0 10px 40px rgba(0,0,0,.08);padding:50px 55px}
.fb-card h2{font-family:Lexend;font-weight:600;font-size:26px;color:#222529;margin:0 0 22px}
.fb-step{background:#fff5ee;border-radius:10px;padding:16px 20px;margin-bottom:14px;font-size:15px;line-height:1.7;color:#555}
.fb-step b{color:#FF8A00}
.fb-cta{display:inline-block;margin-top:14px;background:linear-gradient(180deg,#ffa62b,#ff8a00);color:#fff!important;font-weight:600;font-size:14px;border-radius:30px;padding:14px 32px;box-shadow:0 10px 24px rgba(255,138,0,.35)}
.fb-cta:hover{filter:brightness(1.05)}
.fb-photo{justify-self:center;width:300px;height:330px;border-radius:18px;overflow:hidden;box-shadow:0 15px 35px rgba(0,0,0,.12);border:4px solid #fff}
.fb-photo img{width:100%;height:100%;object-fit:cover;display:block}
.fb-split{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.fb-oc{position:relative;overflow:hidden;background:linear-gradient(135deg,#ff9a1f,#ffb04d);border-radius:18px;padding:55px 50px;box-shadow:0 20px 40px rgba(255,138,0,.25)}
.fb-oc:before{content:"";position:absolute;right:-90px;top:-90px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.12)}
.fb-oc h2{position:relative;font-family:Lexend;font-weight:600;font-size:30px;letter-spacing:1px;color:#fff;text-transform:uppercase;margin:0 0 22px;line-height:1.3}
.fb-oc p{position:relative;color:#fff;font-size:14px;line-height:1.8;margin:0;opacity:.95}
.fb-checks{background:#fff;border-radius:18px;box-shadow:0 10px 40px rgba(0,0,0,.08);padding:30px 32px}
.fb-chk{display:flex;gap:18px;align-items:flex-start;background:#fff5ee;border-radius:10px;padding:20px 22px;margin-bottom:20px;font-size:15px;line-height:1.7;color:#333}
.fb-chk:last-child{margin-bottom:0}
.fb-chk i{flex:0 0 32px;height:32px;border-radius:50%;background:#FFB04D;color:#1e5a4a;display:flex;align-items:center;justify-content:center;margin-top:2px}
.fb-chk i svg{width:18px;height:18px;stroke-width:2.6}
.fb-center{text-align:center;border-top:1px solid #ececec;padding-top:0}
.fb-center h2{font-family:Lexend;font-weight:700;font-size:32px;color:#000;margin:0 0 20px}
.fb-feats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.fb-feats div{font-family:Lexend;font-weight:600;font-size:18px;color:#222529}
.fb-feats .ic{position:relative;width:90px;height:80px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;color:#FFA500}
.fb-feats .ic:before{content:"";position:absolute;right:8px;top:0;width:46px;height:46px;border-radius:50%;background:#eee}
.fb-feats .ic svg{position:relative;width:70px;height:70px;stroke-width:1.3}
.fb-carriers{display:flex;justify-content:space-around;align-items:center;padding:28px 0;flex-wrap:wrap;gap:20px}
.fb-carriers span{font-family:Lexend;font-weight:700;font-size:24px;color:#4b4b4b;letter-spacing:-.5px;opacity:.85}
.fb-tt{text-align:center;font-family:Lexend;font-weight:700;font-size:32px;color:#222529;margin:0 0 40px}
/* Redes */
.fb-redes h1{text-align:center;font-family:Lexend;font-weight:500;font-size:36px;color:#222529;margin:30px 0 50px}
.fb-social{display:grid;grid-template-columns:1.65fr 1fr;gap:40px;align-items:start}
.fb-ig{display:grid;grid-template-columns:300px 1fr;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08)}
.fb-ig .pf{background:linear-gradient(160deg,#833ab4 0%,#e1306c 45%,#fd8d32 100%);color:#fff;text-align:center;padding:40px 22px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.fb-ig .av{width:76px;height:76px;border-radius:50%;background:#FFA500;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-family:Lexend;font-weight:700;color:#111;font-size:20px;margin-bottom:18px}
.fb-ig .pf h3{font-family:Lexend;font-size:26px;margin:0 0 14px;color:#fff}
.fb-ig .pf p{font-size:13px;line-height:1.6;margin:0}
.fb-ig .gr{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:18px;background:#fff}
.fb-ig .gr a{position:relative;aspect-ratio:1;border-radius:10px;overflow:hidden;display:block}
.fb-ig .gr img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
.fb-ig .gr a:hover img{transform:scale(1.06)}
.fb-ig .gr .pl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff}
.fb-ig .gr .pl svg{width:34px;height:34px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}
.fb-tk{background:#fff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.1);overflow:hidden;position:relative}
.fb-tk .tag{position:absolute;top:12px;left:50%;transform:translateX(-50%);background:#111;color:#fff;font-size:12px;font-weight:600;border-radius:20px;padding:5px 14px;z-index:2;white-space:nowrap}
.fb-tk .vid{position:relative;aspect-ratio:9/14;background:#000}
.fb-tk .vid img{width:100%;height:100%;object-fit:cover;opacity:.85;display:block}
.fb-tk .vid i{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff}
.fb-tk .vid i svg{width:56px;height:56px}
.fb-tk .cap{padding:14px 16px;font-size:13px;color:#333}
.fb-fbw{margin-top:40px;background:#fffaf5;border-top:3px solid #FFA500;border-radius:16px;padding:40px 30px;box-shadow:0 10px 30px rgba(0,0,0,.05)}
.fb-cover{position:relative;height:110px;border-radius:6px;background:linear-gradient(90deg,#ff8a00 0%,#ffa500 55%,rgba(255,165,0,.4) 100%)}
.fb-cover img{position:absolute;right:0;top:0;height:100%;width:42%;object-fit:cover;border-radius:0 6px 6px 0}
.fb-pg{display:flex;align-items:flex-end;gap:14px;margin:-40px 0 26px 8px;position:relative}
.fb-pg .av{width:76px;height:76px;border-radius:4px;background:#FFA500;border:3px solid #fff;display:flex;align-items:center;justify-content:center;font-family:Lexend;font-weight:700;color:#111;font-size:20px}
.fb-pg b{display:block;font-size:15px;color:#222529}.fb-pg small{font-size:12px;color:#666}
.fb-posts{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.fb-post{background:#fff;border-radius:8px;padding:18px;font-size:13px;line-height:1.7;color:#333;box-shadow:0 2px 10px rgba(0,0,0,.04)}
.fb-post .h{display:flex;gap:10px;align-items:center;margin-bottom:12px}
.fb-post .h i{width:36px;height:36px;border-radius:50%;background:#FFA500;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:700;font-size:11px;color:#111;font-family:Lexend}
.fb-post .h b{display:block;color:#FF8A00;font-size:13px}.fb-post .h small{color:#888;font-size:11px}
.fb-post img{width:100%;border-radius:6px;margin:10px 0;aspect-ratio:4/3;object-fit:cover;display:block}
.fb-post .m{display:flex;align-items:center;gap:6px;color:#FF8A00;font-size:12px;font-weight:600}
.fb-post .m svg{width:16px;height:16px}
/* Marketplace */
.fb-mk{display:flex;justify-content:center;gap:0}
.fb-mk a{width:300px;background:#fff;border-radius:18px;box-shadow:0 12px 35px rgba(0,0,0,.08);padding:30px 20px 45px;text-align:center;display:block;transition:transform .2s}
.fb-mk a:hover{transform:translateY(-4px)}
.fb-mk h3{font-family:Lexend;font-weight:500;font-size:22px;color:#222529;margin:0 0 30px}
.fb-mk .t{width:140px;height:140px;border-radius:14px;margin:0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.fb-mk .t svg{width:70px;height:70px}
.fb-mk .t span{font-size:13px;font-weight:600}
/* Tienda */
.fb-shop h1{font-family:Lexend;font-weight:700;font-size:32px;color:#222529;margin:12px 0 22px}
.fb-shop .fb-cats .im{background:#f4f4f4}
.fb-shopbar{display:flex;align-items:center;justify-content:flex-end;gap:10px;margin:0 0 -48px;position:relative;z-index:2;pointer-events:none}
.fb-shopbar button{pointer-events:auto;width:30px;height:30px;border:1px solid #e7e7e7;background:#fff;border-radius:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#999;padding:0}
.fb-shopbar button.on{color:#FFA500;border-color:#FFA500}
.fb-shopbar svg{width:15px;height:15px}
.fb-shop .woocommerce-result-count{font-size:13px;color:#777;margin:0 0 20px!important;float:none!important;display:inline-block}
.fb-shop .woocommerce-ordering{float:none!important;display:inline-block;margin:0 20px 20px 0!important}
.fb-shop .woocommerce-ordering select{border:1px solid #e7e7e7;border-radius:4px;padding:6px 30px 6px 12px;font-size:13px;color:#222529;font-family:Poppins;background-color:#fff}
.fb-shop ul.products{grid-template-columns:repeat(6,minmax(0,1fr))!important}
.fb-shop.list ul.products{grid-template-columns:1fr!important}
.fb-shop.list li.product{display:grid!important;grid-template-columns:200px 1fr;gap:20px;text-align:left!important;align-items:center}
.fb-shop.list li.product .astra-shop-summary-wrap{align-items:flex-start!important}
.fb-shop.list li.product .astra-shop-summary-wrap>*{text-align:left!important}
.fb-shop nav.woocommerce-pagination{margin-top:30px;text-align:center}
.fb-shop nav.woocommerce-pagination ul{border:0!important;display:inline-flex;gap:6px}
.fb-shop nav.woocommerce-pagination ul li{border:0!important}
.fb-shop nav.woocommerce-pagination ul li a,.fb-shop nav.woocommerce-pagination ul li span{border:1px solid #e7e7e7!important;border-radius:4px;min-width:34px;height:34px;display:flex!important;align-items:center;justify-content:center;color:#222529}
.fb-shop nav.woocommerce-pagination ul li span.current{background:#FFA500!important;color:#fff!important;border-color:#FFA500!important}
/* Responsive */
@media (max-width:1024px){.fb-hero .in{grid-template-columns:1fr;padding:60px 15px}.fb-hero .tx{padding-left:40px}.fb-hero .tx:before{left:10px}.fb-blob{width:340px;height:320px}.fb-steps,.fb-split,.fb-social{grid-template-columns:1fr}.fb-shop ul.products{grid-template-columns:repeat(4,minmax(0,1fr))!important}.fb-posts{grid-template-columns:1fr 1fr}}
@media (max-width:767px){.fb-hero h1{font-size:34px}.fb-hero .tx{padding-left:0}.fb-hero .tx:before{display:none}.fb-blob{width:280px;height:260px}.fb-card,.fb-oc{padding:30px 24px}.fb-feats{grid-template-columns:1fr 1fr}.fb-feats div{font-size:15px}.fb-center h2,.fb-tt{font-size:24px}.fb-ig{grid-template-columns:1fr}.fb-posts{grid-template-columns:1fr}.fb-mk{flex-direction:column;align-items:center;gap:20px}.fb-redes h1{font-size:26px}.fb-shop ul.products{grid-template-columns:repeat(2,minmax(0,1fr))!important}.fb-shop.list li.product{grid-template-columns:110px 1fr}.fb-carriers span{font-size:18px}.fb-photo{width:240px;height:270px}}
</style>`;

const BC = name => `<div class="fb fb-bc"><a href="${B}/" aria-label="Inicio">${I(IC.home)}</a> &gt; ${name}</div>`;
const FEATS = (items) => `<div class="fb fb-feats">${items.map(([ic, t]) => `<div><div class="ic">${I(IC[ic])}</div>${t}</div>`).join('')}</div>`;
const CHECKS = items => `<div class="fb fb-checks">${items.map(t => `<div class="fb-chk"><i>${I(IC.check)}</i><span>${t}</span></div>`).join('')}</div>`;
const testimonios = () => { const t = reid(TESTIJ); const h = t.elements.find(e => e.widgetType === 'heading'); if (h) h.settings.title = 'Lo que dicen nuestros clientes'; return t; };
const page = (name, content) => [reid(TOPJ), C(FULL, [H(CSS)]), ...content, reid(FOOTJ)];

// ---------- ¿Quieres Vender? ----------
const VENDER = page('vender', [
  C(FULL, [H(`<section class="fb fb-hero"><div class="in"><div class="tx"><h1>Tu espacio para vender en línea</h1><p>¿Tienes productos y quieres llegar a más clientes? Te damos un lugar en nuestra tienda para exhibir tus artículos, darte a conocer y comenzar a vender de forma sencilla, rápida y segura.</p></div><div class="fb-blob"><img src="${U(47)}" alt="Emprendedora vendiendo en línea"></div></div></section>`),
    H(`<div class="fb fb-band"><div>${'Material de apoyo para ventas &nbsp;-&nbsp; Envíos y entregas &nbsp;-&nbsp; Grupos de WhatsApp y Telegram &nbsp;-&nbsp; Comisiones &nbsp;-&nbsp; Plataformas digitales de venta &nbsp;-&nbsp; Contenido para marketing &nbsp;-&nbsp; '.repeat(4)}</div></div>`)]),
  C({ padding: px(90, 15, 60, 15) }, [H(`<div class="fb fb-steps"><div class="fb-card"><h2>Comienza en 3 Sencillos Pasos</h2>
<div class="fb-step"><b>Paso 1:</b> Mándanos un mensaje por WhatsApp y un asesor te contactará.</div>
<div class="fb-step"><b>Paso 2:</b> Nos entregas tus productos para comenzar a venderlos.</div>
<div class="fb-step"><b>Paso 3:</b> Recibe las ganancias de cada producto vendido.</div>
<a class="fb-cta" href="#">¡Quiero vender!</a></div><div class="fb-photo"><img src="${U(46)}" alt="Persona preparando pedidos"></div></div>`)]),
  C({ padding: px(40, 15, 60, 15) }, [H(`<div class="fb fb-split"><div class="fb-oc"><h2>Vende fácil</h2><p>Vender con nosotros es muy simple: escríbenos por WhatsApp y un asesor te acompañará en todo el proceso. Nos entregas tus productos, nosotros los publicamos y tú solo te dedicas a lo importante: ver crecer tus ventas.</p></div>
${CHECKS(['Genera ingresos extra vendiendo tus productos en nuestra tienda, sin invertir en tu propia plataforma digital.', 'Atención personalizada desde el primer mensaje: te acompañamos en cada paso de la venta.', 'Publicamos, promocionamos y gestionamos tus productos para que tengan más oportunidades de venderse.', 'Tú vendes y nosotros operamos: pedidos, entregas y atención al cliente corren por nuestra cuenta.'])}</div>`)]),
  C({ padding: px(0, 15, 70, 15) }, [H(`<div class="fb fb-center"><div style="height:0"></div><h2 style="margin-top:0;padding-top:0">¡Escríbenos para más info!</h2><a class="fb-cta" href="#" style="margin:0 0 60px">¡Quiero vender!</a></div>${FEATS([['truck', 'Envíos nacionales'], ['dollar', 'Comisión'], ['h24', 'Soporte 24/7'], ['secure', 'Seguro y Confiable']])}`)]),
  testimonios()
]);

// ---------- Envía Nacionalmente ----------
const ENVIOS = page('envios', [
  C(FULL, [H(`<section class="fb fb-hero"><div class="in"><div class="tx"><h1>¡Nos encargamos de tus envíos, de principio a fin!</h1><p>Te ofrecemos un servicio de logística completo. Desde empacar hasta entregar, cuidamos cada detalle para que enviar sea cómodo y seguro.</p><p style="margin-top:12px">Nuestro equipo se adapta a lo que necesitas para que tus paquetes lleguen a donde los necesites, en buenas manos.</p></div><div class="fb-blob"><img src="${U(51)}" alt="Cliente recibiendo su compra"></div></div>
<div class="fb-carriers fb-wrap" style="max-width:1150px;margin:0 auto"><span>FedEx</span><span>DHL</span><span>Estafeta</span><span>UPS</span><span>99 minutos</span></div></section>`)]),
  C({ padding: px(90, 15, 60, 15) }, [H(`<div class="fb fb-split"><div class="fb-oc"><h2>Así cuidamos<br>cada envío</h2><p>Ajustamos nuestras soluciones a lo que tu negocio necesita, para que cada entrega ayude a crecer y deje contentos a tus clientes. Tu logística queda en manos expertas.</p></div>
${CHECKS(['Recibimos tu paquete en tienda y lo revisamos para que llegue en perfecto estado.', 'Generamos tu guía de envío en tienda o en línea, como te resulte más cómodo.', 'Recolectamos tu pedido y lo preparamos con cuidado para un envío seguro.', 'Tu paquete llega seguro a su destino, cuidado en cada paso del camino.'])}</div>`)]),
  C({ padding: px(0, 15, 70, 15) }, [H(`<div class="fb fb-center"><a class="fb-cta" href="#" style="margin:40px 0 70px">¡Quiero enviar!</a></div>${FEATS([['truck', 'Envíos nacionales'], ['dollar', 'Ahorra costos'], ['h24', 'Soporte 24/7'], ['secure', 'Entrega segura']])}`)]),
  testimonios()
]);

// ---------- ¡Síguenos en redes! ----------
const grid = [[31, 0], [22, 1], [54, 0], [37, 1], [36, 0], [60, 1]];
const posts = [
  ['hace 7 horas', 'Dile adiós a los recipientes manchados y deformados. Guarda, calienta y sirve tus alimentos con nuestro set de tazas de cerámica.\n\nPídelo en 3 pasos:\n1. Entra a la tienda\n2. Busca el producto\n3. ¡Ordénalo hoy!', 31, 'Video'],
  ['hace 2 días', 'Arma tu outfit con estilo: bolsas, lentes y accesorios que combinan con todo. Descubre las novedades de moda en nuestra tienda.', 36, 'Foto'],
  ['hace 4 días', 'Tu rutina de cuidado personal, completa. Cremas, sérums y maquillaje a precios increíbles.\n\n¿Cómo pedir el tuyo?\n1. Visita nuestra tienda\n2. Busca tu producto\n3. Ordena y aprovecha el envío', 25, 'Video']
];
const REDES = page('redes', [
  C({ padding: px(0, 15, 80, 15) }, [H(`${BC('Redes')}<div class="fb fb-redes"><h1>¡Síguenos en nuestras redes!</h1>
<div class="fb-social"><div class="fb-ig"><div class="pf"><div class="av">fby</div><h3>freeby.mx</h3><p>Productos a precios reales. Compras en línea fácil y rápido. Apoyamos a comerciantes locales. Descubre lo nuevo en la tienda.</p></div>
<div class="gr">${grid.map(([id, v]) => `<a href="#"><img src="${U(id)}" alt="" loading="lazy">${v ? `<span class="pl">${I(IC.play)}</span>` : ''}</a>`).join('')}</div></div>
<div class="fb-tk"><span class="tag">TikTok · @freeby</span><div class="vid"><img src="${U(62)}" alt="" loading="lazy"><i>${I(IC.play)}</i></div><div class="cap">Compra, vende y envía con nosotros 🛍️</div></div></div>
<div class="fb-fbw"><div class="fb-cover"><img src="${U(51)}" alt=""></div><div class="fb-pg"><div class="av">fby</div><div><b>freeby.mx</b><small>Compra, vende y envía con nosotros: tus productos favoritos a precios que no imaginabas.</small></div></div>
<div class="fb-posts">${posts.map(p => `<div class="fb-post"><div class="h"><i>fby</i><div><b>freeby.mx</b><small>${p[0]}</small></div></div>${p[1].replace(/\n/g, '<br>')}<img src="${U(p[2])}" alt="" loading="lazy"><div class="m">${I(p[3] === 'Video' ? IC.video : IC.image)}${p[3]}</div></div>`).join('')}</div></div></div>`)])
]);

// ---------- Marketplace ----------
const MARKET = page('market', [
  C(FULL, [H(`<div class="fb-wrap" style="max-width:1150px;margin:0 auto;padding:0 15px">${BC('Marketplace')}</div><section class="fb fb-hero lila" style="margin-top:18px"><div class="in"><div class="tx"><h1>Tu tienda en grandes marketplace</h1><p>Lleva tu negocio a millones de compradores. Te ayudamos a publicar tus productos en los marketplaces más grandes, como Mercado Libre y Facebook. Nosotros nos encargamos del proceso para que tú te concentres en vender. ¡Empieza hoy y haz crecer tu marca!</p></div><div class="fb-blob"><img src="${U(64)}" alt="Persona revisando su tienda en línea"></div></div></section>`)]),
  C({ padding: px(70, 15, 80, 15) }, [H(`<div class="fb fb-mk"><a href="#"><h3>Mercado Libre</h3><div class="t" style="background:#ffe600;color:#2d3277">${I(IC.bag)}<span>Tienda oficial</span></div></a><a href="#"><h3>Facebook</h3><div class="t" style="background:#1877f2;color:#fff">${I(IC.store)}<span>Marketplace</span></div></a></div>`)])
]);

// ---------- Tienda ----------
const TIENDA = page('tienda', [
  C({ padding: px(0, 15, 80, 15) }, [H(`${BC('Tienda')}<div class="fb fb-shop" id="fb-shop-cats"><h1>Buscar por categorías</h1><div class="fb-car"><div class="vp fb-cats">${CATS.map(c => `<a href="${B}/categoria-producto/${c.slug}/"><div class="im"><img src="${c.img || ''}" alt="${c.name}" loading="lazy"></div><h3>${c.name}</h3><span>${c.count} ${c.count === 1 ? 'producto' : 'productos'}</span></a>`).join('')}</div></div></div>
<div style="height:40px"></div><div class="fb fb-shopbar"><button class="on" data-v="grid" aria-label="Cuadrícula">${I(IC.grid)}</button><button data-v="list" aria-label="Lista">${I(IC.list)}</button></div>
<script>(function(){function init(){var b=document.querySelectorAll('.fb-shopbar button');b.forEach(function(x){x.onclick=function(){b.forEach(function(y){y.classList.remove('on')});x.classList.add('on');document.querySelectorAll('.fb-shop-grid').forEach(function(s){s.classList.toggle('list',x.dataset.v==='list')})}});
document.querySelectorAll('.fb-car').forEach(function(c){if(c.dataset.ok)return;var vp=c.querySelector('.vp');if(!vp)return;c.dataset.ok=1;c.insertAdjacentHTML('beforeend','<button class="fb-arr l" aria-label="Anterior"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button><button class="fb-arr r" aria-label="Siguiente"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>');c.querySelector('.fb-arr.l').onclick=function(){vp.scrollLeft-=vp.clientWidth/2};c.querySelector('.fb-arr.r').onclick=function(){vp.scrollLeft+=vp.clientWidth/2}})}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init)})();</script>`),
    C({ ...FULL, css_classes: 'fb fb-gray fb-shop fb-shop-grid' }, [SC('[products limit="24" columns="6" paginate="true" orderby="date" order="DESC"]')], true)])
]);

const P = JSON.parse(localStorage.getItem('FB_PAGEIDS'));
localStorage.setItem('FB_PAGES', JSON.stringify({ [P.vender]: VENDER, [P.envios]: ENVIOS, [P.redes]: REDES, [P.market]: MARKET, [P.tienda]: TIENDA }));
return 'ok ' + Object.keys(JSON.parse(localStorage.getItem('FB_PAGES'))).join(',');
})();
