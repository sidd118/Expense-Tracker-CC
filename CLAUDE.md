# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React expense tracker app used as a teaching project for a Claude Code course. It intentionally ships with a bug, poor UI, and messy code — the course walks through fixing these together.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

No test framework is configured.

## Architecture

This is a **single-component React app** (React 19, Vite 7). All state and logic lives in `src/App.jsx` — there are no child components, no routing, and no external state management.

**State managed in `App`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`
- Form fields: `description`, `amount`, `type`, `category`
- Filter fields: `filterType`, `filterCategory`

**Known intentional bug:** `amount` values are stored as strings. The `reduce` calls for `totalIncome` and `totalExpenses` concatenate strings instead of summing numbers, so computed totals are wrong. The fix is to parse amounts to numbers when storing or when reducing.

**Data flow:** all mutations go through `setTransactions`. There is no persistence layer — data resets on page reload.
