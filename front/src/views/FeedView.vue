<template>
  <div id="container" ref="posts">
    <TheHeader />
    <main id="posts">
      <PostContainer />
    </main>
    <button class="createPost" @click="showCreateModal = true">
      <ion-icon name="create"></ion-icon>
    </button>
    <Teleport to="body">
      <CreatePost
        :show="showCreateModal"
        @close="showCreateModal = false"
        :modalType="'New'"
        :post="{}"
      >
      </CreatePost>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import usePostStore from "@//stores/postStore.js";
import TheHeader from "@//components/layout/TheHeader.vue";
import CreatePost from "@/components/posts/CreatePost.vue";
import PostContainer from "@/components/posts/PostContainer.vue";

const emit = defineEmits(["sendRefs"]);
const postStore = usePostStore();
const showCreateModal = ref(false);
const posts = ref(null);

useInfiniteScroll(
  posts,
  async () => {
    const lastPost = postStore.posts[postStore.posts.length - 1];
    const lastPostId = lastPost.id;
    await postStore.getAll(undefined, lastPostId);
  },
  {
    distance: 10,
  }
);
</script>

<style lang="scss" scoped>
#container {
  @include container;
}

#posts {
  @include fdCol-aiCt;
  transition: 200ms;
  min-height: min-content;
  padding: 30px 0;
  gap: 30px;
}
.createPost {
  @include jcCt-aiCt;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #2374e1;
  box-shadow: 5px 4px 10px var(--shadowColor);
  border: none;
  border-radius: 70px;
  transition: 0.3s;
  cursor: pointer;
  & > ion-icon {
    position: relative;
    left: 1px;
    font-size: 30px;
    color: white;
  }
}
@media all and (min-width: 789px) {
  .createPost {
    bottom: 25px;
    right: 25px;
    width: 60px;
    height: 60px;
  }
}
</style>
