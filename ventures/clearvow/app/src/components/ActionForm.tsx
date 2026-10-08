"use client";

import { createContext, useActionState, useContext, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { ActionState } from "@/lib/actions/types";
import { initialState } from "@/lib/actions/types";

const ErrorsContext = createContext<Record<string, string>>({});

export function ActionForm({
  action,
  children,
  className = "",
  submitLabel = "Save",
  submitVariant = "primary",
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  className?: string;
  submitLabel?: string;
  submitVariant?: "primary" | "secondary" | "clay";
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.redirectTo) router.push(state.redirectTo);
  }, [state.redirectTo, router]);
  return (
    <ErrorsContext.Provider value={state.errors ?? {}}>
      <form action={formAction} className={`space-y-4 ${className}`} noValidate>
        {state.errors?._ ? (
          <div role="alert" className="rounded-md bg-clay-soft px-4 py-3 text-[14px]">
            {state.errors._}
          </div>
        ) : null}
        {state.ok && state.message ? (
          <div role="status" className="rounded-md bg-sage px-4 py-3 text-[14px]">
            {state.message}
          </div>
        ) : null}
        {children}
        <button type="submit" className={`btn btn-${submitVariant}`} disabled={pending} aria-busy={pending}>
          {pending ? "Working…" : submitLabel}
        </button>
      </form>
    </ErrorsContext.Provider>
  );
}

export function Field({
  name,
  label,
  hint,
  children,
  required,
}: {
  name: string;
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  const errors = useContext(ErrorsContext);
  const err = errors[name];
  return (
    <div>
      <label htmlFor={name} className="block text-[14px] font-medium mb-1">
        {label}
        {required ? <span className="text-clay"> *</span> : null}
      </label>
      {children}
      {hint && !err ? (
        <p id={`${name}-hint`} className="text-[12px] text-ink-3 mt-1">
          {hint}
        </p>
      ) : null}
      {err ? (
        <p id={`${name}-error`} role="alert" className="text-[13px] text-bad mt-1">
          {err}
        </p>
      ) : null}
    </div>
  );
}
