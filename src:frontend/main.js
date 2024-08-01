document.addEventListener('DOMContentLoaded', function() {
    // Display the start view and redirect to home after 2 seconds
    if (document.querySelector('.start-view')) {
        document.querySelector('.start-view').style.display = 'flex';
        setTimeout(function() {
            window.location.href = 'home.html';
        }, 2000);
    }

    const interestCategory = document.getElementById('interest-category');
    const interestsContainer = document.querySelector('.interests-container');
    
    function showSelectedInterests(category) {
        document.querySelectorAll('.interest').forEach(interest => {
            interest.style.display = interest.classList.contains(category) || category === 'all' ? 'flex' : 'none';
        });
    }
    
    function addInterest() {
        var category = document.getElementById('category').value.toLowerCase();
        var interest = document.getElementById('interest').value;
        var newInterest = document.createElement('div');
        newInterest.className = 'interest ' + category;
        newInterest.textContent = interest;
        interestsContainer.appendChild(newInterest);
    
        newInterest.addEventListener('click', function() {
            newInterest.classList.toggle('active');
            saveInterests();
        });
    
        newInterest.classList.add('active');
        saveInterests();
    }
    
    function saveInterests() {
        const interests = [...document.querySelectorAll('.interest.active')].map(interest => interest.textContent);
        localStorage.setItem('userInterests', JSON.stringify(interests));
    }
    
    function loadInterests() {
        const savedInterests = JSON.parse(localStorage.getItem('userInterests')) || [];
        document.querySelectorAll('.interest').forEach(interest => {
            if (savedInterests.includes(interest.textContent)) {
                interest.classList.add('active');
            }
        });
    }
    
    if (interestCategory) {
        interestCategory.addEventListener('change', function() {
            showSelectedInterests(this.value);
        });
    
        document.getElementById('add-interest-form').addEventListener('submit', function(event) {
            event.preventDefault();
            addInterest();
            closePopupForm();
        });
    
        loadInterests();
        showSelectedInterests(interestCategory.value);
    }
    // Initialize time grid functionality
    const timeGrid = document.querySelector('.time-grid');
    const times = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];

    if (timeGrid) {
        times.forEach(time => {
            const timeLabel = document.createElement('div');
            timeLabel.className = 'time-label';
            timeLabel.textContent = time;
            timeGrid.appendChild(timeLabel);

            for (let i = 0; i < 7; i++) {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.dataset.time = time;
                timeSlot.dataset.day = i + 1; // Monday is 1, Sunday is 7
                timeGrid.appendChild(timeSlot);

                timeSlot.addEventListener('click', function() {
                    timeSlot.classList.toggle('active');
                });
            }
        });
    }

    // Filter options
    function showFilterOptions() {
        const filterOptions = document.getElementById('filter-options');
        filterOptions.style.display = 'block';
    }

    function applyFilters() {
        const timeFilter = document.getElementById('time-filter').value;
        const subscribedFilter = document.getElementById('subscribed-filter').value;
        const interestFilter = document.getElementById('interest-filter').value;
        alert(`Time Filter: ${timeFilter}\nSubscribed Filter: ${subscribedFilter}\nInterest Filter: ${interestFilter}`);
        const filterOptions = document.getElementById('filter-options');
        filterOptions.style.display = 'none';
    }

    if (document.getElementById('filter-apply-btn')) {
        document.getElementById('filter-apply-btn').addEventListener('click', applyFilters);
    }

    // Popup form functions
    window.showPopupForm = function() {
        document.getElementById('popup-form').style.display = 'block';
    };

    window.closePopupForm = function() {
        document.getElementById('popup-form').style.display = 'none';
    };
});
