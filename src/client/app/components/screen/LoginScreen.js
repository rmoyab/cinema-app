import { useForm } from '../../hooks/useForm'
import { motion } from 'framer-motion'

const LoginScreen = () => {
  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: '',
    loginPassword: '',
  })

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
  })

  const { loginEmail, loginPassword } = formLoginValues

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
  } = formRegisterValues

  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleRegister = (e) => {
    e.preventDefault()
  }

  const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      <div className="container">
        <div className="login">
          <div className="login__wrapper">
            <div className="login__forms__group">
              <div className="row gap-2 justify-center">
                <div className="login__forms__group--login col-12-xs col-5-sm col-3-xl">
                  <form className="form" onSubmit={handleLogin}>
                    <h3 className="form__title">Login</h3>
                    <div className="form__group">
                      <input
                        type="text"
                        className="form__group__control"
                        placeholder="Email"
                        name="loginEmail"
                        value={loginEmail}
                        onChange={handleLoginInputChange}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="password"
                        className="form__group__control"
                        placeholder="Password"
                        name="loginPassword"
                        value={loginPassword}
                        onChange={handleLoginInputChange}
                      />
                    </div>
                    <div className="form__group">
                      <button className="btn form__group__btn">Login</button>
                    </div>
                  </form>
                </div>

                <div className="login__forms__group--register col-12-xs col-5-sm col-3-xl">
                  <form className="form" onSubmit={handleRegister}>
                    <h3 className="form__title">Register</h3>
                    <div className="form__group">
                      <input
                        type="text"
                        className="form__group__control"
                        placeholder="Name"
                        name="registerName"
                        value={registerName}
                        onChange={handleRegisterInputChange}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="email"
                        className="form__group__control"
                        placeholder="Email"
                        name="registerEmail"
                        value={registerEmail}
                        onChange={handleRegisterInputChange}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="password"
                        className="form__group__control"
                        placeholder="Password"
                        name="registerPassword"
                        value={registerPassword}
                        onChange={handleRegisterInputChange}
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="password"
                        className="form__group__control"
                        placeholder="Confirm password"
                        name="registerConfirmPassword"
                        value={registerConfirmPassword}
                        onChange={handleRegisterInputChange}
                      />
                    </div>

                    <div className="form__group">
                      <button className="btn form__group__btn">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginScreen
