<script setup lang="ts">
import { getCaptions } from 'yt-caption-extractor'

const captions = await getCaptions('SX_ViT4Ra7k')
</script>

<template>
  {{ captions }}
</template>

<style>
html.dark {
  background: #222;
  color: white;
}
</style>