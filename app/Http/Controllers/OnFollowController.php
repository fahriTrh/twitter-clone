<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Models\Following;
use Illuminate\Http\Request;

class OnFollowController extends Controller
{
    public function store(Request $request)
    {
        try {
            Follower::create([
                'user_id' => $request->toFollowId,
                'follower_id' => $request->followerId,
            ]);
    
            Following::create([
                'user_id' => $request->followerId,
                'toFollow_id' => $request->toFollowId
            ]);
        return back()->with('success','success to follow!');
        } catch (\Exception $e) {
            return back()->with('error', 'something went wrong');
        }
        
    }
    
    public function destroy(Request $request)
    {
        try {
            Follower::where('id', $request->followerId)->delete();
            Following::where('id', $request->followingId)->delete();
            return back()->with('success','success to unfollow!');
        } catch (\Exception $e) {
            return back()->with('error', 'something went wrong');
        }
    }
}
