# Rules

## Never do

- Do not use `any` unless explicitly asked.
- Do not run or suggest terminal commands unless necessary.
- Do not install packages unless clearly necessary and approved.
- Do not add tests unless explicitly asked.
- Do not add redundant comments; only explain non-obvious logic.

## Styling

- Do not add complex styling unless required.
- Do not add dark mode, themes, or design systems unless asked.
- Do not add animations or transitions unless explicitly requested.
- Do not over-style components.
- Do not introduce custom CSS unless necessary.

- Prefer simple, clean layouts.
- Prefer Tailwind utility classes.
- Focus on clarity and usability over visual polish.

## Code style

- Use Vue 3 `<script setup lang="ts">`.
- Use TypeScript types; avoid `any`.
- Use Tailwind for styling.
- Prefer explicit, descriptive variable and function names.

## Unit testing

- Use `data-testid` attributes when necessary for stable selectors.
- Avoid relying on styling, classes, or layout for test assertions.
