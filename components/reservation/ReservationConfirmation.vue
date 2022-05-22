<template>
  <section class="overlay">
    <div class="confirm-resa">
      <h3>{{ message }}<i class="fa fa-check-circle" aria-hidden="true" /></h3>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    message () {
      return this.$store.getters['reservation/confirmationMessage']
    }
  }
}
</script>

<style scoped lang="scss">
.overlay {
  background-color: rgba(128, 128, 128, 0.63);
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.confirm-resa {
  position: absolute;
  z-index: 20;
  top: 350px;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  // width: 25rem;
  // min-width: 25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.26);
  padding: 0.9rem;
  border-radius: 4px;
  border: 0.5px solid $bleu-pastel;
  background-color: #fff;

  h3 {
    font-size: 1.1rem;
  }

  .fa.fa-check-circle {
    margin-left: 0.4em;
    color: $vert-fonce;
  }
}
</style>
