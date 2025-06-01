<?php
/**
 * Simple PHP version info script for Elite Renovations
 * This script shows basic PHP information to verify PHP is working
 */

// Set headers to prevent caching
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Environment Check - Elite Renovations</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .info-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .info-item {
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }
        .status-ok {
            color: green;
            font-weight: bold;
        }
        .status-error {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <header id="header">
        <div class="container">
            <div class="logo">
                <h1>Elite Renovations</h1>
            </div>
        </div>
    </header>

    <section class="section">
        <div class="container">
            <h2>PHP Environment Check</h2>
            <div class="info-container">
                <div class="info-item">
                    <h3>PHP Version</h3>
                    <p>Running PHP: <strong><?= phpversion() ?></strong></p>
                    <p class="<?= version_compare(phpversion(), '7.2.0', '>=') ? 'status-ok' : 'status-error' ?>">
                        <?= version_compare(phpversion(), '7.2.0', '>=') ? '✅ PHP version is compatible' : '❌ PHP version is too old. PHP 7.2.0 or higher is required.' ?>
                    </p>
                </div>

                <div class="info-item">
                    <h3>Required PHP Extensions</h3>
                    <?php
                    $required_extensions = ['curl', 'json', 'openssl', 'mbstring'];
                    foreach ($required_extensions as $ext) {
                        $loaded = extension_loaded($ext);
                        echo "<p class='" . ($loaded ? "status-ok" : "status-error") . "'>";
                        echo ($loaded ? "✅" : "❌") . " {$ext} extension: " . ($loaded ? "Loaded" : "Not loaded");
                        echo "</p>";
                    }
                    ?>
                </div>

                <div class="info-item">
                    <h3>PHPMailer Status</h3>
                    <?php
                    $phpmailer_files = [
                        'phpmailer/src/PHPMailer.php',
                        'phpmailer/src/SMTP.php',
                        'phpmailer/src/Exception.php'
                    ];
                    $all_files_exist = true;
                    
                    foreach ($phpmailer_files as $file) {
                        $exists = file_exists($file);
                        $all_files_exist = $all_files_exist && $exists;
                        echo "<p class='" . ($exists ? "status-ok" : "status-error") . "'>";
                        echo ($exists ? "✅" : "❌") . " {$file}: " . ($exists ? "Found" : "Missing");
                        echo "</p>";
                    }
                    
                    echo "<p class='" . ($all_files_exist ? "status-ok" : "status-error") . "'>";
                    echo ($all_files_exist ? "✅ PHPMailer is properly installed" : "❌ PHPMailer files are missing. Please download them.");
                    echo "</p>";
                    ?>
                </div>
                
                <div class="info-item">
                    <h3>Server Information</h3>
                    <p><strong>Server Software:</strong> <?= $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown' ?></p>
                    <p><strong>Server Name:</strong> <?= $_SERVER['SERVER_NAME'] ?? 'Unknown' ?></p>
                    <p><strong>Document Root:</strong> <?= $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown' ?></p>
                </div>
                
                <div class="info-item">
                    <h3>Form Submission Readiness</h3>
                    <?php
                    $form_ready = $all_files_exist && extension_loaded('curl') && extension_loaded('json');
                    echo "<p class='" . ($form_ready ? "status-ok" : "status-error") . "'>";
                    echo ($form_ready ? "✅ Your server appears to be ready for contact form submissions" : "❌ Your server is missing some components required for contact form submissions");
                    echo "</p>";
                    ?>
                </div>
            </div>
            
            <p style="text-align: center;"><a href="index.html" class="btn">Back to Main Site</a></p>
        </div>
    </section>
    
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h3>Elite Renovations</h3>
                    <p>PHP Environment Check</p>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; <?= date('Y') ?> Elite Renovations. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
