import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../Hooks/useAuth"
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}


const Auth = () => {

  const [mode, setMode] = useState("signup");
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const { signUp, user, loggout, login } = useAuth()
  const navigate = useNavigate();

  const onSubmit = (data: User) => {
    setError(null)
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password)
      console.log(result)
    } else {
      result = login(data.email, data.password)
    }

    if (result?.success) {
      alert("Success")
      navigate("/")
    } else {
      setError(result?.error || null)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User Logged In {user.email}</p>}
          <button onClick={() => loggout()}>Logout</button>
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="form-error">{errors.email?.message as string}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }, maxLength: {
                    value: 12,
                    message: "Password must be at most 12 characters"
                  }
                })}
              />
              {errors.password && <span className="form-error">{errors.password?.message as string}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-large">{mode === "signup" ? "Sign Up" : "Login"}</button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>Already have an account? <span onClick={() => setMode("login")} className="auth-link">Login</span></p>
            ) : (
              <p>Don't have an account? <span onClick={() => setMode("signup")} className="auth-link">Sign Up</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
