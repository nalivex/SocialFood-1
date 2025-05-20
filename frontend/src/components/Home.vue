<template>
  <div class="container text-center" style="padding-top: 100px">
    <h1>Bem-vindo ao Social Food!</h1>
    <p>Descubra, avalie e compartilhe experiências gastronômicas.</p>
    <router-link to="/restaurantes" class="btn-explore">
      Explorar Restaurantes
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style>
.btn-explore {
  display: inline-block;
  background-color: #2a8a85;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 30px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-explore:hover {
  background-color: #1e6f6b;
}
</style>
