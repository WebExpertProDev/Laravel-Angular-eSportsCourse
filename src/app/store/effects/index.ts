import { RouterEffects } from './router.effect';
import { AuthEffects } from './auth.effect';

export const effects: any[] = [RouterEffects, AuthEffects];

export * from './router.effect';
export * from './auth.effect';
