const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  async function timeSensativeAction(){ //must be async func
    await sleep(185) //wait 5 seconds
    window.scrollTo(0, 2000);
}
  function scrollDown(){
    timeSensativeAction();
  }


  const copyLink = document.getElementById('copyLink');
  const originalText = copyLink.innerText;

  copyLink.addEventListener('click', (event) => {
    event.preventDefault();
  
    // Get the URL you want to copy
    const url = window.location.href;
  
    // Create a temporary input element
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
  
    // Select the value of the input
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the selected text to the clipboard
    document.execCommand('copy');
  
    // Remove the temporary input element
    document.body.removeChild(input);
  
    // Update the link text
    copyLink.innerText = 'Link Copied!';

    // Restore the original text after a delay
  setTimeout(() => {
    copyLink.innerText = originalText;
  }, 1500); // 3000 milliseconds = 3 seconds
  });
  