<template>
  <div id="app">
    <header class="app-header">
      <div class="container header-container">
        <nav class="nav-links">
          <router-link to="/" class="nav-link">Início</router-link>
          <router-link to="/perfil" class="nav-link">Perfil</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content container">
      <router-view />
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2025 Social Food. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.app-header {
  background-color: #2a8a85;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: white;
  font-weight: 600;
  padding: 8px 0;
  position: relative;
}

.nav-link:hover {
  text-decoration: none;
  opacity: 0.9;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 40px 0 100px;
}

.app-footer {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 16px;
  }
  .footer-links {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
