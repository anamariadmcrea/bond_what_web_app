// Navegación entre los 5 pasos del Registro / Onboarding
function goToRegStep(stepNum) {
  // Actualizar correo mostrado en paso 2
  const emailInput = document.getElementById('reg-email');
  const displayEmail = document.getElementById('display-reg-email');
  if (emailInput && displayEmail) {
    displayEmail.textContent = emailInput.value || 'hugo@gmail.com';
  }

  // Mostrar el paso correspondiente
  document.querySelectorAll('.reg-step').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`reg-step-${stepNum}`);
  if (target) target.classList.add('active');

  // Actualizar las 4 rayitas de progreso arriba
  const activeSegments = Math.min(stepNum, 4);
  for (let i = 1; i <= 4; i++) {
    const seg = document.getElementById(`prog-${i}`);
    if (seg) {
      seg.classList.toggle('active', i <= activeSegments);
    }
  }

  // Cambiar fondo a amarillo en el paso 5 (Isla recomendada) y mostrar avatar en navbar
  const body = document.getElementById('reg-body');
  const navZone = document.getElementById('nav-auth-zone');
  if (stepNum === 5) {
    body.classList.add('island-reveal-bg');
    if (navZone) navZone.innerHTML = '<div class="avatar" style="border:2px solid #0047FF;">HF</div>';
  } else {
    body.classList.remove('island-reveal-bg');
  }
}

// Selección de opción en el Diagnóstico Inicial (A, B, C, D)
function selectQuizOption(card) {
  document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
  card.classList.add('selected');
}

// =========================================
// LÓGICA DEL LABORATORIO DE MOCs (4 ETAPAS)
// =========================================
function openLabStage(stageNum) {
  // Ocultar el Hub inicial y mostrar el asistente de 4 etapas
  const hub = document.getElementById('lab-hub');
  const wizard = document.getElementById('lab-wizard');
  if (hub && wizard) {
    hub.style.display = 'none';
    wizard.style.display = 'block';
  }

  // Sincronizar el título del MOC escrito por el usuario en Etapa 4 y en el Modal
  const titleInput = document.getElementById('moc-title-input');
  const stage4Title = document.getElementById('stage4-moc-title');
  const modalTitle = document.getElementById('modal-moc-name');
  if (titleInput) {
    const cleanTitle = `"${titleInput.value.trim() || 'Mi MOC'}"`;
    if (stage4Title) stage4Title.textContent = cleanTitle;
    if (modalTitle) modalTitle.textContent = cleanTitle;
  }

  // Mostrar solo la etapa elegida
  document.querySelectorAll('#lab-wizard .lab-view').forEach(v => v.classList.remove('active'));
  const targetStage = document.getElementById(`lab-stage-${stageNum}`);
  if (targetStage) targetStage.classList.add('active');

  // Actualizar colores del stepper
  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById(`step-tab-${i}`);
    if (tab) {
      tab.classList.remove('active', 'done');
      if (i < stageNum) tab.classList.add('done');
      if (i === stageNum) tab.classList.add('active');
    }
  }
}

function backToLabHub() {
  document.getElementById('lab-wizard').style.display = 'none';
  document.getElementById('lab-hub').style.display = 'block';
}

function pickScaleChip(chip) {
  chip.parentElement.querySelectorAll('.scale-chip').forEach(c => c.classList.remove('selected'));
  chip.classList.add('selected');
}

function toggleLabTech(card) {
  card.classList.toggle('selected');
  const btn = card.querySelector('button');
  btn.textContent = card.classList.contains('selected') ? '✓ En tu plan' : '+ Añadir al plan';
  const count = document.querySelectorAll('.tech-item.selected').length;
  document.getElementById('selected-tech-count').textContent = count;
}

function togglePieceCheck(row) {
  row.classList.toggle('checked');
  const badge = row.querySelector('span');
  if (row.classList.contains('checked')) {
    badge.textContent = '✅ Lista';
    badge.style.color = '#059669';
  } else {
    badge.textContent = '⬜ Marcar lista';
    badge.style.color = '#6B7280';
  }
}

function togglePhoneConnection() {
  const banner = document.getElementById('camera-status-banner');
  const title = document.getElementById('cam-title');
  const sub = document.getElementById('cam-sub');
  banner.classList.toggle('disconnected');
  if (banner.classList.contains('disconnected')) {
    title.textContent = '📴 App móvil sin vincular';
    sub.textContent = 'Abre Bond What en tu celular o escanea el QR de tu perfil.';
  } else {
    title.textContent = '📡 App móvil conectada — Cámara lista';
    sub.textContent = 'iPhone de Hugo · Sincronización en vivo activada.';
  }
}

let iterCount = 2;
function captureIteration() {
  iterCount++;
  document.getElementById('iteration-label').textContent = `Iteración ${iterCount} · Vista estructural recién escaneada`;
  alert(`¡Foto recibida desde tu móvil! Se guardó la Iteración ${iterCount}.`);
}

function openPublishModal() {
  document.getElementById('publish-modal').classList.add('open');
}

function closePublishModal() {
  document.getElementById('publish-modal').classList.remove('open');
}


//COMUNIDAD

function toggleLike(btn) {
  btn.classList.toggle('liked');
  const countSpan = btn.querySelector('span');
  let num = parseInt(countSpan.textContent, 10);
  if (btn.classList.contains('liked')) {
    btn.firstChild.textContent = '❤️ ';
    countSpan.textContent = num + 1;
  } else {
    btn.firstChild.textContent = '🤍 ';
    countSpan.textContent = num - 1;
  }
}

// Modal de Arena Práctica
function openChallengeModal(title, desc) {
  document.getElementById('challenge-title').textContent = title;
  document.getElementById('challenge-desc').textContent = desc;
  document.getElementById('challenge-modal').classList.add('open');
}

// Filtros en Comunidad ("Para ti", "Siguiendo", "Preguntas", "Debates")
function filterFeed(btn, category) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.post-card').forEach(post => {
    if (category === 'all' || post.dataset.category === category) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

// Likes en los posts de Comunidad
function togglePostLike(btn) {
  btn.classList.toggle('liked');
  const span = btn.querySelector('span');
  let val = parseInt(span.textContent, 10);
  if (btn.classList.contains('liked')) {
    btn.firstChild.textContent = '❤️ ';
    span.textContent = val + 1;
  } else {
    btn.firstChild.textContent = '♡ ';
    span.textContent = val - 1;
  }
}


// Filtros y carrito de Tienda
let cartCount = 0;
function addToCart(productName) {
  cartCount++;
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = `🛒 ${cartCount}`;
  alert(`"${productName}" agregado a tu bolsa (${cartCount} artículo/s).`);
}

function filterShop(btn, category) {
  document.querySelectorAll('.shop-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    if (category === 'all' || card.dataset.type === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}


// Modal de Misión en Mapa de Islas
function openIslandModal(title, desc) {
  document.getElementById('island-modal-title').textContent = title;
  document.getElementById('island-modal-desc').textContent = desc;
  document.getElementById('island-mission-modal').classList.add('open');
}

// Filtros en Biblioteca de Técnicas
function filterLibrary(btn, category) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.lib-tech-card').forEach(card => {
    if (category === 'all' || card.dataset.cat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}