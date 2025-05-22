<template>
  <div id="app">
    <!-- Aqui será renderizado o conteúdo de cada rota -->
    <router-view />

    <footer>
      <div class="footer-column">
        <h3>Noshster</h3>
        <p>Conectando apaixonados por comida ao redor do mundo.</p>
      </div>
      <div class="footer-bottom">
        © 2025 Noshster. Todos os direitos reservados.
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* (mantenha seus estilos aqui, exatamente como estavam antes) */
</style>
