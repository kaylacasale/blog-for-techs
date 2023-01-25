//* to add a new comment (grabbing input from blog.handlebars, specifically new-comment-form) for POST request to add new comment
//* to delete existing comment in separate "cooment.handlebars or deleteComment.handlebars"
// const { DELETE, UPDATE, POST } = require("sequelize/types/query-types");
//* this is more or less 'comment.js' b/c handles comment data, from blog.handlebars page

const newFormHandler = async (event) => {
    event.preventDefault();
    //* grab entries for blog title and content in dashboard

    const comment = document.querySelector('#comment').value.trim();
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];


    // let commenter;
    // const commentArr = comment.map(({ comment, blog_id }) => ({ name: comment, value: blog_id }))
    // commenter.push(commentArr.name)
    // const content = document.querySelector('#blog-content').value.trim();
    // const description = document.querySelector('#project-desc').value.trim();
    // for (var i = 0; i < comment.length; i++) {
    //     let commentArr = comment[i]
    //     console.log(commentArr)
    //     return commentArr
    // }
    if (comment) {
        const response = await fetch(`/api/comments`, { //* 'comment' stated in index.js in controllers/api
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(comment, 'in js/blog.js')

        if (response.ok) {
            // document.location.replace('/');
            document.location.reload();

            // was '/dashboard'
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);