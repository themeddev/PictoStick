<template>
    <div class="flex flex-col items-center justify-center gap-4 h-full w-full px-[4%] md:px-[10%] py-[10%]">
        <!-- Title -->
        <h2 class="text-center text-3xl font-medium text-gray-900 sm:text-6xl">
            Generate a nekosia,
            <span class="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
                Start using our AI nekosia generator
            </span>
        </h2>

        <!-- Input prompt section -->
        <div class="mt-6 w-full lg:w-[80%]">
            <PropmtTextarea
                :prompt="prompt"
                :imageUrl="imageUrl"
                :isLoading="isLoading"
                @update:prompt="(newPrompt) => prompt = newPrompt"
                @generateNekosia="generateNekosia"
            />
        </div>

        <!-- Display loading state -->
        <div v-if="isLoading" class="mt-6 flex justify-center">
            <p class="text-gray-500">Generating your image...</p>
        </div>

        <!-- component -->
        <div v-if="responseData" class="flex justify-center items-center w-full">
            <div v-if="responseData.success" class="w-full md:w-[720px] mx-auto">
                <!-- Centering wrapper -->
                <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                    <div :class="`relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl w-[${responseData.metadata.original.width}px] h-[${responseData.metadata.original.height}px]`">
                        <img
                            :src="imageUrl"
                            :alt="`card-image ${ responseData.category }`" 
                            class="object-cover w-full h-full" 
                        />
                    </div>
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-2">
                            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                {{ responseData.category }}
                            </p>
                            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                {{ responseData.rating }}
                            </p>
                        </div>
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                            {{ responseData.tags.join(', ') }}
                        </p>
                    </div>
                    <div class="inline-flex flex-wrap items-center gap-3 mt-8 group mx-auto">
                        <!-- Start Over -->
                        <span
                            @click="startOver"
                            class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <img src="../../assets/startover.png" class="w-5 h-5" alt="start over">
                        </span>
                        <!-- Share Image -->
                        <span
                            @click="shareImage"
                            class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <img src="../../assets/share.png" class="w-5 h-5" alt="share this image">
                        </span>
                        <!-- creatore profile -->
                        <a
                            :href="responseData.attribution.artist.profile"
                            target="_blank"
                            class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <img src="../../assets/userProfile.png" class="w-5 h-5" alt="creatore profile">
                        </a>
                        <!-- Download Image -->
                        <span
                            @click="downloadImage"
                            class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <img src="../../assets/download.png" class="w-5 h-5" alt="download this image">
                        </span>
                    </div>
                    <div class="p-6">
                        <a
                            :href="responseData.attribution.artist.profile"
                            target="_blank"
                            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        >
                            {{ responseData.attribution.copyright }}
                        </a>
                    </div>
                </div>
            </div>
            <!-- Error case: No images found -->
            <div v-else class="mt-6 text-center text-gray-600">
                <p class="text-xl font-semibold">Oops! No images found.</p>
                <p>{{ responseData.message }}</p>
                <p><a target="_blank" href="https://nekosia.cat/documentation?page=api-endpoints#tags-and-categories" class="text-blue-500 underline">Check available tags and categories</a></p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import PropmtTextarea from './PropmtTextarea.vue';
    import axios from 'axios';

    // State variables
    const prompt = ref('');
    const imageUrl = ref(null);
    const isLoading = ref(false);
    const responseData = ref(null);

    // Method to generate the Nekosia image
    const generateNekosia = async () => {
        if (!prompt.value) return;

        isLoading.value = true;

        try {
            // Call Nekosia API with the given prompt
            const response = await axios.get(`https://api.nekosia.cat/api/v1/images/${prompt.value}`);

            // Check if the request was successful
            if (response.data.success) {
                imageUrl.value = response.data.image.compressed.url;
                responseData.value = response.data;
            } else {
                responseData.value = response.data; // Store error message
            }
        } catch (error) {
            console.error('Error generating image:', error);
            responseData.value = { success: false, message: 'Failed to fetch the image. Please try again.' };
        } finally {
            isLoading.value = false;
        }
    };

    // Function to start over
    const startOver = () => {
        prompt.value = '';
        imageUrl.value = null;
        responseData.value = null;
    };

    // Function to download the image
    const downloadImage = () => {
        if (!imageUrl.value) return;

        const link = document.createElement('a');
        const img = document.createElement('img');
        
        try {
            fetch(link.href)
            .then(res => res.blob())
            .then((imageFile) => {
                const objectURL = URL.createObjectURL(imageFile);
                img.src = objectURL;
                document.body.appendChild(img); 
                link.href = img.src;
                link.download = 'neko-image.png';
                document.body.appendChild(link); 
                link.click();
                document.body.removeChild(link);
                document.body.removeChild(img);
                return 201;
            });   
        }catch (e)  {
            console.log(e);
            return 400;
        }        
    };

    // Function to share the image
    const shareImage = async () => {
        try {
            await navigator.share({
                title: 'Check out this AI-generated image',
                text: 'Look at this amazing image I generated using Nekosia AI!',
                url: imageUrl.value
            });
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    };
</script>

<style scoped>
    .animate-text-gradient {
        background-size: 200% auto;
        animation: shine 3s linear infinite;
    }

    @keyframes shine {
        to {
            background-position: -200% center;
        }
    }
</style>
