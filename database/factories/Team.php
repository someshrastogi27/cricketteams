<?php

use Faker\Generator as Faker;

$factory->define(App\Team::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'logo' => $faker->image('public/storage/logo/images',640,480, null, false),
        'state' => $faker->name
    ];
});
