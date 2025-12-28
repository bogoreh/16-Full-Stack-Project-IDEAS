$(document).ready(function() {
    // Smooth scrolling for navbar links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70 // Adjust for fixed navbar
            }, 800);
        }
    });

    // Contact form validation and submission simulation
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        if (name && email && message) {
            $('#formFeedback').html('<div class="alert alert-success">Thank you for your message! We\'ll get back to you soon.</div>');
            this.reset();
        } else {
            $('#formFeedback').html('<div class="alert alert-danger">Please fill out all fields.</div>');
        }
    });

    // Gallery hover effect (already in CSS, but add jQuery for extra interaction if needed)
    $('.gallery-card').hover(function() {
        $(this).find('.card-body').toggleClass('bg-light');
    });
});