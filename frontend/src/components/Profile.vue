<template>
  <div class="perfil-container">
    <header class="perfil-header">
      <div class="avatar">{{ usuario.name.charAt(0).toUpperCase() }}</div>
      <div class="perfil-info">
        <div class="top-info">
          <h2 class="username">{{ usuario.name }}</h2>
          <button class="edit-btn" @click="editarPerfil">Editar Perfil</button>
          <button class="logout-btn" @click="logout">Sair</button>
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

    <main class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-thumb">
        <img :src="post.imagem" :alt="post.titulo" />
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import imagem from "@/assets/banner-gastronomia.jpg";

export default {
  name: "ProfileView",
  data() {
    return {
      usuario: {
        name: "",
        email: "",
      },
      posts: [
        {
          id: 1,
          titulo: "Post 1",
          imagem: imagem,
        },
        {
          id: 2,
          titulo: "Post 2",
          imagem: imagem,
        },
        {
          id: 3,
          titulo: "Post 3",
          imagem: imagem,
        },
      ],
      mensagem: "",
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
        this.usuario = res.data;
      } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
      }
    },
    async atualizarPerfil() {
      try {
        const token = localStorage.getItem("token");
        await axios.put("http://localhost:3000/api/user", this.usuario, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.mensagem = "Perfil atualizado com sucesso!";
      } catch (erro) {
        console.error("Erro ao atualizar perfil:", erro);
        this.mensagem = "Erro ao atualizar.";
      }
    },
    async deletarPerfil() {
      if (!confirm("Tem certeza que deseja deletar sua conta?")) return;

      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.mensagem = "Conta deletada. Redirecionando...";
        localStorage.removeItem("token");
        setTimeout(() => this.$router.push("/register"), 2000);
      } catch (erro) {
        console.error("Erro ao deletar perfil:", erro);
        this.mensagem = "Erro ao deletar conta.";
      }
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
  background-color: #bbb;
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
.logout-btn {
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
</style>
