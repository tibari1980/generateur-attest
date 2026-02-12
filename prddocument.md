# 📄 PRD — Application de Génération d’Attestations Administratives

**Nom produit :** Attestio
**Version :** v1.1 (avec n8n Workflow Automation)
**Backend principal :** Firebase
**Moteur d’automatisation :** n8n (auto-hébergé sur VPS Hostinger)

---

# 1. 🎯 Objectif Produit

Développer une application web permettant :

* La génération automatisée d’attestations administratives
* L’automatisation complète du processus via un workflow n8n déclenché par webhook
* L’envoi automatique du document par email
* La mise à disposition d’un lien sécurisé dans l’application

Le système doit être :

* Automatisé
* Sécurisé
* Scalable
* Séparé entre front (Firebase) et logique métier (n8n)

---

# 2. 🏗️ Architecture Technique Globale

## 🔹 Frontend
* React / Next.js
* Firebase SDK

## 🔹 Backend
* Firebase Auth
* Firestore
* Firebase Storage

## 🔹 Automatisation
* n8n auto-hébergé sur VPS Hostinger
* Déclenchement via Webhook sécurisé
* Génération document
* Envoi email
* Retour vers Firebase

---

# 3. 🔄 Workflow Fonctionnel

## 🎬 Déclenchement
1. L’utilisateur remplit un formulaire
2. Clique sur **“Générer l’attestation”**
3. L’application envoie une requête POST vers le webhook n8n

---

# 4. 📡 Communication Frontend → n8n

### Endpoint n8n
```
POST https://ton-domaine.com/webhook/generate-document
```

### Payload JSON envoyé :
```json
{
  "userId": "uid123",
  "email": "user@email.com",
  "documentType": "attestation_travail",
  "fields": {
    "nom": "Dupont",
    "prenom": "Jean",
    "poste": "Développeur",
    "dateDebut": "01/01/2024",
    "dateFin": "01/01/2025",
    "entreprise": "TechCorp"
  }
}
```

---

# 5. ⚙️ Workflow n8n (hébergé sur VPS Hostinger)

## Étapes du workflow :

### 1️⃣ Webhook Trigger
* Méthode : POST
* Validation token secret
* Vérification des champs obligatoires

---

### 2️⃣ Switch (selon documentType)
Exemple :
* attestation_travail
* attestation_stage
* attestation_domicile
* attestation_honneur

---

### 3️⃣ Génération du document
Deux options possibles :

### Option A (recommandée) :
* Template HTML dynamique
* Node "HTML to PDF" (ou Puppeteer)
* Génération fichier PDF

### Option B :
* Google Docs API
* Remplacement variables
* Export PDF

---

### 4️⃣ Upload du PDF
Le workflow :
* Upload le PDF vers Firebase Storage (via HTTP API ou service account)
* Récupère l’URL sécurisée

---

### 5️⃣ Mise à jour Firestore
Création document :
```
documents/
  documentId
    userId
    documentType
    pdfUrl
    createdAt
    status: "generated"
```

---

### 6️⃣ Envoi Email
Node Email (SMTP Hostinger ou SendGrid)

Contenu email :
* Document en pièce jointe
* Lien sécurisé vers application
* Message personnalisé

---

### 7️⃣ Réponse au frontend
n8n retourne :
```json
{
  "status": "success",
  "documentId": "doc_123",
  "downloadUrl": "https://firebase-storage-link"
}
```

---

# 6. 🔐 Sécurité

### Webhook sécurisé par :
* Token secret
* Vérification signature
* Limitation IP possible
* HTTPS obligatoire

### Firebase Rules :
* Accès document uniquement si request.auth.uid == userId

### Stockage :
* URL signée temporaire (ex : 7 jours)

---

# 7. 🗄️ Structure Firestore

## users
* uid
* profile
* subscriptionPlan

## documents
* documentId
* userId
* documentType
* fields
* pdfUrl
* status
* createdAt

## templates
* templateId
* htmlStructure
* requiredFields

---

# 8. 📊 Flow Complet Résumé

Utilisateur
↓
Remplit formulaire
↓
Clique "Générer"
↓
POST → Webhook n8n
↓
n8n génère PDF
↓
Upload Firebase Storage
↓
Création document Firestore
↓
Email envoyé
↓
Lien visible dans l’application

Temps estimé : 3 à 10 secondes

---

# 9. 📈 Scalabilité

Pourquoi cette architecture est intelligente :
* Firebase gère l’auth et la data
* n8n gère la logique métier
* VPS indépendant = pas de limite Firebase Functions
* Facile d’ajouter :
  * Signature électronique
  * QR code
  * Validation admin
  * Paiement Stripe

---

# 10. 🚀 Roadmap Technique

Phase 1 :
* Mise en place VPS Hostinger
* Installation n8n (Docker recommandé)
* Configuration webhook
* Test génération PDF

Phase 2 :
* Connexion Firebase
* Upload automatique Storage
* Firestore sync

Phase 3 :
* Email automatisé
* Logs + monitoring

Phase 4 :
* Sécurisation avancée (JWT, rate limiting)

---

# 11. 🧠 Pourquoi n8n est un bon choix ici

✔ Découplage logique métier
✔ Visualisation du workflow
✔ Évolutivité
✔ Maintenance simplifiée
✔ Ajout rapide de nouvelles attestations

---

# 12. ⚠️ Risques techniques

* Latence VPS
* Sécurisation webhook mal configurée
* Gestion des erreurs génération PDF
* Volume élevé si usage massif

---

# 13. 🔮 Évolutions futures possibles

* Statut “en cours de génération”
* Système de quota
* Webhook async avec polling
* API publique pour entreprises

---

# 📌 Résumé Architecture Finale

Frontend (React + Firebase)
↓
Webhook sécurisé
↓
n8n (VPS Hostinger)
↓
Génération PDF
↓
Upload Storage
↓
Firestore update
↓
Email + lien
