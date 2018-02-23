<template>
  	<div class="a-spinner">
        <icon name="spinner" pulse></icon>
    </div>
</template>

<style lang="scss" scoped>
    @import '../scss/settings';

    .a-spinner {
        position: relative;
        top: -5%;
        left: 50%;
        transform: translateX(-50%);
        width: 10%;
        height: auto;
        margin: 5% 0 5% 0;
        color: $lightblack;

        svg {
            width: 100%;
            height: 100%;
        }
    }
</style>