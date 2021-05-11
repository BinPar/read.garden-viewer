# Dark Mode (Fear Of The Dark)

![Dark Mode](https://pa1.narvii.com/7754/4477bb19440804a6e56464952e8a942657849bcer1-600-429_hq.gif)

En primer lugar, sin un control adecuado del contenido no existe una solución de 10.

Es un tema ampliamente solicitado y tratado para el estándar. ([https://github.com/w3c/epub-specs/issues/1304](https://github.com/w3c/epub-specs/issues/1304) como ejemplo) pero aún no hay una especificación.

Esencialmente el problema se origina porque nos podemos encontrar distintos tipos de contenidos que, siendo imágenes, deberían tratarse de modos distintos:

Fotografías sin más: que invertidas son un negativo carente de sentido (un árbol morado es raro)

Ilustraciones, gráficos, etc… : que sin invertir te dejan sin retina en el mejor de los casos y en el peor son ilegibles al tener texto negro sobre fondo negro.

Otras cosas pensadas para fondos transparentes: adornos, etc. (son muy parecidas al anterior).

## Soluciones sencillas (CSS)

A partir de aquí aplico la escala Simpson (10 máximo, 0 mínimo, 5 la mitad):

- **Solución A** (nota 2): cambiar el CSS del color del fondo y del texto. Es un desastre porque genera muchos problemas y diferencias entre los estilos especificados y los sin especificar.
- **Solución B** (nota 4): invertir el color de todo (filtro de inversión) funcionando para casi todo, menos las imágenes fotográficas.
- **Solución C** (nota 5): invertir el color de todo (filtro de inversión), incluidos los SVG e invertir a su vez (dos inversiones igual a normal) los tags img y video. (Esta es la del prototipo de PRH).

## Soluciones complejas (CSS + JS)

Incluso la mejor genera muchos problemas por lo que podemos elevar el listo (solo en Read.Garden, casos como el que comenta `Stef` tendrán que elegir entre la B y la C):

- **Solución D** (nota 6): Partiendo de la solución 5, añadir una clase a las imágenes con formato gif y png para no realizar la doble inversión. Sigue sin ser perfecta, porque puede haber pngs sin fondo transparente empleados como fotos y cosas así.
- **Solución F** (nota 7): Como Read Garden espera a que carguen las imágenes para corregir su ancho con una clase css, trás hacer esto (ya con la imagen cargada) ver si al menos 2 de los 4 pixels de las esquinas de la imagen son blancos o transparentes, en este caso podemos interpretar que es una ilustración que espera descansar sobre el fondo.

> Como digo, no hay solución universal, y para funcionar siempre necesitaríamos una gestión específica de los contenidos que no tenemos.
