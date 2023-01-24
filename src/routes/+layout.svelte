<script lang="ts">
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";

	export let data : LayoutData;
</script>

<svelte:head>
    <title>Website Name {$page.data.title && `- ${$page.data.title}`}</title>
    <meta name="description" content={$page.data.description} />
</svelte:head>

<!-- {#if data.user}
    <p>Logged in as {data.user.name}</p>
{/if} -->

<nav data-sveltekit-preload-data="hover">
    <a href="/">Home</a>
    <a href="/products">Product</a>
    <!-- {#if !data.user}
        <a href="/login" data-sveltekit-preload-data="off">Login</a>
    {/if} -->
</nav>

<!-- {#if data.user}
    <button on:click={async() => {
        const response = await fetch('/api/logout', { method: 'POST' })
        if (response.ok) {
            invalidateAll()
        }
    }}>
        Logout
    </button>
{/if} -->

<slot />

