import useLoginMutation from '../hooks/useLoginMutation';
import { SubmitHandler } from 'react-hook-form';
import { LoginMutationParams } from '../lib/types';
import { useEffect } from 'react';
import LoginForm from '../components/login/LoginForm';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const LoginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<LoginMutationParams> = (data) => {
    LoginMutation.mutate(data);
  };

  useEffect(() => {
    if (LoginMutation.data && LoginMutation.isSuccess) {
      Cookies.set('token', LoginMutation.data.data);
      // push to login route with react router
      window.location.href = '/';
    }
  }, [LoginMutation.data, LoginMutation.error, LoginMutation.isPending]);

  return (
    <div className="w-full h-screen bg-red border-2 rounded">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}
