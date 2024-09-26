import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { 
  createImageCards, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton, 
  initializeLightbox 
} from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadingIndicator = document.querySelector('#loading-indicator');
const loadMoreButton = document.querySelector('#load-more');

initializeLightbox();
hideLoadMoreButton(loadMoreButton);

let currentQuery = '';

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

loadingIndicator.classList.add('visible');
  
loadingIndicator.classList.remove('visible');

let page = 1;

async function onSearch(event) {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.searchQuery.value.trim();
  page = 1; 

  if (currentQuery === '') {
    iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please, try again!',
        titleColor: '#fafafb',            
        color: '#fafafb',                 
        backgroundColor: '#ef4040',        
        messageColor: '#fafafb',          
        progressBar: true,                
        progressBarColor: '#B51B1B',      
        iconColor: '#fafafb',             
        timeout: 5000,                    
        close: true,                      
        closeOnClick: true,               
        // overlay: true,                    
        zindex: 9999,                     
        transitionIn: 'fadeIn',           
        transitionOut: 'fadeOut',         
        pauseOnHover: true,               
        position: 'topRight',     
      });
    return;
  }

  clearGallery(gallery);
  hideLoadMoreButton(loadMoreButton); 
  showLoader(loadingIndicator); // Показати завантажувач

  try {
    const data = await fetchImages(currentQuery, page); 
    hideLoader(loadingIndicator); // Сховати завантажувач

    if (data.hits.length === 0) {
      iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please, try again!',
        titleColor: '#fafafb',            
        color: '#fafafb',                 
        backgroundColor: '#ef4040',        
        messageColor: '#fafafb',          
        progressBar: true,                
        progressBarColor: '#B51B1B',      
        iconColor: '#fafafb',             
        timeout: 5000,                    
        close: true,                      
        closeOnClick: true,               
        // overlay: true,                    
        zindex: 9999,                     
        transitionIn: 'fadeIn',           
        transitionOut: 'fadeOut',         
        pauseOnHover: true,               
        position: 'topRight',     
      });
      return;
    }

    createImageCards(data.hits, gallery);

    if (data.totalHits > gallery.children.length) {
      showLoadMoreButton(loadMoreButton); 
    }
  } catch (error) {
    hideLoader(loadingIndicator);
    iziToast.error({
         message: 'Sorry, there are no images matching your search query. Please, try again!',
        titleColor: '#fafafb',            
        color: '#fafafb',                 
        backgroundColor: '#ef4040',        
        messageColor: '#fafafb',          
        progressBar: true,                
        progressBarColor: '#B51B1B',      
        iconColor: '#fafafb',             
        timeout: 5000,                    
        close: true,                      
        closeOnClick: true,               
        // overlay: true,                    
        zindex: 9999,                     
        transitionIn: 'fadeIn',           
        transitionOut: 'fadeOut',         
        pauseOnHover: true,               
        position: 'topRight',     
      });
    console.error(error);
  }
}

async function onLoadMore() {
  showLoader(loadingIndicator); // Показати завантажувач
  hideLoadMoreButton(loadMoreButton); 

  try {
    page += 1;  
    const data = await fetchImages(currentQuery, page);
    hideLoader(loadingIndicator); // Сховати завантажувач

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    createImageCards(data.hits, gallery);

    if (data.totalHits > gallery.children.length) {
      showLoadMoreButton(loadMoreButton);
    } else {
      hideLoadMoreButton(loadMoreButton);
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader(loadingIndicator);
    iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please, try again!',
      titleColor: '#fafafb',            
        color: '#fafafb',                 
        backgroundColor: '#ef4040',        
        messageColor: '#fafafb',          
        progressBar: true,                
        progressBarColor: '#B51B1B',      
        iconColor: '#fafafb',             
        timeout: 5000,                    
        close: true,                      
        closeOnClick: true,               
        // overlay: true,                    
        zindex: 9999,                     
        transitionIn: 'fadeIn',           
        transitionOut: 'fadeOut',         
        pauseOnHover: true,               
        position: 'topRight',   
    });
    console.error(error);
    }
}
