<script lang="ts">
    import "$lib/reset.css"
    import "$lib/styles.sass"
</script>

<div class="screen">
    <slot />
</div>


<style lang="sass">
.screen
    position: absolute
    outline: 1px solid black
    width: 1920px
    height: 1080px
    top: 0
    left: 0
</style>