document.getElementById('survey-form').addEventListener('submit', function (event) {
  event.preventDefault();

  if (!event.target.checkValidity()) return;

  // Get the email entered
  const email = document.getElementById('email').value;
  document.querySelector('#confirmationPopup p').textContent = `Are you sure your email "${email}" is correct?`;

  // Show confirmation popup
  document.getElementById('confirmationPopup').style.display = 'flex';
});

document.getElementById('confirmYes').addEventListener('click', async function () {
  document.getElementById('confirmationPopup').style.display = 'none';

  const form = document.getElementById('survey-form');
  const formData = new FormData(form);
  let data = new URLSearchParams();
  for (const pair of formData) {
    data.append(pair[0], pair[1]);
  }

  document.getElementById('loading').style.display = 'block';

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzTL_9VFe0cieebWCNR4HkdIxnsrG7jDxEhmq7gmknRBzwllK7TTQAv00qdLdlEOnnQcA/exec', {
      method: 'POST',
      body: data
    });

    console.log('Success:', await response.text());
    window.location.href = "success.html";
  } catch (error) {
    console.error('Error:', error);
    alert('Submission failed. Please try again.');
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
});

document.getElementById('confirmNo').addEventListener('click', function () {
  document.getElementById('confirmationPopup').style.display = 'none';
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('submit-btn').click();
  }
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
  }
});
