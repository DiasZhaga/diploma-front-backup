import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";

const SignInModal = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [login, setLogin]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const { login: contextLogin } = useAuth();

  if (showForgot) {
    return (
      <ForgotPasswordModal
        onClose={onClose}
        onBack={() => {
          setShowForgot(false);
          setError("");
          setSuccess("");
        }}
      />
    );
  }

  const switchToSignIn = () => {
    setIsSignIn(true);
    setError("");
    setSuccess("");
  };

  const switchToRegister = () => {
    setIsSignIn(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 1) Валидация логина (email или 11-значный телефон)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;
    const isEmail    = emailRegex.test(login);
    const isPhone    = phoneRegex.test(login);

    if (!isEmail && !isPhone) {
      setError("Login must be a valid email or 11-digit phone number");
      return;
    }

    // 2) При регистрации проверяем поле name
    if (!isSignIn && name.trim() === "") {
      setError("Name is required");
      return;
    }

    // 3) При регистрации проверяем сложность пароля
    if (!isSignIn) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        setError("Password must contain letters and numbers");
        return;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setError("Password must contain at least one special character");
        return;
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        setError("Password must contain both lowercase and uppercase letters");
        return;
      }
    }

    // 4) Формируем запрос
    const url = isSignIn
      ? "http://localhost:8080/api/v1/auth/login"
      : "http://localhost:8080/api/v1/auth/register";

    const params = new URLSearchParams();
    params.append("login", login);
    params.append("password", password);
    if (!isSignIn) {
      params.append("name", name.trim());
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: params.toString(),
      });

      // 1) Сразу считываем тело
      const result = await res.json().catch(() => ({}));

      // 2) Проверяем статус
      if (!res.ok) {
        // на регистре result.Message содержит нужный текст из бекенда
        throw new Error(result.Message || `Server error ${res.status}`);
      }

      // 3) Если это регистрация — показываем успех и переключаем таб
      if (!isSignIn) {
        setSuccess(result.Message || "Registered successfully!");
        setIsSignIn(true);
        return;
      }

 // 4) Если это вход — используем уже распарсенный результат
contextLogin({ name: result.name });
onClose();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button
          className="auth-close"
          onClick={() => {
            onClose();
            setError("");
            setSuccess("");
          }}
        >
          &times;
        </button>
        <h2 className="auth-title">Welcome to Domly</h2>

        <div className="auth-tabs">
          <button
            className={isSignIn ? "active" : ""}
            onClick={switchToSignIn}
          >
            Sign in
          </button>
          <button
            className={!isSignIn ? "active" : ""}
            onClick={switchToRegister}
          >
            New account
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {success && <div className="text-success mb-3">{success}</div>}
          {error   && <div className="text-danger mb-3">{error}</div>}

          <label>Email or Phone</label>
          <input
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            placeholder="Enter email or phone"
            required
          />

          <small className="form-text text-muted mb-3">
            Phone must be 11 digits without +, spaces or brackets.
          </small>

          {!isSignIn && (
            <>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </>
          )}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={isSignIn ? "Enter password" : "Create password"}
            required
          />

          {!isSignIn && (
            <ul className="password-rules mb-3">
              <li>At least 8 characters</li>
              <li>Mix of letters and numbers</li>
              <li>At least 1 special character</li>
              <li>At least 1 lowercase & 1 uppercase letter</li>
            </ul>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isSignIn ? "Sign in" : "Submit"}
          </button>

          {isSignIn && (
            <div className="auth-footer mt-2 text-center">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => {
                  setShowForgot(true);
                  setError("");
                  setSuccess("");
                }}
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
