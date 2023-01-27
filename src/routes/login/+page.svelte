<script lang="ts">
	// import { goto, invalidateAll } from "$app/navigation";
	import type { ActionData } from "./$types";
    import { page } from "$app/stores"
	import { applyAction, enhance } from "$app/forms";

    let isLoading = false;
    let error = ''

    export let form: ActionData
    $: console.log($page.form, $page.status)

    // let username = ''
    // let password = ''

    // const login = async() => {
    //     const response = await fetch('/api/login', {
    //         method: 'POST',
    //         body: JSON.stringify({username, password})
    //     })
    //     const resJSON = await response.json();
    //     if (response.ok) {
    //         // goto('/', {
    //         //     invalidateAll: true
    //         // })
    //         invalidateAll()
    //     } else {
    //         alert(resJSON.message)
    //     }
    // }
</script>

{#if error}
    <p style="color:red">{error}</p>
{/if}
<form method="POST" action="?/login" use:enhance={({form, data, action, cancel}) => {
    isLoading = true

    return ({result, update}) => {
        isLoading = false;
        if (result.type === 'failure' || result.type === 'redirect') {
            applyAction(result);
        }
        if (result.type === 'error') {
            error = result.error.message;
        }

        // update()
    }
}}>
<!-- <form on:submit|preventDefault={login}> -->
    <label for="username">Username</label>
    <input id="username" name="username" placeholder="Username" value={form?.username || ''} />
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
    <button type="submit" disabled={isLoading}>Button</button>
</form>
