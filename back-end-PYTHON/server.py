import json
import os
import signal
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Configuration
PORT = 3001
DATA_PATH = os.path.join(os.path.dirname(__file__), 'people.json')

# Helper to read/write JSON
def load_db():
    try:
        if os.path.exists(DATA_PATH):
            with open(DATA_PATH, 'r') as f:
                return json.load(f)
        return []
    except Exception as e:
        print(f"Error loading DB: {e}")
        return []

def save_db(data):
    try:
        with open(DATA_PATH, 'w') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving DB: {e}")

class TalentRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        # CORS Headers - Crucial for local dev with Next.js
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        # Handle CORS preflight
        self._set_headers(204)

    def do_GET(self):
        if self.path == '/api/people':
            people = load_db()
            self._set_headers()
            self.wfile.write(json.dumps(people).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'Not Found'}).encode('utf-8'))

    def do_POST(self):
        if self.path == '/api/people':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            new_guy = json.loads(body)
            
            people = load_db()
            people.insert(0, new_guy)
            save_db(people)
            
            self._set_headers(201)
            self.wfile.write(json.dumps(new_guy).encode('utf-8'))
        else:
            self._set_headers(404)

    def do_PUT(self):
        if self.path == '/api/people':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            updated_person = json.loads(body)
            
            people = load_db()
            updated = False
            for i, p in enumerate(people):
                if p['id'] == updated_person['id']:
                    people[i] = updated_person
                    updated = True
                    break
            
            if updated:
                save_db(people)
                self._set_headers()
                self.wfile.write(json.dumps(updated_person).encode('utf-8'))
            else:
                self._set_headers(404)
        else:
            self._set_headers(404)

    def do_DELETE(self):
        parsed_url = urlparse(self.path)
        if parsed_url.path == '/api/people':
            params = parse_qs(parsed_url.query)
            person_id = params.get('id', [None])[0]
            
            if person_id:
                people = load_db()
                filtered = [p for p in people if p['id'] != person_id]
                save_db(filtered)
                self._set_headers()
                self.wfile.write(json.dumps({'success': True}).encode('utf-8'))
            else:
                self._set_headers(400)
                self.wfile.write(json.dumps({'error': 'ID required'}).encode('utf-8'))
        else:
            self._set_headers(404)


def run(server_class=HTTPServer, handler_class=TalentRequestHandler):
    server_address = ('', PORT)
    httpd = server_class(server_address, handler_class)
    print(f"Talent Ops Python Backend running on http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

if __name__ == '__main__':
    run()
