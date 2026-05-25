/* ======================================================================
   TERRES D'AFRIQUE & MILLÉSIMES — Script principal (FR / EN / ES)
   Menu mobile · header dynamique · animations reveal · panier ·
   billetterie QR · simulateur logistique export · i18n
   ====================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================================
     i18n — détection de la langue via <html lang="..">
  ==================================================================== */
  const LANG = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
  const I18N = {
    fr: {
      empty: 'Votre panier est vide.',
      total: 'Total',
      added: '✓ Ajouté',
      addToCart: 'Ajouter au panier',
      cartEmpty: 'Votre panier est vide.',
      checkoutMsg: 'Redirection vers le paiement sécurisé Stripe / PayPal.\n(Module à activer lors de la mise en production e-commerce.)',
      minQty: '⚠ Quantité minimale export : 10 cartons mixtes (60 bouteilles).',
      simGoodsValue: 'Valeur marchandise HT',
      simTransport: 'Transport thermo-régulé',
      simIso: 'Caisses isothermes (0,99 €/btl)',
      simCustoms: 'Droits de douane estimés',
      simLanded: 'Coût rendu estimé',
      simNote: 'Estimation indicative — Incoterm EXW Versailles. Droits de douane et taxes locales à la charge du client à destination. Devis ferme sur demande.',
      ticketBooked: 'Billet réservé',
      ticketRef: 'Référence',
      ticketAmount: 'Montant',
      bottles: 'btl',
      locale: 'fr-FR'
    },
    en: {
      empty: 'Your cart is empty.',
      total: 'Total',
      added: '✓ Added',
      addToCart: 'Add to cart',
      cartEmpty: 'Your cart is empty.',
      checkoutMsg: 'Redirecting to secure Stripe / PayPal checkout.\n(Module to be activated when the e-commerce site goes live.)',
      minQty: '⚠ Minimum export quantity: 10 mixed cartons (60 bottles).',
      simGoodsValue: 'Goods value (excl. tax)',
      simTransport: 'Temperature-controlled freight',
      simIso: 'Insulated cases (€0.99/btl)',
      simCustoms: 'Estimated customs duties',
      simLanded: 'Estimated landed cost',
      simNote: 'Indicative estimate — Incoterm EXW Versailles. Customs duties and local taxes to be paid by the customer at destination. Firm quote on request.',
      ticketBooked: 'Ticket booked',
      ticketRef: 'Reference',
      ticketAmount: 'Amount',
      bottles: 'btl',
      locale: 'en-GB'
    },
    es: {
      empty: 'Su cesta está vacía.',
      total: 'Total',
      added: '✓ Añadido',
      addToCart: 'Añadir a la cesta',
      cartEmpty: 'Su cesta está vacía.',
      checkoutMsg: 'Redirigiendo al pago seguro Stripe / PayPal.\n(Módulo a activar al lanzar el sitio e-commerce.)',
      minQty: '⚠ Cantidad mínima de exportación: 10 cajas mixtas (60 botellas).',
      simGoodsValue: 'Valor de la mercancía (sin IVA)',
      simTransport: 'Transporte termorregulado',
      simIso: 'Cajas isotérmicas (0,99 €/btl)',
      simCustoms: 'Aranceles aduaneros estimados',
      simLanded: 'Coste estimado entregado',
      simNote: 'Estimación indicativa — Incoterm EXW Versailles. Aranceles aduaneros e impuestos locales a cargo del cliente en destino. Presupuesto en firme bajo petición.',
      ticketBooked: 'Billete reservado',
      ticketRef: 'Referencia',
      ticketAmount: 'Importe',
      bottles: 'btl',
      locale: 'es-ES'
    }
  };
  const T = I18N[LANG] || I18N.fr;

  /* ---------- Header dynamique au scroll ---------- */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('shrink', window.scrollY > 60);
    });
  }

  /* ---------- Menu mobile ---------- */
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('nav ul');
  if (burger && menu) {
    burger.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('open')));
  }

  /* ---------- Animations au défilement ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    io.observe(el);
  });

  /* ---------- Année footer ---------- */
  document.querySelectorAll('.year').forEach(e => e.textContent = new Date().getFullYear());

  /* ====================================================================
     PANIER BOUTIQUE  (démo front — à connecter à Shopify / Stripe)
     Conversion fixe : 1 € = 655,957 FCFA
  ==================================================================== */
  const TAUX = 655.957;
  const panier = [];
  const panierBox = document.getElementById('panier-lignes');
  const panierTotal = document.getElementById('panier-total');

  function majPanier() {
    if (!panierBox) return;
    panierBox.innerHTML = '';
    let total = 0;
    panier.forEach((p, i) => {
      total += p.prix * p.qte;
      const l = document.createElement('div');
      l.className = 'cart-line';
      l.innerHTML = `<span>${p.nom} × ${p.qte}</span>
        <span>${(p.prix * p.qte).toFixed(2)} €
        <a href="#" data-i="${i}" class="del" style="color:var(--or);margin-left:.6rem">✕</a></span>`;
      panierBox.appendChild(l);
    });
    if (!panier.length) panierBox.innerHTML =
      `<p style="color:var(--gris);font-size:.9rem">${T.empty}</p>`;
    if (panierTotal) panierTotal.innerHTML =
      `<span>${T.total}</span><span>${total.toFixed(2)} €&nbsp;·&nbsp;
       ${Math.round(total * TAUX).toLocaleString(T.locale)} FCFA</span>`;
    panierBox.querySelectorAll('.del').forEach(d =>
      d.addEventListener('click', ev => {
        ev.preventDefault();
        panier.splice(+d.dataset.i, 1);
        majPanier();
      }));
  }

  document.querySelectorAll('[data-add]').forEach(btn => {
    const originalLabel = btn.textContent;
    btn.addEventListener('click', () => {
      const nom = btn.dataset.nom;
      const prix = parseFloat(btn.dataset.prix);
      const exist = panier.find(p => p.nom === nom);
      if (exist) exist.qte++;
      else panier.push({ nom, prix, qte: 1 });
      majPanier();
      btn.textContent = T.added;
      setTimeout(() => btn.textContent = originalLabel, 1400);
    });
  });
  majPanier();

  const checkout = document.getElementById('checkout');
  if (checkout) checkout.addEventListener('click', () => {
    if (!panier.length) { alert(T.cartEmpty); return; }
    alert(T.checkoutMsg);
  });

  /* ====================================================================
     SIMULATEUR LOGISTIQUE EXPORT AFRIQUE
  ==================================================================== */
  const paramsExport = {
    'Cameroun':      { transport: 2.50, douane: 30 },
    'Cameroon':      { transport: 2.50, douane: 30 },
    'Camerún':       { transport: 2.50, douane: 30 },
    'Côte d\'Ivoire':{ transport: 3.00, douane: 25 },
    'Ivory Coast':   { transport: 3.00, douane: 25 },
    'Costa de Marfil':{ transport: 3.00, douane: 25 },
    'Sénégal':       { transport: 3.50, douane: 28 },
    'Senegal':       { transport: 3.50, douane: 28 },
    'Gabon':         { transport: 2.80, douane: 27 },
    'Gabón':         { transport: 2.80, douane: 27 }
  };
  const simBtn = document.getElementById('sim-calc');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      const pays = document.getElementById('sim-pays').value;
      const cartons = parseInt(document.getElementById('sim-cartons').value) || 0;
      const valeur = parseFloat(document.getElementById('sim-valeur').value) || 0;
      const out = document.getElementById('sim-result');
      if (cartons < 10) {
        out.innerHTML = `<p style="color:var(--or)">${T.minQty}</p>`;
        return;
      }
      const p = paramsExport[pays] || { transport: 3.00, douane: 27 };
      const bouteilles = cartons * 6;
      const transport = bouteilles * p.transport;
      const douane = valeur * p.douane / 100;
      const thermo = bouteilles * 0.99;
      const total = valeur + transport + douane + thermo;
      out.innerHTML = `
        <table>
          <tr><td>${T.simGoodsValue}</td><td style="text-align:right">${valeur.toFixed(2)} €</td></tr>
          <tr><td>${T.simTransport} (${bouteilles} ${T.bottles})</td><td style="text-align:right">${transport.toFixed(2)} €</td></tr>
          <tr><td>${T.simIso}</td><td style="text-align:right">${thermo.toFixed(2)} €</td></tr>
          <tr><td>${T.simCustoms} ${pays} (${p.douane} %)</td><td style="text-align:right">${douane.toFixed(2)} €</td></tr>
          <tr style="background:var(--noir-3)"><th>${T.simLanded}</th>
            <th style="text-align:right">${total.toFixed(2)} € · ${Math.round(total*TAUX).toLocaleString(T.locale)} FCFA</th></tr>
        </table>
        <p style="font-size:.78rem;color:var(--gris);margin-top:.6rem">${T.simNote}</p>`;
    });
  }

  /* ====================================================================
     BILLETTERIE ÉVÉNEMENTS — génération QR code (démo)
  ==================================================================== */
  document.querySelectorAll('[data-billet]').forEach(btn => {
    btn.addEventListener('click', () => {
      const evt = btn.dataset.billet;
      const prix = btn.dataset.prix;
      const ref = 'TAM-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      const modal = document.getElementById('billet-modal');
      if (!modal) {
        alert(`${T.ticketBooked} : ${evt}\n${T.ticketRef} : ${ref}\n${T.ticketAmount} : ${prix} €`);
        return;
      }
      const url = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&bgcolor=16-19-14&color=201-168-76&data=' +
        encodeURIComponent('TAM|' + evt + '|' + ref);
      modal.querySelector('.billet-evt').textContent = evt;
      modal.querySelector('.billet-ref').textContent = ref;
      modal.querySelector('.billet-prix').textContent = prix + ' €';
      modal.querySelector('.billet-qr').src = url;
      modal.style.display = 'flex';
    });
  });
  const billetModal = document.getElementById('billet-modal');
  if (billetModal) billetModal.addEventListener('click', e => {
    if (e.target === billetModal || e.target.classList.contains('billet-close'))
      billetModal.style.display = 'none';
  });

  /* ====================================================================
     BON DE COMMANDE CHR / EXPORT — total automatique
  ==================================================================== */
  function majBon() {
    const lignes = document.querySelectorAll('.bon-ligne');
    if (!lignes.length) return;
    let ht = 0;
    lignes.forEach(l => {
      const pu = parseFloat(l.querySelector('.bon-pu').value) || 0;
      const qte = parseInt(l.querySelector('.bon-qte').value) || 0;
      const tot = pu * qte;
      l.querySelector('.bon-tot').textContent = tot.toFixed(2) + ' €';
      ht += tot;
    });
    const tva = ht * 0.20;
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('bon-ht', ht.toFixed(2) + ' €');
    set('bon-tva', tva.toFixed(2) + ' €');
    set('bon-ttc', (ht + tva).toFixed(2) + ' €');
    set('bon-cfa', Math.round((ht + tva) * TAUX).toLocaleString(T.locale) + ' FCFA');
  }
  document.querySelectorAll('.bon-pu,.bon-qte').forEach(i =>
    i.addEventListener('input', majBon));
  majBon();

  /* ---------- formulaires démo ---------- */
  document.querySelectorAll('form[data-demo]').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const msg = f.querySelector('.form-msg');
      if (msg) { msg.style.display = 'block'; }
      f.reset();
    });
  });

});
