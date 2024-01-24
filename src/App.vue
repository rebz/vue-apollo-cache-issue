<template>
  <div>
    <h1>Star Wars Films</h1>
    <div v-if="films.length">
      <FilmItem 
        v-for="film in films"
        :film="film"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import FilmItem from './components/FilmItem.vue';
import { gql } from '@apollo/client/core';
import { computed } from 'vue';

const { result } = useQuery(gql`
  query getAllFilms {
    allFilms {
      films {
        id
        title
        releaseDate
      }
    }
  }
`);

const films = computed(() => result.value?.allFilms?.films || [])
</script>

<style scoped>
</style>
