// Genera la estructura de Elementor (JSON) para la página de inicio estilo Freeby.
// Requiere en la página: MEDIA (id->url), CATS (categorías), POSTS (entradas).
// Uso en el editor de Elementor: ver import al final.
(() => {
const B = 'http://localhost/freeby-replica';
const U = id => MEDIA[id];
const rid = () => Math.random().toString(16).slice(2, 9);
const pad = (t, r, b, l) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
const W = (type, settings) => ({ id: rid(), elType: 'widget', widgetType: type, settings, elements: [] });
const C = (settings, elements, inner = false) => ({
  id: rid(), elType: 'container', isInner: inner,
  settings: Object.assign({ content_width: 'boxed', boxed_width: { unit: 'px', size: 1200, sizes: [] }, flex_direction: 'column', padding: pad(0, 15, 0, 15) }, settings),
  elements
});
const H = html => W('html', { html });
const SC = sc => W('shortcode', { shortcode: sc });
const HEAD = (title, extra = {}) => W('heading', Object.assign({
  title, header_size: 'h2', title_color: '#222529',
  typography_typography: 'custom', typography_font_family: 'Lexend',
  typography_font_size: { unit: 'px', size: 26, sizes: [] }, typography_font_weight: '600'
}, extra));
const BTN = (text, url, extra = {}) => W('button', Object.assign({
  text, link: { url, is_external: '', nofollow: '' }, align: 'center',
  background_color: '#FFFFFF', button_text_color: '#222529',
  border_border: 'solid', border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true }, border_color: '#FFA500',
  border_radius: { unit: 'px', top: '30', right: '30', bottom: '30', left: '30', isLinked: true },
  typography_typography: 'custom', typography_font_family: 'Poppins', typography_font_size: { unit: 'px', size: 12, sizes: [] }, typography_font_weight: '600',
  hover_color: '#000000', button_background_hover_color: '#FFA500'
}, extra));
const SECTION = (elements, extra = {}) => C(Object.assign({ padding: pad(30, 15, 30, 15), flex_gap: { unit: 'px', size: 20, column: '20', row: '20' } }, extra), elements);

// ---------- Estilos globales ----------
const CSS = `
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--fb-o:#FFA500;--fb-d:#222529;--fb-g:#777;--fb-l:#F4F4F4}
body{font-family:Poppins,sans-serif;color:var(--fb-g);background:#fff}
.fb a{text-decoration:none}
.fb-wrap{max-width:1200px;margin:0 auto;padding:0 15px}
/* Barra superior */
.fb-top{border-bottom:1px solid #eee;font-size:13px}
.fb-top .fb-wrap{display:flex;align-items:center;justify-content:space-between;height:46px;gap:10px}
.fb-pill{background:#e53935;color:#fff;border-radius:20px;padding:3px 12px;font-size:11px;font-weight:600;margin-right:8px}
.fb-contact{display:flex;align-items:center;border:1px solid #f0c060;border-radius:30px;padding:2px 2px 2px 14px;gap:10px;color:var(--fb-d);font-weight:600}
.fb-contact a.fb-wa{background:var(--fb-o);color:#000;border-radius:30px;padding:5px 14px;font-size:11px;font-weight:600}
/* Header */
.fb-header .fb-wrap{display:flex;align-items:center;justify-content:space-between;height:90px;gap:20px}
.fb-logo{display:flex;align-items:center;gap:6px;font-family:Lexend;font-weight:700;font-size:34px;color:var(--fb-d);letter-spacing:-1px}
.fb-logo .fb-bag{background:var(--fb-o);color:var(--fb-d);border-radius:8px 8px 10px 10px;font-size:15px;padding:12px 6px 4px;position:relative;line-height:1}
.fb-logo .fb-bag:before{content:"";position:absolute;top:-7px;left:50%;transform:translateX(-50%);width:16px;height:12px;border:3px solid var(--fb-d);border-bottom:0;border-radius:10px 10px 0 0}
.fb-search{flex:1;max-width:350px;display:flex;border:1px solid #ddd;border-radius:30px;overflow:hidden}
.fb-search input{border:0!important;flex:1;padding:10px 18px!important;font-size:12px;outline:0;background:#fff!important;box-shadow:none!important}
.fb-search button{border:0;background:#fff;padding:0 16px;cursor:pointer;color:var(--fb-d)}
.fb-hlinks{display:flex;align-items:center;gap:22px;font-size:12px;font-weight:600}
.fb-hlinks a{color:var(--fb-d);display:flex;align-items:center;gap:8px}
.fb-ico{width:34px;height:34px;border-radius:8px;background:#f1f1f1;display:inline-flex;align-items:center;justify-content:center;font-size:15px}
.fb-cart{position:relative;width:62px;height:62px;border-radius:8px;background:#eef0fb;display:flex;align-items:center;justify-content:center;font-size:24px}
.fb-cart b{position:absolute;top:10px;right:10px;background:var(--fb-o);color:#fff;border-radius:50%;width:16px;height:16px;font-size:10px;display:flex;align-items:center;justify-content:center}
/* Menú */
.fb-nav .fb-wrap{display:flex;justify-content:space-between;padding-bottom:12px}
.fb-nav a{font-family:Lexend;font-weight:600;font-size:17px;color:var(--fb-d)}
.fb-nav a:hover{color:var(--fb-o)}
/* Slider */
.fb-slider{position:relative;border-radius:10px;overflow:hidden;height:440px}
.fb-slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 90px;opacity:0;transition:opacity .7s;background:linear-gradient(90deg,#fafafa 0%,#fdf0dc 55%,#ffd394 100%)}
.fb-slide.on{opacity:1;z-index:1}
.fb-slide .txt{position:relative;max-width:440px}
.fb-slide .txt:before{content:"";position:absolute;left:-30px;top:-45px;width:180px;height:60px;background-image:radial-gradient(#333 1.5px,transparent 1.6px);background-size:12px 12px;opacity:.7}
.fb-slide h2{font-family:Lexend;font-size:48px;line-height:1.1;color:var(--fb-d);margin:0 0 12px;font-weight:600}
.fb-slide p{font-size:15px;margin:0 0 28px;color:#666}
.fb-slide img{height:380px;width:440px;object-fit:cover;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,.12)}
.fb-btn{display:inline-block;background:var(--fb-o);color:#000!important;font-weight:600;border-radius:30px;padding:14px 40px;font-size:15px}
.fb-btn:hover{background:#ff9100}
.fb-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:44px;height:44px;border-radius:50%;background:#fff;border:0;color:var(--fb-o);font-size:20px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.1)}
.fb-arrow.l{left:15px}.fb-arrow.r{right:15px}
/* Beneficios */
.fb-benefits .elementor-icon-box-title{margin:0!important}
/* Categorías */
.fb-cats{display:flex;gap:18px;overflow-x:auto;padding-bottom:8px;scroll-snap-type:x mandatory}
.fb-cats a{flex:0 0 calc((100% - 6*18px)/7);text-align:center;scroll-snap-align:start}
.fb-cats .im{aspect-ratio:1;border-radius:8px;overflow:hidden;background:var(--fb-l);margin-bottom:10px}
.fb-cats img{width:100%;height:100%;object-fit:cover;transition:transform .3s}
.fb-cats a:hover img{transform:scale(1.06)}
.fb-cats h3{font-family:Poppins;font-size:13px;font-weight:600;color:var(--fb-d);margin:0;line-height:1.3}
.fb-cats span{font-size:11px;color:var(--fb-g)}
/* Encabezado de ofertas */
.fb-offers-head{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.fb-offers-head h2{font-family:Lexend;font-size:26px;font-weight:600;color:var(--fb-d);margin:0}
.fb-cd{display:flex;align-items:center;gap:8px;font-weight:600;color:var(--fb-d);font-size:15px}
.fb-cd .u{border:1px solid #e5e5e5;border-radius:6px;min-width:60px;text-align:center;padding:4px 6px;font-family:Lexend;font-size:22px;line-height:1.1}
.fb-cd .u small{display:block;font-size:9px;color:var(--fb-g);font-family:Poppins;text-transform:uppercase}
/* Banners */
.fb-banners{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.fb-banner{position:relative;height:250px;border-radius:10px;overflow:hidden;display:flex;align-items:center;padding:40px;background:linear-gradient(110deg,#ff7a00 0%,#ffa500 40%,rgba(255,255,255,.2) 75%)}
.fb-banner img{position:absolute;right:0;top:0;width:60%;height:100%;object-fit:cover;z-index:0;mask-image:linear-gradient(90deg,transparent 0%,#000 45%)}
.fb-banner div{position:relative;z-index:1}
.fb-banner h3{font-family:Lexend;color:#fff;font-size:32px;line-height:1.15;margin:0 0 16px;font-weight:600}
.fb-banner a{border:1px solid #fff;color:#fff;border-radius:30px;padding:8px 20px;font-size:12px;font-weight:600}
.fb-banner a:hover{background:#fff;color:var(--fb-o)}
/* Cinta */
.fb-marquee{background:var(--fb-o);overflow:hidden;white-space:nowrap;padding:16px 0}
.fb-marquee div{display:inline-block;animation:fbm 30s linear infinite;font-family:Lexend;font-weight:600;font-size:22px;color:var(--fb-d)}
@keyframes fbm{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* Pestañas */
.fb-tabs-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.fb-tabs-head h2{font-family:Lexend;font-size:26px;font-weight:600;color:var(--fb-d);margin:0}
.fb-tabbtns{display:flex;gap:8px}
.fb-tabbtns button{border:1px solid #e5e5e5;background:#fff;border-radius:30px;padding:8px 18px;font-size:11px;font-weight:700;text-transform:uppercase;cursor:pointer;color:var(--fb-d)}
.fb-tabbtns button.on{background:var(--fb-o);border-color:var(--fb-o);color:#fff}
.fb-pane{display:none!important}.fb-pane.on{display:flex!important}
/* Productos (WooCommerce) */
.fb ul.products{margin:0!important;display:grid!important;grid-template-columns:repeat(4,1fr);gap:20px}
.fb ul.products:before,.fb ul.products:after{display:none!important}
.fb ul.products li.product{width:auto!important;margin:0!important;background:var(--fb-l);border-radius:8px;padding:10px 10px 16px!important;text-align:center;float:none!important}
.fb ul.products li.product img{border-radius:6px;aspect-ratio:1;object-fit:cover;background:#fff;margin-bottom:10px!important}
.fb .ast-woo-product-category{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:#999}
.fb .woocommerce-loop-product__title{font-family:Poppins;font-size:13px!important;font-weight:500;color:var(--fb-d)!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fb li.product .price{color:var(--fb-d)!important;font-weight:600;font-size:14px!important}
.fb li.product .price del{color:#aaa;font-weight:400;font-size:12px}
.fb li.product .button{background:#fff!important;color:var(--fb-d)!important;border:1px solid #e5e5e5!important;font-size:10px!important;text-transform:uppercase;border-radius:4px!important;padding:8px 12px!important;font-weight:600}
.fb li.product .button:hover{background:var(--fb-o)!important;border-color:var(--fb-o)!important;color:#000!important}
.fb .onsale,.fb .ast-onsale-card{background:var(--fb-o)!important;color:#fff!important;border-radius:4px!important}
.fb-more{display:block;border:1px solid var(--fb-o);border-radius:30px;text-align:center;padding:10px;font-size:11px;font-weight:600;color:var(--fb-o)!important;text-transform:uppercase}
.fb-more:hover{background:var(--fb-o);color:#000!important}
/* Paquetes */
.fb-pack{background:linear-gradient(160deg,#ff8a00,#ffa500);border-radius:10px;padding:40px 24px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;height:100%;min-height:320px}
.fb-pack h3{color:#fff;font-family:Lexend;font-size:30px;line-height:1.25;margin:0 0 24px;font-weight:600}
.fb-pack a{background:#000;color:#fff;border-radius:30px;padding:12px 36px;font-weight:600}
.fb-pack-row ul.products{grid-template-columns:1fr!important}
/* Blog */
.fb-news{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.fb-news a{background:var(--fb-l);border-radius:8px;padding:8px;display:block}
.fb-news img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:6px}
.fb-news h3{font-family:Poppins;font-size:12px;font-weight:500;color:var(--fb-d);text-align:center;margin:10px 4px 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* Testimonios */
.fb-testi{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.fb-testi div.c{border:1px solid #eee;border-radius:10px;padding:24px;text-align:center}
.fb-av{width:46px;height:46px;border-radius:50%;margin:0 auto 10px;color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;font-weight:500}
.fb-testi h4{font-size:13px;color:var(--fb-d);margin:0;font-weight:600}
.fb-testi small{font-size:11px}
.fb-stars{color:#f5b301;letter-spacing:2px;margin:6px 0}
.fb-testi p{font-size:13px;color:#444;margin:0}
/* Footer */
.fb-footer{border-top:1px solid #eee;margin-top:30px}
.fb-footer .cols{display:grid;grid-template-columns:2fr 1fr 1fr 1.6fr;gap:30px;padding:50px 0 30px}
.fb-footer h4{font-family:Lexend;color:var(--fb-d);font-size:15px;margin:0 0 14px;font-weight:600}
.fb-footer ul{list-style:none;margin:0;padding:0}.fb-footer li{margin-bottom:8px;font-size:12px}
.fb-footer li a{color:#555}.fb-footer li a:hover{color:var(--fb-o)}
.fb-footer p{font-size:12px;margin:0 0 12px}
.fb-soc{display:flex;gap:8px;margin-top:16px}
.fb-soc a{width:26px;height:26px;border-radius:50%;background:var(--fb-o);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;font-weight:700}
.fb-news-form{display:flex;border:1px solid #ddd;border-radius:30px;padding:3px;margin-bottom:10px}
.fb-news-form input{border:0!important;flex:1;font-size:12px;padding:6px 12px!important;outline:0;background:transparent!important;box-shadow:none!important;min-width:0}
.fb-news-form button{background:#222;color:#fff;border:0;border-radius:30px;padding:6px 14px;font-size:11px;font-weight:600;cursor:pointer}
.fb-bottom{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f2f2f2;padding:18px 0;font-size:11px;flex-wrap:wrap;gap:10px}
.fb-pay{display:flex;gap:8px}.fb-pay span{border:1px solid #ddd;border-radius:4px;padding:3px 8px;font-size:10px;font-weight:700;color:#5a6b8c}
/* Flotantes */
.fb-side{position:fixed;right:0;top:40%;z-index:99;display:flex;flex-direction:column}
.fb-side a{width:46px;height:46px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.fb-wa-float{position:fixed;right:22px;bottom:22px;z-index:99;width:58px;height:58px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 4px 14px rgba(0,0,0,.2)}
/* Responsive */
@media (max-width:1024px){.fb-cats a{flex-basis:calc((100% - 3*18px)/4)}.fb ul.products{grid-template-columns:repeat(3,1fr)}.fb-news{grid-template-columns:repeat(2,1fr)}.fb-footer .cols{grid-template-columns:1fr 1fr}}
@media (max-width:767px){
.fb-top .fb-wrap{height:auto;padding:8px 15px;flex-direction:column}
.fb-header .fb-wrap{flex-wrap:wrap;height:auto;padding:14px 15px}
.fb-search{order:3;max-width:none;flex-basis:100%}
.fb-hlinks span.t{display:none}
.fb-nav .fb-wrap{overflow-x:auto;gap:22px}.fb-nav a{font-size:14px;white-space:nowrap}
.fb-slider{height:520px}.fb-slide{flex-direction:column;justify-content:center;padding:30px;text-align:center;gap:20px}
.fb-slide h2{font-size:32px}.fb-slide img{width:100%;height:220px}.fb-slide .txt:before{display:none}
.fb-cats a{flex-basis:40%}
.fb ul.products{grid-template-columns:repeat(2,1fr);gap:12px}
.fb-banners,.fb-testi{grid-template-columns:1fr}
.fb-footer .cols{grid-template-columns:1fr}
.fb-side{display:none}}
</style>`;

// ---------- Barra superior, header y menú ----------
const TOP = `${CSS}
<div class="fb fb-top"><div class="fb-wrap">
  <div><span class="fb-pill">👀 OJITO...</span> Envío GRATIS en compras mayores a $999</div>
  <div class="fb-contact">📞 55 0000 0000 <a class="fb-wa" href="#">Escríbenos</a></div>
</div></div>
<div class="fb fb-header"><div class="fb-wrap">
  <a class="fb-logo" href="${B}/"><span class="fb-bag">fby</span>freeby</a>
  <form class="fb-search" action="${B}/" method="get"><input type="search" name="s" placeholder="Buscar productos..."><input type="hidden" name="post_type" value="product"><button type="submit">🔍</button></form>
  <div class="fb-hlinks">
    <a href="${B}/lista-de-deseos/"><span class="fb-ico">♡</span><span class="t">Lista de deseos</span></a>
    <a href="${B}/rastrear-pedido/"><span class="fb-ico">📦</span><span class="t">Rastrear Pedido</span></a>
    <a class="fb-cart" href="${B}/carrito/">👜<b id="fb-cc">0</b></a>
  </div>
</div></div>
<nav class="fb fb-nav"><div class="fb-wrap">
  <a href="${B}/tienda/">Tienda</a><a href="${B}/quieres-vender/">¿Quieres Vender?</a><a href="${B}/envios/">Envía Nacionalmente</a><a href="${B}/redes/">¡Síguenos En Redes!</a><a href="${B}/marketplaces/">Marketplace</a>
</div></nav>
<script>fetch('${B}/wp-json/wc/store/v1/cart',{credentials:'same-origin'}).then(r=>r.json()).then(c=>{var e=document.getElementById('fb-cc');if(e)e.textContent=c.items_count||0}).catch(function(){});</script>`;

// ---------- Slider ----------
const slides = [
  ['Ofertas que vuelan', 'Pagos seguros y envíos confiables.', 57],
  ['Tu momento de comprar', 'Tu próxima fragancia está aquí', 21],
  ['Precios imperdibles', 'El mejor cuidado personal aquí.', 23]
];
const SLIDER = `<div class="fb fb-slider" id="fb-slider">
${slides.map((s, i) => `<div class="fb-slide${i === 0 ? ' on' : ''}"><div class="txt"><h2>${s[0]}</h2><p>${s[1]}</p><a class="fb-btn" href="${B}/tienda/">Comprar</a></div><img src="${U(s[2])}" alt="${s[0]}"></div>`).join('')}
<button class="fb-arrow l" aria-label="Anterior">‹</button><button class="fb-arrow r" aria-label="Siguiente">›</button>
</div>
<script>(function(){var r=document.getElementById('fb-slider');if(!r)return;var s=r.querySelectorAll('.fb-slide'),i=0;function go(n){s[i].classList.remove('on');i=(n+s.length)%s.length;s[i].classList.add('on')}
r.querySelector('.l').onclick=function(){go(i-1)};r.querySelector('.r').onclick=function(){go(i+1)};setInterval(function(){go(i+1)},6000)})();</script>`;

// ---------- Beneficios (widgets nativos Icon Box) ----------
const benefit = (icon, title) => W('icon-box', {
  selected_icon: { value: icon, library: 'fa-solid' }, title_text: title, description_text: '',
  position: 'left', title_size: 'h3', primary_color: '#FFA500', icon_space: { unit: 'px', size: 12, sizes: [] },
  icon_size: { unit: 'px', size: 26, sizes: [] }, title_color: '#222529',
  title_typography_typography: 'custom', title_typography_font_family: 'Lexend',
  title_typography_font_size: { unit: 'px', size: 15, sizes: [] }, title_typography_font_weight: '600',
  content_vertical_alignment: 'middle', _css_classes: 'fb-benefits'
});

// ---------- Categorías ----------
const CATS_HTML = `<div class="fb fb-cats">${CATS.map(c => `<a href="${B}/categoria-producto/${c.slug}/"><div class="im"><img src="${c.img || ''}" alt="${c.name}"></div><h3>${c.name}</h3><span>${c.count} productos</span></a>`).join('')}</div>`;

// ---------- Ofertas con cuenta regresiva ----------
const OFFERS_HEAD = `<div class="fb fb-offers-head"><h2 id="fb-om">Ofertas del mes</h2>
<div class="fb-cd">Las ofertas terminan en: <div class="u"><span id="fb-d">00</span><small>Días</small></div>:<div class="u"><span id="fb-h">00</span><small>Hrs</small></div>:<div class="u"><span id="fb-m">00</span><small>Min</small></div>:<div class="u"><span id="fb-s">00</span><small>Seg</small></div></div></div>
<script>(function(){var n=new Date(),m=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];document.getElementById('fb-om').textContent='Ofertas de '+m[n.getMonth()];
var end=new Date(n.getFullYear(),n.getMonth()+1,1);function p(x){return String(x).padStart(2,'0')}function t(){var d=Math.max(0,end-new Date());document.getElementById('fb-d').textContent=p(Math.floor(d/864e5));document.getElementById('fb-h').textContent=p(Math.floor(d/36e5)%24);document.getElementById('fb-m').textContent=p(Math.floor(d/6e4)%60);document.getElementById('fb-s').textContent=p(Math.floor(d/1e3)%60)}t();setInterval(t,1000)})();</script>`;

// ---------- Banners ----------
const BANNERS = `<div class="fb fb-banners">
<div class="fb-banner"><img src="${U(22)}" alt=""><div><h3>Belleza &amp;<br>Skincare</h3><a href="${B}/categoria-producto/salud-y-cuidado-personal/">Comprar Ahora</a></div></div>
<div class="fb-banner"><img src="${U(37)}" alt=""><div><h3>Calidad<br>Absoluta</h3><a href="${B}/categoria-producto/hogar-cocina-y-jardin/">Ver más</a></div></div>
</div>`;

// ---------- Cinta en movimiento ----------
const txt = 'Sin mínimo de compra &nbsp;•&nbsp; Envío gratis en pedidos de $999 &nbsp;•&nbsp; Envíos nacionales &nbsp;•&nbsp; Vende con nosotros &nbsp;•&nbsp; Compra fácil &nbsp;•&nbsp; ';
const MARQUEE = `<div class="fb fb-marquee"><div>${txt.repeat(4)}</div></div>`;

// ---------- Productos destacados con pestañas ----------
const TABS_HEAD = `<div class="fb fb-tabs-head"><h2>Productos destacados</h2><div class="fb-tabbtns" id="fb-tabs">
<button class="on" data-t="hogar">Hogar</button><button data-t="belleza">Belleza</button><button data-t="moda">Moda</button></div></div>
<script>document.addEventListener('DOMContentLoaded',function(){var b=document.querySelectorAll('#fb-tabs button');b.forEach(function(x){x.onclick=function(){b.forEach(function(y){y.classList.remove('on')});x.classList.add('on');document.querySelectorAll('.fb-pane').forEach(function(p){p.classList.toggle('on',p.classList.contains('fb-pane-'+x.dataset.t))})}})});</script>`;
const pane = (key, slug, on) => C({ _css_classes: `fb fb-pane fb-pane-${key}${on ? ' on' : ''}`, padding: pad(0, 0, 0, 0), content_width: 'full' },
  [SC(`[products category="${slug}" limit="4" columns="4" orderby="date"]`)], true);

// ---------- Paquetes ----------
const PACK_CARD = `<div class="fb fb-pack"><h3>Compra ya y recibe en la puerta de tu casa</h3><a href="${B}/tienda/">Ver más</a></div>`;

// ---------- Blog ----------
const NEWS = `<div class="fb fb-news">${POSTS.map(p => `<a href="${p.l}"><img src="${p.img}" alt=""><h3>${p.t}</h3></a>`).join('')}</div>`;

// ---------- Testimonios (de ejemplo) ----------
const testi = [
  ['D', '#7b1fa2', 'Daniela M.', 'hace 1 mes', 'Me encantó la experiencia: la compra fue rápida y el paquete llegó en perfecto estado. ¡10 de 10!'],
  ['C', '#1565c0', 'Carlos R.', 'hace 2 meses', 'Muy buena atención por WhatsApp, resolvieron todas mis dudas y el envío llegó antes de lo esperado.'],
  ['A', '#5d7a8c', 'Ana G.', 'hace 3 meses', 'Productos originales y a buen precio. Sin duda volveré a comprar aquí.']
];
const TESTI = `<div class="fb fb-testi">${testi.map(t => `<div class="c"><div class="fb-av" style="background:${t[1]}">${t[0]}</div><h4>${t[2]}</h4><small>${t[3]}</small><div class="fb-stars">★★★★★</div><p>${t[4]}</p></div>`).join('')}</div>`;

// ---------- Footer ----------
const FOOTER = `<footer class="fb fb-footer"><div class="fb-wrap">
<div class="cols">
 <div><a class="fb-logo" href="${B}/"><span class="fb-bag">fby</span>freeby</a><p style="margin-top:16px">Calle Ejemplo 123, Col. Centro, C.P. 42000, Pachuca de Soto, Hidalgo.</p><p>Escríbenos: 55 0000 0000</p>
 <div class="fb-soc"><a href="#">f</a><a href="#">ig</a><a href="#">wa</a><a href="#">tt</a></div></div>
 <div><h4>Nosotros</h4><ul><li><a href="${B}/tienda/">Tienda</a></li><li><a href="${B}/quieres-vender/">¿Quieres Vender?</a></li><li><a href="${B}/envios/">Envía Nacionalmente</a></li><li><a href="${B}/redes/">¡Síguenos en redes!</a></li></ul></div>
 <div><h4>Categorías</h4><ul><li><a href="${B}/categoria-producto/bebes-y-paternidad/">Bebés y Paternidad</a></li><li><a href="${B}/categoria-producto/deportes-y-ejercicio/">Deportes y Ejercicio</a></li><li><a href="${B}/categoria-producto/herramientas-y-mejoras-para-el-hogar/">Herramientas y Mejoras para el Hogar</a></li><li><a href="${B}/tienda/">Ver Todo</a></li></ul></div>
 <div><h4>Suscríbete para recibir ofertas</h4><form class="fb-news-form" onsubmit="this.innerHTML='<span style=&quot;padding:6px 12px;font-size:12px&quot;>¡Gracias por suscribirte!</span>';return false;"><input type="email" required placeholder="Correo electrónico..."><button type="submit">Suscríbete</button></form><p>Al suscribirte aceptas nuestros Términos de uso y Políticas de Privacidad.</p></div>
</div>
<div class="fb-bottom"><span>©${new Date().getFullYear()} Freeby Réplica — Proyecto de práctica.</span><div class="fb-pay"><span>VISA</span><span>MC</span><span>OXXO</span><span>AMEX</span><span>MP</span></div></div>
</div></footer>
<div class="fb-side"><a href="#" style="background:#000">tt</a><a href="#" style="background:#1877f2">f</a><a href="#" style="background:#7cd34c">wa</a><a href="#" style="background:#d61ad6">ig</a></div>
<a class="fb-wa-float" href="#" aria-label="WhatsApp">✆</a>`;

// ---------- Ensamblado ----------
const full = { content_width: 'full', padding: pad(0, 0, 0, 0) };
window.FB_CONTENT = [
  C(full, [H(TOP)]),
  SECTION([H(SLIDER)], { padding: pad(5, 15, 10, 15) }),
  SECTION([
    C({ flex_direction: 'row', content_width: 'full', justify_content: 'space-around', flex_wrap: 'wrap', padding: pad(10, 0, 20, 0), border_border: 'solid', border_width: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false }, border_color: '#EEEEEE' },
      [benefit('fas fa-truck', 'Envío nacional'), benefit('fas fa-dollar-sign', 'Compra rápida'), benefit('fas fa-clock', 'Tienda 24/7'), benefit('fas fa-lock', 'Pago seguro')], true)
  ], { padding: pad(10, 15, 10, 15) }),
  SECTION([HEAD('Buscar por categorías'), H(CATS_HTML)]),
  SECTION([H(OFFERS_HEAD), C({ _css_classes: 'fb', content_width: 'full', padding: pad(0, 0, 0, 0) }, [SC('[products tag="oferta" limit="4" columns="4" orderby="date"]')], true)]),
  SECTION([HEAD('Compra sin complicaciones'), H(BANNERS)]),
  C(full, [H(MARQUEE)]),
  SECTION([H(TABS_HEAD), pane('hogar', 'hogar-cocina-y-jardin', true), pane('belleza', 'salud-y-cuidado-personal'), pane('moda', 'moda-ropa-y-accesorios'), H(`<a class="fb fb-more" href="${B}/tienda/">Ver más...</a>`)]),
  SECTION([HEAD('Productos en paquete'),
    C({ flex_direction: 'row', content_width: 'full', padding: pad(0, 0, 0, 0), flex_gap: { unit: 'px', size: 20, column: '20', row: '20' }, _css_classes: 'fb fb-pack-row' }, [
      C({ width: { unit: '%', size: 25, sizes: [] }, content_width: 'full', padding: pad(0, 0, 0, 0) }, [H(PACK_CARD)], true),
      C({ width: { unit: '%', size: 25, sizes: [] }, content_width: 'full', padding: pad(0, 0, 0, 0) }, [SC('[products tag="kit" limit="1" columns="1"]')], true)
    ], true)]),
  SECTION([HEAD('Últimas noticias'), H(NEWS)]),
  SECTION([HEAD('Casos de éxito'), H(TESTI)]),
  C(full, [H(FOOTER)])
];
return window.FB_CONTENT.length;
})();
