document.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.querySelector('.typing-text');
    
    if (typingTextElement) {
        const textToType = typingTextElement.textContent;
        typingTextElement.textContent = ''; 

        let charIndex = 0;
        let speed = 70;

        function typeWriter() {
            if (charIndex < textToType.length) {
                typingTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, speed);
            }
        }

        typeWriter();
    }
});

scroll="smooth"

const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");  // ajoute la classe quand visible
            observer.unobserve(entry.target);    // stop l'observation (optionnel)
        }
    });
}, { threshold: 0.2 }); // déclenche quand 20% de l'élément est visible

faders.forEach(fader => {
    observer.observe(fader);
});



faders.forEach((fader, index) => {
    setTimeout(() => {
        observer.observe(fader);
    }, index * 200); 
});






    document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('galleryAccessForm');
    const accessCodeInput = document.getElementById('accessCode');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const privateGallery = document.getElementById('privateGalleryContent');
    const accessFormContainer = document.querySelector('.access-form-container'); // Pour masquer le formulaire
    
    const VALID_CODES = ['EA-MARIAGE-2025', 'EA-FAMILLE-123', 'EA-PORTFOLIO']; 
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const codeSaisi = accessCodeInput.value.toUpperCase().trim(); // Nettoyer et mettre en majuscules

            feedbackMessage.textContent = '';
            feedbackMessage.classList.remove('error', 'success');

            // 1. Vérification du code
            if (VALID_CODES.includes(codeSaisi)) {
                // Code Valide
                feedbackMessage.textContent = 'Code accepté ! Chargement de votre galerie...';
                feedbackMessage.classList.add('success');
                                setTimeout(() => {
                    if (accessFormContainer) {
                        accessFormContainer.style.display = 'none';
                    }
                    
                    if (privateGallery) {
                        privateGallery.style.display = 'block';
                        
                        setTimeout(() => {
                             privateGallery.classList.add('fade', 'show');
                        }, 50);
                    }
                    
                    // OPTIONNEL : Scroll vers la galerie
                    privateGallery.scrollIntoView({ behavior: 'smooth' });
                    
                }, 1000); // Délai d'une seconde pour l'effet
                
            } else {
                
                feedbackMessage.textContent = 'Code invalide. Veuillez vérifier votre saisie.';
                feedbackMessage.classList.add('error');
                accessCodeInput.value = ''; // Vider le champ
                
                // Mettre le focus sur le champ pour ressaisir
                accessCodeInput.focus();
            }
        });
    }
});
















document.addEventListener('DOMContentLoaded', () => {
    const burgerToggle = document.querySelector('.burger-menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    // --- 1. Gestion du Bouton Burger ---
    const toggleMenu = () => {
        const isMenuOpen = nav.classList.toggle('open');
        burgerToggle.classList.toggle('active', isMenuOpen);
        body.classList.toggle('no-scroll', isMenuOpen);
    };

    if (burgerToggle && nav) {
        burgerToggle.addEventListener('click', toggleMenu);

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (nav.classList.contains('open')) {
                if (!nav.contains(event.target) && !burgerToggle.contains(event.target)) {
                    toggleMenu();
                }
            }
        });
    }

   
});





// =========================================================================
// 3. HEADER STICKY AU SCROLL (Modifié pour Mobile)
// =========================================================================
const header = document.querySelector('.header');
const scrollTrigger = 100; 

function handleScroll() {
    if (window.innerWidth > 900) {
        if (window.scrollY >= scrollTrigger) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    } else {
        header.classList.add('sticky');
    }
}

if (header) {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Gère les changements d'orientation/taille
    handleScroll(); 
}




// =========================================================================
// 4. LIGHTBOX / OUVERTURE D'IMAGE AU CLIC
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeButton = document.querySelector('.lightbox-close');

    if (!galleryItems.length || !lightbox) {
        return; 
    }

    const openLightbox = (imageSrc) => {
        lightboxImage.src = imageSrc;
        lightbox.style.display = 'flex'; // Affiche la lightbox
        document.body.style.overflow = 'hidden'; // Empêche le défilement du corps
    };

    // Fonction pour fermer la Lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none'; // Cache la lightbox
        document.body.style.overflow = ''; // Rétablit le défilement du corps
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); 
           
            const thumbnailImg = item.querySelector('img');
            const fullSrc = thumbnailImg.getAttribute('data-full-src') || thumbnailImg.src;

            openLightbox(fullSrc);
        });
    });

    // 3. Événement de Fermeture
    
    // Fermeture par le bouton "X"
    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }

    // Fermeture par un clic n'importe où sur l'arrière-plan de la Lightbox
    lightbox.addEventListener('click', (e) => {
        // Vérifie si le clic a eu lieu directement sur le conteneur lightbox (et non sur l'image)
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fermeture par la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});



// =========================================================================
// 5. LOGIQUE DE FILTRAGE DE LA GALERIE PAR CATÉGORIE
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!categoryButtons.length || !galleryItems.length) {
        return; // S'assurer que les éléments existent
    }

    // Fonction de filtrage
    const filterGallery = (filterType) => {
        galleryItems.forEach(item => {
            const itemClasses = item.className;
            
            // Masquer tous les éléments par défaut
            item.style.display = 'none';

            // Afficher l'élément si le filtre est "tous" ou si sa classe correspond au filtre
            if (filterType === 'tous' || itemClasses.includes(filterType)) {
                
                // Utiliser setTimeout pour réappliquer les classes d'animation si nécessaire
                // Pour l'effet "fade", on peut ajouter/retirer une classe
                item.style.display = 'block'; 
                
                // Facultatif : réinitialiser l'animation si vous voulez l'effet fade à chaque filtre
                // item.classList.remove('show');
                // setTimeout(() => {
                //     item.classList.add('show');
                // }, 10);
            }
        });
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            filterGallery(filter);
        });
    });
    filterGallery('tous');
    const tousButton = document.querySelector('.cat-btn[data-filter="tous"]');
    if (tousButton) {
        tousButton.classList.add('active');
    }
});






document.addEventListener('DOMContentLoaded', () => {
    const socialSidebar = document.querySelector('.social-sidebar');
    const contactSection = document.getElementById('contact');

    if (!socialSidebar || !contactSection) {
        return; 
    }

    const stopObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                socialSidebar.classList.add('stopped');
            } else {
                socialSidebar.classList.remove('stopped');
            }
        });
    }, {
        rootMargin: "0px 0px -697px 0px", 
        threshold: 0 // Observer dès que l'élément apparaît
    });

    stopObserver.observe(contactSection);
});


