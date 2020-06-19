<?php

use Faker\Generator as Faker;

$factory->define(App\Player::class, function (Faker $faker) {
    return [
        'firstname' => $faker->firstname,
        'lastname' => $faker->lastname,
        'player_image' => $faker->image('public/storage/logo/images',640,480, null, false),
        'player_jersey_number' => $faker->randomDigit,
        'team_id' => $faker->randomDigit,
        'country' => $faker->country
    ];
});
