// auto scroll
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  async function timeSensativeAction(element) {
    await sleep(185); // wait 0.185 seconds
    var rect = element.getBoundingClientRect();
    var offset = window.pageYOffset || document.documentElement.scrollTop;
    var targetScrollPosition = rect.top + offset - 200;
    window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });
  }
  
  function scrollDown(event){
    var element = event.target;
    timeSensativeAction(element);
  }


  // Copy Link button
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

//view options
const viewOptions = document.querySelectorAll('.view-option');
const contentContainer = document.getElementById('content');

viewOptions.forEach((option) => {
  option.addEventListener('click', () => {
    // Remove the 'active' class from all view options
    viewOptions.forEach((option) => {
      option.classList.remove('active');
    });

    // Add the 'active' class to the clicked view option
    option.classList.add('active');

    // Get the data-view value of the clicked option
    const view = option.dataset.view;

    // Show the selected view and hide the others
    const viewElements = contentContainer.children;
    for (let i = 0; i < viewElements.length; i++) {
      const element = viewElements[i];
      if (element.classList.contains(view + '-view')) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    }
  });
});


// attach auto-scroll to dropdowns based on screen size

function attachClickEventBasedOnScreenSize() {
    var elements = document.querySelectorAll("[data-bs-toggle='collapse']");
    elements.forEach(function (element) {
      var target = element.getAttribute("data-bs-target");
      var collapseElement = document.querySelector(target);
      if (collapseElement) {
        var autoScrollClass = (collapseElement.classList.contains("auto-scroll-xs"))
          ? "auto-scroll-xs"
          : (collapseElement.classList.contains("auto-scroll-sm"))
          ? "auto-scroll-sm"
          : (collapseElement.classList.contains("auto-scroll-lg"))
          ? "auto-scroll-lg"
          : "";

        if (autoScrollClass) {
          var windowWidth = window.innerWidth;
          if (
            (autoScrollClass === "auto-scroll-xs" && windowWidth < 576) ||
            (autoScrollClass === "auto-scroll-sm" && windowWidth < 992) ||
            (autoScrollClass === "auto-scroll-lg")
          ) {
            element.addEventListener("click", scrollDown);
          } else {
            element.removeEventListener("click", scrollDown);
          }
        }
      }
    });
  }

  // Attach or detach click events based on the screen size initially
  attachClickEventBasedOnScreenSize();

  // Call attachClickEventBasedOnScreenSize whenever the window is resized
  window.addEventListener("resize", attachClickEventBasedOnScreenSize);


  /*
  steps for auto-scroll based on screen size:
  1. get the screen size
  2. get all of the elements with "collpase"
  3. get all of the elements that start with "auto-scroll-"

  */