<template>
  <div class="flex flex-col md:flex-row h-screen bg-pink-100 font-['Press_Start_2P'] text-pink-700 overflow-hidden">
    <!-- Левая панель -->
    <div class="w-full md:w-1/3 flex flex-col justify-center items-center gap-6 md:gap-8 border-b-4 md:border-b-0 md:border-r-4 border-pink-300 bg-pink-50 p-6">
      <h1 class="text-xl md:text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-600 to-purple-400 drop-shadow-lg text-center">
        Выбери меня!
      </h1>

      <div class="flex flex-wrap justify-center gap-4 md:gap-6">
        <button
          v-for="emotion in emotions"
          :key="emotion.name"
          @click="setEmotion(emotion)"
          class="text-3xl md:text-5xl transition-transform duration-200 hover:scale-125 hover:drop-shadow-[0_0_15px_#ff69b4]"
          :class="selectedEmotion?.name === emotion.name ? 'drop-shadow-[0_0_20px_#ff69b4] animate-pulse' : ''"
        >
          {{ emotion.icon }}
        </button>
      </div>

      <button
        @click="$router.push('/facts')"
        class="mt-6 md:mt-8 px-4 py-2 md:px-6 md:py-3 bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-500 transition-colors duration-300 text-xs md:text-sm"
      >
        Познавай меня дурачина 💖
      </button>
    </div>

    <!-- Правая панель -->
    <div class="w-full md:w-2/3 flex flex-col justify-center items-center relative overflow-hidden p-4">
      <!-- Градиентный фон -->
      <div class="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 animate-gradientShift"></div>

      <transition name="fade" mode="out-in">
        <div key="image" class="flex flex-col justify-center items-center w-full h-full relative z-10 gap-4">
          <!-- Фото -->
          <img
            v-if="selectedEmotion"
            ref="photoRef"
            :src="selectedEmotion.image"
            :alt="selectedEmotion.name"
            class="max-h-[45vh] md:max-h-[60%] max-w-[85%] object-contain rounded-2xl border-4 border-pink-300 shadow-[0_0_20px_#ff69b4] transition-transform duration-300 hover:scale-105"
          />

          <!-- Текст под фото на телефоне -->
          <p
            v-if="selectedEmotion"
            ref="textRef"
            class="block md:hidden text-lg text-pink-600 drop-shadow-lg text-center px-4"
          >
            {{ selectedEmotion.name }}
          </p>

          <!-- Текст поверх фото (только на ПК) -->
          <p
            v-if="selectedEmotion"
            class="hidden md:block absolute bottom-10 text-2xl text-pink-600 opacity-0 drop-shadow-lg text-center px-4"
            ref="textRef"
          >
            {{ selectedEmotion.name }}
          </p>

          <!-- Подсказка -->
          <p
            v-else
            class="absolute text-pink-400 text-xs md:text-sm opacity-70 bottom-6 md:bottom-8 text-center"
          >
            👈 Tap an emoji to see her vibe
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import gsap from "gsap";

const emotions = [
  { name: "вайбовая", icon: "😎", image: "/images/vibe.jpg" },
  { name: "игривая", icon: "😉", image: "/images/playful.jpg" },
  { name: "дурочка", icon: "🤪", image: "/images/funny.jpg" },
  { name: "королева", icon: "👑", image: "/images/queen.jpg" },
  { name: "сексуальная", icon: "🔥", image: "/images/sexy.jpg" }
];

const selectedEmotion = ref(null);
const photoRef = ref(null);
const textRef = ref(null);

const setEmotion = (emotion) => {
  selectedEmotion.value = emotion;
};

watch(selectedEmotion, async () => {
  await nextTick();
  if (photoRef.value) {
    gsap.fromTo(
      photoRef.value,
      { opacity: 0, scale: 0.8, filter: "drop-shadow(0 0 0px #ff69b4)" },
      { opacity: 1, scale: 1, filter: "drop-shadow(0 0 20px #ff69b4)", duration: 0.8, ease: "power2.out" }
    );
  }

  // Анимация текста только на ПК (чтобы не мешала верстке на телефоне)
  if (textRef.value && window.innerWidth >= 768) {
    gsap.fromTo(
      textRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradientShift {
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
</style>
