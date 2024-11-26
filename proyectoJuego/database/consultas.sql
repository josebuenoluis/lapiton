use juego;

-- Consulta para devolver todos los puntajes --
SELECT nombre,puntos,dificultad
from usuarios;

-- Consulta para devolver los 10 mejores jugadores --
SELECT nombre,puntos,dificultad
from usuarios
ORDER BY puntos desc
LIMIT 10;

SHOW FULL TABLES;
