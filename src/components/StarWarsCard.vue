<template>
  <div class="card">
    <h3>{{ personagem.name }}</h3>

    <p>Altura: {{ formatAltura(personagem.height) }}</p>
    <p>Peso: {{ formatPeso(personagem.mass) }}</p>

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
}

.card:hover {
  transform: translateY(-5px);
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
  border: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
}

button:hover {
  background-color: #ffed4a;
  transform: translateY(-5px);
}
</style>