<template>
  <div class="register-container">
    <div class="register-box fade-in">
      <div class="register-header text-center">
        <h2>Crie sua conta</h2>
        <p>Preencha os dados para se cadastrar</p>
      </div>
      <form @submit.prevent="register" class="register-form">
        <div class="input-group">
          <label for="nome">Nome completo</label>
          <input
            id="nome"
            type="text"
            v-model="nome"
            placeholder="Seu nome completo"
            required
            class="input-field"
            autocomplete="name"
          />
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="seu@email.com"
            required
            class="input-field"
            autocomplete="email"
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
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? "Esconder" : "Mostrar" }}
            </button>
          </div>
          <p class="password-hint">Mínimo de 8 caracteres</p>
        </div>

        <div class="input-group">
          <label for="confirmarSenha">Confirmar senha</label>
          <div class="password-wrapper">
            <input
              id="confirmarSenha"
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmarSenha"
              placeholder="Confirme sua senha"
              required
              class="input-field"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              {{ showConfirmPassword ? "Esconder" : "Mostrar" }}
            </button>
          </div>
        </div>

        <div class="terms">
          <input type="checkbox" id="terms" v-model="aceitouTermos" required />
          <label for="terms">
            Eu concordo com os <a href="#">Termos de Serviço</a> e
            <a href="#">Política de Privacidade</a>
          </label>
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          <span v-if="!loading">Cadastrar</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <div class="login-link text-center">
        Já tem uma conta? <router-link to="/login">Faça login</router-link>
      </div>

      <p v-if="erro" class="error-message">
        <i class="fas fa-exclamation-circle"></i> {{ erro }}
      </p>
      <p v-if="sucesso" class="success-message">
        <i class="fas fa-check-circle"></i> {{ sucesso }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      aceitouTermos: false,
      erro: "",
      sucesso: "",
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
    };
  },
  methods: {
    async register() {
      this.loading = true;
      this.erro = "";
      this.sucesso = "";

      // Validação básica
      if (this.senha !== this.confirmarSenha) {
        this.erro = "As senhas não coincidem";
        this.loading = false;
        return;
      }

      if (this.senha.length < 8) {
        this.erro = "A senha deve ter no mínimo 8 caracteres";
        this.loading = false;
        return;
      }

      try {
        const res = await axios.post("http://localhost:3000/register", {
          name: this.nome,
          email: this.email,
          password: this.senha,
        });

        this.sucesso = "Cadastro realizado com sucesso! Redirecionando...";
        // Opcional: login automático após cadastro
        localStorage.setItem("token", res.data.access_token);
        // Redireciona após 2 segundos
        setTimeout(() => {
          this.$router.push("/perfil");
        }, 2000);
      } catch (err) {
        this.erro =
          err.response?.data?.error ||
          "Ocorreu um erro ao cadastrar. Por favor, tente novamente.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.register-box {
  width: 100%;
  max-width: 440px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.register-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.register-header p {
  color: #718096;
  font-size: 16px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
}

.password-hint {
  font-size: 12px;
  color: #718096;
  margin-top: 2px;
  margin-bottom: 0px;
}

.terms {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
}

.terms label {
  font-size: 14px;
  color: #4a5568;
}

.terms a {
  color: #2a8a85;
  font-weight: 500;
}

.login-link {
  margin-top: 24px;
  color: #718096;
}

.login-link a {
  color: #2a8a85;
  font-weight: 500;
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

.input-field:focus {
  outline: none;
  border-color: #2a8a85;
  box-shadow: 0 0 0 3px rgba(42, 138, 133, 0.2);
}

.submit-button {
  background-color: #2a8a85;
  color: white;
}

.submit-button:hover {
  background-color: #1e6f6b;
}

.submit-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .register-box {
    padding: 30px 20px;
  }
}
</style>
