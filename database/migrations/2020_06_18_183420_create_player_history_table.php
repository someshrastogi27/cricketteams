<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayerHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_history', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('player_id');
            $table->integer('match_id');
            $table->integer('team_id');
            $table->integer('runs');
            $table->integer('hundered');
            $table->integer('fifty');
            $table->integer('fours');
            $table->integer('sixes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_history');
    }
}
