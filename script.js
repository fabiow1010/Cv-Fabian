// Cargar datos del JSON y renderizar
async function loadCVData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    renderPerfil(data.perfil);
    renderFormacion(data.formacion);
    renderExperiencia(data.experiencia);
    renderProyectos(data.proyectos);
    renderReferencias(data.referencias);
    renderContacto(data.personal);
  } catch (error) {
    console.error('Error cargando los datos:', error);
  }
}

// Renderizar sección de Perfil
function renderPerfil(perfilText) {
  const container = document.getElementById('perfil-text');
  if (!container) return;
  
  container.textContent = perfilText;
}

// Renderizar sección de Formación
function renderFormacion(formacionArray) {
  const container = document.getElementById('formacion-container');
  if (!container) return;
  
  container.innerHTML = formacionArray.map(item => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${item.titulo}, ${item.año}</h5>
          <p class="card-text"><small class="text-muted">${item.institucion}</small></p>
          <p class="card-text">${item.descripcion}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Renderizar sección de Experiencia
function renderExperiencia(experienciaArray) {
  const container = document.getElementById('experiencia-container');
  if (!container) return;
  
  container.innerHTML = experienciaArray.map(item => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${item.puesto}</h5>
          <p class="card-text"><small class="text-muted">${item.empresa}</small></p>
          <p class="card-text"><small>${item.periodo}</small></p>
          <p class="card-text">${item.descripcion}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Renderizar sección de Proyectos
function renderProyectos(proyectosArray) {
  const container = document.getElementById('proyectos-container');
  if (!container) return;
  
  container.innerHTML = proyectosArray.map(item => {
    let enlaces = '';
    
    // Agregar enlace de repositorio si existe
    if (item.repositorio && item.repositorio.trim()) {
      enlaces += `<a href="${item.repositorio}" target="_blank" class="btn btn-sm btn-outline-primary me-2">
        <i class="bi bi-github"></i> Repositorio
      </a>`;
    }
    
    // Agregar enlace de video si existe
    if (item.video && item.video.trim()) {
      enlaces += `<a href="${item.video}" target="_blank" class="btn btn-sm btn-outline-danger">
        <i class="bi bi-play-circle"></i> Ver Video
      </a>`;
    }
    
    return `
      <div class="col-md-6 col-lg-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${item.nombre}</h5>
            <p class="card-text">${item.descripcion}</p>
            ${enlaces ? `<div class="mt-3">${enlaces}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Renderizar sección de Referencias
function renderReferencias(referenciasArray) {
  const container = document.getElementById('referencias-container');
  if (!container) return;
  
  container.innerHTML = referenciasArray.map(item => `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${item.nombre}</h5>
          <p class="card-text"><strong>${item.puesto}</strong></p>
          <p class="card-text"><small class="text-muted">${item.empresa}</small></p>
          <p class="card-text">${item.descripcion}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Renderizar información de contacto
function renderContacto(personalData) {
  const container = document.getElementById('contacto-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Información de Contacto</h5>
            <p class="card-text">
              <strong>Correo:</strong> <a href="mailto:${personalData.email}">${personalData.email}</a><br>
              <strong>Teléfono:</strong> <a href="tel:${personalData.telefono.replace(/\s/g, '')}">${personalData.telefono}</a><br>
              <strong>Dirección:</strong> ${personalData.direccion}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Cargar datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadCVData);
