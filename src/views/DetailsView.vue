<template>
  <div class="details-view">
    <button class="back-btn" @click="voltar">
      ← Voltar
    </button>

    <div v-if="personagem" class="details-card">
      <div class="details-header">
        <h1 class="character-name">{{ personagem.name }}</h1>
      </div>

      <div class="details-grid">
        <div class="detail-item">
          <span class="detail-label">Altura:</span>
          <span class="detail-value">{{ formatAltura(personagem.height) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Peso:</span>
          <span class="detail-value">{{ formatPeso(personagem.mass) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Cor do cabelo:</span>
          <span class="detail-value">{{ formatTexto(personagem.hair_color) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Cor da pele:</span>
          <span class="detail-value">{{ formatTexto(personagem.skin_color) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Cor dos olhos:</span>
          <span class="detail-value">{{ formatTexto(personagem.eye_color) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Ano de nascimento:</span>
          <span class="detail-value">{{ personagem.birth_year || 'Desconhecido' }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Gênero:</span>
          <span class="detail-value">{{ formatTexto(personagem.gender) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Data de criação:</span>
          <span class="detail-value">{{ formatarData(personagem.created) }}</span>
        </div>
        
        <div class="detail-item">
          <span class="detail-label">Última edição:</span>
          <span class="detail-value">{{ formatarData(personagem.edited) }}</span>
        </div>
      </div>

      <div class="details-footer">
        <button class="action-btn" @click="voltar">
          Voltar para lista
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsView',
  data() {
    return {
      personagem: null
    }
  },
  methods: {
    // Função simplificada - sem try/catch e sem validações
    buscarDetalhes() {
      const id = this.$route.params.id
      fetch(`https://swapi.info/api/people/${id}`)
        .then(response => response.json())
        .then(data => {
          this.personagem = data
        })
    },
    
    formatAltura(height) {
      if (!height || height === 'unknown') return 'Desconhecida'
      return `${(height / 100).toFixed(2)}m`
    },
    
    formatPeso(mass) {
      if (!mass || mass === 'unknown') return 'Desconhecido'
      return `${mass}kg`
    },
    
    formatTexto(texto) {
      if (!texto || texto === 'unknown' || texto === 'n/a') return 'Desconhecido'
      return texto.charAt(0).toUpperCase() + texto.slice(1)
    },
    
    formatarData(data) {
      if (!data) return 'Desconhecida'
      return new Date(data).toLocaleDateString('pt-BR')
    },
    
    voltar() {
      this.$router.back()
    }
  },
  mounted() {
    this.buscarDetalhes()
  }
}
</script>

<style scoped>
.details-view {
  min-height: 100px;
  padding: 10px;
  background: #0a0a1a;
}

.back-btn,
.action-btn {
  padding: 20px;
  border: 0;
  border-radius: 8px;
  background: #ffd700;
  color: #111;
  font-weight: 700;
  margin-bottom: 10px;
  cursor: pointer;
}

.details-card {
  padding: 50px;
  border: 2px solid #ffd700;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
}

.details-header,
.details-footer {
  text-align: center;
  padding: 10px;
}

.character-name {
  margin: 5px;
  color: #ffd700;
  font-size: 50px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-left: 3px solid #ffd700;
  border-radius: 8px;
  background: #282726;
}

.detail-label {
  color: rgb(255 215 0 / .7);
  font-weight: 600;
}

.detail-value {
  color: #ffd700;
  font-weight: 700;
}
</style>