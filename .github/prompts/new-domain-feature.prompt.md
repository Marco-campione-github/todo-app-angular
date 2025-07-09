---
mode: 'agent'
description: 'Create a new domain feature in an Angular application using best practices.'
tools: ['changes', 'codebase', 'editFiles', 'extensions', 'fetch', 'githubRepo', 'openSimpleBrowser', 'problems', 'runTasks', 'search', 'searchResults', 'terminalLastCommand', 'terminalSelection', 'testFailure', 'usages', 'vscodeAPI']
---

## Purpose

Create a new domain feature in an Angular application using best practices. This feature should include:

- A **module** with routing (`[feature-name]-routing.module.ts`).
- A **component** to display the main UI.
- A **service** to handle business logic and API calls.
- A **model** (TypeScript interface) for domain objects.
- A **state management** setup using a simple `BehaviorSubject` in the service.
- (Optional) Basic unit tests for the service and component.

## Folder Structure

Use the following structure under `src/app/components/[feature-name]`:
