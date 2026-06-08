<script lang="ts">
import axios from 'axios'
import StarWarsCard from '@/components/StarWarsCard.vue'

export default {
  name: 'ListView',

  components: {
    StarWarsCard
  },

  data() {
    return {
      personagens: [],
      busca: '',
      loading: false
    }
  },

  mounted() {
    this.listarPersonagens()
  },

  computed: {
    personagensFiltrados() {
      return this.busca
        ? this.personagens.filter(personagem =>
            personagem.name
              .toLowerCase()
              .includes(this.busca.toLowerCase())
          )
        : this.personagens
    }
  },

  methods: {
    async listarPersonagens() {
      this.loading = true

      try {
        const api = axios.create({
          baseURL: 'https://swapi.info/api/people'
        })

        const resposta = await api.get('')

        this.personagens = resposta.data.results || resposta.data

        console.log('Personagens carregados:', this.personagens)
      } catch (erro) {
        console.error('Erro ao carregar personagens:', erro)
      } finally {
        this.loading = false
      }
    },

    verDetalhes(url: string) {
      const id = url.match(/\/(\d+)\/?$/)?.[1]

      if (!id) return

      this.$router.push({
        path: `/detalhes/${id}`
      })
    }
  }
}
</script>

<template>
  <div class="list-view">
    <h1 class="titulo">Personagens de Star Wars</h1>

    <div class="search-wrapper">
      <input
        v-model="busca"
        type="text"
        class="search-input"
        placeholder="Busque um personagem"
      />
    </div>

    <div class="cards-grid">
      <StarWarsCard
        v-for="personagem in personagensFiltrados"
        :key="personagem.url"
        :personagem="personagem"
        @ver-detalhes="verDetalhes"
      />
    </div>
  </div>
</template>

<style scoped>
/* TODO O CSS ORIGINAL PERMANECE IGUAL */
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

.search-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px auto 30px auto;
  max-width: 1400px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid #ffd700;
  border-radius: 50px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 215, 0, 0.6);
}

</style>