const config = {
  experiencia: { nombre: 'Experiencias', campos: [['puesto','Cargo'],['empresa','Empresa'],['periodo','Periodo'],['descripcion','Funciones / descripción']] },
  proyectos: { nombre: 'Proyectos', campos: [['nombre','Nombre del proyecto'],['descripcion','Descripción'],['repositorio','Repositorio (URL)'],['video','Video (URL)']] },
  referencias: { nombre: 'Referencias', campos: [['nombre','Nombre'],['puesto','Cargo'],['empresa','Empresa'],['descripcion','Relación / descripción']] },
  formacion: { nombre: 'Formación', campos: [['titulo','Título'],['institucion','Institución'],['año','Año'],['descripcion','Descripción']] },
  idiomas: { nombre: 'Idiomas', campos: [['idioma','Idioma'],['nivel','Nivel']] },
  personal: { nombre: 'Información personal', campos: [['nombre','Nombre'],['titulo','Título profesional'],['email','Email'],['telefono','Teléfono'],['direccion','Dirección'],['foto','Ruta de foto']] },
  perfil: { nombre: 'Perfil', campos: [['perfil','Perfil profesional']] }
};
let cv, actual = 'experiencia', cambios = false;
const $ = id => document.getElementById(id);
function el(tag, cls, text) { const e = document.createElement(tag); if(cls)e.className=cls; if(text!==undefined)e.textContent=text; return e; }
function aviso(texto, error=false) { $('estado').textContent=texto; $('estado').className=error?'text-danger':'text-success'; }
function marcar() { cambios=true; aviso('Cambios pendientes de guardar', true); }
function campo(obj, clave, etiqueta, largo=false) {
  const grupo=el('div','mb-3'); const label=el('label','form-label',etiqueta);
  const input=el(largo?'textarea':'input','form-control');
  if(!largo) input.type='text'; else input.rows=3;
  input.value=obj[clave]||'';
  input.addEventListener('input',()=>{obj[clave]=input.value; marcar();});
  grupo.append(label,input); return grupo;
}
function render() {
  $('pestanas').replaceChildren();
  Object.entries(config).forEach(([id,c])=>{
    const li=el('li','nav-item'), a=el('button',`nav-link ${actual===id?'active':''}`,c.nombre);
    a.type='button'; a.onclick=()=>{actual=id;render();}; li.append(a); $('pestanas').append(li);
  });
  const cont=$('contenido');cont.replaceChildren();const meta=config[actual];
  cont.append(el('h2','h4 mb-3',meta.nombre));
  if(actual==='perfil') { cont.append(campo(cv,'perfil','Perfil profesional',true));return; }
  if(actual==='personal') { meta.campos.forEach(([key,name])=>cont.append(campo(cv.personal,key,name)));return; }
  (cv[actual]||[]).forEach((item,i)=>{
    const card=el('section','entry'); const head=el('div','entry-head');
    head.append(el('strong','',`${i+1}. ${item[meta.campos[0][0]]||'Nuevo registro'}`));
    const acciones=el('div','d-flex gap-1 flex-wrap');
    [['↑',-1],['↓',1]].forEach(([txt,delta])=>{
      const btn=el('button','btn btn-outline-secondary btn-sm',txt);btn.type='button';btn.title='Cambiar orden';
      btn.disabled=i+delta<0||i+delta>=cv[actual].length;
      btn.onclick=()=>{[cv[actual][i],cv[actual][i+delta]]=[cv[actual][i+delta],cv[actual][i]];marcar();render();};acciones.append(btn);
    });
    const borrar=el('button','btn btn-outline-danger btn-sm','Eliminar');borrar.type='button';
    borrar.onclick=()=>{if(confirm('¿Eliminar este registro?')){cv[actual].splice(i,1);marcar();render();}};acciones.append(borrar);
    head.append(acciones);card.append(head);
    meta.campos.forEach(([key,name])=>card.append(campo(item,key,name,key==='descripcion')));
    cont.append(card);
  });
  const agregar=el('button','btn btn-outline-primary mb-5','+ Agregar '+meta.nombre.toLowerCase().replace(/s$/,''));
  agregar.type='button';agregar.onclick=()=>{cv[actual].push(Object.fromEntries(meta.campos.map(([k])=>[k,''])));marcar();render();};cont.append(agregar);
}
async function guardar() {
  const b=$('guardar');b.disabled=true;aviso('Guardando...');
  try {const r=await fetch('/api/guardar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(cv)});
    const result=await r.json();if(!r.ok||!result.ok)throw Error(result.error||'Error al guardar');
    cambios=false;aviso('Guardado correctamente: data.json y hoja_vida.md');
  } catch(e){aviso('No se pudo guardar: '+e.message,true);}finally{b.disabled=false;}
}
$('guardar').addEventListener('click',guardar);
window.addEventListener('beforeunload',e=>{if(cambios){e.preventDefault();e.returnValue='';}});
(async()=>{try{const r=await fetch('data.json',{cache:'no-store'});if(!r.ok)throw Error('Error de lectura');cv=await r.json();render();}
catch(e){aviso('Abre este editor con python editor_local.py: '+e.message,true);}})();
