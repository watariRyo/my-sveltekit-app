<script lang="ts">
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	import { applyAction, enhance, type SubmitFunction } from "$app/forms";
	import type { ActionData } from "./login/$types";

	export let data : LayoutData;
    let isLoading = false;
    let error = '';
    let form: ActionData;

    const handelLoginEnhance: SubmitFunction = () => {
        isLoading = true;
        error = ''
        return ({result}) => {
            isLoading = false;
            if (result.type === 'redirect') {
                form = null
                applyAction(result)
            }
            if (result.type === 'error') {
                error = result.error.message
            }
            if (result.type === 'failure') {
            form = result.data as ActionData
            }
        } 
    }
</script>

<svelte:head>
    <title>Website Name {$page.data.title && `- ${$page.data.title}`}</title>
    <meta name="description" content={$page.data.description} />
</svelte:head>

{#if data.user}
    <p>Logged in as {data.user.name}</p>
{/if}

<nav data-sveltekit-preload-data="hover">
    <a href="/">Home</a>
    <a href="/products">Product</a>
    {#if !data.user}
        <a href="/login" data-sveltekit-preload-data="off">Login</a>
    {/if}
</nav>

{#if data.user}
    <!-- <button on:click={async() => {
        const response = await fetch('/api/logout', { method: 'POST' })
        if (response.ok) {
            invalidateAll()
        }
    }}>
        Logout
    </button> -->
    <form method="POST" action="/login?/logout&redirectTo={$page.url.pathname}" use:enhance>
        <button>Logout</button>
    </form>
{/if}

<form method="GET" action="/search">
    <input name="q" />
</form>

<slot />

{#if !data.user && $page.url.pathname !== '/login'}
{#if error}
    <p style="color:red">{error}</p>
{/if}

<form method="POST" action="/login?/login&redirectTo={$page.url.pathname}" use:enhance={handelLoginEnhance}>
    <label for="username">Username</label>
    <input id="username" name="username" placeholder="Username" value={form?.username || ''}/>
    <br />
    {#if form?.usernameMissing}
    <p style="color: red; margin-bottom: 0">Username is Required!</p>
    {/if}
    <label for="password">Password</label>
    <input id="password" name="password" type="password" />
    {#if form?.passwordMissing}
    <p style="color: red; margin-bottom: 0">Password is Required!</p>
    {/if}
    <br />
    <button type="submit" disabled={isLoading}>Login</button>
</form>
{/if}