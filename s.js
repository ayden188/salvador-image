document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. ANIMATION EFFET MACHINE À ÉCRIRE (Typing Effect)
    // =========================================================================
    const typingTextElement = document.querySelector('.typing-text');
    
    if (typingTextElement) {
        const textToType = typingTextElement.textContent;
        // Laisser le texte vide pour l'effet
        typingTextElement.textContent = ''; 

        let charIndex = 0;
        // Vitesse de frappe en millisecondes
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


    // =========================================================================
    // 2. ANIMATION AU SCROLL (Intersection Observer / Fading Elements)
    // =========================================================================
    const faders = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                // Optionnel: Arrête l'observation après la première apparition
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Déclenche quand 20% de l'élément est visible

    faders.forEach((fader, index) => {
        // Applique un délai incrémentiel pour un effet en cascade (staggered effect)
        setTimeout(() => {
             observer.observe(fader);
        }, index * 100); 
    });


    // =========================================================================
    // 3. HEADER STICKY AU SCROLL
    // =========================================================================
    const header = document.querySelector('.header');
    const scrollTrigger = 100; // Distance de défilement pour activer la classe 'sticky'
    
    function handleScroll() {
        if (window.scrollY >= scrollTrigger) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    if (header) {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Exécute une fois au chargement pour le cas où la page est rechargée en bas
    }


    // =========================================================================
    // 4. NAVIGATION MOBILE (Menu Burger & Fermeture par Backdrop)
    // =========================================================================
    // Utilisation du sélecteur de classe unique pour le toggle
    const burgerToggle = document.querySelector('.burger-menu-toggle'); 
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    // Fonction unique pour basculer l'état
    const toggleMenu = (shouldClose = false) => {
        const isMenuOpen = nav.classList.contains('open');

        // Si on demande la fermeture (ou si le menu est ouvert et qu'on le clique)
        if (shouldClose || isMenuOpen) {
            nav.classList.remove('open');
            burgerToggle.classList.remove('active');
            body.classList.remove('no-scroll');
        } else {
            // Sinon, on ouvre
            nav.classList.add('open');
            burgerToggle.classList.add('active');
            body.classList.add('no-scroll');
        }
    };

    if (burgerToggle && nav) {
        burgerToggle.addEventListener('click', () => toggleMenu(!nav.classList.contains('open'))); // Toggle
        
        // Fermeture si un lien à l'intérieur est cliqué
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Ferme le menu après navigation
                if (nav.classList.contains('open')) {
                    toggleMenu(true);
                }
            });
        });

        // GESTION DU CLIC SUR L'ARRIÈRE-PLAN (BACKDROP)
        document.addEventListener('click', (event) => {
            // Si le menu est ouvert
            if (nav.classList.contains('open')) {
                // Si l'élément cliqué n'est ni le menu, ni le bouton
                if (!nav.contains(event.target) && !burgerToggle.contains(event.target)) {
                    toggleMenu(true); // Ferme
                }
            }
        });
    }


    // =========================================================================
    // 5. ACCÈS À LA GALERIE PRIVÉE PAR CODE (SIMULATION)
    // =========================================================================
    const form = document.getElementById('galleryAccessForm');
    const accessCodeInput = document.getElementById('accessCode');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const privateGallery = document.getElementById('privateGalleryContent');
    const accessFormContainer = document.querySelector('.access-form-container');
    
    // Codes simulés (devrait être vérifié côté serveur)
    const VALID_CODES = ['EA-MARIAGE-2025', 'EA-FAMILLE-123', 'EA-PORTFOLIO']; 
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const codeSaisi = accessCodeInput.value.toUpperCase().trim();

            feedbackMessage.textContent = '';
            feedbackMessage.classList.remove('error', 'success');

            if (VALID_CODES.includes(codeSaisi)) {
                feedbackMessage.textContent = 'Code accepté ! Chargement de votre galerie...';
                feedbackMessage.classList.add('success');
                
                setTimeout(() => {
                    if (accessFormContainer) accessFormContainer.style.display = 'none';
                    
                    if (privateGallery) {
                        privateGallery.style.display = 'block';
                        // Lancement de l'animation fade-in
                        setTimeout(() => {
                             privateGallery.classList.add('fade', 'show');
                        }, 50);
                    }
                    privateGallery.scrollIntoView({ behavior: 'smooth' });
                    
                }, 1000); 
                
            } else {
                feedbackMessage.textContent = 'Code invalide. Veuillez vérifier votre saisie.';
                feedbackMessage.classList.add('error');
                accessCodeInput.value = '';
                accessCodeInput.focus();
            }
        });
    }


    // =========================================================================
    // 6. SYSTÈME DE FILTRAGE DE LA GALERIE (Par Boutons)
    // =========================================================================
    const filterButtons = document.querySelectorAll('.cat-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                const filterValue = button.getAttribute('data-filter').toLowerCase();

                // 1. Mettre à jour l'état actif des boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // 2. Appliquer le filtrage
                galleryItems.forEach(item => {
                    const itemCategories = item.className; 
                    item.classList.add('hidden'); // Démarrer la transition de masquage
                    
                    setTimeout(() => {
                        if (filterValue === 'tous' || itemCategories.includes(filterValue)) {
                            item.classList.remove('hidden');
                            item.style.display = 'block'; 
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300); // Durée de la transition CSS
                });
            });
        });
        
        // Initialiser avec le bouton 'Tous' actif au chargement
        const allButton = document.querySelector('.cat-btn[data-filter="tous"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }


    // =========================================================================
    // 7. LIGHTBOX / ZOOM D'IMAGE
    // =========================================================================
    const lightbox = document.getElementById('catalogue-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // NOTE: Le HTML du Lightbox utilise la classe 'lightbox' dans votre CSS initial, 
    // je change l'ID ici pour correspondre:
    const finalLightbox = document.querySelector('.lightbox'); 


    if (galleryItems.length > 0 && finalLightbox && lightboxImage && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Utilise data-full-src s'il existe (meilleure qualité), sinon src
                const fullSrc = item.querySelector('img').getAttribute('data-full-src') || item.querySelector('img').src;
                lightboxImage.src = fullSrc;
                finalLightbox.style.display = 'flex'; 
            });
        });

        // Fermeture par le bouton X
        lightboxClose.addEventListener('click', () => {
            finalLightbox.style.display = 'none'; 
        });

        // Fermeture par clic en dehors de l'image
        finalLightbox.addEventListener('click', (e) => {
            if (e.target === finalLightbox) {
                finalLightbox.style.display = 'none';
            }
        });

        // Fermeture par la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && finalLightbox.style.display === 'flex') {
                finalLightbox.style.display = 'none';
            }
        });
    }
});

// Nettoyage de la duplication 'scroll="smooth"' qui était hors du bloc JS
// Le scroll smooth est déjà défini dans le CSS sur body et *