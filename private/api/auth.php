<?php
    #Массив с параметрами, которые нужно передать методом POST к API системы
    $user=array(
      'USER_LOGIN'=>'info@atlant.black', #Ваш логин (электронная почта)
      'USER_HASH'=>'0e63158626fcc55c1653a2eb54bed189' #Хэш для доступа к API (смотрите в профиле пользователя)
    );

    $subdomain='test'; #Наш аккаунт - поддомен

    #Формируем ссылку для запроса
    $link='https://'.$subdomain.'.amocrm.ru/private/api/auth.php?type=json';
?>