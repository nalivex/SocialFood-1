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
        </div>
        <div class="stats">
          <span
            ><strong>{{ posts.length }}</strong>
            publicações
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
import img1 from "@/assets/img1.jpg";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img4.jpg";

export default {
  name: "UserProfile",
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
        const id = this.$route.params.id;
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:3000/api/users/${id}`, {
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
