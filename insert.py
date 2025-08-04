import psycopg2
from scraping_imdb import *
from duck_search import *

conn = psycopg2.connect(
    database="peliculas_imdb",
    user="postgres",
    password="010001101000",
    host="localhost",
    port="5432"
)

diccionario = {
    'title': '',
    'director': '',
    'synopsis': '',
    'team': '',
    'poster': '',
}

def movie_info(element):
    print(f'Searching {element}')
    url = get_url(element)
    content = scrap_imdb(url)
    return content

def insertar_pelicula(conn, title, director, synopsis, team,poster):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO peliculas (title, director, synopsis, team, poster) VALUES (%s, %s, %s, %s, %s)",
            (title, director, synopsis, team,poster)
        )
        conn.commit()

with open('peliculas.txt', 'r') as archivo:
    for linea in archivo:
        linea = linea.strip()
        resultado = movie_info(linea)
        
        if resultado:
            print(f'Adding {resultado['title']}')
            print()
            title = resultado['title']
            director = resultado['director']
            synopsis = resultado['synopsis']
            team = resultado['team']
            poster = resultado['poster']
            insertar_pelicula(conn, title, director, synopsis, team, poster)

conn.close()
