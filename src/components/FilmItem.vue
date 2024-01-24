<template>
  <div class="FilmItem" v-if="film">
    <h3>{{ film?.title }}</h3>
    <p>Release date: {{ releaseDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { computed } from 'vue';

const props = defineProps<{ 
  film: {
    id: string,
    title: string,
    releaseDate: string
  } 
}>();

const { result } = useQuery(
  gql`
    query getFilmReleaseDate($id: ID!) {
      film(id: $id) {
        id
        releaseDate
      }
    }
  `, 
  () => ({ id: props.film?.id }),
  { fetchPolicy: 'cache-only' }
);

const releaseDate = computed(() => result.value?.film?.releaseDate || '');
</script>

<style scoped>
.FilmItem {
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
}

h3 {
  margin: 0;
}
</style>
