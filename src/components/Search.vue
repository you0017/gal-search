<script setup lang="ts">
import { ref } from 'vue'
import {getGal} from "../api/Search.ts";
import {ElMessage} from "element-plus";

const searchQuery = ref('')
const searched = ref(false)
const results = ref<API.GalVO[]>([])

defineOptions({
  name: 'SearchComponent'
})

const search = async () => {
    if (searchQuery.value === ''){
        return;
    }
    let result = await getGal(searchQuery.value);
    if (result.code === 0){
        results.value = result.data;
        searched.value = true;
    }else {
        results.value = [];
        searched.value = false;
        ElMessage("没找到资源")
    }
}
</script>

<template>
  <div class="bg-full">
    <div :class="['glass-card', 'main-card', { 'moved': searched }]">
      <h1 class="title">Galgame 搜索</h1>
      <!-- <p class="subtitle">一站式查找你想要的游戏</p> -->
      <form class="search-form" @submit.prevent="search">
        <input
          v-model="searchQuery"
          class="search-input"
          type="text"
          placeholder="请输入游戏名称..."
        />
        <button class="search-btn" type="submit">搜索</button>
      </form>
    </div>
    <transition name="fade-slide">
      <div v-if="searched" class="glass-card result-card">
        <h2 class="result-title">搜索结果</h2>
        <div class="dropdown">
          <ul>
            <li v-for="item in results" :key="item.name"><a :href="`${item.url}`">{{ item.name }}</a></li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: #22223b;
    transition: color 0.2s;
}

.bg-full {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
  background-image: url("/public/imgs/8.png");
  background-size: cover;
  overflow: hidden;
}

.glass-card {
  min-width: 380px;
  max-width: 90vw;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.7s cubic-bezier(.77,0,.18,1);
}

.main-card {
  position: relative;
  z-index: 2;
  margin-bottom: 0;
}
.main-card.moved {
  transform: translateY(-60px) scale(0.98);
  box-shadow: 0 12px 36px 0 rgba(31, 38, 135, 0.13);
  margin-bottom: 0;
}

.result-card {
  margin-top: 1.2rem;
  min-width: 420px;
  animation: drop-in 0.7s cubic-bezier(.77,0,.18,1);
  z-index: 1;
}
@keyframes drop-in {
  0% {
    opacity: 0;
    transform: translateY(-40px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.result-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #22223b;
  margin-bottom: 1.2rem;
  letter-spacing: 1px;
}

.search-form {
  display: flex;
  width: 100%;
  max-width: 500px;
  background: rgba(255,255,255,0.2);
  border-radius: 2.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 0.15rem 1rem;
  align-items: center;
}

.search-input {
  border: none;
  outline: none;
  font-size: 1.08rem;
  padding: 0.45rem 1rem;
  border-radius: 2rem;
  width: 18rem;
  background: transparent;
  color: #22223b;
}

.search-input::placeholder {
  color: #bfc0c0;
}

.search-btn {
  margin-left: 1rem;
  padding: 0.7rem 2.2rem;
  border: none;
  border-radius: 2.5rem;
  background: linear-gradient(90deg, #ff6a00 0%, #ee0979 100%);
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(238,9,121,0.12), 0 1.5px 4px rgba(0,0,0,0.08);
  letter-spacing: 1px;
  outline: none;
}
.search-btn:hover {
  background: linear-gradient(90deg, #ee0979 0%, #ff6a00 100%);
  transform: scale(1.07);
  box-shadow: 0 6px 24px rgba(238,9,121,0.18), 0 2px 8px rgba(0,0,0,0.10);
}

.dropdown {
  width: 100%;
  margin-top: 1.2rem;
  background: rgba(255,255,255,0.35);
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  max-height: 260px;
  overflow-y: auto;
  transition: all 0.4s;
  scrollbar-width: thin;
  scrollbar-color: rgba(238,9,121,0.3) rgba(255,255,255,0.1);
}

/* 自定义滚动条样式 - Webkit浏览器 */
.dropdown::-webkit-scrollbar {
  width: 6px;
}

.dropdown::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  margin: 4px;
}

.dropdown::-webkit-scrollbar-thumb {
  background: rgba(238,9,121,0.3);
  border-radius: 3px;
  transition: all 0.3s;
}

.dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(238,9,121,0.5);
}

.dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0.7rem 0.5rem;
}

.dropdown li {
  padding: 0.7rem 1.2rem;
  font-size: 1.08rem;
  color: #22223b;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  cursor: pointer;
  transition: background 0.18s;
}
.dropdown li:last-child {
  border-bottom: none;
}
.dropdown li:hover {
  background: rgba(238,9,121,0.08);
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.7s cubic-bezier(.77,0,.18,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>