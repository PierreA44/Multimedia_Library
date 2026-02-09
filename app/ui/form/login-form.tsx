"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState } from 'react';
import { Button } from '../button';
import { authenticate } from '@/app/lib/actions/user-actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard" ;
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );


  return (
    <form action={formAction} className="space-y-6">
      <div className="rounded-lg bg-white px-6 pb-6 pt-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>
        <div className="w-full space-y-5">
          <div>
            <label
              className="mb-3 block text-sm font-semibold text-slate-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm outline-2 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 block text-sm font-semibold text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm outline-2 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-6 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div className="flex h-8 items-end space-x-1 mt-4" aria-live='polite' aria-atomic='true'>
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
