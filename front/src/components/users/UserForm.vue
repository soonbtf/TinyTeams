<template>
  <div id="container">
    <div class="formContainer">
      <TheLogo />
      <main class="form">
        <h2 class="form__title">{{ title }}</h2>
        <form class="form__body" @submit.prevent="submit">
          <slot></slot>
        </form>
      </main>
      <footer>
        <p>
          {{ question }}
          <router-link :to="link" @click="userStore.$reset()">{{
            reponse
          }}</router-link>
        </p>
      </footer>
    </div>
    <div class="error" v-if="popup">
      <span> {{ error }} </span>
    </div>
  </div>
</template>

<script setup>
import useUserStore from "@/stores/userStore.js";
import TheLogo from "@//components/layout/TheLogo.vue";

const props = defineProps({
  title: String,
  submit: Function,
  error: String,
  link: String,
  question: String,
  reponse: String,
  popup: Boolean,
});

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
#container {
  @include jcCt-aiCt;
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("@/assets/entreprise.jpg");
  background-size: cover;
}
.formContainer {
  @include fdCol-jcSe-aiCt;
  width: 100%;
  max-width: 600px;
  max-height: min-content;
  background-color: rgb(255, 255, 255);
  box-shadow: 5px 5px 20px #0000003d;
  padding: 3% 2%;
  gap: 20px;
  border-radius: 5px;
}

.form {
  @include fdCol-jcCt-aiCt;
  gap: 20px;
  width: 100%;
  flex: 1;
  &__title {
    width: 100%;
    height: 50px;
    font-weight: 700;
    font-size: 35px;
    text-align: center;
    color: rgba(0, 0, 0, 0.75);
  }
  &__body {
    @include fdCol-jcSe-aiCt;
    width: 100%;
    gap: 50px;
  }
}

footer {
  @include jcCt;
  align-items: center;
  gap: 10px;
  & p {
    flex: 1;
    max-width: max-content;
    height: min-content;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    & a {
      color: #2374e1;
      text-decoration: none;
      &:hover {
        font-weight: bold;
      }
    }
  }
}
.error {
  @include jcCt-aiCt;
  position: absolute;
  bottom: 3%;
  left: 50%;
  width: 300px;
  height: 50px;
  background-color: #df2222;
  border-radius: 5px;
  transform: translate(-50%, 0);
  animation: displayError 5s 1;
  box-shadow: 5px 5px 20px #0000003d;
  opacity: 0;
  & > span {
    font-size: 18px;
    color: white;
    text-align: center;
    font-weight: bold;
  }
}

@keyframes displayError {
  0% {
    opacity: 0;
  }
  7% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    opacity: 0;
  }
}

@media all and (min-width: 1440px) {
  #container {
    margin: 0 10% 0 0;
  }
}

@media all and (min-width: 1440px) {
  #container {
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 10%;
  }
}
</style>
