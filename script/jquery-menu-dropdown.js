$(document).ready(function() {

    // --- Стили для выпадающих меню и анимаций ---
    $('head').append(`
        <style>
            /* Основные стили для dropdown */
            .main-menu-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                width: 250px; /* Slightly wider dropdown */
                background-color: #f8f9fa;
                border: 1px solid #ced4da;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
                padding: 10px;
                z-index: 1000;
                list-style: none;
                padding: 0;
                opacity: 0;         /* Initially hidden */
                transform: translateY(-10px); /* Start above */
                transition: opacity 0.3s ease, transform 0.3s ease; /* Smooth transition */
                display: none;       /* Initially hidden */ /* Added this */

            }

            /*  Класс 'show' для анимации появления */
            .main-menu-dropdown.show {
                opacity: 1;
                transform: translateY(0);
                display: block;    /* Display when shown */ /* Added this */
            }


            .main-menu-dropdown li { margin-bottom: 5px; }

            .main-menu-dropdown li a {
                display: block;
                padding: 8px 15px;
                color: #343a40;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }

            .main-menu-dropdown li a:hover { background-color: #e9ecef; }

            /* Dropdown Menu ("Podbor auto") */
            .dropdown-menu {
               background-color: #f8f9fa;
               border: 1px solid #ced4da;
               border-radius: 5px;
               box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
               display: none;
               position: absolute;

            }

            /* Важно: position: relative для #mainMenu */
            #mainMenu { position: relative; }
        </style>
    `);


    // ---  Выпадающие меню для пунктов главного меню ---
    let activeDropdown = null;

    $('.main-menu-item').each(function(index) {
        const menuItem = $(this);
        const dropdownId = 'mainDropdown' + index;
        const dropdown = $('<div class="main-menu-dropdown" id="' + dropdownId + '"></div>');


        menuItem.after(dropdown); // Add dropdown *after* the menu item

        menuItem.click(function(e) {
            e.preventDefault();

            if (activeDropdown && activeDropdown !== dropdown) {
                activeDropdown.slideUp(300).removeClass('show'); // Hide previous
            }


            dropdown.slideToggle(300, function() {
                if (dropdown.is(':visible')) {
                    const menuItemOffset = menuItem.offset();
                    const menuItemHeight = menuItem.outerHeight();
                    dropdown.css({
                        'position': 'absolute',
                        'top': menuItemOffset.top + menuItemHeight,
                        'left': menuItemOffset.left,
                        'width': menuItem.outerWidth(),
                        'z-index': 1000
                    }).addClass('show'); // Show current (with animation)
                }
            });

            activeDropdown = dropdown.is(':visible') ? dropdown : null; 

        });

        // Generate list items
        let listItems = '';
        for (let i = 1; i <= 5; i++) {
            listItems += `<li><a href="#">Пункт ${i}</a></li>`;
        }
        dropdown.html(`<ul>${listItems}</ul>`);

    });


    // --- Выпадающее меню для "Подбор авто" ---
    // ... (код для "Подбор Авто", без изменений)



});