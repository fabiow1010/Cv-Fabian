"""Genera la hoja de vida Markdown desde la única fuente: data.json."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def generar(data):
    p = data.get('personal', {})
    lines = [f"# {p.get('nombre', '')}", '', f"**{p.get('titulo', '')}**", '',
             '## Información de contacto',
             f"- **Correo:** {p.get('email', '')}",
             f"- **Teléfono:** {p.get('telefono', '')}",
             f"- **Dirección:** {p.get('direccion', '')}", '',
             '## Perfil profesional', data.get('perfil', ''), '',
             '## Formación académica']
    for x in data.get('formacion', []):
        lines += [f"### {x.get('titulo', '')} — {x.get('año', '')}",
                  f"**{x.get('institucion', '')}**", x.get('descripcion', ''), '']
    lines += ['## Experiencia laboral']
    for x in data.get('experiencia', []):
        lines += [f"### {x.get('puesto', '')}",
                  f"**{x.get('empresa', '')}** | {x.get('periodo', '')}",
                  x.get('descripcion', ''), '']
    lines += ['## Proyectos']
    for x in data.get('proyectos', []):
        lines += [f"### {x.get('nombre', '')}", x.get('descripcion', '')]
        if x.get('repositorio'):
            lines.append(f"[Repositorio]({x['repositorio']})")
        if x.get('video'):
            lines.append(f"[Video]({x['video']})")
        lines.append('')
    lines += ['## Referencias laborales']
    for x in data.get('referencias', []):
        lines += [f"### {x.get('nombre', '')}",
                  f"**{x.get('puesto', '')}** — {x.get('empresa', '')}",
                  x.get('descripcion', ''), '']
    lines += ['## Idiomas']
    for x in data.get('idiomas', []):
        lines.append(f"- **{x.get('idioma', '')}:** {x.get('nivel', '')}")
    return '\n'.join(lines).rstrip() + '\n'


def main():
    data = json.loads((ROOT / 'data.json').read_text(encoding='utf-8'))
    (ROOT / 'hoja_vida.md').write_text(generar(data), encoding='utf-8')
    print('hoja_vida.md actualizado desde data.json')


if __name__ == '__main__':
    main()
