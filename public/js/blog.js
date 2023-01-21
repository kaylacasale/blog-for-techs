const { DELETE, UPDATE, POST } = require("sequelize/types/query-types");

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

        if (response.ok) {
            document.location.replace('/'); // was '/dashboard'
        } else {
            alert('Failed to create project');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);