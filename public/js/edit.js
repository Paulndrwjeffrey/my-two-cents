const updatePost = async (event) => {
  event.preventDefault;

  const post_id = document.querySelector('#tag').dataset.id;
  const title = document.querySelector('#title').value.trim();
  const text = document.querySelector('#text').value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts/${ post_id }`, {
      method: 'PUT',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.edit').addEventListener('submit', updatePost);