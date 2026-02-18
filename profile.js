document.addEventListener('DOMContentLoaded', function() {
    // Navigation entre les onglets
    const profileNavItems = document.querySelectorAll('.profile-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    profileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Mettre à jour la navigation active
            profileNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher l'onglet correspondant
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId + 'Tab').classList.add('active');
            
            // Si c'est l'onglet statistiques, initialiser les graphiques
            if (tabId === 'stats') {
                initializeCharts();
            }
        });
    });
    
    // Modal d'édition du profil
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // Pré-remplir le formulaire avec les données actuelles
            const bio = document.querySelector('.profile-bio').textContent.trim();
            // Extraire la localisation, site web, etc. du profil (simulation)
            
            document.getElementById('editBio').value = bio.replace(/["]/g, '').trim();
            document.getElementById('editLocation').value = 'Paris, France'; // Simulation
            document.getElementById('editWebsite').value = '';
            document.getElementById('editTwitter').value = '';
            document.getElementById('editGitHub').value = '{{ user.username }}';
            
            editProfileModal.classList.add('show');
        });
    }
    
    // Fermer le modal
    function closeEditModalFunc() {
        editProfileModal.classList.remove('show');
    }
    
    if (closeEditModal) {
        closeEditModal.addEventListener('click', closeEditModalFunc);
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeEditModalFunc);
    }
    
    // Sauvegarder les modifications du profil
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            const newBio = document.getElementById('editBio').value.trim();
            const newLocation = document.getElementById('editLocation').value.trim();
            const newWebsite = document.getElementById('editWebsite').value.trim();
            const newTwitter = document.getElementById('editTwitter').value.trim();
            const newGitHub = document.getElementById('editGitHub').value.trim();
            
            // Simuler la sauvegarde
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
            this.disabled = true;
            
            setTimeout(() => {
                // Mettre à jour l'affichage (simulation)
                if (newBio) {
                    document.querySelector('.profile-bio').textContent = `"${newBio}"`;
                }
                
                if (newLocation) {
                    const locationElement = document.querySelector('.meta-item:nth-child(2) span');
                    if (locationElement) {
                        locationElement.textContent = newLocation;
                    }
                }
                
                if (newWebsite) {
                    const websiteElement = document.querySelector('.meta-item:nth-child(3) a');
                    if (websiteElement) {
                        websiteElement.textContent = newWebsite;
                        websiteElement.href = newWebsite;
                    }
                }
                
                if (newGitHub) {
                    const githubElement = document.querySelector('.meta-item:nth-child(3) a');
                    if (githubElement) {
                        githubElement.textContent = `github.com/${newGitHub}`;
                        githubElement.href = `https://github.com/${newGitHub}`;
                    }
                }
                
                // Réinitialiser le bouton
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Fermer le modal
                closeEditModalFunc();
                
                // Afficher une notification
                showNotification('Profil mis à jour avec succès !');
            }, 1500);
        });
    }
    
    // Fermer le modal en cliquant à l'extérieur
    editProfileModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeEditModalFunc();
        }
    });
    
    // Gestion des boutons de suppression d'article
    document.querySelectorAll('.article-actions .btn-danger').forEach(button => {
        button.addEventListener('click', function() {
            const articleItem = this.closest('.article-item');
            const articleTitle = articleItem.querySelector('h3 a').textContent;
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer l'article "${articleTitle}" ?`)) {
                // Simulation de suppression
                articleItem.style.opacity = '0.5';
                articleItem.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    articleItem.remove();
                    showNotification('Article supprimé avec succès');
                    
                    // Mettre à jour les statistiques (simulation)
                    const articleCount = document.querySelector('.profile-stats .stat:first-child .stat-number');
                    if (articleCount) {
                        const currentCount = parseInt(articleCount.textContent);
                        articleCount.textContent = currentCount - 1;
                    }
                }, 500);
            }
        });
    });
    
    // Gestion des boutons de suppression de commentaire
    document.querySelectorAll('.comment-actions .btn-danger').forEach(button => {
        button.addEventListener('click', function() {
            const commentItem = this.closest('.comment-item');
            const commentPreview = commentItem.querySelector('.comment-body p').textContent.substring(0, 50) + '...';
            
            if (confirm(`Êtes-vous sûr de vouloir supprimer ce commentaire ?\n\n"${commentPreview}"`)) {
                // Simulation de suppression
                commentItem.style.opacity = '0.5';
                commentItem.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    commentItem.remove();
                    showNotification('Commentaire supprimé avec succès');
                    
                    // Mettre à jour les statistiques (simulation)
                    const commentCount = document.querySelector('.profile-stats .stat:nth-child(2) .stat-number');
                    if (commentCount) {
                        const currentCount = parseInt(commentCount.textContent);
                        commentCount.textContent = currentCount - 1;
                    }
                }, 500);
            }
        });
    });
    
    // Gestion de la plage de temps pour les statistiques
    const statsRange = document.getElementById('statsRange');
    if (statsRange) {
        statsRange.addEventListener('change', function() {
            // Simuler le changement de données selon la période sélectionnée
            const period = this.value;
            
            // Mettre à jour les valeurs (simulation)
            const statCards = document.querySelectorAll('.stat-card .stat-value');
            const changes = document.querySelectorAll('.stat-change');
            
            // Valeurs simulées pour différentes périodes
            const simulatedData = {
                '7': ['425', '85', '22', '8'],
                '30': ['2,704', '542', '128', '45'],
                '90': ['7,892', '1,245', '356', '128'],
                '365': ['32,456', '4,892', '1,245', '512']
            };
            
            const data = simulatedData[period] || simulatedData['30'];
            
            statCards.forEach((card, index) => {
                if (data[index]) {
                    // Animation du changement de valeur
                    animateValueChange(card, data[index]);
                }
            });
            
            // Mettre à jour les graphiques
            initializeCharts();
            
            showNotification(`Statistiques mises à jour pour les ${period} derniers jours`);
        });
    }
    
    // Initialiser les graphiques pour les statistiques
    function initializeCharts() {
        // Simuler des graphiques simples avec des divs
        const charts = document.querySelectorAll('.stat-chart');
        
        charts.forEach(chart => {
            // Effacer le contenu précédent
            chart.innerHTML = '';
            
            // Créer un graphique en barres simple
            const barCount = 7;
            const maxHeight = 60;
            
            for (let i = 0; i < barCount; i++) {
                const bar = document.createElement('div');
                bar.className = 'chart-bar';
                bar.style.height = `${Math.random() * maxHeight}px`;
                bar.style.width = `${(100 / barCount) - 2}%`;
                bar.style.backgroundColor = getRandomChartColor();
                bar.style.display = 'inline-block';
                bar.style.margin = '0 1%';
                bar.style.borderRadius = '3px 3px 0 0';
                chart.appendChild(bar);
            }
        });
        
        // Graphique d'activité plus complexe
        const activityChart = document.getElementById('activityChart');
        if (activityChart) {
            activityChart.innerHTML = '';
            
            // Créer un graphique multi-séries
            const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
            const dataSeries = [
                { label: 'Articles', color: 'var(--primary-color)', data: [2, 3, 1, 4, 2, 3, 5, 4, 3, 2, 4, 5] },
                { label: 'Commentaires', color: 'var(--success-color)', data: [15, 20, 12, 18, 22, 25, 30, 28, 24, 20, 22, 26] },
                { label: 'Likes donnés', color: 'var(--danger-color)', data: [45, 50, 42, 48, 52, 55, 60, 58, 54, 50, 52, 56] }
            ];
            
            // Trouver la valeur maximale pour l'échelle
            const maxValue = Math.max(...dataSeries.flatMap(series => series.data));
            
            // Créer le graphique
            const chartHeight = 300;
            const chartWidth = activityChart.clientWidth;
            const barWidth = (chartWidth - 100) / (months.length * dataSeries.length + dataSeries.length);
            
            // Ajouter les axes et les données
            let chartHTML = '<div class="chart-content" style="position: relative; height: 100%; width: 100%;">';
            
            // Axe Y
            chartHTML += '<div class="chart-y-axis" style="position: absolute; left: 0; top: 0; bottom: 30px; width: 40px; border-right: 1px solid #ddd; padding-right: 10px; text-align: right;">';
            for (let i = 0; i <= 5; i++) {
                const value = Math.round((maxValue * i) / 5);
                const top = `${100 - (i * 20)}%`;
                chartHTML += `<div style="position: absolute; top: ${top}; right: 0; transform: translateY(-50%); color: #666; font-size: 12px;">${value}</div>`;
            }
            chartHTML += '</div>';
            
            // Données
            chartHTML += '<div class="chart-bars" style="position: absolute; left: 40px; right: 0; top: 0; bottom: 30px; padding-left: 20px;">';
            
            dataSeries.forEach((series, seriesIndex) => {
                months.forEach((month, monthIndex) => {
                    const value = series.data[monthIndex];
                    const height = (value / maxValue) * 100;
                    const left = `${(monthIndex * (dataSeries.length + 1) + seriesIndex) * barWidth}px`;
                    
                    chartHTML += `
                        <div class="chart-bar" 
                             style="position: absolute; 
                                    bottom: 0; 
                                    left: ${left}; 
                                    width: ${barWidth}px; 
                                    height: ${height}%; 
                                    background-color: ${series.color}; 
                                    border-radius: 3px 3px 0 0;"
                             title="${series.label} - ${month}: ${value}">
                        </div>
                    `;
                });
            });
            
            chartHTML += '</div>';
            
            // Axe X
            chartHTML += '<div class="chart-x-axis" style="position: absolute; left: 40px; right: 0; bottom: 0; height: 30px; padding-left: 20px;">';
            months.forEach((month, index) => {
                const left = `${(index * (dataSeries.length + 1) + dataSeries.length / 2) * barWidth}px`;
                chartHTML += `
                    <div style="position: absolute; 
                                left: ${left}; 
                                transform: translateX(-50%); 
                                color: #666; 
                                font-size: 12px;">
                        ${month}
                    </div>
                `;
            });
            chartHTML += '</div>';
            
            chartHTML += '</div>';
            activityChart.innerHTML = chartHTML;
        }
    }
    
    // Animation du changement de valeur
    function animateValueChange(element, newValue) {
        const currentValue = parseInt(element.textContent.replace(/,/g, ''));
        const targetValue = parseInt(newValue.replace(/,/g, ''));
        const duration = 1000;
        const startTime = Date.now();
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Animation d'accélération/décélération
            const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const current = Math.round(currentValue + (targetValue - currentValue) * easeProgress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }
    
    // Générer une couleur aléatoire pour les graphiques
    function getRandomChartColor() {
        const colors = [
            'rgba(58, 134, 255, 0.7)',
            'rgba(131, 56, 236, 0.7)',
            'rgba(255, 0, 110, 0.7)',
            'rgba(255, 190, 11, 0.7)',
            'rgba(56, 176, 0, 0.7)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Pagination des articles
    document.querySelectorAll('.page-btn:not(.disabled):not(.active)').forEach(button => {
        button.addEventListener('click', function() {
            const currentPage = document.querySelector('.page-btn.active');
            const pageInfo = document.querySelector('.page-info');
            
            if (currentPage) {
                currentPage.classList.remove('active');
            }
            
            this.classList.add('active');
            
            // Mettre à jour l'info de page
            const pageNumber = this.textContent;
            if (pageNumber && !isNaN(pageNumber)) {
                pageInfo.textContent = `Page ${pageNumber} sur 3`;
                
                // Simuler le chargement de nouvelles données
                showNotification(`Chargement de la page ${pageNumber}...`, 'info');
                
                setTimeout(() => {
                    showNotification(`Page ${pageNumber} chargée`);
                }, 800);
            }
        });
    });
    
    // Afficher une notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Fermeture automatique après 5 secondes
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
        
        // Fermeture au clic
        notification.querySelector('.close-notification').addEventListener('click', () => {
            closeNotification(notification);
        });
    }
    
    function closeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    // Ajouter le CSS pour les notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: white;
            padding: 15px 20px;
            border-radius: var(--radius);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-success {
            border-left-color: var(--success-color);
        }
        
        .notification-info {
            border-left-color: var(--primary-color);
        }
        
        .notification-error {
            border-left-color: var(--danger-color);
        }
        
        .close-notification {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray-color);
            line-height: 1;
        }
    `;
    document.head.appendChild(notificationStyles);
});
