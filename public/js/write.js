const writePost = async (event) => {
  event.preventDefault;

  const title = document.querySelector('#title').value.trim();
  const text = document.querySelector('#text').value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
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

document.querySelector('.write').addEventListener('submit', writePost);