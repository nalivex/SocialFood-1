<template>
  <div class="reserva-container">
    <h1>Reserva de Carro</h1>

    <div v-if="carro" class="car-info">
      <p><strong>Modelo:</strong> {{ carro.brand }} {{ carro.model }}</p>
      <p><strong>Preço por dia:</strong> R$ {{ carro.daily_price }}</p>
    </div>

    <form @submit.prevent="fazerReserva">
      <label for="start">Data de início:</label>
      <input type="date" v-model="startDate" required />

      <label for="end">Data de término:</label>
      <input type="date" v-model="endDate" required />

      <button type="submit">Confirmar Reserva</button>
    </form>

    <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservaView",
  data() {
    return {
      carro: null,
      startDate: "",
      endDate: "",
      mensagem: "",
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const res = await axios.get(`http://localhost:3000/api/cars/${id}`);
      this.carro = res.data;
    } catch (err) {
      console.error("Erro ao buscar carro:", err);
    }
  },
  methods: {
    calcularPreco() {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Normaliza as datas para o início do dia
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      // Calcula a diferença em milissegundos
      const diffMillis = end - start;

      // Converte a diferença em dias
      const dias = diffMillis / (1000 * 60 * 60 * 24);

      // Verifica se a data final é maior ou igual à inicial
      if (dias < 0) {
        return 0; // ou lançar um erro "Data final anterior à data inicial"
      }

      const valor = dias * this.carro.daily_price;
      return Math.ceil(valor);
    },

    async fazerReserva() {
      try {
        const token = localStorage.getItem("token");
        const preco = this.calcularPreco();

        await axios.post(
          "http://localhost:3000/api/bookings",
          {
            carId: this.carro._carId || this.carro.carId,
            start_date: this.startDate,
            end_date: this.endDate,
            total_price: preco,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.mensagem = "Reserva realizada com sucesso!";
      } catch (err) {
        console.error("Erro ao reservar:", err);
        this.mensagem = "Erro ao realizar a reserva.";
      }
    },
  },
};
</script>

<style scoped>
.reserva-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.car-info {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}
form label {
  display: block;
  margin-top: 10px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.mensagem {
  margin-top: 20px;
  font-weight: bold;
  color: green;
}
</style>
