// Freeby Réplica — página de inicio v2 (Elementor)
// Lee FB_DATA de localStorage ({MEDIA, CATS, POSTS, KIT}) y guarda FB_CONTENT (JSON de Elementor).
(() => {
const D = JSON.parse(localStorage.getItem('FB_DATA'));
const { MEDIA, CATS, POSTS, KIT } = D;
const B = 'http://localhost/freeby-replica';
const U = id => MEDIA[id];
const rid = () => Math.random().toString(16).slice(2, 9);
const px = (t, r, b, l) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
const W = (type, settings) => ({ id: rid(), elType: 'widget', widgetType: type, settings, elements: [] });
const C = (settings, elements, inner = false) => ({
  id: rid(), elType: 'container', isInner: inner,
  settings: Object.assign({ content_width: 'boxed', boxed_width: { unit: 'px', size: 1150, sizes: [] }, flex_direction: 'column', padding: px(0, 15, 0, 15), flex_gap: { unit: 'px', size: 0, column: '0', row: '0' } }, settings),
  elements
});
const H = html => W('html', { html });
const SC = sc => W('shortcode', { shortcode: sc });
const HEAD = title => W('heading', {
  title, header_size: 'h2', title_color: '#222529',
  typography_typography: 'custom', typography_font_family: 'Lexend',
  typography_font_size: { unit: 'px', size: 32, sizes: [] }, typography_font_weight: '700',
  typography_line_height: { unit: 'em', size: 1, sizes: [] },
  _margin: px(0, 0, 33, 0)
});
const SEC = (elements, top = 60, bottom = 20, extra = {}) => C(Object.assign({ padding: px(top, 15, bottom, 15) }, extra), elements);
const FULL = { content_width: 'full', padding: px(0, 0, 0, 0) };

// ---------- Iconos de línea (SVG propios, sin emojis) ----------
const I = (d, s = 24, sw = 1.6) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  box: '<path d="M21 7.5 12 3 3 7.5v9L12 21l9-4.5z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9M7.5 5.2l9 4.6"/>',
  bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/>',
  truck: '<path d="M2 5h12v10H2zM14 9h4l3 3.5V15h-7z"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/><path d="M1 8h4M1 11h3"/>',
  dollar: '<circle cx="12" cy="12" r="9.5"/><path d="M14.8 9.3c-.4-.9-1.4-1.5-2.8-1.5-1.6 0-2.7.8-2.7 1.9 0 2.6 5.6 1.4 5.6 4.2 0 1.1-1.2 2-2.9 2-1.4 0-2.5-.6-2.9-1.6M12 6.2v1.6M12 16v1.7"/>',
  h24: '<path d="M20.5 12A8.5 8.5 0 1 1 18 6"/><path d="M20.5 3.5V7H17"/><text x="12" y="15" text-anchor="middle" font-family="Poppins,sans-serif" font-size="7.5" font-weight="700" fill="currentColor" stroke="none">24</text>',
  secure: '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3M3 15h18M10 18h4"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  up: '<path d="m18 15-6-6-6 6"/>'
};

// ---------- CSS global de la página ----------
const CSS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--o:#FFA500;--d:#222529;--g:#777;--l:#F4F4F4;--lav:#F1F2FE}
body{font-family:Poppins,sans-serif;color:var(--g);background:#fff;font-size:14px}
.fb a{text-decoration:none}
.fb svg{display:block}
.fb-wrap{max-width:1150px;margin:0 auto;padding:0 15px}
/* Barra superior */
.fb-top{border-bottom:1px solid #ececec}
.fb-top .fb-wrap{display:flex;align-items:center;justify-content:space-between;height:48px}
.fb-top .l{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--g)}
.fb-pill{background:#e3343f;color:#fff;border-radius:20px;padding:3px 11px;font-size:11px;font-weight:700;letter-spacing:.3px}
.fb-contact{display:flex;align-items:center;border:1px solid var(--o);border-radius:30px;height:30px;padding-left:12px;gap:8px;color:var(--d);font-weight:600;font-size:14px}
.fb-contact svg{width:17px;height:17px}
.fb-contact .wa{background:var(--o);color:#fff;border-radius:30px;height:30px;display:flex;align-items:center;padding:0 16px;font-size:12px;font-weight:600;margin-right:-1px}
/* Header */
.fb-header .fb-wrap{display:flex;align-items:center;height:110px}
.fb-logo{display:flex;align-items:flex-end;gap:4px;font-family:Lexend;font-weight:700;font-size:40px;color:#111;letter-spacing:-1.5px;line-height:1;margin-left:75px}
.fb-logo .bag{position:relative;width:38px;height:36px;background:var(--o);border-radius:6px 6px 9px 9px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:3px;font-size:14px;letter-spacing:-.5px;color:#111;margin-bottom:2px}
.fb-logo .bag:before{content:"";position:absolute;top:-9px;left:50%;transform:translateX(-50%);width:18px;height:14px;border:3px solid #111;border-bottom:0;border-radius:10px 10px 0 0}
.fb-logo .bag:after{content:"";position:absolute;top:9px;left:9px;width:20px;height:6px;border-bottom:3px solid #111;border-radius:0 0 12px 12px}
.fb-search{margin-left:115px;width:347px;height:50px;display:flex;align-items:center;border:1px solid #e7e7e7;border-radius:25px;background:#fff}
.fb-search input{border:0!important;flex:1;height:48px;padding:0 15px 0 20px!important;font-size:13px;color:#555;outline:0;background:transparent!important;box-shadow:none!important;font-family:Poppins}
.fb-search input::placeholder{color:#b4b4b4}
.fb-search button{border:0;background:none;padding:0 20px 0 10px;cursor:pointer;color:var(--d)}
.fb-search button svg{width:21px;height:21px}
.fb-hl{margin-left:auto;display:flex;align-items:center;gap:20px}
.fb-hl a{color:var(--d);display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600}
.fb-hl .ib{width:40px;height:40px;border-radius:8px;background:var(--lav);display:flex;align-items:center;justify-content:center}
.fb-hl .ib svg{width:23px;height:23px}
.fb-hl a.cart{width:70px;height:70px;border-radius:8px;background:var(--lav);justify-content:center;position:relative}
.fb-hl a.cart svg{width:30px;height:30px}
.fb-hl a.cart b{position:absolute;top:12px;right:13px;background:var(--o);color:#fff;border-radius:50%;width:18px;height:18px;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:600}
/* Menú */
.fb-nav .fb-wrap{display:flex;justify-content:space-between}
.fb-nav a{font-family:Lexend;font-weight:600;font-size:18px;color:var(--d);padding:7px 0 20px}
.fb-nav a:hover{color:var(--o)}
/* Slider */
.fb-slider{position:relative;height:572px}
.fb-track{display:flex;gap:20px;height:100%;transition:transform .7s ease}
.fb-vp{overflow:hidden;height:100%;border-radius:10px}
.fb-slide{flex:0 0 87%;height:100%;border-radius:10px;position:relative;overflow:hidden;background:radial-gradient(circle at 62% 42%,#ffb24d 0%,#ffd39b 22%,#fbe9d6 45%,#f6f4f2 70%)}
.fb-slide .txt{position:absolute;left:115px;top:150px;max-width:420px;z-index:2}
.fb-slide .dots{position:absolute;left:0;top:105px;width:115px;height:25px;background-image:radial-gradient(#333 1.6px,transparent 1.7px);background-size:11px 11px;opacity:.75}
.fb-slide .dots2{position:absolute;left:62px;top:190px;width:11px;height:90px;background-image:radial-gradient(#333 1.6px,transparent 1.7px);background-size:11px 11px;opacity:.75}
.fb-slide h2{font-family:Lexend;font-size:52px;line-height:1.03;color:var(--d);margin:0 0 18px;font-weight:700}
.fb-slide p{font-size:16.8px;font-weight:500;margin:0 0 22px;color:var(--g)}
.fb-slide img{position:absolute;right:120px;top:50%;transform:translateY(-50%);height:470px;width:420px;object-fit:contain;mix-blend-mode:multiply}
.fb-btn{display:inline-block;background:var(--o);color:#fff!important;font-weight:600;border-radius:37px;padding:13px 35px;font-size:18.5px;border:1px solid var(--o)}
.fb-btn:hover{background:#ff9100}
.fb-arr{position:absolute;top:50%;transform:translateY(-50%);z-index:5;width:50px;height:50px;border-radius:50%;background:#fff;border:0;color:var(--o);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(0,0,0,.08);padding:0}
.fb-arr svg{width:22px;height:22px;stroke-width:2.4}
.fb-arr.l{left:-25px}.fb-arr.r{right:-25px}
/* Beneficios */
.fb-ben{display:flex;justify-content:space-around;align-items:center;height:80px;border-bottom:1px solid #ececec}
.fb-ben div{display:flex;align-items:center;gap:8px;font-family:Lexend;font-weight:700;font-size:20px;color:var(--d)}
.fb-ben svg{width:40px;height:40px;color:var(--o);stroke-width:1.5}
/* Carruseles genéricos */
.fb-car{position:relative}
.fb-car .vp{overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none}
.fb-car .vp::-webkit-scrollbar{display:none}
.fb-car .fb-arr{width:40px;height:40px;box-shadow:0 0 0 1px #ececec}
.fb-car .fb-arr svg{width:18px;height:18px;stroke:#222;stroke-width:2}
.fb-car .fb-arr.l{left:-22px}.fb-car .fb-arr.r{right:-22px}
/* Categorías */
.fb-cats{display:flex;gap:20px}
.fb-cats a{flex:0 0 170px;text-align:center}
.fb-cats .im{width:170px;height:170px;border-radius:10px;overflow:hidden;margin-bottom:17px}
.fb-cats img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.fb-cats a:hover img{transform:scale(1.08)}
.fb-cats h3{font-family:Lexend;font-size:18px;font-weight:700;color:var(--d);margin:0;line-height:1.2}
.fb-cats span{font-size:14px;color:var(--g)}
/* Encabezado ofertas */
.fb-oh{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px}
.fb-oh h2{font-family:Lexend;font-size:32px;font-weight:700;color:var(--d);margin:0;line-height:1}
.fb-cd{display:flex;align-items:center;gap:13px;font-family:Lexend;font-weight:500;color:var(--d);font-size:20px}
.fb-cd .u{background:#f4f4f4;border-radius:6px;width:80px;height:60px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Lexend;font-weight:700;font-size:28px;line-height:1}
.fb-cd .u small{font-size:10px;color:var(--g);font-family:Poppins;font-weight:400;text-transform:uppercase;margin-top:3px}
.fb-cd .sep{font-weight:700;font-size:24px}
/* Tarjetas de producto (WooCommerce + Astra) */
.fb ul.products{margin:0!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;padding:0!important}
.fb ul.products:before,.fb ul.products:after{display:none!important}
.fb ul.products li.product{width:auto!important;margin:0!important;float:none!important;text-align:center;padding:0!important}
.fb li.product .astra-shop-thumbnail-wrap{border-radius:0;overflow:hidden;margin-bottom:0}
.fb li.product img{width:100%!important;aspect-ratio:1;object-fit:cover;margin:0!important;display:block}
.fb li.product .astra-shop-summary-wrap{padding:14px 0 0!important}
.fb .ast-woo-product-category{display:block;font-size:10px!important;text-transform:uppercase;color:var(--g)!important;margin-bottom:3px!important;line-height:1.6!important;opacity:1!important}
.fb .woocommerce-loop-product__title{font-family:Lexend!important;font-size:15px!important;font-weight:500!important;color:var(--d)!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0 0 8px!important;line-height:1.3!important}
.fb li.product .price{color:#444!important;font-weight:600!important;font-size:18px!important;font-family:Poppins;margin:0 0 10px!important;display:block}
.fb li.product .price del{display:none}
.fb li.product .price ins{text-decoration:none;font-weight:600}
.fb .woocommerce-Price-currencySymbol:before{content:"MXN "}
.fb li.product .ast-on-card-button,.fb li.product .ast-onsale-card,.fb li.product .onsale,.fb .ast-quick-view-trigger{display:none!important}
.fb li.product .button{display:inline-flex!important;align-items:center;gap:6px;background:#fff!important;color:#333!important;border:1px solid #ddd!important;font-size:12px!important;font-weight:600!important;text-transform:uppercase;border-radius:0!important;height:36px;padding:0 10px!important;line-height:1!important;font-family:Poppins}
.fb li.product .button:before{content:"";width:16px;height:16px;background:currentColor;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 8h14l-1 13H6z'/%3E%3Cpath d='M9 11V7a3 3 0 0 1 6 0v4'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 8h14l-1 13H6z'/%3E%3Cpath d='M9 11V7a3 3 0 0 1 6 0v4'/%3E%3C/svg%3E") center/contain no-repeat}
.fb li.product .button:hover{background:var(--o)!important;border-color:var(--o)!important;color:#fff!important}
.fb li.product .added_to_cart{display:block;font-size:11px;margin-top:6px;color:var(--o)}
/* Variante tarjeta gris (ofertas y paquetes) */
.fb-gray li.product{background:var(--l);border-radius:10px;padding:8px 9px 10px!important}
.fb-gray li.product .astra-shop-thumbnail-wrap{background:linear-gradient(180deg,#fff 0%,#fff 30%,#ffd9a8 70%,#ff9b2f 100%);border:1px solid #f4f4f4}
.fb-gray li.product img{mix-blend-mode:multiply}
.fb-gray li.product .astra-shop-summary-wrap{padding:16px 20px 6px!important}
.fb-gray li.product .button,.fb-gray li.product .added_to_cart{display:none!important}
.fb-gray li.product .price{margin:4px 0 0!important}
.fb-offers ul.products{display:flex!important;gap:20px}
.fb-offers ul.products li.product{flex:0 0 calc((100% - 60px)/4)}
/* Variante tarjeta blanca (destacados) */
.fb-white li.product{padding:0 0 10px!important}
.fb-white li.product .astra-shop-thumbnail-wrap{border:1px solid #f4f4f4}
/* Banners */
.fb-banners{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.fb-banner{position:relative;height:278px;border-radius:10px;overflow:hidden;display:flex;align-items:center;padding:0 41px;background:radial-gradient(ellipse at 0% 100%,#ff6a00 0%,rgba(255,106,0,0) 45%),linear-gradient(105deg,#ff8000 0%,#ffa500 32%,#ffd9a8 60%,#f1f1f1 78%,#f3f3f3 100%)}
.fb-banner img{position:absolute;right:40px;top:50%;transform:translateY(-50%);width:230px;height:230px;object-fit:contain;mix-blend-mode:multiply}
.fb-banner div{position:relative;z-index:1}
.fb-banner h3{font-family:Lexend;color:#fff;font-size:36px;line-height:1.25;margin:0 0 18px;font-weight:600}
.fb-banner a{display:inline-block;background:var(--o);border:1px solid #fff;color:#fff;border-radius:30px;padding:11px 31px;font-size:15px;font-weight:600}
.fb-banner a:hover{background:#fff;color:var(--o)}
/* Cinta */
.fb-mq{background:var(--o);overflow:hidden;white-space:nowrap;height:70px;display:flex;align-items:center}
.fb-mq div{display:inline-block;animation:fbm 35s linear infinite;font-family:Lexend;font-weight:700;font-size:26px;color:#fff;text-transform:none}
@keyframes fbm{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* Pestañas */
.fb-th{display:flex;justify-content:space-between;align-items:center;margin-bottom:33px}
.fb-th h2{font-family:Lexend;font-size:32px;font-weight:700;color:var(--d);margin:0;line-height:1}
.fb-tabs{display:flex;gap:10px}
.fb-tabs button{border:1px solid #e7e7e7;background:#fff;border-radius:20px;padding:5px 19px;height:35px;font-size:14px;font-weight:600;text-transform:uppercase;cursor:pointer;color:var(--d);font-family:Poppins}
.fb-tabs button.on,.fb-tabs button:hover{background:var(--o);border-color:var(--o);color:#fff}
.fb-pane{display:none!important}.fb-pane.on{display:flex!important}
.fb-more{display:flex;align-items:center;justify-content:center;height:45px;border:1px solid var(--o);border-radius:30px;font-size:12px;font-weight:600;color:var(--o)!important;text-transform:uppercase;margin-top:25px;transition:.2s}
.fb-more:hover{background:var(--o);color:#fff!important}
/* Paquetes */
.fb-pack{position:relative;overflow:hidden;background:#ff8a00;border-radius:10px;padding:30px 20px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;height:460px}
.fb-pack:before{content:"";position:absolute;inset:-40%;background:repeating-radial-gradient(circle at 30% 120%,rgba(255,255,255,.07) 0 40px,rgba(255,255,255,0) 40px 80px)}
.fb-pack h3{position:relative;color:#fff;font-family:Lexend;font-size:32px;line-height:1.25;margin:0 0 26px;font-weight:700}
.fb-pack a{position:relative;background:#000;color:#fff;border-radius:30px;padding:14px 41px;font-weight:600;font-size:16px}
.fb-pack-r{flex:1}
.fb-pack-r ul.products{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.fb-addkit{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--o);color:#fff!important;border-radius:30px;height:57px;font-weight:600;font-size:16px;width:600px;margin:28px auto 0;transition:.2s}
.fb-addkit:hover{background:#ff9100}
.fb-addkit svg{width:24px;height:24px}
/* Blog */
.fb-hr{border-top:1px solid #ececec}
.fb-news{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.fb-news a{background:var(--l);border-radius:10px;padding:8px 9px 10px;display:block}
.fb-news img{width:100%!important;height:165px!important;object-fit:cover;display:block}
.fb-news h3{font-family:Lexend;font-size:15px;font-weight:500;color:var(--d);text-align:center;margin:22px 20px 18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* Testimonios */
.fb-testi{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;padding:0 15px}
.fb-testi .c{border:1px solid #d9d9d9;border-radius:12px;padding:52px 20px 20px;text-align:center;position:relative;margin-top:30px}
.fb-av{position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:60px;height:60px;border-radius:50%;color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;font-family:Poppins}
.fb-testi h4{font-size:15px;color:#000;margin:0;font-weight:600;font-family:Poppins}
.fb-testi small{font-size:13px;color:#555}
.fb-stars{color:#f6bb06;font-size:20px;letter-spacing:1px;margin:6px 0 8px;line-height:1}
.fb-testi p{font-size:15px;color:#000;margin:0 0 8px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.fb-testi .more{font-size:13px;color:#888}
/* Footer */
.fb-foot{padding:70px 0 0}
.fb-foot .cols{display:grid;grid-template-columns:375px 1fr 1fr 1.6fr;gap:20px}
.fb-foot .logo{margin:0 0 20px}
.fb-foot .logo .fb-logo{margin-left:35px}
.fb-foot h4{font-family:Lexend;color:var(--d);font-size:20px;margin:0 0 18px;font-weight:600;line-height:1}
.fb-foot ul{list-style:none;margin:0;padding:0}.fb-foot li{margin-bottom:8px;font-size:14px;font-weight:500;line-height:1.7}
.fb-foot li a{color:#555}.fb-foot li a:hover{color:var(--o)}
.fb-foot p{font-size:14px;font-weight:500;margin:0 0 50px;line-height:1.1}
.fb-nf{display:flex;align-items:center;border:1px solid #e7e7e7;border-radius:30px;height:48px;padding:0 5px 0 0;margin:0 0 20px}
.fb-nf input{border:0!important;flex:1;font-size:13px;padding:0 15px!important;outline:0;background:transparent!important;box-shadow:none!important;min-width:0;height:46px;font-family:Poppins}
.fb-nf button{background:#222529;color:#fff;border:0;border-radius:30px;height:36px;padding:0 15px;font-size:12px;font-weight:600;cursor:pointer;font-family:Poppins}
.fb-foot .legal{font-size:13px;line-height:1.9;margin:0}
.fb-foot .legal a{color:var(--d);border-bottom:1px solid var(--d)}
.fb-bot{display:flex;justify-content:space-between;align-items:center;padding:45px 0 30px;font-size:13px}
.fb-pay{display:flex;gap:10px;align-items:center}
.fb-pay span{border-radius:4px;padding:4px 9px;font-size:11px;font-weight:800;font-family:Poppins}
/* Ir arriba */
.fb-totop{position:fixed;left:20px;bottom:20px;z-index:99;width:48px;height:48px;background:#404040;color:#fff;display:flex;align-items:center;justify-content:center;opacity:.75;border-radius:3px}
.fb-totop svg{width:20px;height:20px}
/* Responsive */
@media (max-width:1180px){.fb-logo{margin-left:0}.fb-search{margin-left:30px}.fb-slide .txt{left:60px}.fb-slide img{right:30px;width:360px}}
@media (max-width:1024px){.fb-hl .t{display:none}.fb ul.products{grid-template-columns:repeat(3,minmax(0,1fr))}.fb-offers ul.products li.product{flex-basis:calc((100% - 40px)/3)}.fb-news{grid-template-columns:repeat(2,1fr)}.fb-foot .cols{grid-template-columns:1fr 1fr}.fb-addkit{width:100%}.fb-pack-r ul.products{grid-template-columns:1fr 1fr!important}}
@media (max-width:767px){
.fb-top .fb-wrap{height:auto;padding:8px 15px;flex-direction:column;gap:6px}
.fb-header .fb-wrap{flex-wrap:wrap;height:auto;padding:12px 15px;gap:12px}
.fb-logo{font-size:30px}
.fb-search{order:3;width:100%;margin:0}
.fb-hl{gap:8px}.fb-hl a.cart{width:50px;height:50px}
.fb-nav .fb-wrap{overflow-x:auto;gap:24px}.fb-nav a{font-size:15px;white-space:nowrap}
.fb-slider{height:470px}.fb-slide{flex-basis:100%}.fb-slide .txt{left:25px;right:25px;top:30px}.fb-slide h2{font-size:34px}.fb-slide img{width:70%;height:230px;right:15%;top:auto;bottom:10px;transform:none}.fb-slide .dots,.fb-slide .dots2{display:none}.fb-arr.l{left:5px}.fb-arr.r{right:5px}
.fb-ben{height:auto;flex-wrap:wrap;padding:12px 0}.fb-ben div{flex:0 0 50%;font-size:15px;padding:8px 0}.fb-ben svg{width:30px;height:30px}
.fb-cats a{flex-basis:140px}.fb-cats .im{width:140px;height:140px}.fb-cats h3{font-size:15px}
.fb-oh{flex-direction:column;align-items:flex-start;gap:12px}.fb-cd{font-size:14px;gap:6px}.fb-cd .u{width:52px;height:46px;font-size:20px}
.fb ul.products{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.fb-offers ul.products li.product{flex-basis:calc((100% - 20px)/2)}
.fb-banners,.fb-testi{grid-template-columns:1fr}.fb-banner{padding:0 25px}.fb-banner h3{font-size:28px}.fb-banner img{width:150px;height:150px;right:10px}
.fb-th{flex-direction:column;align-items:flex-start;gap:14px}
.fb-pack{height:300px}.fb-pack-r ul.products{grid-template-columns:1fr 1fr!important}
.fb-news{grid-template-columns:1fr 1fr;gap:12px}
.fb-foot .cols{grid-template-columns:1fr}.fb-bot{flex-direction:column;gap:12px}
}
</style>`;

// ---------- Barra superior + header + menú ----------
const TOP = `${CSS}
<div class="fb fb-top"><div class="fb-wrap">
 <div class="l"><span class="fb-pill">👀 OJITO...</span>Envio GRATIS en compras mayores a $999</div>
 <div class="fb-contact">${I(IC.phone)}55 0000 0000<a class="wa" href="#">Escríbenos</a></div>
</div></div>
<div class="fb fb-header"><div class="fb-wrap">
 <a class="fb-logo" href="${B}/"><span class="bag">fby</span>freeby</a>
 <form class="fb-search" action="${B}/" method="get" role="search"><input type="search" name="s" placeholder="Buscar productos..." aria-label="Buscar productos"><input type="hidden" name="post_type" value="product"><button type="submit" aria-label="Buscar">${I(IC.search)}</button></form>
 <div class="fb-hl">
  <a href="${B}/lista-de-deseos/"><span class="ib">${I(IC.heart)}</span><span class="t">Lista de deseos</span></a>
  <a href="${B}/rastrear-pedido/"><span class="ib">${I(IC.box)}</span><span class="t">Rastrear Pedido</span></a>
  <a class="cart" href="${B}/carrito/" aria-label="Carrito">${I(IC.bag)}<b id="fb-cc">0</b></a>
 </div>
</div></div>
<nav class="fb fb-nav"><div class="fb-wrap">
 <a href="${B}/tienda/">Tienda</a><a href="${B}/quieres-vender/">¿Quieres Vender?</a><a href="${B}/envios/">Envía Nacionalmente</a><a href="${B}/redes/">¡Síguenos En Redes!</a><a href="${B}/marketplaces/">Marketplace</a>
</div></nav>
<script>fetch('${B}/wp-json/wc/store/v1/cart',{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(c){var e=document.getElementById('fb-cc');if(e)e.textContent=c.items_count||0}).catch(function(){});</script>`;

// ---------- Slider (con vista previa del siguiente, como Freeby) ----------
const slides = [['Ofertas que vuelan', 'Pagos seguros y envíos confiables.', 59], ['Tu momento de comprar', 'Tu próxima fragancia está aquí', 56], ['Precios imperdibles', 'El mejor cuidado personal aquí.', 54]];
const SLIDER = `<div class="fb fb-slider" id="fb-slider"><div class="fb-vp"><div class="fb-track">
${slides.map(s => `<div class="fb-slide"><span class="dots"></span><span class="dots2"></span><div class="txt"><h2>${(w => w.length === 2 ? w.join('<br>') : w.slice(0, 2).join(' ') + '<br>' + w.slice(2).join(' '))(s[0].split(' '))}</h2><p>${s[1]}</p><a class="fb-btn" href="${B}/tienda/">Comprar</a></div><img src="${U(s[2])}" alt=""></div>`).join('')}
</div></div>
<button class="fb-arr l" aria-label="Anterior">${I(IC.left)}</button><button class="fb-arr r" aria-label="Siguiente">${I(IC.right)}</button></div>
<script>(function(){var r=document.getElementById('fb-slider');if(!r)return;var t=r.querySelector('.fb-track'),s=t.children,i=0;
function go(n){i=(n+s.length)%s.length;t.style.transform='translateX(-'+(s[i].offsetLeft)+'px)'}
r.querySelector('.l').onclick=function(){go(i-1)};r.querySelector('.r').onclick=function(){go(i+1)};setInterval(function(){go(i+1)},6000)})();</script>`;

// ---------- Beneficios ----------
const BEN = `<div class="fb fb-ben"><div>${I(IC.truck)}Envío nacional</div><div>${I(IC.dollar)}Compra rápida</div><div>${I(IC.h24)}Tienda 24/7</div><div>${I(IC.secure)}Pago seguro</div></div>`;

// ---------- Script para carruseles con flechas ----------
const CAR_JS = `<script>(function(){function init(){document.querySelectorAll('.fb-car').forEach(function(c){if(c.dataset.ok)return;c.dataset.ok=1;var vp=c.querySelector('.vp')||c.querySelector('ul.products');if(!vp)return;
if(!c.querySelector('.fb-arr')){c.insertAdjacentHTML('beforeend','<button class="fb-arr l" aria-label="Anterior">${I(IC.left).replace(/"/g, "\\'")}</button><button class="fb-arr r" aria-label="Siguiente">${I(IC.right).replace(/"/g, "\\'")}</button>')}
vp.style.overflowX='auto';vp.style.scrollBehavior='smooth';vp.style.scrollbarWidth='none';
c.querySelector('.fb-arr.l').onclick=function(){vp.scrollLeft-=vp.clientWidth/2};c.querySelector('.fb-arr.r').onclick=function(){vp.scrollLeft+=vp.clientWidth/2}})}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);window.addEventListener('load',init)})();</script>`;

// ---------- Categorías ----------
const CATS_HTML = `<div class="fb fb-car"><div class="vp fb-cats">${CATS.map(c => `<a href="${B}/categoria-producto/${c.slug}/"><div class="im"><img src="${c.img || ''}" alt="${c.name}" loading="lazy"></div><h3>${c.name}</h3><span>${c.count} ${c.count === 1 ? 'producto' : 'productos'}</span></a>`).join('')}</div></div>${CAR_JS}`;

// ---------- Ofertas ----------
const OFF_HEAD = `<div class="fb fb-oh"><h2 id="fb-om">Ofertas del mes</h2>
<div class="fb-cd">Las ofertas terminan en: <div class="u"><span id="fb-d">00</span><small>Days</small></div><span class="sep">:</span><div class="u"><span id="fb-h">00</span><small>Hour</small></div><span class="sep">:</span><div class="u"><span id="fb-m">00</span><small>Min</small></div><span class="sep">:</span><div class="u"><span id="fb-s">00</span><small>Sec</small></div></div></div>
<script>(function(){var n=new Date(),m=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];document.getElementById('fb-om').textContent='Ofertas de '+m[n.getMonth()];
var end=new Date(n.getFullYear(),n.getMonth()+1,1);function p(x){return String(x).padStart(2,'0')}function t(){var d=Math.max(0,end-new Date());document.getElementById('fb-d').textContent=p(Math.floor(d/864e5));document.getElementById('fb-h').textContent=p(Math.floor(d/36e5)%24);document.getElementById('fb-m').textContent=p(Math.floor(d/6e4)%60);document.getElementById('fb-s').textContent=p(Math.floor(d/1e3)%60)}t();setInterval(t,1000)})();</script>`;

// ---------- Banners ----------
const BANNERS = `<div class="fb fb-banners">
<div class="fb-banner"><img src="${U(27)}" alt=""><div><h3>Belleza &amp;<br>Skincare</h3><a href="${B}/categoria-producto/salud-y-cuidado-personal/">Comprar Ahora</a></div></div>
<div class="fb-banner"><img src="${U(38)}" alt=""><div><h3>Calidad<br>Absoluta</h3><a href="${B}/categoria-producto/hogar-cocina-y-jardin/">Ver más</a></div></div>
</div>`;

// ---------- Cinta ----------
const t = 'Sin Mínimo de compra - Envío gratis en pedidos de $999 - Envíos nacionales - Vende con nosotros - Compra fácil - ';
const MQ = `<div class="fb fb-mq"><div>${t.repeat(6)}</div></div>`;

// ---------- Destacados ----------
const TABS = `<div class="fb fb-th"><h2>Productos destacados</h2><div class="fb-tabs" id="fb-tabs"><button class="on" data-t="hogar">Hogar</button><button data-t="belleza">Belleza</button><button data-t="moda">Moda</button></div></div>
<script>(function(){function init(){var b=document.querySelectorAll('#fb-tabs button');b.forEach(function(x){x.onclick=function(){b.forEach(function(y){y.classList.remove('on')});x.classList.add('on');document.querySelectorAll('.fb-pane').forEach(function(p){p.classList.toggle('on',p.classList.contains('fb-pane-'+x.dataset.t))})}})}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init)})();</script>`;
const pane = (key, slug, on) => C({ css_classes: `fb fb-white fb-pane fb-pane-${key}${on ? ' on' : ''}`, ...FULL }, [SC(`[products category="${slug}" limit="4" columns="4" orderby="date"]`)], true);

// ---------- Paquetes ----------
const PACK = `<div class="fb fb-pack"><h3>Compra ya<br>y recibe en<br>la puerta de<br>tu casa</h3><a href="${B}/tienda/">Ver más</a></div>`;
const ADDKIT = `<a class="fb fb-addkit" href="${B}/?add-to-cart=${KIT}">${I(IC.bag)}Agregar al carrito</a>`;

// ---------- Blog ----------
const NEWS = `<div class="fb fb-news">${POSTS.map(p => `<a href="${p.l}"><img src="${p.img}" alt="" loading="lazy"><h3>${p.t}</h3></a>`).join('')}</div>`;

// ---------- Testimonios (de ejemplo) ----------
const testi = [['D', '#7b1fa2', 'Daniela M.', 'hace 1 mes', 'Me encantó la experiencia: la compra fue rápida y el paquete llegó en perfecto estado. ¡10 de 10!'], ['C', '#5b2ca0', 'Carlos R.', 'hace 2 meses', 'Muy buena atención por WhatsApp, resolvieron todas mis dudas y el envío llegó antes de lo esperado. El producto llegó bien protegido y tal cual la descripción.'], ['A', '#6b8494', 'Ana G.', 'hace 3 meses', 'Productos originales y a buen precio. Pedí desde la página web y el paquete llegó rápido. Sin duda volveré a comprar aquí.']];
const TESTI = `<div class="fb fb-car"><div class="vp"><div class="fb-testi">${testi.map(x => `<div class="c"><div class="fb-av" style="background:${x[1]}">${x[0]}</div><h4>${x[2]}</h4><small>${x[3]}</small><div class="fb-stars">★★★★★</div><p>${x[4]}</p><span class="more">Leer más</span></div>`).join('')}</div></div></div>`;

// ---------- Footer ----------
const F1 = `<div class="fb fb-foot-logo"><div class="logo"><a class="fb-logo" href="${B}/" style="margin-left:35px"><span class="bag">fby</span>freeby</a></div>
<p style="font-size:14px;font-weight:500;line-height:1.1;margin:0 0 50px">Calle Ejemplo #123, Col. Centro,<br>C.P. 42000 Pachuca de Soto Hidalgo.</p><p style="font-size:14px;font-weight:500;margin:0 0 25px">Escríbenos: 55 0000 0000</p></div>`;
const F2 = `<div class="fb fb-foot"><h4>Nosotros</h4><ul><li><a href="${B}/tienda/">Tienda</a></li><li><a href="${B}/quieres-vender/">¿Quieres Vender?</a></li><li><a href="${B}/envios/">Envia Nacionalmente</a></li><li><a href="${B}/redes/">¡Síguenos en redes!</a></li></ul></div>`;
const F3 = `<div class="fb fb-foot"><h4>Categorías</h4><ul><li><a href="${B}/categoria-producto/bebes-y-paternidad/">Bebés y Paternidad</a></li><li><a href="${B}/categoria-producto/deportes-y-ejercicio/">Deportes y Ejercicio</a></li><li><a href="${B}/categoria-producto/herramientas-y-mejoras-para-el-hogar/">Herramientas y Mejoras para el Hogar</a></li><li><a href="${B}/tienda/">Ver Todo</a></li></ul></div>`;
const F4 = `<div class="fb fb-foot"><h4>Suscribete para recibir ofertas</h4><form class="fb-nf" onsubmit="this.outerHTML='<p style=&quot;margin:0 0 20px;color:#222529;font-weight:600&quot;>¡Gracias por suscribirte!</p>';return false;"><input type="email" required placeholder="Correo Electronico..." aria-label="Correo"><button type="submit">Subscribete</button></form><p class="legal">Al suscribirte aceptas nuestros <a href="#">Terminos de uso</a> y <a href="#">Políticas de Privacidad.</a></p></div>`;
const FBOT = `<div class="fb fb-bot"><span>©${new Date().getFullYear()} Freeby Réplica - Proyecto de práctica.</span><div class="fb-pay"><span style="color:#1a1f71;font-style:italic;font-size:15px">VISA</span><span style="background:#f4f4f4;color:#333">Mastercard</span><span style="background:#e30613;color:#ffd200">OXXO</span><span style="background:#2e77bb;color:#fff">AMEX</span><span style="color:#009ee3;background:#eaf6fd">Mercado Pago</span><span style="background:#d6f2ff;color:#1d56a6;border-radius:20px">aplazo</span></div></div>
<a class="fb-totop" href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" aria-label="Ir arriba">${I(IC.up)}</a>`;

// Redes: widget nativo Social Icons de Elementor (iconos de marca de la biblioteca de Elementor)
const socialItem = (icon, url) => ({ _id: rid(), social_icon: { value: icon, library: 'fa-brands' }, link: { url, is_external: 'on', nofollow: '' } });
const SOCIAL_FOOT = W('social-icons', {
  social_icon_list: [socialItem('fab fa-facebook-f', '#'), socialItem('fab fa-instagram', '#'), socialItem('fab fa-whatsapp', '#'), socialItem('fab fa-tiktok', '#')],
  shape: 'circle', align: 'left', icon_color: 'custom', icon_primary_color: '#FFA500', icon_secondary_color: '#FFFFFF',
  icon_size: { unit: 'px', size: 13, sizes: [] }, icon_padding: { unit: 'em', size: 0.95, sizes: [] }, icon_spacing: { unit: 'px', size: 12, sizes: [] }
});
const SOCIAL_SIDE = W('social-icons', {
  social_icon_list: [socialItem('fab fa-tiktok', '#'), socialItem('fab fa-facebook-f', '#'), socialItem('fab fa-whatsapp', '#'), socialItem('fab fa-instagram', '#')],
  shape: 'square', columns: '1', align: 'center', icon_color: 'default',
  icon_size: { unit: 'px', size: 22, sizes: [] }, icon_padding: { unit: 'em', size: 0.6, sizes: [] }, icon_spacing: { unit: 'px', size: 2, sizes: [] }, rows_gap: { unit: 'px', size: 2, sizes: [] },
  _position: 'fixed', _element_width: 'initial', _element_custom_width: { unit: 'px', size: 48, sizes: [] },
  _offset_orientation_h: 'end', _offset_x_end: { unit: 'px', size: 0, sizes: [] }, _offset_y: { unit: 'vh', size: 37, sizes: [] }, _z_index: 99, hide_mobile: 'hidden-mobile'
});
const WA_FLOAT = W('icon', {
  selected_icon: { value: 'fab fa-whatsapp', library: 'fa-brands' }, view: 'stacked', shape: 'circle',
  primary_color: '#25D366', secondary_color: '#FFFFFF', size: { unit: 'px', size: 30, sizes: [] }, icon_padding: { unit: 'px', size: 14, sizes: [] },
  link: { url: '#', is_external: 'on', nofollow: '' },
  _position: 'fixed', _element_width: 'initial', _offset_orientation_h: 'end', _offset_x_end: { unit: 'px', size: 22, sizes: [] }, _offset_orientation_v: 'end', _offset_y_end: { unit: 'px', size: 22, sizes: [] }, _z_index: 99
});

// ---------- Ensamblado ----------
const content = [
  C(FULL, [H(TOP)]),
  C({ padding: px(0, 15, 0, 15) }, [H(SLIDER)]),
  C({ padding: px(0, 15, 0, 15) }, [H(BEN)]),
  SEC([HEAD('Buscar por categorías'), H(CATS_HTML)], 78, 30),
  SEC([H(OFF_HEAD), C({ css_classes: 'fb fb-gray fb-offers fb-car', ...FULL }, [SC('[products tag="oferta" limit="5" columns="5" orderby="date"]')], true)], 50, 20),
  SEC([HEAD('Compra sin complicaciones'), H(BANNERS)], 80, 0),
  C({ ...FULL, padding: px(60, 0, 0, 0) }, [H(MQ)]),
  SEC([H(TABS), pane('hogar', 'hogar-cocina-y-jardin', true), pane('belleza', 'salud-y-cuidado-personal'), pane('moda', 'moda-ropa-y-accesorios'), H(`<a class="fb fb-more" href="${B}/tienda/">Ver más...</a>`)], 25, 20),
  SEC([HEAD('Productos en paquete'),
    C({ flex_direction: 'row', ...FULL, flex_gap: { unit: 'px', size: 20, column: '20', row: '20' }, flex_wrap: 'wrap' }, [
      C({ width: { unit: 'px', size: 265, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] }, ...FULL }, [H(PACK)], true),
      C({ ...FULL, css_classes: 'fb fb-gray fb-pack-r', flex_grow: 1, width: { unit: '%', size: 72, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] } }, [SC(`[products tag="kit" limit="3" columns="3"]`), H(ADDKIT)], true)
    ], true)], 60, 30),
  SEC([H('<div class="fb-hr"></div>'), H('<div style="height:60px"></div>'), HEAD('Últimas noticias'), H(NEWS)], 30, 20),
  SEC([HEAD('Casos de éxito'), H(TESTI)], 50, 10),
  SEC([
    C({ flex_direction: 'row', ...FULL, flex_gap: { unit: 'px', size: 20, column: '20', row: '20' }, flex_wrap: 'wrap', css_classes: 'fb-foot-row' }, [
      C({ width: { unit: 'px', size: 375, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] }, ...FULL }, [H(F1), SOCIAL_FOOT], true),
      C({ width: { unit: '%', size: 14, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] }, ...FULL }, [H(F2)], true),
      C({ width: { unit: '%', size: 14, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] }, ...FULL }, [H(F3)], true),
      C({ flex_grow: 1, width: { unit: '%', size: 23, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] }, ...FULL }, [H(F4)], true)
    ], true),
    H(FBOT), SOCIAL_SIDE, WA_FLOAT
  ], 60, 0)
];
localStorage.setItem('FB_CONTENT', JSON.stringify(content));
return content.length + ' secciones / ' + JSON.stringify(content).length + ' bytes';
})();
