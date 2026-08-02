# Tailwind CSS v4 + Material UI — demos

🇬🇧 [English version](./README.md)

Código de acompañamiento del post de Lemoncode [Tailwind CSS + Material UI: lo mejor de ambos mundos en tu aplicación de gestión](https://www.lemoncode.net/blog.html).

En el post integramos **Tailwind CSS v4** y **Material UI (v7+)** en una SPA de React — de forma limpia, sin `!important` ni hacks — apoyándonos en una característica de CSS moderno: las **cascade layers** (`@layer`). Además, montamos una única fuente de verdad de tokens de diseño compartida por ambas librerías (modo oscuro incluido) y damos reglas prácticas para decidir quién estila qué.

Este repo contiene el código funcionando de cada paso, más un extra para quienes usan Claude Code.

## Qué hay en cada carpeta

### `00-demo-buttons`

El laboratorio mínimo que usamos en la primera mitad del post: dos botones de MUI, uno de ellos retocado con una clase de utilidad de Tailwind. La integración completa ya está montada (`StyledEngineProvider enableCssLayer` + la declaración de orden de capas con `GlobalStyles` + los tokens compartidos del tema), así que la utilidad gana — abre el panel _Styles_ de las DevTools y verás la historia completa: las reglas de MUI dentro de `@layer mui`, las de Tailwind dentro de `@layer utilities`, y el orden de capas decidiendo quién pinta el botón.

Es el punto de partida perfecto para trastear: rompe el orden de capas a propósito, mira cómo el preflight aplasta al botón de MUI, y entiende el *porqué*.

### `01-demo-client-list`

La pantalla "de verdad" que construimos en la segunda mitad del post: un listado de clientes/empleados con AppBar, barra de búsqueda y filtros, y tabla de datos. Es la regla de oro en acción:

- **MUI pone los componentes**: `Table`, `TextField`, `Chip`, `Avatar`, `AppBar`...
- **Tailwind pone el layout**: flexbox, grid, gaps, anchos — sin `<Stack>`, sin `<Grid>`, sin `sx`.
- **Una única fuente de verdad para los tokens de diseño**: el tema de MUI publica variables CSS (`cssVariables`), Tailwind las consume con `@theme inline`, y `bg-primary` pinta exactamente el mismo color que `<Button color="primary">`.
- **Modo oscuro de regalo**: el `useColorScheme` de MUI cambia una clase en `<html>` y las dos librerías cambian a la vez, sincronizadas.

### `02-skill`

Un [skill de Claude Code](https://code.claude.com/docs/en/skills) que destila la guía del post en reglas operativas: la receta exacta de setup, la configuración de tokens compartidos, la tabla de decisión de "quién estila qué" y la lista de errores a evitar. Con el skill instalado, Claude aplica estas convenciones automáticamente al escribir o revisar componentes en un proyecto con Tailwind + MUI.

Para usarlo, copia la carpeta `tailwind-mui` al directorio `.claude/skills/` de tu proyecto (así viaja por git a todo el equipo), o a `~/.claude/skills/` para tenerlo disponible en todos tus proyectos.

## Arrancar las demos

Cada demo es un proyecto Vite independiente:

```bash
cd 00-demo-buttons   # o 01-demo-client-list
npm install
npm run dev
```

Después abre las DevTools, inspecciona los botones y trastea con las capas — es la mejor forma de que se te quede.

## Acerca de Lemoncode

En [Lemoncode](https://www.lemoncode.net/) somos un equipo de desarrolladores con muchos años de experiencia construyendo aplicaciones reales y formando a otros desarrolladores. Ofrecemos:

- **Formación**: bootcamps y cursos de frontend, backend y DevOps, impartidos por profesionales en activo.

- **Consultoría y desarrollo**: llevamos un montón de proyectos a nuestras espaldas creando aplicaciones de gestión (Material UI incluido), con los desafíos habituales ya resueltos y rodados: autenticación, autorización, gestión de formularios, estilos e imagen corporativa, datos globales, caché...

¿Te echamos una mano con tu proyecto? Escríbenos a [info@lemoncode.net](mailto:info@lemoncode.net) y cuéntanos tu caso — estaremos encantados de escucharte.
