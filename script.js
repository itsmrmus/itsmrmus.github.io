
/* ===== Slideshow Autoplay (no overlay text) ===== */
const slides = document.querySelectorAll('.slide');
let current = 0;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const INTERVAL_MS = 5000; // change speed here

function showSlide(i){
  slides[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
}
function next(){ showSlide(current + 1); }
function prev(){ showSlide(current - 1); }

let timer = setInterval(next, INTERVAL_MS);
function resetTimer(){ clearInterval(timer); timer = setInterval(next, INTERVAL_MS); }

if(prevBtn && nextBtn){
  prevBtn.addEventListener('click', ()=>{ prev(); resetTimer(); });
  nextBtn.addEventListener('click', ()=>{ next(); resetTimer(); });
}

/* ===== Product Modal ===== */
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const waBtn = document.getElementById('waBtn');
const callBtn = document.getElementById('callBtn');

// Primary phone for call/WhatsApp (you can change these numbers)
const PHONE_PRIMARY = '213550752198';
const PHONE_SECONDARY = '213790712563';

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.getAttribute('data-name') || '';
    const price = card.getAttribute('data-price') || '';
    const desc = card.getAttribute('data-desc') || '';
    const img = card.getAttribute('data-img') || '';

    modalTitle.textContent = name;
    modalPrice.textContent = price ? `Prix : ${price}` : '';
    modalDesc.textContent = desc;
    modalImg.src = img;
    modalImg.alt = name;

    // WhatsApp prefilled message
    const msg = encodeURIComponent(`Bonjour, je suis intéressé par: ${name} (${price}).`);
    waBtn.href = `https://wa.me/${PHONE_PRIMARY}?text=${msg}`;

    // Call button - keep primary number
    callBtn.href = `tel:+${PHONE_PRIMARY}`;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{
  if(e.target === modal){ closeModal(); }
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ closeModal(); }
});
