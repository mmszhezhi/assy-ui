<template>
  <div class="modal fade" tabindex="-1" :id="id">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button v-if="negative" type="button" class="btn" :class="[negativeClass]" data-bs-dismiss="modal">{{ negativeText }}</button>
          <button type="button" class="btn" :class="[positiveClass]" :disabled="!modelValue" @click="$emit('onPositiveClick')" >{{ positiveText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalDialog",
  props: {
    id: String,
    title: {
      type: String,
      default: "提示"
    },
    negativeText: {
      type: String,
      default: "取消"
    },
    positiveText: {
      type: String,
      default: "确认"
    },
    negativeClass: {
      type: String,
      default: "btn-secondary"
    },
    positiveClass: {
      type: String,
      default: "btn-primary"
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    negative: {
      type: Boolean,
      default: true
    }
  },
  emits: ["onPositiveClick"]
}
</script>

<style scoped>

</style>