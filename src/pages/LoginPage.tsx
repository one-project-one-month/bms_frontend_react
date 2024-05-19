import LoginForm from '../components/login/LoginForm';
import useLoginMutation from '../hooks/useLoginMutation';

export default function LoginPage() {
  const LoginMutation = useLoginMutation();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // get form items' value from event.target
    LoginMutation.mutate({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={submitHandler} />
    </div>
  );
}
