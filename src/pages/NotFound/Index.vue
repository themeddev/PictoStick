<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>

    <div 
        class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16" 
        v-motion-fade
    >
        <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div class="relative">
                <div class="absolute">
                    <div class="flex flex-col gap-4 my-2">
                        <h1 class="text-gray-800 font-bold text-2xl">
                            Looks like you've found the
                            doorway to the great nothing
                        </h1>
                        <p class="text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                        <RouterLink
                            :to="{ name : 'home' }"
                            class="sm:w-full lg:w-auto w-full border rounded py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                        >
                            Take me there!
                        </RouterLink>
                    </div>
                </div>
                <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                </div>
            </div>
        </div>
        <div>
            <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
    </div>

</template>