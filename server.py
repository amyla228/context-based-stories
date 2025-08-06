#!/usr/bin/env python3
import http.server
import socketserver
import ssl
import os

# Create a self-signed certificate for HTTPS
def create_self_signed_cert():
    if not os.path.exists('cert.pem'):
        os.system('openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"')

# Create certificate
create_self_signed_cert()

# Set up the server
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

# Create HTTP server
httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)

# Wrap with SSL
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain('cert.pem', 'key.pem')
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print(f"HTTPS Server running on https://0.0.0.0:{PORT}")
print("Access from mobile: https://10.0.0.223:8000")
print("Note: You may need to accept the security warning in your browser")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server...")
    httpd.shutdown() 