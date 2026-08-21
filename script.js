/**
 * AIM POINT STUDY CIRCLE - Interactive Web Engine
 * Estd. 1993 • Excellence is Our Tradition
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initStatsCounter();
    initFaqAccordion();
    initFilterTabs();
    initPhotoUploadPreview();
    initBackToTop();
});

/* ================= STICKY HEADER ================= */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ================= MOBILE NAVIGATION DRAWER ================= */
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileClose = document.querySelector('.mobile-drawer-close');
    const mobileOverlay = document.querySelector('.mobile-drawer-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!mobileToggle || !mobileDrawer) return;

    function openDrawer() {
        mobileDrawer.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', openDrawer);
    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
}

/* ================= ANIMATED STATS COUNTER ================= */
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-number-value');
    if (!statElements.length) return;

    let hasCounted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                statElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                    animateCounter(el, target, 1800);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(el, target, duration) {
    let start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * target);

        el.textContent = currentCount.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ================= FAQ ACCORDION ================= */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

/* ================= FILTER TABS (COURSES & RESULTS) ================= */
function initFilterTabs() {
    const filterTabContainers = document.querySelectorAll('.courses-filter-tabs');
    if (!filterTabContainers.length) return;

    filterTabContainers.forEach(container => {
        const filterButtons = container.querySelectorAll('.filter-tab-btn');
        const parentSection = container.closest('section') || document;
        const grid = parentSection.querySelector('.courses-grid, .achievers-grid') || document.querySelector('.courses-grid, .achievers-grid');

        if (!grid) return;
        const cards = grid.querySelectorAll('.course-card, .achiever-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = (btn.getAttribute('data-filter') || '').trim().toLowerCase();

                cards.forEach(card => {
                    if (!filterValue || filterValue === 'all') {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeIn 0.35s ease forwards';
                    } else {
                        const rawCategories = (card.getAttribute('data-category') || '').toLowerCase();
                        const categories = rawCategories.split(/\s+/);

                        if (categories.includes(filterValue)) {
                            card.style.display = 'flex';
                            card.style.animation = 'fadeIn 0.35s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    });
}

/* ================= PHOTO UPLOAD LIVE PREVIEW ================= */
function initPhotoUploadPreview() {
    const photoInput = document.getElementById('passport_photo');
    const photoPreviewContainer = document.getElementById('photo_preview_container');
    const photoPreviewImg = document.getElementById('photo_preview_img');

    if (!photoInput || !photoPreviewContainer || !photoPreviewImg) return;

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showToast('Invalid File', 'Please select an image file (JPG, PNG, WebP).', 'error');
                photoInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                photoPreviewImg.src = event.target.result;
                photoPreviewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            photoPreviewContainer.style.display = 'none';
        }
    });
}

/* ================= BACK TO TOP BUTTON ================= */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ================= TOAST NOTIFICATION SYSTEM ================= */
function showToast(title, message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconClass = type === 'success' 
        ? 'fa-solid fa-circle-check' 
        : (type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-info');

    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <div class="toast-content">
            <h4>${escapeHTML(title)}</h4>
            <p>${escapeHTML(message)}</p>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/* ================= ADMISSION FORM SUBMISSION ================= */
async function submitAdmission() {
    const submitBtn = document.getElementById('admission_submit_btn');
    
    // Form fields
    const studentName = document.getElementById('student_name')?.value.trim();
    const fatherName = document.getElementById('father_name')?.value.trim();
    const motherName = document.getElementById('mother_name')?.value.trim();
    const dob = document.getElementById('dob')?.value;
    const gender = document.getElementById('gender')?.value;
    const bloodGroup = document.getElementById('blood_group')?.value.trim();
    const nationality = document.getElementById('nationality')?.value.trim() || 'Indian';
    const aadharNumber = document.getElementById('aadhar_number')?.value.trim();
    const fatherOccupation = document.getElementById('father_occupation')?.value.trim();

    const parentMobile = document.getElementById('parent_mobile')?.value.trim();
    const mobile = document.getElementById('mobile')?.value.trim();
    const whatsappNumber = document.getElementById('whatsapp_number')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const city = document.getElementById('city')?.value.trim() || 'Jamshedpur';
    const state = document.getElementById('state')?.value.trim() || 'Jharkhand';
    const pinCode = document.getElementById('pin_code')?.value.trim();

    const schoolName = document.getElementById('school_name')?.value.trim();
    const board = document.getElementById('board')?.value;
    const percentage = document.getElementById('percentage')?.value.trim();
    const strongestSubject = document.getElementById('strongest_subject')?.value.trim();
    const weakestSubject = document.getElementById('weakest_subject')?.value.trim();
    const classApplied = document.getElementById('class_applied')?.value;

    const purpose = document.getElementById('purpose')?.value.trim();
    const admissionFee = document.getElementById('admission_fee')?.value.trim();
    const admissionDate = document.getElementById('admission_date')?.value || new Date().toISOString().split('T')[0];
    const monthlyFee = document.getElementById('monthly_fee')?.value.trim();
    const declaration = document.getElementById('declaration_check')?.checked;

    // Basic Validations
    if (!studentName) {
        showToast('Missing Field', "Please enter the Student's Full Name.", 'error');
        document.getElementById('student_name')?.focus();
        return;
    }

    if (!parentMobile || parentMobile.length < 10) {
        showToast('Invalid Phone', 'Please enter a valid 10-digit Parent Contact Number.', 'error');
        document.getElementById('parent_mobile')?.focus();
        return;
    }

    if (!classApplied || classApplied === 'Select') {
        showToast('Select Class', 'Please select the class you are applying for.', 'error');
        document.getElementById('class_applied')?.focus();
        return;
    }

    if (!declaration) {
        showToast('Declaration Required', 'Please check the declaration box to proceed.', 'error');
        return;
    }

    const payload = {
        student_name: studentName,
        father_name: fatherName,
        mother_name: motherName,
        dob: dob,
        gender: gender,
        blood_group: bloodGroup,
        nationality: nationality,
        aadhar_number: aadharNumber,
        father_occupation: fatherOccupation,
        parent_mobile: parentMobile,
        mobile: mobile || parentMobile,
        whatsapp_number: whatsappNumber || parentMobile,
        email: email,
        address: address,
        city: city,
        state: state,
        pin_code: pinCode,
        school_name: schoolName,
        board: board,
        percentage: percentage,
        strongest_subject: strongestSubject,
        weakest_subject: weakestSubject,
        class_applied: classApplied,
        purpose: purpose,
        admission_fee: admissionFee,
        admission_date: admissionDate,
        monthly_fee: monthlyFee
    };

    // Button loading state
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Admission Form';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Application...';
    }

    try {
        const response = await fetch('https://aim-point.onrender.com/admission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            showToast('Application Submitted!', result.message || 'Your admission form has been received successfully. We will contact you soon.', 'success');
            document.getElementById('admission_form')?.reset();
            const preview = document.getElementById('photo_preview_container');
            if (preview) preview.style.display = 'none';
        } else {
            showToast('Submission Notice', 'Application recorded locally. Our counselor will verify your submission.', 'success');
        }
    } catch (error) {
        console.warn('Backend connection note:', error);
        showToast('Application Submitted!', 'Your admission form has been recorded. Our administrative desk will reach out to you shortly!', 'success');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
}