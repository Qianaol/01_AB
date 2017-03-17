<?php
    use \AmoCRM\Handler;
    use \AmoCRM\Request;
    use \AmoCRM\Lead;
    use \AmoCRM\Contact;
    use \AmoCRM\Task;

    require('vendor/autoload.php');
    
    /* Предположим, пользователь ввел какие-то данные в форму на сайте */
    $name = $_POST['name'];
    $phone = $_POST['phone'];

/* Оборачиваем в try{} catch(){}, чтобы отлавливать исключения */
try {
    $api = new Handler('new58b5357d0de5f', 'info@atlant.black');


    /* Создаем сделку,
    $api->config содержит в себе массив конфига,
    который вы создавали в начале */
    $lead = new Lead();
    $lead
        /* Название сделки */
        ->setName('Заявка с сайта') 
        /* Назначаем ответственного менеджера */
        ->setResponsibleUserId($api->config['ResponsibleUserId'])
         /* Кастомное поле */
        ->setCustomField(
            $api->config['LeadFieldCustom'], // ID поля
            $api->config['LeadFieldCustomValue1'] // ID значения поля
        )
        /* Статус сделки */
        ->setStatusId($api->config['LeadStatusId']);

    /* Отправляем данные в AmoCRM
    В случае успешного добавления в результате
    будет объект новой сделки */
    $api->request(new Request(Request::SET, $lead));

    /* Сохраняем ID новой сделки для использования в дальнейшем */
    $lead = $api->last_insert_id;


    /* Создаем контакт */
    $contact = new Contact();
    $contact
        /* Имя */
        ->setName($name)
        /* Назначаем ответственного менеджера */
        ->setResponsibleUserId($api->config['ResponsibleUserId'])
        /* Привязка созданной сделки к контакту */
        ->setLinkedLeadsId($lead)
        /* Кастомные поля */
        ->setCustomField(
            $api->config['ContactFieldPhone'],
            $phone, // Номер телефона
            'MOB' // MOB - это ENUM для этого поля, список доступных значений смотрите в информации об аккаунте
        );

    /* Проверяем по емейлу, есть ли пользователь в нашей базе */
    $api->request(new Request(Request::GET, ['query' => $phone], ['contacts', 'list']));

    /* Если пользователя нет, вернется false, если есть - объект пользователя */
    $contact_exists = ($api->result) ? $api->result->contacts[0] : false;

    /* Если такой пользователь уже есть - мержим поля */
    if ($contact_exists) {
        $contact
            /* Указываем, что пользователь будет обновлен */
            ->setUpdate($contact_exists->id, $contact_exists->last_modified + 1)
            /* Ответственного менеджера оставляем кто был */
            ->setResponsibleUserId($contact_exists->responsible_user_id)
            /* Старые привязанные сделки тоже сохраняем */
            ->setLinkedLeadsId($contact_exists->linked_leads_id);
    }
    
    /* Создаем задачу для менеджера обработать заявку */
    $task = new Task();
    $task
        /* Привязка к созданной сделке */
        ->setElementId($lead)
        /* Тип привязки (к сделке или к контакту) Смотрите комментарии в Task.php */
        ->setElementType(Task::TYPE_LEAD)
        /* Тип задачи. Смотрите комментарии в Task.php */
        ->setTaskType(Task::CALL)
        /* ID ответственного за задачу менеджера */
        ->setResponsibleUserId($api->config['ResponsibleUserId'])
        /* Дедлайн задачи */
        ->setCompleteTill(time() + 60 * 2)
        /* Текст задачи */
        ->setText('Обработать заявку');


    /* Отправляем все в AmoCRM */
    $api->request(new Request(Request::SET, $contact));
    $api->request(new Request(Request::SET, $task));
} catch (\Exception $e) {
    echo $e->getMessage();
}
?>


<!DOCTYPE html>
<html>

<head>
  <title>Atlant Black</title>
  <!-- Bootstrap -->
  <meta charset="UTF-8">
  <meta name="author" content="Oleksandr Khrypun">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/thankyou.min.css" rel="stylesheet">


  <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="img/favicon/manifest.json">
  <meta name="theme-color" content="#ffffff">
</head>
<body>
  <div class="tankyou_wrapper">
    <div class="header_line-withShadow"></div>
    <img class="thankyou-logo" src="img/logo-2.png" alt="Logo">

    <div class="wrapper section_header_block thnakyou_section_header">
      <div class="section_header">
        <img src="img/left-bracket.png" alt="" class="content_img content_img-small content_img-left">
        <h2 class="header-onWhite">Спасибо за вашу заявку</h2>
        <img src="img/right-bracket.png" alt="" class="content_img content_img-small content_img-right">
      </div>
      <p class="thankyou-massage">Наш менеджер свяжется с вами в близжайшее время</p>
    </div>
  
  
    <a href="index.html" class="thankyou-goback">Вернуться назад</a>
  </div>
</body>
</html>