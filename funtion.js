// Script para cargar datos desde datos.json y renderizar dinámicamente
// Se ejecuta después de que el DOM esté cargado.
document.addEventListener('DOMContentLoaded', () => {
	loadAndRender();
});

async function loadAndRender() {
	try {
		const res = await fetch('datos.json');
		if (!res.ok) throw new Error('No se pudo cargar datos.json: ' + res.statusText);
		const data = await res.json();

		// Renderizar secciones
		renderExperience(data.experience || [], data.references || []);
		renderEducation(data.education || []);
		renderProjects(data.projects || []);
		renderReferences(data.references || []);
	} catch (err) {
		console.error('Error cargando o renderizando datos:', err);
	}
}

function findReference(references, id) {
	return (references || []).find(r => r.id === id) || null;
}

function formatPeriod(start, end) {
	if (!start && !end) return '';
	if (!end) return start;
	return `${start} - ${end}`;
}

function renderExperience(experiences, references) {
	const section = document.getElementById('experience');
	if (!section) return;
	// Buscar o crear contenedor .row.g-4
	let row = section.querySelector('.row.g-4');
	if (!row) {
		row = document.createElement('div');
		row.className = 'row g-4';
		section.appendChild(row);
	}
	row.innerHTML = '';

	experiences.forEach(item => {
		const col = document.createElement('div');
		col.className = 'col-md-6 col-lg-4';

		const ref = findReference(references, item.referenceId);
		const refLink = ref ? `<a href="#${ref.id}" class="card-link">Referencia: ${escapeHtml(ref.name)}</a>` : '';

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(item.title)}</h5>
                    <p class="card-text">${escapeHtml(formatPeriod(item.start, item.end))}<br />${escapeHtml(item.description || '')}</p>
                    ${ref ? `<a href="#${ref.id}" class="btn btn-primary">Referencia: ${escapeHtml(ref.name)}</a>` : ''}
                </div>
            </div>
        `;

		row.appendChild(col);
	});
}

function renderProjects(projects) {
	const section = document.getElementById('projects');
	if (!section) return;
	// Eliminar contenido existente y crear un contenedor
	section.querySelectorAll('.card, .ratio').forEach(n => n.remove());

	projects.forEach(p => {
		const card = document.createElement('div');
		card.className = 'card shadow-sm mb-4';
		const body = document.createElement('div');
		body.className = 'card-body';

		const repoHtml = p.repo ? `<a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">Repositorio</a>` : '';

        body.innerHTML = `
            <h5 class="card-title">${escapeHtml(p.title)}</h5>
            <p class="card-text">${escapeHtml(p.description || '')}</p>
            ${p.repo ? '<a href="' + escapeHtml(p.repo) + '" target="_blank" rel="noopener" class="btn btn-primary">Repositorio</a>' : ''}
        `;

		card.appendChild(body);
		section.appendChild(card);

		if (p.videoId) {
			const wrapper = document.createElement('div');
			wrapper.className = 'ratio ratio-16x9 padding-bottom mb-4';
			wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(p.videoId)}" title="YouTube video player" allowfullscreen></iframe>`;
			section.appendChild(wrapper);
		}
	});
}

function renderEducation(education) {
	const section = document.getElementById('formacion');
	if (!section) return;
	// Buscar o crear contenedor .row.g-4
	let row = section.querySelector('.row.g-4');
	if (!row) {
		row = document.createElement('div');
		row.className = 'row g-4';
		section.appendChild(row);
	}
	row.innerHTML = '';

	education.forEach(item => {
		const col = document.createElement('div');
		col.className = 'col-md-6 col-lg-4';

		col.innerHTML = `
			<div class="card h-100 shadow-sm">
				<div class="card-body">
					<h5 class="card-title">${escapeHtml(item.title)}</h5>
					<h6 class="card-subtitle mb-2 text-muted">${escapeHtml(item.institution || '')}</h6>
					<p class="card-text">${escapeHtml(formatPeriod(item.start, item.end))}<br/>${escapeHtml(item.description || '')}</p>
				</div>
			</div>
		`;

		row.appendChild(col);
	});
}

function renderReferences(references) {
	const section = document.getElementById('references');
	if (!section) return;
	let row = section.querySelector('.row.g-4');
	if (!row) {
		row = document.createElement('div');
		row.className = 'row g-4';
		section.appendChild(row);
	}
	row.innerHTML = '';

	references.forEach(r => {
		const col = document.createElement('div');
		col.className = 'col-md-6 col-lg-4';

		const card = document.createElement('div');
		card.className = 'card h-100 shadow-sm';
		card.id = r.id; // permite enlaces desde experiencia

		const body = document.createElement('div');
		body.className = 'card-body';
		body.innerHTML = `
			<h5 class="card-title">${escapeHtml(r.name)}</h5>
			<p>${escapeHtml(r.role || '')}${r.notes ? ' - ' + escapeHtml(r.notes) : ''}</p>
			<p>Email: <a href="mailto:${encodeURIComponent(r.email)}">${escapeHtml(r.email)}</a></p>
			<p>Teléfono: <a href="${escapeHtml(r.whatsapp || '')}" target="_blank" rel="noopener">${escapeHtml(r.phone || '')}</a></p>
		`;

		card.appendChild(body);
		col.appendChild(card);
		row.appendChild(col);
	});
}

// pequeño escape para evitar inyección de HTML al insertar texto
function escapeHtml(str) {
	if (str === null || str === undefined) return '';
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

