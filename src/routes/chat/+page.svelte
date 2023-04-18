<script lang="ts">
    import { emojis }     from "$lib/emoji"
    import { quotes }     from "$lib/quotes"
    import { get_random } from "$lib/functions"
    import { onMount } from "svelte"

    // vars
    let chat_box: HTMLElement
    let chat: {
        Emoji: string
        Author: string
        Quote: string
    }[] = [
        {
            Emoji: "😎",
            Author: 'Welcome',
            Quote: 'Hello streamer! Welcome to your live chat room!'
        }
    ]

    // funcs
    const add_message = () => {
        const random_message = get_random(quotes)
        chat.push({
            Emoji: get_random(emojis),
            Author: random_message.Author,
            Quote: random_message.Quote
        })

        chat = chat
        chat_box.scrollTop = chat_box.scrollHeight
    }

    onMount(()=> {
        setInterval(async ()=> {
            const random_chance: boolean = Math.random() > 0.8
            if(random_chance) add_message()
        }, 10000)
    })
</script>


<div class="chat">
    <div class="title">
        LIVE CHAT
    </div>
    <div class="room" bind:this={chat_box}>
        {#each chat as message}
            <div class="message">
                <div class="face">
                    {message.Emoji}
                </div>
                <div class="quote">
                    <div class="author">
                        {message.Author}
                    </div>
                    <div class="text">
                        {message.Quote}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>


<style lang="sass">
.chat
    position: absolute
    top: 0
    right: 0
    background: white
    padding: 1rem
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)
    height: 1080px
    width: 500px
    display: flex
    flex-flow: column

    .title
        border-bottom: 1px dashed #eee

    .room
        flex-grow: 1
        // outline: 1px solid red
        overflow: hidden
        padding-top: 1rem
        display: flex
        flex-flow: column
        gap: 1rem
        scroll-behavior: smooth

    .message
        display: flex
        gap: 1rem
        max-width: 600px
        .face
            font-size: 1.5rem
        .quote
            .author
                font-size: 1rem
                font-weight: bold
                color: #d62828

            .text
                font-size: 1rem
</style>