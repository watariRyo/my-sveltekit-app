<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";


    let username = ''
    let password = ''

    const login = async() => {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({username, password})
        })
        const resJSON = await response.json();
        if (response.ok) {
            // goto('/', {
            //     invalidateAll: true
            // })
            invalidateAll()
        } else {
            alert(resJSON.message)
        }
    }
</script>

<form on:submit|preventDefault={login}>
    <label for="username">Username</label>
    <input bind:value={username} id="username" name="username" placeholder="Username" />
    <label for="password">Password</label>
    <input bind:value={password} id="password" name="password" type="password" />

    <br />
    <button type="submit">Button</button>
</form>
