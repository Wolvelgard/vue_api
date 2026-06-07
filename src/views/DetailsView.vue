<template>
  <div class="details-view">
    <button class="back-btn" @click="voltar">
      ← Voltar
    </button>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando dados do personagem...</p>
    </div>

    <div v-else-if="personagem" class="details-card">
      <div class="details-header">
        <div class="character-icon">⭐</div>
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

    <div v-else class="error">
      <p>❌ Personagem não encontrado</p>
      <button class="back-btn" @click="voltar">Voltar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsView',
  data() {
    return {
      personagem: null,
      loading: true
    }
  },
  methods: {
    async buscarDetalhes() {
      this.loading = true
      const id = this.$route.params.id
      
      try {
        const response = await fetch(`https://swapi.info/api/people/${id}`)
        if (!response.ok) throw new Error('Personagem não encontrado')
        this.personagem = await response.json()
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error)
        this.personagem = null
      } finally {
        this.loading = false
      }
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
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
  padding: 2rem;
}

.details-view > * {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.back-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #ffd700;
  color: #111;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
  margin-bottom: 2rem;
}

.back-btn:hover {
  background: #ffea4d;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  color: #ffd700;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 215, 0, 0.3);
  border-top: 4px solid #ffd700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.details-card {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #ffd700;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.details-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
}

.character-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.character-name {
  color: #ffd700;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 900;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 8px;
  border-left: 3px solid #ffd700;
}

.detail-label {
  color: rgba(255, 215, 0, 0.7);
  font-weight: 600;
  font-size: 0.9rem;
}

.detail-value {
  color: #ffd700;
  font-weight: bold;
  font-size: 1rem;
}

.details-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(255, 215, 0, 0.3);
}

.action-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  background: #ffd700;
  color: #111;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 1rem;
}

.action-btn:hover {
  background: #ffea4d;
  transform: translateY(-2px);
}

.error {
  text-align: center;
  color: #ffd700;
  padding: 4rem 0;
}

.error p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

/* Responsivo */
@media (max-width: 768px) {
  .details-view {
    padding: 1.25rem;
  }
  
  .details-card {
    padding: 1.5rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .detail-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .details-view {
    padding: 1rem;
  }
  
  .details-card {
    padding: 1rem;
  }
  
  .character-icon {
    font-size: 3rem;
  }
  
  .action-btn, .back-btn {
    width: 100%;
  }
}
</style>