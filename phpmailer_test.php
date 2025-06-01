<?php
// Set error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if PHPMailer files exist
if (file_exists('phpmailer/src/PHPMailer.php') && 
    file_exists('phpmailer/src/SMTP.php') && 
    file_exists('phpmailer/src/Exception.php')) {
    echo "<p style='color:green'>PHPMailer files found successfully!</p>";
    echo "<ul>";
    echo "<li>Exception.php: " . filesize('phpmailer/src/Exception.php') . " bytes</li>";
    echo "<li>PHPMailer.php: " . filesize('phpmailer/src/PHPMailer.php') . " bytes</li>";
    echo "<li>SMTP.php: " . filesize('phpmailer/src/SMTP.php') . " bytes</li>";
    echo "</ul>";

    // Try including the files
    try {
        require 'phpmailer/src/Exception.php';
        require 'phpmailer/src/PHPMailer.php';
        require 'phpmailer/src/SMTP.php';
        
        echo "<p style='color:green'>PHPMailer files loaded successfully!</p>";
        
        // Check if classes exist
        if (class_exists('PHPMailer\PHPMailer\PHPMailer') && 
            class_exists('PHPMailer\PHPMailer\SMTP') && 
            class_exists('PHPMailer\PHPMailer\Exception')) {
            echo "<p style='color:green'>All PHPMailer classes exist and can be used!</p>";
        } else {
            echo "<p style='color:red'>Some PHPMailer classes could not be found!</p>";
        }
    } catch (Exception $e) {
        echo "<p style='color:red'>Error loading PHPMailer files: " . $e->getMessage() . "</p>";
    }
} else {
    echo "<p style='color:red'>Some PHPMailer files are missing!</p>";
    if (!file_exists('phpmailer/src/PHPMailer.php')) {
        echo "<p>Missing: PHPMailer.php</p>";
    }
    if (!file_exists('phpmailer/src/SMTP.php')) {
        echo "<p>Missing: SMTP.php</p>";
    }
    if (!file_exists('phpmailer/src/Exception.php')) {
        echo "<p>Missing: Exception.php</p>";
    }
}
