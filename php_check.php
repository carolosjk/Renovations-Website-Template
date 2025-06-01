<?php
/**
 * PHP Configuration Check for Elite Renovations
 * 
 * This script checks if your hosting provider supports all the required PHP features.
 */

function checkPass($condition, $message) {
    if ($condition) {
        echo "<div style='color: green;'>&#10004; PASS: $message</div>";
        return true;
    } else {
        echo "<div style='color: red;'>&#10008; FAIL: $message</div>";
        return false;
    }
}

echo "<html><head><title>PHP Configuration Check</title>";
echo "<style>body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; line-height: 1.6; }";
echo "h1 { color: #333; } .section { background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; }";
echo "</style></head><body>";

echo "<h1>PHP Configuration Check for Elite Renovations</h1>";
echo "<p>This script checks if your hosting environment supports all required PHP features.</p>";

// Basic PHP version check
echo "<div class='section'><h2>1. PHP Version</h2>";
echo "Current PHP Version: " . phpversion() . "<br>";
checkPass(version_compare(phpversion(), '7.2.0', '>='), "PHP version 7.2.0 or higher is required");
echo "</div>";

// Check for required PHP extensions
echo "<div class='section'><h2>2. Required PHP Extensions</h2>";
$requiredExtensions = ['curl', 'json', 'openssl', 'mbstring', 'fileinfo'];
$allExtensionsAvailable = true;

foreach ($requiredExtensions as $extension) {
    $extensionLoaded = extension_loaded($extension);
    $allExtensionsAvailable = $allExtensionsAvailable && $extensionLoaded;
    checkPass($extensionLoaded, "Extension '$extension' is " . ($extensionLoaded ? "loaded" : "not loaded"));
}
echo "</div>";

// File permissions check
echo "<div class='section'><h2>3. File Permissions</h2>";
$logFile = 'contact-form.log';

// Try to create/write to log file
$canWrite = true;
try {
    $testContent = "Test log entry: " . date('Y-m-d H:i:s') . "\n";
    file_put_contents($logFile, $testContent, FILE_APPEND | LOCK_EX);
} catch (Exception $e) {
    $canWrite = false;
}

checkPass($canWrite, "Can write to log file ($logFile)");
echo "<p>Current permissions: " . substr(sprintf('%o', fileperms($logFile)), -4) . "</p>";
echo "</div>";

// SMTP connection check
echo "<div class='section'><h2>4. SMTP Functionality</h2>";
$smtpFunctions = ['fsockopen', 'stream_socket_client'];
$smtpFunctionsAvailable = false;

foreach ($smtpFunctions as $function) {
    if (function_exists($function)) {
        $smtpFunctionsAvailable = true;
        checkPass(true, "Function '$function' is available for SMTP connections");
    } else {
        echo "<div style='color: orange;'>&#9888; WARNING: Function '$function' is not available</div>";
    }
}

checkPass($smtpFunctionsAvailable, "At least one required function for SMTP connections is available");
echo "</div>";

// PHPMailer check
echo "<div class='section'><h2>5. PHPMailer Availability</h2>";
$phpMailerFiles = [
    'phpmailer/src/PHPMailer.php',
    'phpmailer/src/SMTP.php',
    'phpmailer/src/Exception.php'
];

$phpMailerAvailable = true;
foreach ($phpMailerFiles as $file) {
    $fileExists = file_exists($file);
    $phpMailerAvailable = $phpMailerAvailable && $fileExists;
    checkPass($fileExists, "File '$file' " . ($fileExists ? "exists" : "is missing"));
}

if (!$phpMailerAvailable) {
    echo "<p style='color: orange;'>PHPMailer files are missing. Run the download_phpmailer.py script to download them.</p>";
}
echo "</div>";

// Overall summary
echo "<div class='section'><h2>Summary</h2>";

$allChecksPass = version_compare(phpversion(), '7.2.0', '>=') && 
                $allExtensionsAvailable && 
                $canWrite && 
                $smtpFunctionsAvailable &&
                $phpMailerAvailable;

if ($allChecksPass) {
    echo "<div style='color: green; font-weight: bold; font-size: 1.2em;'>✅ All checks passed! Your server should be compatible with the Elite Renovations website.</div>";
} else {
    echo "<div style='color: orange; font-weight: bold; font-size: 1.2em;'>⚠️ Some checks failed. Please address the issues above before deploying.</div>";
}
echo "</div>";

echo "</body></html>";
?>
