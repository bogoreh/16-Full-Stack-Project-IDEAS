document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resource-form');
    const resourcesList = document.getElementById('resources');
    let resources = JSON.parse(localStorage.getItem('resources')) || [];

    // Function to render resources
    function renderResources() {
        resourcesList.innerHTML = '';
        resources.forEach((resource, index) => {
            const li = document.createElement('li');
            li.classList.add('resource-item');
            li.innerHTML = `
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                ${resource.url ? `<p><a href="${resource.url}" target="_blank">Link</a></p>` : ''}
                <p>Type: ${resource.type}</p>
                <div class="rating" data-index="${index}">
                    Rating: 
                    ${Array.from({ length: 5 }, (_, i) => `
                        <span class="star ${i < resource.rating ? 'filled' : ''}" data-value="${i + 1}">&#9733;</span>
                    `).join('')}
                </div>
            `;
            resourcesList.appendChild(li);
        });
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newResource = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim(),
            url: document.getElementById('url').value.trim(),
            type: document.getElementById('type').value,
            rating: 0 // Default rating
        };

        if (newResource.title && newResource.description) {
            resources.push(newResource);
            localStorage.setItem('resources', JSON.stringify(resources));
            renderResources();
            form.reset();
        } else {
            alert('Title and description are required!');
        }
    });

    // Handle rating clicks (event delegation)
    resourcesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('star')) {
            const ratingDiv = e.target.closest('.rating');
            const index = parseInt(ratingDiv.dataset.index);
            const value = parseInt(e.target.dataset.value);

            resources[index].rating = value;
            localStorage.setItem('resources', JSON.stringify(resources));
            renderResources();
        }
    });

    // Initial render
    renderResources();
});