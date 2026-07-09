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

React 19, Vite 7. The app is split into four components with no routing and no external state management.

**Components:**
- `src/App.jsx` — root component; owns `transactions` state and passes data/callbacks down
- `src/Summary.jsx` — computes and displays total income, expenses, and balance from `transactions`
- `src/TransactionForm.jsx` — owns its own form state (`description`, `amount`, `type`, `category`); calls `onAdd` prop with a new transaction object on submit
- `src/TransactionList.jsx` — owns filter state (`filterType`, `filterCategory`); renders the filtered transactions table

**State managed in `App`:**
- `transactions` — array of `{ id, description, amount, type, category, date }`; `amount` is a number

**Constants:**
- `categories` — static array defined at module scope in `App.jsx`, passed as a prop to `TransactionForm` and `TransactionList`

**Data flow:** new transactions are created in `TransactionForm` and surfaced via the `onAdd` callback to `App`, which appends them to `transactions` via `setTransactions`. There is no persistence layer — data resets on page reload.
