"use client";

import {
	UserIcon,
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { useActionState } from 'react';
import { createUser, UserState } from '@/app/lib/actions/user-actions';
import Link from 'next/link';

export default function UserForm() {

    const initialState: UserState = {errors:{}, message: null, fields:{}, isCreated: false};
    const [state, formAction] = useActionState(createUser, initialState);

	return (
	<div className={state.isCreated?"":""}>
		<form action={formAction} className="space-y-6">
			<div className="rounded-lg bg-white px-6 pb-6 pt-8 shadow-lg">
				<h1 className="mb-6 text-3xl font-bold text-slate-900">Create User</h1>
				<div className="w-full space-y-5">
					<div>
						<label
							className="mb-3 block text-sm font-semibold text-slate-700"
							htmlFor="name"
						>
							Full Name
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm outline-2 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
								id="name"
								type="text"
								name="name"
								placeholder="Enter full name"
                                defaultValue={state.fields?.name ?? ""}
								required
							/>
							<UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
						</div>
					</div>
        {state.errors?.name &&
                    state.errors.name.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

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
                                defaultValue={state.fields?.email ?? ""}
								required
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
						</div>
					</div>
        {state.errors?.email &&
                    state.errors.email.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

					<div>
						<label
							className="mb-3 block text-sm font-semibold text-slate-700"
							htmlFor="confirmEmail"
						>
							Confirm Email
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm outline-2 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
								id="confirmEmail"
								type="email"
								name="confirmEmail"
								placeholder="Confirm your email"
                                defaultValue={state.fields?.confirmEmail ?? ""}
								required
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
						</div>
					</div>
        {state.errors?.confirmEmail &&
                    state.errors.confirmEmail.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

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
                                defaultValue={state.fields?.password ?? ""}
								required
								minLength={6}
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
						</div>
					</div>

					<div>
						<label
							className="mb-3 block text-sm font-semibold text-slate-700"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<div className="relative">
							<input
								className="peer block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm outline-2 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
								id="confirmPassword"
								type="password"
								name="confirmPassword"
								placeholder="Confirm your password"
                                defaultValue={state.fields?.confirmPassword ?? ""}
								required
								minLength={6}
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-blue-500" />
						</div>
					</div>
				</div>
        {state.errors?.password &&
                    state.errors.password.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

        {state.errors?.confirmPassword &&
                    state.errors.confirmPassword.map((error:string)=>(
                        <p className="mt-2 text-sm text-red-600" key={error}>{error}</p>))}

				<Button className="mt-6 w-full">
					Create User <ArrowRightIcon className="ml-auto h-5 w-5" />
				</Button>
			</div>
		</form> 
		{state.isCreated && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Created 🎉
            </h2>

            <p className="text-gray-600 mb-6">{state.message}</p>

            <Link
                href="/login"
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
                Go to Login
            </Link>
        </div>
    </div>
)}
	</div>
	);
}