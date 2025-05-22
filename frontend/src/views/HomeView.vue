<template>
  <div id="app">
    <header>
      <h1><span class="logo-font">Noshter</span></h1>
      <nav>
        <router-link to="/">Restaurantes</router-link>
        <router-link to="/">Pratos</router-link>
        <router-link to="/">Avaliações</router-link>
      </nav>
    </header>

    <main>
      <h1>Explore sabores. Compartilhe experiências.</h1>
      <p>Conecte-se com pessoas que amam gastronomia como você!</p>
      <router-link to="/register" class="btn btn-primary"
        >Começar agora
      </router-link>
      <section class="feed">
        <h2>Últimos Pratos Compartilhados</h2>
        <div class="card-container">
          <div class="card">
            <img src="@/assets/banner-gastronomia.jpg" alt="Prato 1" />
            <h3>Risoto de Cogumelos</h3>
            <p>Postado por @ana.gastronomia</p>
          </div>
          <div class="card">
            <img src="@/assets/banner-gastronomia.jpg" alt="Prato 2" />
            <h3>Tacos Mexicanos</h3>
            <p>Postado por @luiz_chef</p>
          </div>
          <div class="card">
            <img src="@/assets/banner-gastronomia.jpg" alt="Prato 2" />
            <h3>Tacos Mexicanos</h3>
            <p>Postado por @luiz_chef</p>
          </div>
          <div class="card">
            <img src="@/assets/banner-gastronomia.jpg" alt="Prato 2" />
            <h3>Tacos Mexicanos</h3>
            <p>Postado por @luiz_chef</p>
          </div>
          <div class="card">
            <img src="@/assets/banner-gastronomia.jpg" alt="Prato 2" />
            <h3>Tacos Mexicanos</h3>
            <p>Postado por @luiz_chef</p>
          </div>
          <div class="card">
            <img src="@/assets/banner-gastronomia.jpg" alt="Prato 2" />
            <h3>Tacos Mexicanos</h3>
            <p>Postado por @luiz_chef</p>
          </div>
          <!-- Adicione mais cards -->
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
<style></style>
