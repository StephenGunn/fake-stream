<script lang="ts">
    import { emojis }     from "$lib/emoji"
    import { quotes }     from "$lib/quotes"
    import {
        get_random,
        image_url
    }                     from "$lib/functions"
    import { fly }        from "svelte/transition"
    import { onMount }    from "svelte"

    // vars
    let alert_on_screen: boolean = false
    let alert_timeout: ReturnType<typeof setTimeout>
    let quote: {
        Author: string
        Quote: string
    } = {
        Author: 'Bob',
        Quote: 'Hello streamer!'
    }
    let emoji: string = "😎"

    // funcs
    const set_text = () => {
        emoji = get_random(emojis)
        quote = get_random(quotes)
    }

    const show_alert = () => {
        clearTimeout(alert_timeout)
        alert_on_screen = true
        alert_timeout = setTimeout(async ()=> {
            alert_on_screen = false
        }, 15000)
    }

    onMount(()=> {
        setInterval(async ()=> {
            const random_chance: boolean = Math.random() > 0.8
            if(random_chance && !alert_on_screen) {
                set_text()
                show_alert()
            }
        }, 20000)
    })
</script>

{#if alert_on_screen}
    <div class="alert" transition:fly={{duration: 400, x: -50, y: -50}}>
        <div class="face">
            <img
                src="/{image_url(quote.Author)}.png"
                alt="{quote.Author} avatar"
                width="120"
                height="120"
            >
        </div>
        <div class="quote">
            <div class="author">
                {quote.Author}
            </div>
            <div class="text">
                {quote.Quote}
                {#if Math.random() > 0.5}
                    {emoji} {emoji} {emoji}
                {:else}
                    {emoji}
                {/if}
            </div>
        </div>
    </div>
{/if}

<style lang="sass">
.alert
    position: absolute
    top: 2rem
    left: 2rem
    background: white
    padding: 1rem
    outline: 2px solid #333
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5)
    border-radius: 1rem
    display: flex
    gap: 2rem
    max-width: 600px
    .face
        flex-shrink: 0
        img
            width: 120px
            height: 120px
    .quote
        .author
            font-size: 1.2rem
            font-weight: bold
            color: #d62828

        .text
            font-size: 1.6rem
            margin-right: 1rem
</style>