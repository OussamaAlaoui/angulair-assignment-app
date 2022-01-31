# Assignments Management App Project
## **Résumé d’une description du projet**
L’application est un site web pour la gestion des “assignments”, où l’utilisateur peut consulter les informations et les détails des derniers et aussi il peut manipuler leurs données où il peut ajouter, modifier ou supprimer un ou plusieurs assignment à la fois et en plus on affiche des popup pour la confirmation ou l’annulation de cette action. De plus l’utilisateur peut générer 194 assignments pour des raisons de test. encore j’ai ajouté plusieurs vérification à l’application par exemple si il y a un problème de connexion au cloud, on affiche un message d’erreur la même chose quand aucune information est trouver ainsi des spinner pour montrer au utilisateur que les information sont en train d'être chargé.

## **Fonctionnalités de l’application et explication détaillé :**

### Le header du tableaux:
* Un titre qui affiche le nombre totale des documents
* Un bouton pour supprimer les assignments selectionnés
* Un menu pour choisir le nombre des documents affichés dans la page
* Un bouton pour générer et ajouter des informations aux tableau (pour les testes)
* **Un bouton d’ajout pour ajouter un assignment**
    * Le clique sur le bouton prend l'utilisateur vers la page de formulaire d’ajout.
    * Après la confirmation d’ajout du nouveau assignment l’utilisateur est dirigé vers la page qui contient la liste des assignments
    * Si l’ajout est réussi l’utilisateur reçoit un petit message ou “popup” en vert qui confirme ça
### **Le tableau des assignments:**
* Première colonne permet l’utilisateur de cocher plusieurs elements aussi ou de cocher tous les éléments de la liste en cliquant sur le checkbox dans le titre de la colonne
* Deuxième colonne affiche un bouton qui dirige l’utilisateur vers une autre page qui affiche les détailles de l'assignement choisi
* Troisième colonne affiche l’identifiant unique de l'élément
* Quatrième colonne affiche le nom de l’assignment
* Cinquième affiche la date de rendu
* Sixième affiche si l’assignment a été rendu ou non
* Septième a un bouton pour supprimer l'élément
* Dernière contient le bouton qui dirige l’utilisateur vers la page de modifications des information d'élément

### le footer de tableau
* il contient quatre bouton deux pour naviguer entre la page prochaine et la page précédente si il y a une sinon il sont grisés
* les deux autres pour naviguer vers la dernière et la première page.
### Vérification et animation
* Quand l’utilisateur ouvre le site web et s'il a une connexion lente on affiche un spinner qui indique que les données sont entrain d'être charger, la même animation est affiché quand l’utilisateur génère des données
* Vérification de la connexion avec le serveur ou le cloud où on affiche une message d’erreur
* Vérification de l'existence des données si il n'y a aucune donnée on affiche un message d’erreur.

