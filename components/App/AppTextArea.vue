<template>
    <div class="relative w-full" :style="{ width: width }">
        <div class="textarea_overlay" />
        <textarea 
            name="basearea" 
            class="textarea" 
            :value="modelValue"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput" 
        />
        <label for="basearea" class="textarea_label" :class="labelStyle">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
const { label, modelValue } = defineProps<{
    label?: string,
    modelValue: string,
    width?: string,
    height?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const labelStyle = ref<string>('unfocused-label')
const model = toRef<string>(modelValue)

const onFocus = () => {
    labelStyle.value = 'focused-label'
}
const onBlur = () => {
    if (model.value) {
        return
    } else {
        labelStyle.value = 'unfocused-label'
    }
}

const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    model.value = value
    emit('update:modelValue', value)
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.textarea_overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
}
.textarea {
    box-sizing: border-box;
    padding: 25px 12px 5px 12px;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    outline: none;
    min-width: 0;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    color: #1F1F1F;
    transition: .15s background-color cubic-bezier(.4,0,.2,1);
    overflow: auto;
    resize: vertical;
    -webkit-mask-image: linear-gradient(to bottom,transparent,transparent 19px,black 29px);
    mask-image: linear-gradient(to bottom,transparent,transparent 19px,black 29px);
}
.textarea_label {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    pointer-events: none;
    position: absolute;
    color: #424242;
    transition: all .2s cubic-bezier(.4,0,.2,1);
}
.focused-label {
    font-size: 12px;
    top: 4px;
    left: 4px;
}
.unfocused-label {
    font-size: 18px;
    top: 20px;
    left: 20px;
}
.textarea::-webkit-scrollbar {
  width: 12px;
}
.textarea::-webkit-scrollbar-track {
  background-color: #FAFAFA;
}
.textarea::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 4px solid transparent;
  background-clip: content-box;
  background-color: #9E9E9E;
}
.textarea::-webkit-scrollbar-thumb:hover {
  background-color: #424242;
}
</style>