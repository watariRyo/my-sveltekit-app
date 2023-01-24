<script type="ts">
	import { goto, preloadData } from "$app/navigation";
	import { onMount } from "svelte";

    let data = [""];
    onMount(() => {
        setTimeout(() => {
            data = ['Data 1', 'Date 2']
        }, 1000)
    });
</script>

<h1>Home</h1>

{#if data.length > 0}
    <ul>
        {#each data as item}
            <li>{item}</li>
        {/each}
    </ul>
{/if}

<button 
on:focus={() => {

}}
on:mouseover={async() => {
    await preloadData('/products')
}}
on:click={() => {
    goto('/products', {
        noScroll: true
    })
}}>Products</button>