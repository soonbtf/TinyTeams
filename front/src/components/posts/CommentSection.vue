<template>
  <section class="commentsSection">
    <div
      class="commentsSection__comment"
      v-if="comments"
      v-for="comment in comments"
      :key="comment.id"
      :id="comment.id"
    >
      <ProfilePicture
        :url="comment.user.profilePicture"
        width="35px"
        height="35px"
      />
      <CommentPost
        :comment="comment"
        v-model:selectedCommentId="selectedCommentId"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import ProfilePicture from "@/components/layout/ProfilePicture.vue";
import CommentPost from "@/components/posts/CommentPost.vue";

const props = defineProps({
  comments: Array,
});

const selectedCommentId = ref(null);
</script>

<style lang="scss" scoped>
.commentsSection {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__comment {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
