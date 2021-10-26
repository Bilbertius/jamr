<script>
        export let comment;
        let date = new Date(comment.date_posted).toDateString()


</script>

<article>

    <p class="comment">
        {comment.text}
    </p>

    <p class='meta'>{comment.user.username} {date}</p>

</article>



<style>
    article {
        display: flex;
        flex-direction: column;
    }


    p {
        color: #e7edf3;
        font-size: 2ch;
    }
</style>