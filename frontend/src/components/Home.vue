<template>
  <div class="feed-container">
    <header>
      <h1><span class="logo-font">Noshter</span></h1>
      <input
        type="text"
        placeholder="Buscar"
        v-model="busca"
        class="search-input"
      />
      <nav>
        <router-link to="/profile">Perfil</router-link>
        <router-link to="/">Sair</router-link>
      </nav>
    </header>

    <main class="feed">
      <div v-for="post in postsFiltrados" :key="post.id" class="post-card">
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

      <div v-if="postsFiltrados.length === 0" class="sem-posts">
        Nenhum post encontrado.
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      busca: "",
      posts: [
        {
          id: 1,
          autor: "ana_cozinha",
          imagem: "https://picsum.photos/seed/1/600/600",
          titulo: "Risoto delicioso",
          descricao: "Meu risoto de camarão ficou incrível!",
          curtidas: 123,
        },
        {
          id: 2,
          autor: "chef.joao",
          imagem: "https://picsum.photos/seed/2/600/600",
          titulo: "Macarronada",
          descricao: "Macarrão caseiro com molho especial 🍝",
          curtidas: 89,
        },
      ],
    };
  },
  computed: {
    postsFiltrados() {
      const texto = this.busca.toLowerCase();
      return this.posts.filter(
        (p) =>
          p.autor.toLowerCase().includes(texto) ||
          p.descricao.toLowerCase().includes(texto)
      );
    },
  },
  methods: {
    irParaPerfil() {
      this.$router.push("/perfil");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    curtirPost(post) {
      post.curtidas++;
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
  margin-top: 50px;
  max-width: 1000px;
  padding: 24px 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.post-card {
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
}

.post-image-wrapper {
  width: 100%;
  height: 300px;
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
  background-color: #bbb;
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
</style>
