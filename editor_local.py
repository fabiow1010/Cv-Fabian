"""Servidor de edición exclusivamente local, sin dependencias externas."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import json
import webbrowser
from generar_md import generar

ROOT = Path(__file__).resolve().parent
HOST, PORT = '127.0.0.1', 8765

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if urlsplit(self.path).path != '/api/guardar':
            self.send_error(404)
            return
        try:
            size = int(self.headers.get('Content-Length', '0'))
            if size < 2 or size > 2_000_000:
                raise ValueError('Tamaño de datos no permitido')
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict):
                raise ValueError('El contenido debe ser un objeto JSON')
            for section in ('experiencia', 'proyectos', 'referencias', 'formacion', 'idiomas'):
                if not isinstance(data.get(section), list):
                    raise ValueError(f'La sección {section} debe ser una lista')
                if any(not isinstance(item, dict) for item in data[section]):
                    raise ValueError(f'Elementos inválidos en {section}')
            if not isinstance(data.get('personal'), dict) or not isinstance(data.get('perfil'), str):
                raise ValueError('Información personal o perfil inválidos')
            contenido = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
            markdown = generar(data)
            (ROOT / 'data.json').write_text(contenido, encoding='utf-8')
            (ROOT / 'hoja_vida.md').write_text(markdown, encoding='utf-8')
            response = json.dumps({'ok': True, 'mensaje': 'Datos y Markdown guardados'}).encode()
            self.send_response(200)
        except (ValueError, json.JSONDecodeError, OSError) as e:
            response = json.dumps({'ok': False, 'error': str(e)}).encode()
            self.send_response(400)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(response)))
        self.end_headers()
        self.wfile.write(response)

    def end_headers(self):
        if not self._headers_buffer or not any(b'X-Content-Type-Options:' in x for x in self._headers_buffer):
            self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

if __name__ == '__main__':
    url = f'http://{HOST}:{PORT}/editor.html'
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f'Editor local: {url}\nDetener con Ctrl+C')
    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServidor detenido')
    finally:
        server.server_close()
