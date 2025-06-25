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
      <section class="feed">
        <h2>Carros Disponíveis para Aluguel</h2>
        <div class="card-container">
          <div class="card">
            <img src="@/assets/img1.jpg" alt="Carro 1" />
            <h3>Fusca 1970</h3>
            <p>Alugue por R$ 150/dia</p>
          </div>
          <div class="card">
            <img src="@/assets/img2.jpg" alt="Carro 2" />
            <h3>Chevrolet Onix</h3>
            <p>Alugue por R$ 120/dia</p>
          </div>
          <div class="card">
            <img src="@/assets/img3.jpg" alt="Carro 3" />
            <h3>Honda Civic</h3>
            <p>Alugue por R$ 200/dia</p>
          </div>
          <div class="card">
            <img src="@/assets/img4.jpg" alt="Carro 4" />
            <h3>Toyota Corolla</h3>
            <p>Alugue por R$ 180/dia</p>
          </div>
          <div class="card">
            <img src="@/assets/img5.jpg" alt="Carro 5" />
            <h3>Ford Fiesta</h3>
            <p>Alugue por R$ 130/dia</p>
          </div>
          <div class="card">
            <img src="@/assets/img6.jpg" alt="Carro 6" />
            <h3>Jeep Compass</h3>
            <p>Alugue por R$ 300/dia</p>
          </div>
          <!-- Adicione mais cards de carros -->
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Adicione estilos personalizados aqui */
</style>
