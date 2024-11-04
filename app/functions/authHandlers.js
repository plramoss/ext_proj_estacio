import { useAuth } from "../context/AuthContext";

const { onLogin, onRegister } = useAuth();

export const handleLogin = async ({ email, password }) => {
  await onLogin(email, password)
    .catch((error) => alert(error.msg));
}

export const handleRegister = async ({ email, password }) => {
  await onRegister(email, password)
    .then(async () => await handleLogin({ email, password }))
    .catch((error) => alert(error.msg));
}