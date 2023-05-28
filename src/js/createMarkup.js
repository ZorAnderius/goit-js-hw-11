export function createMarkup(photos) {
  return photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class='link-photo-card-wrap' href='${largeImageURL}'>
        <div class="photo-card">
          <img class="photo-card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <span class="icon-wrap">
                Likes
              </span>
              <b>${likes}</b>
            </p>
            <p class="info-item">
              <span class="icon-wrap">
              Views
              </span>
              <b>${views}</b>
            </p>
            <p class="info-item">
              <span class="icon-wrap">
                Comments
              </span>
              <b>${comments}</b>
            </p>
            <p class="info-item">
              <span class="icon-wrap">
                Downloads
              </span>
               <b>${downloads}</b>
            </p>
          </div>
        </div>
      </a>`;
      }
    )
    .join('');
}
