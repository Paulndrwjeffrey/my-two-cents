const commentFormHandler = async (event) => {
  event.preventDefault();

  const newComment = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('.text').dataset.id;

  if (comment) {
    const response = await fetch('/api/comments',{
      method: 'POST',
      body: JSON.stringify({
        comment: newComment,
        post_id: post_id
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
