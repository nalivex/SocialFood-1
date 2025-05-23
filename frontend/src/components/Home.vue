<template>
  <div class="feed-container">
    <header>
      <h1><span class="logo-font">Noshter</span></h1>
      <input
        type="text"
        placeholder="Buscar usuários"
        v-model="busca"
        class="search-input"
      />
      <nav>
        <router-link to="/profile">Perfil</router-link>
        <router-link to="/">Sair</router-link>
      </nav>
    </header>

    <main class="feed">
      <div v-if="busca && usuarios.length > 0">
        <router-link
          v-for="usuario in usuarios"
          :key="usuario.userId"
          :to="`/user/${usuario.userId}`"
          class="usuario-card"
          style="text-decoration: none; color: inherit"
        >
          <div class="author-info">
            <div class="author-avatar">{{ usuario.name[0].toUpperCase() }}</div>
            <div class="author-name">{{ usuario.name }}</div>
          </div>
        </router-link>
      </div>

      <!-- Mensagem se nenhum usuário encontrado -->
      <div v-else-if="busca && usuarios.length === 0" class="sem-posts">
        Nenhum usuário encontrado.
      </div>

      <!-- Exibe posts apenas se não estiver buscando -->
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <div class="author-info">
              <div class="author-avatar">{{ post.autor[0].toUpperCase() }}</div>
              <div class="author-name">{{ post.autor }}</div>
            </div>
            <button class="post-menu">...</button>
          </div>

          <div class="post-image-wrapper">
            <img :src="post.imagem" :alt="post.titulo" class="post-image" />
          </div>

          <div class="post-body">
            <div class="post-actions">
              <button class="like-btn" @click="curtirPost(post)">❤️</button>
            </div>
            <div class="likes">{{ post.curtidas }} curtidas</div>
            <div class="caption">
              <strong>{{ post.autor }}</strong> {{ post.descricao }}
            </div>
          </div>
        </div>
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
  name: "HomeView",
  data() {
    return {
      busca: "",
      usuarios: [],
      posts: [
        {
          id: 1,
          titulo: "Post 1",
          autor: "ana.gastronomia",
          descricao: "Delicioso Risoto de cogumelos!",
          imagem: img1,
          curtidas: 107,
        },
        {
          id: 2,
          titulo: "Post 2",
          autor: "luiz_chef",
          descricao: "Tacos mexicanos feitos com muito amor!",
          imagem: img2,
          curtidas: 80,
        },
        {
          id: 3,
          titulo: "Post 3",
          autor: "chef_helena",
          descricao: "Um dos pratos mais pedidos: Yakisoba.",
          imagem: img3,
          curtidas: 97,
        },
      ],
    };
  },
  watch: {
    busca: "buscarUsuarios",
  },
  methods: {
    curtirPost(post) {
      post.curtidas++;
    },
    async buscarUsuarios() {
      if (this.busca.trim() === "") {
        this.usuarios = [];
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/search?q=${encodeURIComponent(
            this.busca
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.usuarios = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
  },
};
</script>

<style scoped>
.feed-container {
  background-color: #fafafa;
  min-height: 100vh;
}

.topbar {
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-input {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  font-size: 14px;
  flex: 1 1 200px;
  max-width: 300px;
  background-color: #fafafa;
}

.topbar-actions {
  display: flex;
  gap: 12px;
}

.profile-btn,
.logout-btn {
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}

.feed {
  margin: 50px auto 0;
  max-width: 1000px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.post-card {
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.post-image-wrapper {
  width: 100%;
  height: 500px;
  background-color: #efefef;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  background-color: #036f7e;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 16px;
  user-select: none;
}

.author-name {
  font-size: 12px;
}

.post-body {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.post-actions {
  display: flex;
  gap: 8px;
}

.likes,
.caption {
  font-size: 12px;
  color: #262626;
  text-align: left;
  word-break: break-word;
}

.sem-posts {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 20px;
}

.post-menu {
  background: transparent;
  border: none;
  font-size: 20px;
  line-height: 1;
  color: #262626;
  cursor: pointer;
  user-select: none;
}

.like-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #ed4956;
  user-select: none;
  padding: 0;
  line-height: 1;
  transition: transform 0.1s ease;
}

.like-btn:hover {
  transform: scale(1.2);
}

.usuario-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background 0.2s ease;
}
.usuario-card:hover {
  background: #f2f2f2;
  cursor: pointer;
}
</style>
