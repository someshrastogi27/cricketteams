<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use Intervention\Image\ImageManagerStatic as Image;

class TeamController extends Controller
{
    public function index()
    {
        $team = Team::all();
        return response()->json($team);
    }

    public function store(Request $request)
    {
        if($request->get('image'))
        {
           $image = $request->get('image');
           $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           \Image::make($request->get('image'))->save(public_path('/storage/logo/images/').$name);
        }
        $team = new Team([
            'name' => $request->get('name'),
            'state' => $request->get('state'),
            'logo' => $name
        ]);
        $team->save();
        return response()->json('Added Successfully.');
    }

    public function show($id)
    {
        $data['team'] = Team::find($id);
        $data['player'] = Team::where('teams.id', $id)->Join('players', 'teams.id', '=', 'players.team_id')->select('players.*')->get();

        return response()->json($data);
    }

     public function edit($id)
    {
        $team = Team::find($id);
        return response()->json($team);
    }

    public function update(Request $request, $id)
    {
        if($request->get('image'))
        {
           $image = $request->get('image');
           $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           \Image::make($request->get('image'))->save(public_path('/storage/logo/images/').$name);
        }

        $team = Team::find($id);
        $team->name = $request->get('name');
        $team->state = $request->get('state');
        $team->logo = $name;
        $team->save();
        return response()->json('Updated Successfully.');
    }

    public function destroy($id)
    {
        //
    }
}
