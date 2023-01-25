//* to add a new comment (grabbing input from blog.handlebars, specifically new-comment-form) for POST request to add new comment
//* to delete existing comment in separate "cooment.handlebars or deleteComment.handlebars"
// const { DELETE, UPDATE, POST } = require("sequelize/types/query-types");
//* this is more or less 'comment.js' b/c handles comment data, from blog.handlebars page

const newFormHandler = async (event) => {
    event.preventDefault();
    //* grab entries for blog title and content in dashboard
    const comment = document.querySelector('#comment').value.trim();
    // const content = document.querySelector('#blog-content').value.trim();
    // const description = document.querySelector('#project-desc').value.trim();

    if (comment) {
        const response = await fetch(`/api/comments`, { //* 'comment' stated in index.js in controllers/api
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(comment)

        if (response.ok) {
            document.location.replace('/'); // was '/dashboard'
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);