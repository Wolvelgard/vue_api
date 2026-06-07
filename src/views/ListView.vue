<template>
  <div class="list-view">
    <h1 class="title">Personagens de Star Wars</h1>

    <div v-if="loading" class="loading">
      Carregando...
    </div>

    <div v-else class="cards-grid">
      <StarWarsCard
        v-for="personagem in personagens"
        :key="personagem.url"
        :personagem="personagem"
        @ver-detalhes="verDetalhes"
      />
    </div>
  </div>
</template>

<script>
import StarWarsCard from '@/components/StarWarsCard.vue'

export default {
  name: 'ListView',

  components: {
    StarWarsCard
  },

  data() {
    return {
      personagens: [],
      loading: true
    }
  },

  methods: {
    async listarPersonagens() {
      this.loading = true

      try {
        const response = await fetch('https://swapi.info/api/people')
        const data = await response.json()

        this.personagens = data.results || data

        console.log('Personagens carregados:', this.personagens)
      } catch (error) {
        console.error('Erro ao carregar personagens:', error)
      } finally {
        this.loading = false
      }
    },

    verDetalhes(url) {
      const id = url.match(/\/(\d+)\/?$/)[1]

      console.log('Redirecionando para personagem:', id)

      this.$router.push({
        path: `/detalhes/${id}`
      })
    }
  },

  mounted() {
    this.listarPersonagens()
  }
}
</script>

<style scoped>
.list-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
  padding: 2rem;
}

.list-view > * {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.title {
  text-align: center;
  color: #ffd700;
  font-size: clamp(1.8rem, 4vw, 3rem);
  margin-bottom: 2rem;
  font-family: Arial, sans-serif;
  font-weight: 900;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.loading {
  text-align: center;
  color: #ffd700;
  font-size: 1.2rem;
  padding: 4rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>