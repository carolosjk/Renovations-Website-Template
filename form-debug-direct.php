<?php
/**
 * Elite Renovations Contact Form Handler - Direct Debug Version
 * This script returns all debug information directly to the browser
 */

// Set full error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Create array to store debug information
$debug = [
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'php_version' => phpversion(),
    'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'Unknown',
    'post_data' => $_POST,
    'files_exist' => [],
    'execution_steps' => [],
    'errors' => []
];

// Function to add an execution step
function addStep($message) {
    global $debug;
    $debug['execution_steps'][] = [
        'time' => microtime(true),
        'message' => $message
    ];
}

// Function to add an error
function addError($message) {
    global $debug;
    $debug['errors'][] = [
        'time' => microtime(true),
        'message' => $message
    ];
}

// Header for API response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

addStep("Script started");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    addStep("OPTIONS request received");
    http_response_code(200);
    echo json_encode(['status' => 'OPTIONS request handled']);
    exit();
}

// Check HTTP method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    addStep("Invalid HTTP method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405); // Method Not Allowed
    $debug['final_response'] = [
        'success' => false,
        'message' => 'Method not allowed'
    ];
    echo json_encode($debug);
    exit;
}

addStep("POST request received");

try {
    // Check if PHPMailer files exist
    addStep("Checking PHPMailer files");
    
    $files_to_check = [
        'phpmailer/src/PHPMailer.php',
        'phpmailer/src/SMTP.php',
        'phpmailer/src/Exception.php'
    ];
    
    foreach ($files_to_check as $file) {
        $exists = file_exists($file);
        $debug['files_exist'][$file] = $exists;
        
        if (!$exists) {
            addError("File not found: $file");
            throw new Exception("Required file not found: $file");
        }
        
        $filesize = filesize($file);
        $debug['files_exist'][$file] = [
            'exists' => true,
            'size' => $filesize,
            'readable' => is_readable($file)
        ];
    }
    
    addStep("All required files exist");

    // Get form data from POST request
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $service = isset($_POST['service']) ? trim($_POST['service']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $website = isset($_POST['website']) ? trim($_POST['website']) : '';
    
    addStep("Form data processed");

    // Validate data (minimal validation for debug purposes)
    if (empty($name) || empty($email) || empty($message)) {
        addError("Missing required fields");
        throw new Exception('Missing required fields');
    }
    
    addStep("Validation passed");
    
    // For debug version, skip actual email sending and return success
    addStep("Email sending would happen here in production");
    
    $debug['final_response'] = [
        'success' => true,
        'message' => 'Debug mode: Form submission validated successfully. In production, an email would be sent.'
    ];
    
    echo json_encode($debug);
    
} catch (Exception $e) {
    addError("Exception: " . $e->getMessage());
    
    $debug['final_response'] = [
        'success' => false,
        'message' => $e->getMessage(),
        'details' => 'An error occurred during processing.'
    ];
    
    http_response_code(400);
    echo json_encode($debug);
}
?>
