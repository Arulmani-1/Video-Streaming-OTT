// Global Page Transition Loader Logic

// 1. Inject the loader HTML into the page
const loaderHTML = `
    <div id="global-loader">
        <div class="loader-container">
            <div class="loader-bg-circle"></div>
            <div class="loader-spinner"></div>
            <img src="images/logo.webp" alt="STACKLY Logo" class="loader-logo">
        </div>
    </div>
`;

// Inject immediately as the script parses
document.write(loaderHTML);

// 2. Hide Loader after exactly 2 spins (controlled by CSS animation)
const loaderSpinner = document.querySelector('.loader-spinner');
if (loaderSpinner) {
    loaderSpinner.addEventListener('animationend', () => {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.display = 'none';
            loader.classList.add('hidden');
        }
    });
} else {
    // Fallback if spinner isn't found
    setTimeout(() => {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.display = 'none';
            loader.classList.add('hidden');
        }
    }, 2000);
}

// 3. Show Loader when clicking internal links
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        // Find closest anchor tag
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        // Check if it's an internal link and not just a hash or empty
        if (href && !href.startsWith('#') && !href.startsWith('http') && !link.hasAttribute('target')) {
            e.preventDefault(); // Prevent immediate navigation

            // Show loader
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.style.display = 'flex';
                loader.classList.remove('hidden');
            }

            // Navigate immediately, loader will handle the 3s on the new page
            setTimeout(() => {
                window.location.href = href;
            }, 0);
        }
    });
});
