<?php
echo str_replace('##BASE_URL##', dirname($_SERVER['PHP_SELF']) . '/', file_get_contents('index.template.html'));