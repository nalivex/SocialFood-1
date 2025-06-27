<template>
  <div class="feed-container">
    <header>
      <h1><span class="logo-font">DriveCar</span></h1>
      <nav>
        <router-link to="/">Carros</router-link>
        <router-link to="/">Ofertas</router-link>
        <router-link to="/">Avaliações</router-link>
      </nav>
    </header>

    <main class="feed">
      <h1>Encontre o carro perfeito para sua viagem!</h1>
      <p>Alugue veículos com conforto e segurança para suas aventuras.</p>

      <section class="search">
        <input
          type="text"
          v-model="searchTerm"
          @input="buscarCarros"
          placeholder="Buscar carros por modelo ou marca..."
          class="search-input"
        />
      </section>

      <section>
        <div v-if="loading" class="loading">Carregando carros...</div>

        <div v-else>
          <div v-if="cars.length === 0" class="sem-posts">
            Nenhum carro encontrado.
          </div>

          <div v-else>
            <router-link
              v-for="(car, index) in cars"
              :key="car.carId"
              :to="`/car/${car.carId}`"
              class="post-card"
              style="text-decoration: none; color: inherit"
            >
              <div class="post-image-wrapper">
                <img
                  :src="
                    car.image
                      ? `http://localhost:3000/${car.image}`
                      : getDefaultImage(index)
                  "
                  :alt="car.model"
                  class="post-image"
                />
              </div>
              <div class="post-body">
                <div class="caption">
                  <strong>{{ car.brand }} {{ car.model }}</strong
                  ><br />
                  Ano: {{ car.year }}<br />
                  Placa: {{ car.license_plate }}<br />
                  Preço por dia: R$ {{ car.daily_price }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      cars: [],
      loading: false,
      searchTerm: "",
      defaultImages: [
        require("@/assets/img1.jpg"),
        require("@/assets/img2.jpg"),
        require("@/assets/img3.jpg"),
        require("@/assets/img4.jpg"),
        require("@/assets/img5.jpg"),
        require("@/assets/img6.jpg"),
      ],
    };
  },
  methods: {
    getDefaultImage(index) {
      return this.defaultImages[index % this.defaultImages.length];
    },
    async buscarCarros() {
      this.loading = true;
      try {
        let url = "/api/cars";
        if (this.searchTerm.trim() !== "") {
          url = `/api/cars/search?q=${encodeURIComponent(this.searchTerm)}`;
        }
        const res = await axios.get(url);
        this.cars = res.data;
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        this.cars = [];
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.buscarCarros();
  },
};
</script>

<style scoped>
.feed-container {
  background-color: #fafafa;
  min-height: 100vh;
  padding: 16px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.logo-font {
  font-weight: bold;
  font-size: 2rem;
  color: #007bff;
}

nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #333;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #007bff;
}

.feed {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.post-card {
  width: 100%;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  transition: box-shadow 0.3s ease;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.post-image-wrapper {
  width: 100%;
  height: 400px;
  background-color: #efefef;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-body {
  padding: 12px;
}

.caption {
  font-size: 14px;
  color: #262626;
  text-align: left;
  word-break: break-word;
}

.loading,
.sem-posts {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  padding: 2rem 0;
}
</style>
