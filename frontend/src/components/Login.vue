<template>
  <div class="login-container">
    <div class="login-box fade-in">
      <div class="login-header text-center">
        <h2>Bem-vindo de volta</h2>
        <p>Faça login para acessar sua conta</p>
      </div>
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="seu@email.com"
            required
            class="input-field"
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <label for="senha">Senha</label>
          <div class="password-wrapper">
            <input
              id="senha"
              :type="showPassword ? 'text' : 'password'"
              v-model="senha"
              placeholder="Digite sua senha"
              required
              class="input-field"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? "Esconder" : "Mostrar" }}
            </button>
          </div>
        </div>

        <div class="options">
          <a href="#" class="forgot-link">Esqueceu a senha?</a>
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          <span v-if="!loading">Entrar</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <div class="signup-link text-center">
        Não tem uma conta? <router-link to="/Register">Cadastre-se</router-link>
      </div>

      <p v-if="erro" class="error-message">
        <i class="fas fa-exclamation-circle"></i> {{ erro }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      senha: "",
      erro: "",
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.erro = "";

      try {
        const res = await axios.post("http://localhost:3000/login", {
          email: this.email,
          password: this.senha,
        });

        localStorage.setItem("token", res.data.access_token);
        this.$router.push("/home");
      } catch (err) {
        this.erro =
          err.response?.data?.error ||
          "Email ou senha inválidos. Por favor, tente novamente.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 440px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.login-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.login-header p {
  color: #718096;
  font-size: 16px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
}

.input-field {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #2a8a85;
  box-shadow: 0 0 0 3px rgba(42, 138, 133, 0.2);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  font-size: 14px;
}

.options {
  display: flex;
  justify-content: flex-end;
}

.forgot-link {
  color: #4a90e2;
  font-size: 14px;
}

.submit-button {
  width: 100%;
  padding: 14px;
  background-color: #2a8a85;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: #1e6f6b;
}

.submit-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

.signup-link {
  margin-top: 24px;
  color: #718096;
}

.signup-link a {
  color: #2a8a85;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 30px 20px;
  }
}
</style>
