<script setup>

</script>

<template>
    <div>
        <!-- Background container -->
        <div class="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div class="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
            </div>
        </div>
        <!-- Main content -->
        <slot />
    </div>
</template>
