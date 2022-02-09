<template>
  <div class="cast-container">
    <v-img
      class="castImage mb-3"
      width="140px"
      height="210px"
      :src="
        cast.profile_path !== null
          ? 'https://www.themoviedb.org/t/p/original/' + cast.profile_path
          : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png'
      "
    />
    <span class="d-block mb-1">{{ cast.name }}</span>
    <span class="d-block">{{ cast.character.split("/")[0] }}</span>
  </div>
</template>

<script>
export default {
  props: { cast: Object },
};
</script>