<template>
  <div>
    <button class="ellipsis-button" @click="showOptions">
      <i class="pi pi-ellipsis-v text-2xl font-gray-600" />
    </button>
    <ul v-show="isShow" class="options-wrapper">
      <li class="option" @click="clickOption('modify')">
        <i class="pi pi-pencil mr-4 font-gray-600" />
        <span>수정</span>
      </li>
      <li class="option" @click="clickOption('delete')">
        <i class="pi pi-trash mr-4 font-gray-600" />
        <span>삭제</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  (e: "option", optionName: string): void;
}>();

// variables
const isShow = ref<boolean>(false);

// methods
const showOptions = () => {
  isShow.value = !isShow.value;
};

const clickOption = (option: string) => {
  emit("option", option);
};
</script>
<style lang="scss" scoped>
.ellipsis-button {
  background: transparent;
  border: none;
}

.options-wrapper {
  position: absolute;
  top: rem(37px);
  right: rem(10px);
  width: rem(140px);
  height: rem(98px);

  border: rem(1px) solid $gray600;
  box-sizing: border-box;
  box-shadow: rem(0px) rem(4px) rem(5px) rgba(0, 0, 0, 0.15);
  border-radius: rem(10px);
  background: white;
  font-size: rem(14px);
  color: $gray600;
  .option {
    display: flex;
    align-items: center;
    padding: rem(17px) rem(34px);
    &:nth-child(2n) {
      border-top: rem(1px) solid $gray600;
    }
  }
}
</style>
