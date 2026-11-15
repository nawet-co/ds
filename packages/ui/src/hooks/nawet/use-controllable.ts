import { useState } from "react"

export interface UseControllableOptions<T> {
  /** Controlled value. Leave `undefined` to use uncontrolled mode. */
  value?: T
  /** Initial value used in uncontrolled mode. */
  defaultValue: T
  /** Called with the next value in both controlled and uncontrolled modes. */
  onChange?: (value: T) => void
}

/**
 * Syncs a piece of state with an optional controlled prop.
 *
 * In controlled mode (`value` is provided) the setter only calls `onChange`
 * and leaves the rendered value up to the parent. In uncontrolled mode it
 * updates internal state and still calls `onChange`.
 *
 * Memoization is left to React Compiler — this hook intentionally contains
 * no `useCallback`/`useMemo`.
 *
 * @example
 * const [open, setOpen] = useControllable({
 *   value: openProp,
 *   defaultValue: false,
 *   onChange: onOpenChange,
 * })
 */
export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): [T, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue

  const setValue = (next: T | ((prev: T) => T)) => {
    const resolved =
      typeof next === "function" ? (next as (prev: T) => T)(currentValue) : next

    if (Object.is(resolved, currentValue)) {
      return
    }

    if (!isControlled) {
      setUncontrolledValue(resolved)
    }

    onChange?.(resolved)
  }

  return [currentValue, setValue]
}
