<script>
        export let comment;
        let date = new Date(comment.date_posted).toDateString()


</script>

<article>

    <p class="comment">
        {comment.text}
    </p>

    <p class='meta'>

            {comment.user.username}

        <em>{date}</em>
    </p>

</article>



<style>
    article {
        display:          flex;
        flex-direction:   column;
        background-color: #313030;
        margin:           2px 2px;
        width:            100%;
        padding:          20px;
        border-radius:    15px;
    }

    p.meta {
        color: #7db083;
    }
    p {
        color: #e7edf3;
        font-size: 2.3ch;
    }
    em  {
        color: #e7edf3;
    }
</style>