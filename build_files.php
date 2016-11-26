<?php

require('vendor/autoload.php');

$converter = new Youthweb\SmileyEmojiMigration\Converter();

$converter->toJsonFile('dist/smilies.json');
$converter->toJavaScriptFile('dist/smilies.js');
$converter->toNodeModule('lib/Smileystore.js');

echo "All files created. 🚀\n";
