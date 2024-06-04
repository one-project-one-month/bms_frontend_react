import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginMutationParams } from '../../lib/types';

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginMutationParams>;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginMutationParams>();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full px-5 py-10 bg-white rounded-lg shadow-lg mt-5"
        >
          <h1 className="text-2xl font-bold">Login Here</h1>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="adminCode"
              className="block text-gray-700 text-sm font-bold"
            >
              Admin Code
            </label>
            <input
              {...register('adminCode', { required: true })}
              placeholder="Enter your admin code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />{' '}
            {errors.adminCode && (
              <span className="text-red-500">Admin code is required!</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold"
            >
              Password
            </label>
            <input
              {...register('password', { required: true })}
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
            />
            {errors.password && (
              <span className="text-red-500">Password is required!</span>
            )}
          </div>
          <input
            type="submit"
            value={isLoading ? 'Loading...' : 'Login'}
            className={`w-full bg-primaryBtn hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          />
        </form>
      </div>
    </div>
  );
}
