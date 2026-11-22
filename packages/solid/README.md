# @nawet/ds-solid

Reserved for the Solid 2.0 implementation of Nawet DS.

Intentionally empty. No primitives, dependencies, or component choices have been made yet. The package boundary exists so the framework-neutral core and the React implementation can evolve without leaking React assumptions.

When implementation starts, this package should own:

- Solid components
- Solid primitives and context providers
- Solid-specific hooks/signals
- Solid motion bindings
- Solid icon adapters
- its own `styles.css` that imports `@nawet/ds-core/globals.css`

It should not import from `@nawet/ds-react`.
