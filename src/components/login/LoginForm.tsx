interface LoginFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
}
