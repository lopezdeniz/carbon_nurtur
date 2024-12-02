<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Подключаем автозагрузчик Composer
require __DIR__ . '/../vendor/autoload.php'; // Убедитесь, что путь правильный

// Установка заголовков для CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Обработка CORS preflight-запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Основная логика обработки запроса
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение и обработка входящих данных
    $input = file_get_contents('php://input');
    file_put_contents('debug.txt', $input); // Сохраняем запрос в файл для отладки
    $data = json_decode($input, true);

    // Валидация данных
    $name = htmlspecialchars($data['name'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $message = htmlspecialchars($data['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
        exit;
    }

    // Настройка PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Настройка SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'misterleandr@gmail.com'; // Ваш Gmail
        $mail->Password = 'txxlieywhsvqmnlm';       // Пароль приложения
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Настройка отправителя и получателя
        $mail->setFrom('misterleandr@gmail.com', 'Carbon Nurture Support'); // Отправитель
        $mail->addAddress('lopezdenizofficial@gmail.com', 'Recipient Name'); // Получатель
        $mail->addReplyTo($email, $name); // Ответ на письмо отправителю

        // Содержимое письма
        $mail->isHTML(true);
        $mail->Subject = 'New Message from ' . $name;
        $mail->Body = "<p><strong>Name:</strong> $name</p>
                       <p><strong>Email:</strong> $email</p>
                       <p><strong>Message:</strong></p>
                       <p>$message</p>";
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage: $message";

        // Отправка письма
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } catch (Exception $e) {
        // Логируем ошибки в файл и возвращаем сообщение об ошибке
        file_put_contents('email_errors.log', $e->getMessage() . PHP_EOL, FILE_APPEND);
        echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
