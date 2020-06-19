<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Player;
use App\Team;
use Intervention\Image\ImageManagerStatic as Image;

class PlayerController extends Controller
{

    public function index()
    {
        $player = Player::Join('teams', 'teams.id', '=', 'players.team_id')->selectRaw("concat(players.firstname, ' ', players.lastname) as player_name, players.country, players.player_image, teams.name, teams.state, teams.logo, players.id")->get();
        return response()->json($player);
    }

    public function store(Request $request)
    {
        if($request->get('player_image'))
        {
           $image = $request->get('player_image');
           $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           \Image::make($request->get('player_image'))->save(public_path('/storage/logo/images/').$name);
        }
        $player = new Player([
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'player_image' => $name,
            'player_jersey_number' => $request->get('player_jersey_number'),
            'team_id' => $request->get('team_id'),
            'country' => $request->get('country')
        ]);
        $player->save();
        return response()->json('Added Successfully.');
    }

    public function show($id)
    {
        $player['info'] = Player::where('players.id', $id)->Join('teams', 'teams.id', '=', 'players.team_id')->selectRaw("concat(players.firstname, ' ', players.lastname) as player_name, players.country, players.player_image, teams.name, teams.state, teams.logo")->first();
        $player['history'] = DB::table('player_history')->where('player_history.player_id', $id)->selectRaw("count(player_history.match_id) as matches, sum(player_history.runs) as total_runs, MAX(player_history.runs) as highest_score, sum(player_history.hundered) as hundered, sum(player_history.fifty) as fifty, sum(player_history.sixes) as sixes, sum(player_history.fours) as fours")->first();  
        return response()->json($player);
    }

    public function edit($id)
    {
        $data['team_list'] = Team::all();
        $data['player_info'] = Player::find($id);
        return response()->json($data);
    }
    
    public function update(Request $request, $id)
    {
        if($request->get('player_image'))
        {
           $image = $request->get('player_image');
           $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           \Image::make($request->get('player_image'))->save(public_path('/storage/logo/images/').$name);
        }

        $player = Player::find($id);
        $player->firstname = $request->get('firstname');
        $player->lastname = $request->get('lastname');
        $player->player_image = $name;
        $player->country = $request->get('country');
        $player->player_jersey_number = $request->get('player_jersey_number');
        $player->team_id = $request->get('team_id');
        $player->save();
        return response()->json('Updated Successfully.');
    }

    public function destroy($id)
    {
        //
    }
}
