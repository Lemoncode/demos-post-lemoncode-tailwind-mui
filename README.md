# Tailwind CSS v4 + Material UI — demos

🇪🇸 [Versión en español](./README_ES.md)

Companion code for the Lemoncode blog post [Tailwind CSS + Material UI: the best of both worlds for your admin app](https://www.lemoncode.net/blog.html) (in Spanish).

The post walks through integrating **Tailwind CSS v4** and **Material UI (v7+)** in a React SPA — cleanly, with no `!important` and no hacks — by leaning on a modern CSS feature: **cascade layers** (`@layer`). It also shows how to share a single set of design tokens between both libraries (including dark mode) and lays out practical rules for deciding who styles what.

This repo contains the working code for every step, plus a bonus for Claude Code users.

## What's inside

### `00-demo-buttons`

The minimal lab used throughout the first half of the post: two MUI buttons, one of them tweaked with a Tailwind utility class. The full integration is already wired up (`StyledEngineProvider enableCssLayer` + the `GlobalStyles` layer-order declaration + shared theme tokens), so the utility wins — open the DevTools _Styles_ panel and you can see the whole story: MUI's rules inside `@layer mui`, Tailwind's inside `@layer utilities`, and the layer order deciding who paints the button.

Great starting point to experiment: break the layer order on purpose, watch the preflight crush the MUI button, and understand _why_.

### `01-demo-client-list`

The real-world screen built in the second half of the post: a client/employee list with an AppBar, search + filter bar, and a data table. It showcases the golden rule in action:

- **MUI provides the components**: `Table`, `TextField`, `Chip`, `Avatar`, `AppBar`...
- **Tailwind provides the layout**: flexbox, grid, gaps, widths — no `<Stack>`, no `<Grid>`, no `sx`.
- **One single source of truth for design tokens**: the MUI theme publishes CSS variables (`cssVariables`), Tailwind consumes them via `@theme inline`, so `bg-primary` paints exactly the same color as `<Button color="primary">`.
- **Dark mode for free**: MUI's `useColorScheme` toggles a class on `<html>`, and both libraries switch in sync.

### `02-skill`

A [Claude Code skill](https://code.claude.com/docs/en/skills) that distills the post's guidance into operational rules: the exact setup recipe, the token-sharing configuration, a "who styles what" decision table, and a list of mistakes to avoid. With the skill installed, Claude applies these conventions automatically when writing or reviewing components in a Tailwind + MUI project.

To use it, copy the `tailwind-mui` folder into your project's `.claude/skills/` directory (shared with your team through git), or into `~/.claude/skills/` to have it available in all your projects.

## Running the demos

Each demo is a standalone Vite project:

```bash
cd 00-demo-buttons   # or 01-demo-client-list
npm install
npm run dev
```

Then open the DevTools, inspect the buttons, and play with the layers — it is the best way to make it stick.
