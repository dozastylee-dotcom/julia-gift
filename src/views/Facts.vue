<template>
  <div
    class="min-h-screen bg-pink-50 font-['Press_Start_2P'] text-pink-700 flex flex-col items-center justify-start p-6 overflow-y-auto"
  >
    <!-- Заголовок -->
    <h1
      class="text-2xl md:text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-600 to-purple-400 drop-shadow-lg text-center leading-relaxed"
    >
      10 Фактов обо мне 💖
    </h1>

    <!-- Карточка -->
    <transition name="fade" mode="out-in">
      <div
        key="fact-{{ currentFactIndex }}"
        class="w-full max-w-md bg-white/80 rounded-2xl p-5 md:p-6 shadow-lg border-4 border-pink-200 text-sm md:text-xl text-center transition-transform duration-300 hover:scale-[1.02] flex flex-col items-center gap-6 backdrop-blur-md"
      >
        <!-- Фото -->
        <img
          v-if="facts[currentFactIndex].image"
          :src="facts[currentFactIndex].image"
          alt="fact image"
          class="max-h-[36rem] md:max-h-[40rem] w-auto rounded-xl shadow-md border-2 border-pink-300 object-contain"
        />

        <!-- Текст -->
        <p class="leading-relaxed px-2 sm:px-6 text-pink-800">
          {{ facts[currentFactIndex].text }}
        </p>
      </div>
    </transition>

    <!-- Навигация -->
    <div class="flex flex-wrap justify-center mt-6 gap-2 md:gap-3">
      <button
        v-for="(fact, index) in facts"
        :key="index"
        @click="currentFactIndex = index"
        class="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-pink-300 flex items-center justify-center font-bold transition-all duration-200 text-xs md:text-sm"
        :class="
          currentFactIndex === index
            ? 'bg-pink-400 text-white shadow-[0_0_10px_#ff69b4]'
            : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
        "
      >
        {{ index + 1 }}
      </button>
    </div>

    <!-- Кнопки Prev / Next -->
    <div class="flex flex-col md:flex-row gap-4 mt-8 items-center">
      <button
        @click="prevFact"
        class="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
      >
        ◀ Prev
      </button>

      <button
        @click="nextFact"
        class="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
      >
        Next ▶
      </button>
    </div>

    <!-- Назад домой -->
    <button
      @click="$router.push('/')"
      class="mt-8 px-5 py-2 md:px-6 md:py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors duration-300 text-xs md:text-sm"
    >
      Back to Home
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 🌸 10 фактов
const facts = [
  { text: "Каждый день в телефоне у моего парня — я его встречаю", image: "/images/pho.jpg" },
  { text: "Я люблю кушать, уже как 20 лет, люблю вкусненькое", image: "/images/eat.jpg" },
  { text: "Если бы не Олег и Кирилл, я бы была Гопотой", image: "/images/gop.jpg" },
  { text: "У меня во рту помещаются 4 пальца", image: "/images/mou.jpg" },
  { text: "🍍", image: "/images/ananas.jpg" },
  { text: "Как-то раз я перебила 300 спартанцев, но завалить меня смог только Кирюша" },
  { text: "В иной вселенной — я шиншилка фыр фыр фыр", image: "/images/rab.jpg" },
  { text: "Ну потом когда-то", image: "/images/preg.jpg" },
  { text: "Скоро с Кирюшей я попаду на F1 и буду хавать попкорн 🗺️" },
  { text: "Я люблю Кирюшу, а он любит меня. Скоро мы будем жить вместе ❤️" }
]

const currentFactIndex = ref(0)

const nextFact = () => {
  currentFactIndex.value = (currentFactIndex.value + 1) % facts.length
}
const prevFact = () => {
  currentFactIndex.value =
    (currentFactIndex.value - 1 + facts.length) % facts.length
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Анимация переходов */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Эффект нажатия */
button:active {
  transform: scale(0.95);
}

/* 📱 Мобильная адаптация */
@media (max-width: 640px) {
  img {
    width: 100%;
    height: auto;
    max-height: none;
    object-fit: contain !important; /* гарантирует, что фото не обрезается */
  }
  p {
    font-size: 0.75rem;
    line-height: 1.6;
  }
}
</style>
