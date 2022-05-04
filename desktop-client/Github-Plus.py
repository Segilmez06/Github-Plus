from tkinter import *
from tkinter import filedialog

from http.server import BaseHTTPRequestHandler, HTTPServer
from git import Repo

import sys

print("Github Plus client by Segilmez06")

hostName = "localhost"
serverPort = 1592

cloneHTML = '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Github Plus</title> <style>html, body{padding: 0; border: 0; margin: 0; height: 100%; width: 100%;}body{background-image: linear-gradient(45deg, #7b1d83, #0011ff);}.htitle{font-size: 30px; text-align: center; font-family: "Helvetica Neue",Helvetica,Arial; color: rgb(255, 255, 255); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}</style> <script>setTimeout(()=>{window.close();}, 750); </script></head><body> <h1 class="htitle">Cloning started. You can close this tab. Check for folder selection window.</h1></body></html>'
healthMSG = "OK"

pyVer = sys.version_info
print("Using Python version %s.%s.%s" % (pyVer[0],pyVer[1],pyVer[2]))

def clone(req):
    gitlink = req
    print("Using repo %s" % gitlink)
    print("Choosing folder to clone")
    Tk().withdraw()
    path = filedialog.askdirectory(title='Select a folder to clone the repo', initialdir='~/Desktop')
    if path != "" and gitlink != "":
        print("Selected directory is %s" % path)
        print("Starting cloning")
        Repo.clone_from(gitlink, path)
        print("Done")
    else:
        print("Cancelled")


class HTTPHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        return
    def do_GET(self):
        req = self.path[1:]
        if req == "KillGHPlusSession":
            print("Exit requested")
            webServer.__exit__()
            exit()

        elif req == "CheckGHPlusSession":
            print("Check requested")
            self.send_response(200)
            self.send_header("Content-type", "text")
            self.end_headers()
            self.wfile.write(bytes(healthMSG, "utf-8"))

        elif req.startswith("https://github.com/"):
            print("Clone requested")
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(cloneHTML, "utf-8"))

            clone(req)

print("Starting HTTP server")
webServer = HTTPServer((hostName, serverPort), HTTPHandler)
print("Server hosted on http://%s:%s" % (hostName, serverPort))
webServer.serve_forever()