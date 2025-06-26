<template>
  <div class="feed-container">
    <header>
      <h1><span class="logo-font">DriveCar</span></h1>
      <input
        type="text"
        placeholder="Buscar carro por marca ou modelo"
        v-model="busca"
        class="search-input"
      />
      <nav>
        <router-link to="/profile">Perfil</router-link>
        <router-link to="/" @click="logout">Sair</router-link>
      </nav>
    </header>

    <main class="feed">
      <!-- Resultados da busca -->
      <div v-if="busca && carros.length === 0" class="sem-posts">
        Nenhum carro encontrado.
      </div>

      <div v-else>
        <div v-for="carro in carros" :key="carro.carId" class="post-card">
          <div class="post-image-wrapper">
            <img
              :src="`http://localhost:3000${carro.image}`"
              :alt="carro.model"
              class="post-image"
            />
          </div>
          <div class="post-body">
            <div class="caption">
              <strong>{{ carro.brand }} {{ carro.model }}</strong
              ><br />
              Ano: {{ carro.year }}<br />
              Placa: {{ carro.license_plate }}<br />
              Preço por dia: R$ {{ carro.daily_price }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      busca: "",
      carros: [],
    };
  },
  mounted() {
    this.carregarCarros();
  },
  watch: {
    busca: "buscarCarros",
  },
  methods: {
    async carregarCarros() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/cars", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.carros = response.data;
      } catch (error) {
        console.error("Erro ao carregar carros:", error);
      }
    },
    async buscarCarros() {
      if (this.busca.trim() === "") {
        this.carregarCarros();
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/cars/search?q=${encodeURIComponent(
            this.busca
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.carros = response.data;
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
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
