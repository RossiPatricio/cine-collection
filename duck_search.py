import requests
from bs4 import BeautifulSoup
import urllib.parse

def duck_search(termino):
    url = f"https://duckduckgo.com/html/?q={termino}"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    resultados = []
    for first_url in soup.select(".result__title a"):
        enlace = first_url["href"]
        resultados.append(enlace)
    
    return resultados[:1]

def get_url(search):
    input = f'imdb {search}'
    result = duck_search(input)
    if result:
        enlace = result[0]
        parsed = urllib.parse.urlparse(enlace)
        if parsed.path.startswith("/l/"):
            params = urllib.parse.parse_qs(parsed.query)
            final_url = params.get("uddg", [None])[0]
            return final_url
