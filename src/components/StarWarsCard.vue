<template>
  <div class="card">
    <h3>{{ personagem.name }}</h3>

    <p><strong>Altura:</strong> {{ formatAltura(personagem.height) }}</p>
    <p><strong>Peso:</strong> {{ formatPeso(personagem.mass) }}</p>

    <button @click="$emit('ver-detalhes', personagem.url)">
      Ver Detalhes
    </button>
  </div>
</template>

<script>
export default {
  name: 'StarWarsCard',

  props: {
    personagem: {
      type: Object,
      required: true
    }
  },

  emits: ['ver-detalhes'],

  methods: {
    formatAltura(height) {
      if (!height || height === 'unknown') {
        return 'Desconhecida'
      }

      return `${(Number(height) / 100).toFixed(2)}m`
    },

    formatPeso(mass) {
      if (!mass || mass === 'unknown') {
        return 'Desconhecido'
      }

      return `${mass}kg`
    }
  }
}
</script>

<style scoped>
.card {
  border: 2px solid #ffd700;
  border-radius: 10px;
  padding: 15px;
  background: #1a1a2e;
  color: #ffd700;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
}

.card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  color: #ffd700;
}

.card p {
  margin: 8px 0;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #ffd700;
  color: #1a1a2e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #ffed4a;
  transform: scale(1.02);
}
</style>