<template>
  <div class="perfil-container">
    <router-link to="/home" class="btn-voltar">← Voltar</router-link>
    <header class="perfil-header">
      <div class="avatar">
        {{ (usuario.name || "").charAt(0).toUpperCase() }}
      </div>
      <div class="perfil-info">
        <div class="top-info">
          <h2 class="username">{{ usuario.name }}</h2>
          <button class="edit-btn" @click="modoEdicao = !modoEdicao">
            Editar Perfil
          </button>
          <button class="logout-btn" @click="logout">Sair</button>
          <button class="delete-btn" @click="deletarPerfil">
            Deletar Conta
          </button>
        </div>
        <div class="stats">
          <span
            ><strong>{{ posts.length }}</strong> publicações
          </span>
          <span><strong>120</strong> seguidores</span>
          <span><strong>180</strong> seguindo</span>
        </div>
      </div>
    </header>
    <div v-if="modoEdicao" class="edit-form">
      <input type="text" v-model="usuario.name" placeholder="Novo nome" />
      <input type="email" v-model="usuario.email" placeholder="Novo email" />
      <input
        type="password"
        v-model="usuario.senha"
        placeholder="Nova senha (opcional)"
      />
      <button class="save-btn" @click="atualizarPerfil">Salvar</button>
      <button class="save-btn" @click="modoEdicao = false">Cancelar</button>
      <p v-if="mensagem">{{ mensagem }}</p>
    </div>

    <main class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-thumb">
        <img :src="post.imagem" :alt="post.titulo" />
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import img1 from "@/assets/img1.jpg";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img4.jpg";
export default {
  name: "ProfileView",
  data() {
    return {
      usuario: {
        name: "",
        email: "",
        senha: "",
      },
      modoEdicao: false,
      mensagem: "",
      posts: [
        {
          id: 1,
          titulo: "Post 1",
          imagem: img1,
        },
        {
          id: 2,
          titulo: "Post 2",
          imagem: img2,
        },
        {
          id: 3,
          titulo: "Post 3",
          imagem: img3,
        },
      ],
    };
  },
  mounted() {
    this.carregarPerfil();
  },
  methods: {
    async carregarPerfil() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.usuario.name = res.data.name;
        this.usuario.email = res.data.email;
      } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
      }
    },
    async atualizarPerfil() {
      try {
        const token = localStorage.getItem("token");
        const payload = {
          name: this.usuario.name,
          email: this.usuario.email,
        };
        if (this.usuario.senha) payload.password = this.usuario.senha;
        console.log("Payload enviado:", payload);
        await axios.put("/api/user", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.mensagem = "Perfil atualizado com sucesso!";
        this.usuario.senha = "";
        this.modoEdicao = false;
      } catch (erro) {
        console.error("Erro ao atualizar perfil:", erro);
        this.mensagem = "Erro ao atualizar.";
      }
    },
    async deletarPerfil() {
      if (!confirm("Tem certeza que deseja deletar sua conta?")) return;

      try {
        const token = localStorage.getItem("token");
        await axios.delete("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.mensagem = "Conta deletada. Redirecionando...";
        localStorage.removeItem("token");
        setTimeout(() => this.$router.push("/register"), 2000);
      } catch (erro) {
        console.error("Erro ao deletar perfil:", erro);
        this.mensagem = "Erro ao deletar conta.";
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.perfil-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: calc(100vh - 60px);
}

.perfil-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: #036f7e;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.perfil-info {
  flex: 1;
}

.top-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.username {
  font-size: 20px;
  color: #262626;
}

.edit-btn,
.logout-btn,
.delete-btn {
  background-color: transparent;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}

.stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #262626;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}

.post-thumb img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.edit-form {
  background-color: #f9f9f9;
  border: 1px solid #dbdbdb;
  padding: 24px;
  border-radius: 8px;
  margin-top: 20px;
  max-width: 500px;
}

.edit-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.edit-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.edit-form button {
  background-color: #3897f0;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.edit-form button.cancelar {
  background-color: #aaa;
}
.btn-voltar {
  display: inline-block;
  margin-bottom: 16px;
  color: #036f7e;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
.btn-voltar:hover {
  text-decoration: underline;
}
</style>
