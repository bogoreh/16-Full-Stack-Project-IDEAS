// Set current date for date inputs
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    
    // Set default value for lastFed if empty
    const lastFedInput = document.getElementById('lastFed');
    if (lastFedInput && !lastFedInput.value) {
        lastFedInput.value = today;
    }
    
    // Add confirmation for delete actions
    const deleteForms = document.querySelectorAll('.delete-form');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to delete this pet?')) {
                e.preventDefault();
            }
        });
    });
});