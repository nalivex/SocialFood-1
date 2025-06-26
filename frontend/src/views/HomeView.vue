<template>
  <div id="app">
    <header>
      <h1><span class="logo-font">DriveCar</span></h1>
      <nav>
        <router-link to="/">Carros</router-link>
        <router-link to="/">Ofertas</router-link>
        <router-link to="/">Avaliações</router-link>
      </nav>
    </header>

    <main>
      <h1>Encontre o carro perfeito para sua viagem!</h1>
      <p>Alugue veículos com conforto e segurança para suas aventuras.</p>
      <p>Cadastre-se e fique por dentro de todas as novidades!</p>
      <router-link to="/register" class="btn btn-primary">
        Cadastrar
      </router-link>

      <section class="search">
        <input
          type="text"
          v-model="searchTerm"
          @input="buscarCarros"
          placeholder="Buscar carros por modelo ou marca..."
        />
      </section>

      <section class="feed">
        <h2>Carros Disponíveis para Aluguel</h2>

        <div v-if="loading" class="loading">Carregando carros...</div>

        <div v-else class="card-container">
          <div v-if="cars.length === 0" class="empty-message">
            Nenhum carro disponível no momento.
          </div>

          <div v-else>
            <router-link
              v-for="(car, index) in cars"
              :key="car.carId"
              :to="`/car/${car.carId}`"
              class="card"
              style="text-decoration: none; color: inherit"
            >
              <img
                :src="car.image || getDefaultImage(index)"
                :alt="car.brand + ' ' + car.model"
              />
              <h3>{{ car.brand }} {{ car.model }}</h3>
              <p>Alugue por R$ {{ car.daily_price }}/dia</p>
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

<style>
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

main h1 {
  margin-bottom: 0.5rem;
}

.btn-primary {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 1rem;
  cursor: pointer;
}

.search input {
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 0 6px rgb(0 0 0 / 0.1);
  background: white;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 0 10px #007bffaa;
}

.card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.loading,
.empty-message {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  padding: 2rem 0;
}
</style>
