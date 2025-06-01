// Greek translations
const elTranslations = {
    // Navigation
    "nav_home": "Αρχική",    // Form validation messages  
    "form_error_name_length": "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες",
    "form_error_email_invalid": "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
    "form_error_phone_invalid": "Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου",
    "form_error_message_short": "Παρακαλώ δώστε περισσότερες λεπτομέρειες (τουλάχιστον 10 χαρακτήρες)",
    "form_error_message_long": "Το μήνυμα είναι πολύ μεγάλο (μέγιστο 2000 χαρακτήρες)",
    "form_error_network": "Σφάλμα σύνδεσης. Παρακαλώ ελέγξτε την σύνδεσή σας και δοκιμάστε ξανά.",
      // Form status messages
    "form_sending": "Αποστολή μηνύματος...",
    "form_success": "✨ Σας ευχαριστούμε! Το μήνυμά σας εστάλη επιτυχώς. Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.",
    "form_error": "😔 Ουπς! Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας στο contact@anakainiseis.eu",
    
    // Navigation
    "nav_services": "Υπηρεσίες",
    "nav_work": "Τα Έργα Μας",
    "nav_testimonials": "Αξιολογήσεις Πελατών",
    "nav_contact": "Επικοινωνία",

    // Hero Section
    "hero_title": "Αναβαθμίστε τον Χώρο Σας",
    "hero_subtitle": "Ποιοτικές ανακαινίσεις που υλοποιούν το όραμά σας.",
    "hero_cta": "Ζητήστε Προσφορά",

    // Services Section
    "services_title": "Οι Υπηρεσίες Μας",
    "service_home_title": "Ανακαινίσεις Κατοικιών & Διαμερισμάτων",
    "service_home_desc": "Παρέχουμε ολοκληρωμένες λύσεις ανακαίνισης για κατοικίες και διαμερίσματα, ανανεώνοντας εσωτερικούς και εξωτερικούς χώρους για να δημιουργήσουμε τον ιδανικό σας χώρο.",
    "service_kitchen_title": "Ανακαινίσεις Κουζίνας",
    "service_kitchen_desc": "Σχεδιάζουμε και υλοποιούμε σύγχρονες κουζίνες, από εργονομικά ντουλάπια και ανθεκτικούς πάγκους, μέχρι την ενσωμάτωση κορυφαίων συσκευών και τον ολικό επανασχεδιασμό του χώρου.",
    "service_bathroom_title": "Ανακαινίσεις Μπάνιου",
    "service_bathroom_desc": "Μετατρέψτε το μπάνιο σας σε έναν χώρο χαλάρωσης και ευεξίας. Αναλαμβάνουμε την πλήρη ανανέωσή του με πολυτελή είδη υγιεινής, μοντέρνα πλακάκια και εξατομικευμένες λύσεις ντους.",
    "service_electrical_plumbing_title": "Ηλεκτρολογικές & Υδραυλικές Εργασίες",
    "service_electrical_plumbing_desc": "Αναλαμβάνουμε πάσης φύσεως ηλεκτρολογικές και υδραυλικές εργασίες, διασφαλίζοντας την ασφάλεια, τη λειτουργικότητα και την ενεργειακή απόδοση των εγκαταστάσεων στο ακίνητό σας.",

    // Portfolio Section
    "portfolio_title": "Δείγματα Εργασιών Μας",
    "portfolio_filter_all": "Όλα",
    "portfolio_filter_kitchen": "Κουζίνες",
    "portfolio_filter_bathroom": "Μπάνια",
    "portfolio_filter_internal": "Εσωτερικές Ανακαινίσεις",
    "portfolio_filter_commercial": "Επαγγελματικοί Χώροι",
    "portfolio_filter_special": "Ειδικά Έργα",    // Portfolio Items
    "portfolio_item1_title": "Μοντέρνα Κουζίνα Διαμερίσματος",
    "portfolio_item1_desc": "Κομψή, λειτουργική κουζίνα σε πρόσφατα ανακαινισμένο διαμέρισμα.",
    "portfolio_item2_title": "Πολυτελές Μπάνιο Βίλας",
    "portfolio_item2_desc": "Μπάνιο που θυμίζει spa, με πολυτελή υλικά και εξοπλισμό σε βίλα.",
    "portfolio_item3_title": "Χώρος Υποδοχής Γραφείου",
    "portfolio_item3_desc": "Φιλόξενος και επαγγελματικός χώρος υποδοχής για εταιρικά γραφεία.",
    "portfolio_item4_title": "Μοντέρνος Σχεδιασμός Μπάνιου",
    "portfolio_item4_desc": "Σύγχρονο μπάνιο με κομψά είδη υγιεινής και κομψά φινιρίσματα.",
    "portfolio_item5_title": "Κύρια Κρεβατοκάμαρα",
    "portfolio_item5_desc": "Κομψή ανακαίνιση κρεβατοκάμαρας με εξατομικευμένες λύσεις και πολυτελή φινιρίσματα.",
    "portfolio_item6_title": "Χώρος Καθιστικού Ολικής Ανακαίνισης",
    "portfolio_item6_desc": "Πλήρης μεταμόρφωση καθιστικού ως μέρος ολικής ανακαίνισης κατοικίας.",
    "portfolio_item7_title": "Εσωτερικός Σχεδιασμός Καταστήματος",
    "portfolio_item7_desc": "Κομψός και λειτουργικός εσωτερικός σχεδιασμός για κατάστημα λιανικής.",
    "portfolio_item8_title": "Ηλεκτρολογικές Εργασίες",
    "portfolio_item8_desc": "Επαγγελματικές ηλεκτρολογικές εγκαταστάσεις και καλωδιώσεις για σύγχρονα κτίρια.",
    "portfolio_item9_title": "Υδραυλικές Εργασίες",
    "portfolio_item9_desc": "Εξειδικευμένες υδραυλικές υπηρεσίες και εγκαταστάσεις για οικιστικά και εμπορικά έργα.",

    // Testimonials Section
    "testimonials_title": "Τι Είπαν οι Πελάτες Μας", 
    "testimonial1_text": "\"Η Elite Renovations μετέτρεψε την παλιομοδίτικη κουζίνα μας σε έναν εκπληκτικό, μοντέρνο χώρο. Η προσοχή στη λεπτομέρεια και η ποιότητα της δουλειάς ξεπέρασαν κάθε προσδοκία.\"",
    "testimonial1_author": "Σοφία Ιωάννου",
    "testimonial1_project": "Ανακαίνιση Κουζίνας",
    "testimonial2_text": "\"Επαγγελματίες από την αρχή ως το τέλος. Η ανακαίνιση του μπάνου μας ολοκληρώθηκε στην ώρα της και εντός του συμφωνημένου κόστους. Είμαστε απόλυτα ευχαριστημένοι.\"",
    "testimonial2_author": "Γιώργος Παπαδόπουλος",
    "testimonial2_project": "Ανακαίνιση Μπάνιου",
    "testimonial3_text": "\"Η ομάδα της Elite Renovations ήταν φανταστική. Η τεχνογνωσία τους μας βοήθησε να πάρουμε τις σωστές αποφάσεις για την επέκταση του σπιτιού μας, και το αποτέλεσμα είναι άψογο.\"",
    "testimonial3_author": "Ελένη & Κώστας Αντωνίου",
    "testimonial3_project": "Επέκταση Κατοικίας",

    // Contact Section
    "contact_title": "Επικοινωνήστε Μαζί Μας",
    "contact_subtitle": "Είστε έτοιμοι να ξεκινήσετε την ανακαίνιση των ονείρων σας; Καλέστε μας σήμερα για μια δωρεάν μελέτη του χώρου σας και αναλυτική προσφορά.",
    "contact_address_label": "Έδρα: Οδός Ανακαινίσεων 123, Πόλη, ΤΚ 12345",
    "contact_phone": "Τηλέφωνο: 210 1234567",
    "contact_email": "Email: info@eliterenovations.gr",
    "contact_hours": "Ωράριο Λειτουργίας:<br>Δευτέρα-Παρασκευή: 08:00-18:00<br>Σάββατο: 09:00-14:00",
    "contact_form_title": "Φόρμα Επικοινωνίας",
    "contact_form_name": "Ονοματεπώνυμο",
    "contact_form_email": "Διεύθυνση Email",
    "contact_form_phone": "Τηλέφωνο Επικοινωνίας",
    "contact_form_service": "Επιθυμητή Υπηρεσία",
    "contact_form_message": "Το Μήνυμά Σας",
    "contact_form_submit": "Αποστολή",
    "contact_form_select": "Επιλέξτε Υπηρεσία",
    "contact_form_kitchen": "Ανακαίνιση Κουζίνας",
    "contact_form_bathroom": "Ανακαίνιση Μπάνιου",
    "contact_form_basement": "Διαμόρφωση Υπογείου",
    "contact_form_addition": "Επέκταση Κατοικίας",
    "contact_form_whole": "Ολική Ανακαίνιση Κατοικίας",
    "contact_form_other": "Άλλη Υπηρεσία",

    // Footer
    "footer_tagline": "Δημιουργούμε χώρους αξίας, με ποιότητα και συνέπεια από το 2010.",
    "footer_copyright": "© 2025 Elite Renovations. Όλα τα δικαιώματα κατοχυρωμένα.",

    // Language
    "language_en": "English",
    "language_el": "Ελληνικά",    // Form validation messages
    "form_error_name_length": "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες",
    "form_error_email_invalid": "Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email",
    "form_error_phone_invalid": "Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου",
    "form_error_message_short": "Παρακαλώ δώστε περισσότερες λεπτομέρειες (τουλάχιστον 10 χαρακτήρες)",
    "form_error_message_long": "Το μήνυμα είναι πολύ μεγάλο (μέγιστο 2000 χαρακτήρες)",
    
    // Form status messages
    "form_sending": "Αποστολή μηνύματος...",
    "form_success": "✨ Σας ευχαριστούμε! Το μήνυμά σας εστάλη επιτυχώς. Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.",
    "form_error": "😔 Ουπς! Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά ή επικοινωνήστε μαζί μας στο contact@anakainiseis.eu"
};
