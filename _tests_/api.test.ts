import test from 'node:test';
import assert from 'node:assert/strict';
import { verifySupabaseToken } from '../lib/auth';

// Basic unit tests that do not require external services.
// These tests ensure helper functions behave in absence of env.

test('verifySupabaseToken returns null when no token provided', async () => {
  const res = await verifySupabaseToken('');
  assert.equal(res, null);
});

// placeholder test to ensure file is discovered by node test runner
test('sanity', () => {
  assert.ok(true);
});
