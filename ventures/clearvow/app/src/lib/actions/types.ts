export type ActionState = {
  ok: boolean;
  errors?: Record<string, string>;
  message?: string;
  redirectTo?: string;
};

export const initialState: ActionState = { ok: false };
