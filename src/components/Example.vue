<template>
  <div>
    <div class="doc-section">
      <div class="markdown-body">
        <h2>{{title}}</h2>
      </div>
    </div>
    <div class="doc-section">
      <slot></slot>
      <div class="highlight"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'example',
    props: {
      title: {
        type: String,
        default: '标题H2'
      }
    }
  }
</script>
