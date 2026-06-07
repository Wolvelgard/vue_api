<template>
  <div class="list-view">
    <h1 class="titulo">Personagens de Star Wars</h1>

    <div class="cards-grid">
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

}

.list-view > * {
  max-width: 1400px;
}

.titulo {
  text-align: center;
  color: #ffd700;
  font-size: 70px;
  margin-bottom: 10px;
  font-weight: 900;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
</style>