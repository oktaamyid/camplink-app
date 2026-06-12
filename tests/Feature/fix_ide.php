<?php
$files = ['tests/Feature/Settings/ProfileUpdateTest.php', 'tests/Feature/TeamRecruitmentTest.php'];
foreach ($files as $file) {
    $content = file_get_contents($file);
    $content = preg_replace('/(function\s*\([^\)]*\)\s*\{)/', '$1' . "\n    /** @var \Tests\TestCase \$this */", $content);
    file_put_contents($file, $content);
}
