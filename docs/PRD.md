# MacroMate Product Requirements

## Product vision

MacroMate helps people understand and improve their daily nutrition without the setup, advertising, or account requirements of larger calorie trackers. It should make the most common action—logging food—fast, trustworthy, and easy to correct.

## Audience

- **Routine tracker:** already understands macros and wants rapid daily logging.
- **Goal-oriented beginner:** needs clear progress and forgiving data entry.
- **Meal-prep user:** repeats meals and wants to log combinations in one action.

MacroMate initially serves individual adults tracking general wellness or fitness goals. It is not a medical device and should not diagnose, prescribe, or present estimates as clinical advice.

## Product principles

1. **Local first:** core tracking works offline and without an account.
2. **Fast to log, easy to fix:** every logged item can be reviewed and removed.
3. **Progress over precision theater:** show clear trends and identify estimated data.
4. **Accessible by default:** readable type, labeled controls, sufficient contrast, and platform conventions.
5. **Progressive complexity:** simple defaults first; advanced tools appear when needed.

## Core journeys

### 1. Set goals

The user can set a display name and positive daily protein, carbohydrate, fat, and calorie goals. Saved goals immediately update daily progress and persist between sessions.

### 2. Log a food

The user selects Breakfast, Lunch, Dinner, or Snack, searches a starter catalog or creates a custom food, reviews the serving and macros, and adds it to today. The dashboard updates immediately.

### 3. Correct today's log

The user can see today's entries grouped by meal and remove an incorrect entry. Totals update immediately.

### 4. Reuse a meal

The user can save today's foods as a named meal, view saved meals, add one to today's chosen meal period, and delete a saved meal.

### 5. Review history

The user can review prior days with calories, macros, item count, and percentage of the current calorie goal.

## Functional requirements

### P0 — usable local MVP

- Material 3 navigation and responsive screen layouts.
- Offline SQLite storage for profile, logs, and saved meals.
- Starter food search and validated custom food creation.
- Meal-period categorization.
- Daily macro and calorie progress.
- Remove logged foods.
- Save, reuse, and delete meals.
- Daily history and empty/error/loading states.
- No authentication or network connection required.

### P1 — food quality and editing

- Search an evaluated nutrition data provider, with source attribution and caching.
- Scale nutrients when serving quantity changes.
- Recent and frequently logged foods.
- Edit quantity, meal period, and date after logging.
- Compose and edit a saved meal independently of today's log.
- Barcode scanning with a manual fallback.
- Goal onboarding with optional evidence-based estimation and clear disclaimers.

### P2 — insight and portability

- Weekly and monthly averages, adherence ranges, and trends.
- Fiber, sodium, and configurable micronutrients.
- CSV/JSON export, local backup, and restore.
- Reminders controlled by the user.
- Metric and US customary serving units.
- Dynamic color, dark mode, larger text, and screen-reader audit.

### P3 — optional connected experience

- Opt-in account and encrypted cloud sync.
- Multi-device conflict handling and account deletion.
- Shareable meal templates with explicit privacy controls.
- Coach or clinician export; no social feed by default.

## Non-functional requirements

- Core logging must work offline.
- A failed write must preserve the current screen and show an actionable error.
- Nutrition values and goals must be finite and non-negative; serving sizes and goals must be greater than zero.
- Database changes require forward migrations.
- Network features must time out, allow retry, and distinguish cached from live data.
- Sensitive health data must not be collected or transmitted without explicit consent.
- Touch targets, labels, contrast, and text scaling should meet WCAG 2.2 AA where applicable.

## Current release scope

This refresh implements the P0 foundation: a shared application state, SQLite persistence, profile goals, live daily progress, starter/custom food logging, correction, saved meals, daily history, and a Material 3 visual system.

Food-provider integration is intentionally deferred because provider choice affects licensing, attribution, regional coverage, rate limits, and secret management. The starter catalog keeps the offline journey testable without presenting itself as a comprehensive database.

## Success measures

- A new user can log a starter or custom food in under 30 seconds.
- Returning users can add a saved meal in under 10 seconds.
- All successful changes remain after an app restart.
- Users can recover from an incorrect log without resetting the day.
- At least 95% of local database operations complete without an surfaced error.

## Open product decisions

1. Primary market and regional food coverage.
2. Nutrition data provider and commercial licensing.
3. Whether calories are derived, provider-supplied, or user-overridable.
4. Goal-estimation method and required health disclaimers.
5. Backup model before any authentication or cloud work.
6. Whether saved meals represent fixed nutrients or always inherit later food edits.

## Delivery sequence

1. Validate the P0 logging flow with representative users.
2. Add quantity editing, recent foods, and an independent meal composer.
3. Select and integrate a food provider after a licensing/data-quality review.
4. Add analytics and export after enough real history exists.
5. Add optional sync only after privacy, encryption, recovery, and deletion requirements are defined.
