<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Match;
use App\Team;
use App\Player;

class MatchController extends Controller
{
    public function index()
    {
        $match = Match::Join("teams as t1", 'matches.team1_id', '=', 't1.id')
                ->Join("teams as t2", "matches.team2_id", '=', 't2.id')
                ->select("matches.id as id", "t1.name as team1_name", "t1.logo as team1_logo", "t1.state as team1_state", "t2.name as team2_name", "t2.logo as team2_logo", "t2.state as team2_state", "matches.date")
                ->get();       
        return response()->json($match);
    }

    public function create()
    {
        $team = Team::all();
        return response()->json($team);
    }

    public function store(Request $request)
    {
        $match = new Match([
            'team1_id' => $request->get('team1_id'),
            'team2_id' => $request->get('team2_id'),
            'date' => date('Y-m-d', strtotime($request->get('date')))
        ]);
        $match->save();
        return response()->json('Added Successfully.');
    }

    public function show($id)
    {
        
        $first = Match::Join('teams', 'matches.team1_id', '=', 'teams.id')
        ->select("teams.id as team_id", "teams.name as team_name", "teams.state as team_state", "teams.logo as team_logo")
        ->where('matches.id', '=', $id);

        $data['teams'] =  Match::Join('teams', 'matches.team2_id', '=', 'teams.id')
        ->select("teams.id as team_id", "teams.name as team_name", "teams.state as team_state", "teams.logo as team_logo")    
        ->where('matches.id', '=', $id)
        ->union($first)
        ->get();

        $data['match_detail'] =  Match::Join("teams as t1", 'matches.team1_id', '=', 't1.id')
        ->Join("teams as t2", "matches.team2_id", '=', 't2.id')
        ->select("matches.id as id", "t1.name as team1_name", "t1.logo as team1_logo", "t1.state as team1_state", "t2.name as team2_name", "t2.logo as team2_logo", "t2.state as team2_state", "matches.date")
        ->find($id);   
        
        return response()->json($data);
    }

    public function edit($id)
    {
        $data['team'] = Team::all();
        $data['match'] = Match::find($id);
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        $match = Match::find($id);
        $match->team1_id = $request->get('team1_id');
        $match->team2_id = $request->get('team2_id');
        $match->date = $request->get('date');
        $match->save();
        return response()->json('Updated Successfully.');
    }

    public function destroy($id)
    {
        //
    }

    public function match_result(Request $request){
        $match = Match::find($request->get('match_id'));
        $data_winner = array();
        $data_loser= array();
        if($match['team1_id'] == $request->get('team_id')){
            $data_winner['match_id'] = $request->get('match_id');
            $data_winner['team_id'] = $request->get('team_id');
            $data_winner['status'] = $request->get('status');
            if($request->get('status') == 1){
                $data_winner['points'] = 2;
                $data_loser['points'] = 0;
            } else if($request->get('status') == 3){
                $data_winner['points'] = 1;
                $data_loser['points'] = 1;
            } else {
                $data_winner['points'] = 0;
                $data_loser['points'] = 2;
            }            
            $data_loser['match_id'] = $request->get('match_id');
            $data_loser['team_id'] = $match['team2_id'];
            $data_loser['status'] = $request->get('status');
            $data_loser['created_at'] = date('Y-m-d H:i:s');
            $data_loser['updated_at'] = date('Y-m-d H:i:s');
            $data_winner['created_at'] = date('Y-m-d H:i:s');
            $data_winner['updated_at'] = date('Y-m-d H:i:s');
        } else if($match['team2_id'] == $request->get('team_id')){
            $data_winner['match_id'] = $request->get('match_id');
            $data_winner['team_id'] = $request->get('team_id');
            $data_winner['status'] = $request->get('status');
            if($request->get('status') == 1){
                $data_winner['points'] = 2;
                $data_loser['points'] = 0;
            } else if($request->get('status') == 3){
                $data_winner['points'] = 1;
                $data_loser['points'] = 1;
            } else {
                $data_winner['points'] = 0;
                $data_loser['points'] = 2;
            }             
            $data_loser['match_id'] = $request->get('match_id');
            $data_loser['team_id'] = $match['team1_id'];
            $data_loser['status'] = $request->get('status');
            $data_loser['created_at'] = date('Y-m-d H:i:s');
            $data_loser['updated_at'] = date('Y-m-d H:i:s');
            $data_winner['created_at'] = date('Y-m-d H:i:s');
            $data_winner['updated_at'] = date('Y-m-d H:i:s');
        }

        DB::table('winning')->insert($data_winner);
        DB::table('winning')->insert($data_loser);
        return response()->json('Added Successfully.');
    }

    public function player_listing(Request $request){
        $player = Player::where('players.team_id', $request->get('team_id'))->selectRaw("concat(players.firstname, ' ', players.lastname) as player_name, players.id as player_id")->get();
        return response()->json($player);
    }

    public function history_save(Request $request){
        $history['match_id'] = $request->get('match_id');
        $history['team_id'] = $request->get('team_id');
        $history['player_id'] = $request->get('player_id');
        $history['runs'] = $request->get('runs');
        $history['hundered'] = $request->get('hundered');
        $history['fifty'] = $request->get('fifty');
        $history['sixes'] = $request->get('sixes');
        $history['fours'] = $request->get('fours');
        $history['created_at'] = date('Y-m-d H:i:s');
        $history['updated_at'] = date('Y-m-d H:i:s');
        DB::table('player_history')->insert($history);
        return response()->json('Added Successfully.');
    }

    public function points(){
        $points= DB::table('winning')->join('teams', 'teams.id', '=', 'winning.team_id')->selectRaw("sum(winning.match_id) as matches, sum(winning.points) as points, IF(winning.status = 1, sum(winning.status), 0) as winner, IF(winning.status = 2, sum(winning.status), 0) as Lost, IF(winning.status = 3, sum(winning.status), 0) as Tie, teams.name")->groupBy('winning.team_id')->get();
        return response()->json($points);
    }
}
