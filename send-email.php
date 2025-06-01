<?php
/**
 * Elite Renovations Contact Form Handler
 * 
 * This file handles contact form submissions for the Elite Renovations website
 */

// Ensure errors are displayed for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers for security and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple log function that works without file permissions
function logToResponse($message) {
    global $logMessages;
    $logMessages[] = "[" . date('Y-m-d H:i:s') . "] $message";
}

// Initialize log messages array
$logMessages = [];
logToResponse("Script started");

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

try {
    // Get form data from POST request
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $service = isset($_POST['service']) ? trim($_POST['service']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $website = isset($_POST['website']) ? trim($_POST['website']) : ''; // Honeypot field
    $recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    
    // Log the submission attempt
    logToResponse("Form submission attempt from {$email}");
    
    // Check honeypot (spam check)
    if (!empty($website)) {
        logToResponse("Spam detected (honeypot): {$email}");
        throw new Exception('Spam detected');
    }
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('Missing required fields');
    }
    
    // Validate email format (basic check)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Skip reCAPTCHA for simplicity in this version
    
    // Use PHP's built-in mail() function
    logToResponse("Preparing to send email");
    
    // Format the email body
    $email_body = "New contact form submission from Elite Renovations website:\n\n";
    $email_body .= "Name: {$name}\n";
    $email_body .= "Email: {$email}\n";
    $email_body .= "Phone: " . (empty($phone) ? "Not provided" : $phone) . "\n";
    $email_body .= "Service Interested In: " . (empty($service) ? "Not specified" : $service) . "\n\n";
    $email_body .= "Message:\n{$message}\n\n";
    $email_body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers
    $to = "contact@anakainiseis.eu";
    $subject = "New Contact Form Submission - {$name}";
    $headers = "From: hellasrenovations@gmail.com\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send the email using PHP's built-in mail() function
    $mail_sent = mail($to, $subject, $email_body, $headers);
    
    if (!$mail_sent) {
        logToResponse("Failed to send email");
        throw new Exception('Failed to send email. Please try again later.');
    }
    
    logToResponse("Email sent successfully");
    
    // Send success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
        'logs' => $logMessages // Include logs in response for debugging
    ]);
    
} catch (Exception $e) {
    logToResponse("Error processing form: " . $e->getMessage());
    
    http_response_code(400); // Bad Request
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'logs' => $logMessages // Include logs in response for debugging
    ]);
}
?>
