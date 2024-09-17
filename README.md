# Analizador de mercado

Herramienta para el análisis de acciones. Alimentada por yahoo finance, esta app busca llegar a tener una interfáz de usuario amigable e intuitiva junto con un modelo predictivo lo suficientemente robusto que funcione para toma de deciciones. Puede acceder a la página web haciendo click [aquí](https://davases22.pythonanywhere.com/)


## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

Este aplicativo web toma información de Yahoo finance a través de su API y la muestra de manera amigable, se está trabajando en un modelo de aprendizaje máquina que pueda realizar recomendaciones a de inversión basadas no solamente en comportamientos pasados sino, usando Web scraping, también en como noticas de esos memomentos repercutieron en el mercado.

## Características

- Adicionar o eliminar títulos de acciones de interés.
- Visualizar datos relevantes como precio de apertura, precio actual, cambios relativos y absolutos.
- Visualización por colores para identificar rápidamente decrementos e incrementos.

## Tecnologías Utilizadas

- **Flask**: Para el backend de la aplicación.
- **yFinance**: Para obtener datos financieros.
- **HTML/CSS/JavaScript**: Para el frontend y la interacción del usuario.
- **Chart.js**: Para visualizar gráficos.

## Instalación

1. **Clona el Repositorio**

```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
```
Configura un Entorno Virtual (Opcional pero recomendado)

```bash
python -m venv venv
source venv/bin/activate  # En Windows usa: venv\Scripts\activate
```
Instala las Dependencias

```bash
pip install -r requirements.txt
```
Uso
Inicia la Aplicación

```bash
python flask_app.py
```
Accede a la Aplicación

Abre tu navegador web y ve a https://davases22.pythonanywhere.com/

Cómo Utilizar la Aplicación

Al abrir el [App web](https://davases22.pythonanywhere.com/) se encontrará con la siguiente interfáz:
<img src="git_img/inicial.png" alt="Logo del Proyecto" width="755">

Puede adicionar el título de la o las acciones que desee como AAPL (Apple) y BA (The Boeing Company) para ver su información:
<img src="git_img/NEUTRAL.png" alt="Logo del Proyecto" width="555">

La app cada vez que se actualice se coloreará rojo, verde o gris dependiendo de qué cambios haya tenido la acción:
<img src="git_img/VERDE-GRIS.png" alt="Logo del Proyecto" width="555">
<img src="git_img/VERDE-ROJO.png" alt="Logo del Proyecto" width="555">

También puede visualizar el contenido en dispositivos móviles:
<img src="git_img/iPhone.png" alt="Logo del Proyecto" width="755">

Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
Realiza tus cambios.
Haz commit de tus cambios (git commit -am 'Añadir nueva característica').
Empuja la rama (git push origin feature/nueva-caracteristica).
Crea un pull request.
Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por visitar mi proyecto!

## Contacto
Mi nombre es David Espejo y desarrollé el app:

¡Estoy siempre disponible para colaborar y discutir ideas interesantes! Puedes encontrarme en las siguientes plataformas:

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/david-alejandro-espejo-garcia-298808216/) 
[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://x.com/DavidEs91503087)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Davases22)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/davases22/)
[![YouTube](https://img.shields.io/badge/-YouTube-FF0000?style=flat&logo=youtube&logoColor=white)](https://www.youtube.com/@davasplayg2802)


Si quieres hablar sobre tecnología, startups o simplemente saludar, ¡no dudes en enviarme un mensaje!  
📧 Email: [davas.espejo@gmail.com](mailto:davas.espejo@gmail.com)
📧 Email: [davidespejo@espejoyasociados.com](mailto:davidespejo@espejoyasociados.com) 
