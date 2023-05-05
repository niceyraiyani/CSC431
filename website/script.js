const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-term');
const activitiesFilter = document.querySelector('#activities-filter');
const resultsDiv = document.querySelector('#results');

const beaches = [
  {
    name: 'Miami Beach',
    location: 'Miami, FL',
    activities: ['Swimming', 'Surfing', 'Beach Volleyball'],
    distance: 10,
    image: 'miamibeach.jpeg'
  },
  {
    name: 'South Beach',
    location: 'Miami, FL',
    activities: ['Swimming', 'Surfing', 'Kite Flying'],
    distance: 11,
    image: 'https://images.unsplash.com/photo-1611235676668-5a3ca5f4c2d4'
  },
  {
    name: 'Key Biscayne',
    location: 'Miami, FL',
    activities: ['Swimming', 'Fishing', 'Beach Volleyball'],
    distance: 14,
    image: 'https://images.unsplash.com/photo-1558420868-253bfb76c0ff'
  },
  {
    name: 'Haulover Beach',
    location: 'Miami, FL',
    activities: ['Swimming', 'Surfing', 'Kite Flying', 'Fishing'],
    distance: 17,
    image: 'https://images.unsplash.com/photo-1589560314621-00e61ee33d56'
  },
  {
    name: 'North Shore Open Space Park',
    location: 'Miami, FL',
    activities: ['Swimming', 'Surfing', 'Kite Flying'],
    distance: 20,
    image: 'https://images.unsplash.com/photo-1617978685259-2bfb2d2b28e8'
  }
];

function displayBeaches(beaches) {
  resultsDiv.innerHTML = '';
  if (beaches.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No beaches found';
    resultsDiv.appendChild(message);
  } else {
    beaches.forEach(beach => {
      const beachCard = document.createElement('div');
      beachCard.classList.add('beach-card');
      beachCard.style.backgroundImage = `url(${beach.image})`;

      const name = document.createElement('h3');
      name.textContent = beach.name;
      beachCard.appendChild(name);

      const location = document.createElement('p');
      location.classList.add('attribute');
      location.innerHTML = `<label>Location:</label> ${beach.location}`;
      beachCard.appendChild(location);

      const activities = document.createElement('p');
     
      activities.classList.add('attribute');
      activities.innerHTML = `<label>Activities:</label> ${beach.activities.join(', ')}`;
      beachCard.appendChild(activities);

      const distance = document.createElement('p');
      distance.classList.add('attribute');
      distance.innerHTML = `<label>Distance:</label> ${beach.distance} miles`;
      beachCard.appendChild(distance);

      const reviewsButton = document.createElement('button');
      reviewsButton.classList.add('reviews-button');
      reviewsButton.textContent = 'View Reviews';
      beachCard.appendChild(reviewsButton);

      resultsDiv.appendChild(beachCard);
    });
  }
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('Search button clicked');
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedActivity = activitiesFilter.value === 'All' ? '' : activitiesFilter.value;
  const filteredBeaches = beaches.filter(beach => {
    const hasLocation = beach.location.toLowerCase().includes(searchTerm);
    const hasActivity = selectedActivity ? beach.activities.includes(selectedActivity) : true;
    return hasLocation && hasActivity;
  });
  
  if (filteredBeaches.length > 0) {
    filteredBeaches.sort((beach1, beach2) => beach1.distance - beach2.distance);
  }

  displayBeaches(filteredBeaches);
});

