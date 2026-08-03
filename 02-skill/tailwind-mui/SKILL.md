---
name: tailwind-mui
description: Integración y convenciones para proyectos React que combinan Tailwind CSS v4 y Material UI (MUI v7+). Usar SIEMPRE al crear, modificar o revisar componentes/pantallas en un proyecto que use ambas librerías, al configurar la integración desde cero, o al decidir cómo estilar algo (prop de MUI vs clase de Tailwind vs tema).
---

# Tailwind CSS v4 + Material UI: integración y convenciones

Guía operativa basada en el post de Lemoncode "Tailwind CSS + Material UI: lo mejor de ambos mundos". Regla de oro: **MUI pone los componentes; Tailwind pone el layout. El tema de MUI es la única fuente de verdad de los tokens de diseño.**

## Setup de la integración (hazlo exactamente así)

Requiere: Tailwind CSS 4.x (`@tailwindcss/vite`) y MUI v7+ (`@mui/material` + Emotion).

1. `vite.config.ts`: plugin `tailwindcss()` junto a `react()`.
2. `src/index.css` empieza con `@import "tailwindcss";` — **NUNCA declares aquí el orden de capas con `mui`** (ver "Errores que no debes cometer").
3. Punto de entrada (`main.tsx`):

```tsx
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";

<StyledEngineProvider enableCssLayer>
  <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
</StyledEngineProvider>;
```

Por qué funciona: `enableCssLayer` envuelve los estilos de Emotion/MUI en `@layer mui`; la declaración de orden vía `GlobalStyles` viaja dentro de Emotion, que inserta sus `<style>` al principio del `<head>`, así que es lo primero que ve el navegador y fija la pila `theme < base < mui < components < utilities` (las utilidades de Tailwind ganan a MUI; MUI gana al preflight).

## Tokens compartidos (tematización)

Dirección única: **MUI define, Tailwind consume**. Nunca al revés — MUI necesita valores reales en JS para calcular hover, contraste y variantes; no puede con un `var()` opaco.

- Tema MUI con `cssVariables: { colorSchemeSelector: "class" }` y `colorSchemes: { light: {...}, dark: {...} }` → MUI publica `--mui-palette-*` como variables CSS y cambia de modo con la clase `.dark` en `<html>`.
- En `index.css`, mapea con `@theme inline` (el `inline` es obligatorio: sin él la indirección se congela en `:root` y el modo oscuro no se propaga):

```css
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-primary: var(--mui-palette-primary-main);
  --color-secondary: var(--mui-palette-secondary-main);
  --color-surface: var(--mui-palette-background-paper);
  --color-background: var(--mui-palette-background-default);
  --color-foreground: var(--mui-palette-text-primary);
  --color-muted: var(--mui-palette-text-secondary);
  --color-divider: var(--mui-palette-divider);
}
```

- Modo oscuro: toggle con `useColorScheme()` de MUI; la variante `dark:` de Tailwind queda sincronizada sola vía la clase.

## Quién estila qué (aplícalo al escribir y al revisar)

| Quieres...                                                    | Herramienta                                               |
| ------------------------------------------------------------- | --------------------------------------------------------- |
| Colocar cosas en pantalla (layout, espaciado, anchos)         | Tailwind (`flex`, `grid`, `gap-*`, `p-*`, `w-*`)          |
| Una variante que el componente ya modela                      | Prop de MUI (`color`, `size`, `variant`)                  |
| Ajuste visual puntual y estático que el componente no modela  | Utility de Tailwind (p. ej. `bg-primary` en `Avatar`)     |
| Texto dentro de una composición MUI (Toolbar, DialogTitle...) | `Typography`                                              |
| Texto suelto de pantalla                                      | Sin bala de plata: `Typography` o HTML + utilidades (ver abajo); por defecto sigue el criterio del proyecto |
| Aspecto por defecto de un componente en toda la app           | Tema (`styleOverrides`) o wrapper                         |
| Slots internos de un componente MUI                           | Tema o wrapper (nunca en la pantalla)                     |

Regla de bolsillo: lo que arrastra estados o valores derivados (hover, foco, disabled, contraste) se pide a MUI; lo estático y puntual, con una utility; colocar cosas, siempre Tailwind.

### Textos: dos criterios válidos, elige uno y sé consistente

`Typography` es el componente de texto de MUI: `variant` pide un escalón de la escala tipográfica del tema y `component` controla por separado la etiqueta HTML renderizada (`variant="h5" component="h2"` se ve como h5 pero es un `<h2>` semántico); resuelve el color por contexto (`color="text.secondary"`, herencia del contraste dentro de un `AppBar`).

- **Opción A — `Typography` para todo** (la que siguen las demos del post): una decisión menos, código homogéneo, escala del tema aplicada sin pensar. En contra: más imports de MUI en código de aplicación y migración de librería más costosa (mitigable con wrappers `<Heading>`/`<Text>`, aunque siempre habrá adaptaciones).
- **Opción B — diferenciar según contexto**: `Typography` solo dentro de composiciones MUI; HTML semántico + utilidades (`<h2 className="text-2xl font-medium">`) para el texto suelto de pantalla. En contra: hay que decidir texto a texto y la frontera difusa genera inconsistencias.

Si el proyecto no tiene un criterio escrito, usa la opción A. En cualquier caso: dentro de una composición MUI, siempre `Typography` — ahí no hay debate.

## Errores que no debes cometer

- ❌ `@layer theme, base, mui, ...` declarado en `index.css` en vez de en `GlobalStyles`: Emotion inyecta sus bloques `@layer mui` antes en el documento, la primera aparición fija la posición, `mui` cae debajo de `base` y el preflight aplasta los componentes MUI.
- ❌ Colorear un componente con utility cuando existe la prop (`className="bg-secondary"` en un `Button`): la utility vive en `utilities`, la capa más alta, y le gana también a las reglas `:hover` y `.Mui-disabled` de la capa `mui` → estados congelados. Usa `color="secondary"`.
- ❌ Recomponer estados a mano (`hover:bg-*`, `disabled:bg-*`) sobre un componente MUI: señal de camino equivocado; usa la prop o el tema.
- ❌ `sx` o `styled()` en pantallas/código de aplicación: prohibidos fuera del tema y de la librería de wrappers. En pantallas, todo con `className`.
- ❌ Colores hardcodeados (`bg-[#6d28d9]`, `bg-violet-700`) para identidad de marca: usa los tokens (`bg-primary`). Paletas de serie de Tailwind solo para lo que no es marca.
- ❌ La misma utility copiada sobre el mismo tipo de componente 3+ veces: ya no es ajuste puntual, es identidad visual → muévelo a `styleOverrides` del tema o al wrapper.
- ❌ Definir colores en `@theme` de Tailwind y pasarlos a `createTheme` con `var()`: dirección invertida, MUI no puede calcular derivados.
- ❌ `<Stack spacing>`, `<Grid>`, `<Box sx>` para layout: usa utilidades de Tailwind.

## Proyectos grandes

- Envuelve MUI en wrappers finos (`common/components`): la app importa tu API, no `@mui/material`.
- Si los componentes se usarán en varios proyectos: promociona la carpeta a paquete propio, y saca los tokens de marca a un paquete agnóstico de librería que alimente el `createTheme`.
