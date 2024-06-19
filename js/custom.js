$(document).ready(function() {
    // JavaScript to remove "show" class from collapsed navbar when a nav link is clicked
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").removeClass("collapsed"); // Revert to the three-line burger menu
    });

    // Cache selectors
    var lastId,
        topMenu = $(".navbar-nav"),
        topMenuHeight = topMenu.outerHeight() + 1,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }

        // Check if the "Contact" section is at least 25% from the bottom
        var contactSection = $("#contact");
        if (contactSection.length) {
            var contactOffset = contactSection.offset().top;
            var windowHeight = $(window).height();
            var contactVisibleOffset = contactOffset - $(window).scrollTop();
            if (contactVisibleOffset < (windowHeight * 0.75)) {
                // "Contact" section is at least 25% from the bottom
                menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#contact']").parent().addClass("active");
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const navbarScroll = document.querySelector('#navbarScroll');

    toggler.addEventListener('click', function () {
        toggler.classList.toggle('collapsed');
    });

    navbarScroll.addEventListener('hidden.bs.collapse', function () {
        toggler.classList.remove('collapsed');
    });
});




// Select the ul element
const marqueeContent = document.querySelector('.marquee-content');

// Function to randomly activate an li element
function activateRandomItem() {
    // Remove active class from all li elements
    const allItems = marqueeContent.querySelectorAll('li');
    allItems.forEach(item => item.classList.remove('active'));

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * allItems.length);

    // Add active class to the randomly selected li element
    allItems[randomIndex].classList.add('active');
}

// Activate a random item initially
activateRandomItem();

// Activate a random item every 2 seconds (adjust interval as needed)
setInterval(() => {
    activateRandomItem();
}, 2000); // Change interval time (in milliseconds) as per your preference
