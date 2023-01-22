<script type="ts">
	import { goto, preloadData } from "$app/navigation";


</script>

<h1>Home</h1>


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