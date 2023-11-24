<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return back();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $joined = new Carbon($user->created_at);
        $joined = $joined->format("d F Y");
        $userPosts = $user->posts()->orderBy("created_at", "desc")->get();
        $createdAt = [];
        $postLikes = [];
        $comments = [];
        $onFollow = false;
        $auhtFollowerId = null;
        $authFollowingId = null;

        $userFollowers = [];
        $userFollowings = [];

        foreach ($userPosts as $post) {
            array_push($createdAt, $post->created_at->diffForHumans());
            array_push($postLikes, $post->likes);
            array_push($comments, $post->comments);
        }

        foreach ($user->followers as $follower) {
            if ($follower->follower_id == auth()->user()->id) {
                $onFollow = true;
                $auhtFollowerId = $follower->id;
            }
            array_push($userFollowers, User::findOrfail($follower->follower_id));
        }

        foreach ($user->following as $following) {
            array_push($userFollowings, User::findOrfail($following->toFollow_id));
        }

        foreach (auth()->user()->following as $authFollowing) {
            if ($authFollowing->toFollow_id == $user->id) {
                $authFollowingId = $authFollowing->id;
            }
        }


        $user->joined = $joined;
        $user->posts = $userPosts;
        $user->followersUpdated = $userFollowers;
        $user->followingUpdated = $userFollowings;

        $user->onFollow = $onFollow;
        $user->auhtFollowerId = $auhtFollowerId;
        $user->authFollowingId = $authFollowingId;

        $whoToFollow = [];
        $whoToFollowFollowers = [];
        $whoToFollowFollowing = [];
        $whoToFollowBio = [];
        $whoToFollowCover = [];

        array_push($whoToFollow, User::findOrfail(1));
        array_push($whoToFollow, User::where('id', '<>', $whoToFollow[0]->id)->inRandomOrder()->first());
        array_push($whoToFollow, User::whereNotIn('id', [$whoToFollow[0]->id, $whoToFollow[1]->id])->inRandomOrder()->first());

        foreach ($whoToFollow as $toFollow) {
            array_push($whoToFollowFollowers, $toFollow->followers);
            array_push($whoToFollowFollowing, $toFollow->following);
            array_push($whoToFollowBio, $toFollow->bio);
            array_push($whoToFollowCover, $toFollow->cover);
        }


        return Inertia::render('user/Index', compact('user', 'createdAt', 'postLikes', 'comments', 'whoToFollow', 'whoToFollowFollowers', 'whoToFollowFollowing', 'whoToFollowBio', 'whoToFollowCover'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // dd($request->all());
        $rules = [
            'name' => 'required|min:3|max:25',
            'bio' => 'max:100',
            'location' => 'max:50',
            'website' => 'max:80',
            'image' => 'file|image|max:2000|mimes:jpg,bmp,png,gif',
            'cover' => 'file|image|max:2000|mimes:jpg,bmp,png,gif',
        ];

        if ($request->username !== $user->username) {
            $rules['username'] = 'required|min:3|max:20|unique:users';
        }

        $validatedData = $request->validate($rules);

        if ($request->file('image')) {
            if ($request->oldImage) {
                unlink(public_path('profile/' . $user->image));
            }

            $file = $request->file('image');

            $destinationPath = public_path('profile');
            $hashedName = Str::random(20);
            $extension = $file->getClientOriginalExtension();
            $fileName = $hashedName . '.' . $extension;
            $validatedData['image'] = $fileName;
            $file->move($destinationPath, $fileName);
        }

        if ($request->file('cover')) {
            if ($request->oldCover) {
                unlink(public_path('cover/' . $user->cover));
            }

            $file = $request->file('cover');

            $destinationPath = public_path('cover');
            $hashedName = Str::random(20);
            $extension = $file->getClientOriginalExtension();
            $fileName = $hashedName . '.' . $extension;

            $validatedData['cover'] = $fileName;
            $file->move($destinationPath, $fileName);
        }

        try {
            User::where('id', $user->id)->update($validatedData);
            return redirect('/user/' . $user->id)->with('success', 'updated successfully!');
        } catch (\Exception $e) {
            return redirect('/user/' . $user->id)->with('error', 'something went wrong');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    /**
     * Show Followers data
     */

     public function followers(User $user)
     {

        $userFollowers = [];
        $followers = [];
        $followings = [];

        $whoToFollow = [];
        $whoToFollowFollowers = [];
        $whoToFollowFollowing = [];
        $whoToFollowBio = [];
        $whoToFollowCover = [];


        foreach ($user->followers as $follower) {
            array_push($userFollowers, User::findOrfail($follower->follower_id));
        }

        foreach ($userFollowers as $follower) {
            array_push($followers, $follower->followers);
        }

        foreach ($userFollowers as $following) {
            array_push($followings, $following->following);
        }

        $user->followersUpdated = $userFollowers;

        array_push($whoToFollow, User::findOrfail(1));
        array_push($whoToFollow, User::where('id', '<>', $whoToFollow[0]->id)->inRandomOrder()->first());
        array_push($whoToFollow, User::whereNotIn('id', [$whoToFollow[0]->id, $whoToFollow[1]->id])->inRandomOrder()->first());

        foreach ($whoToFollow as $toFollow) {
            array_push($whoToFollowFollowers, $toFollow->followers);
            array_push($whoToFollowFollowing, $toFollow->following);
            array_push($whoToFollowBio, $toFollow->bio);
            array_push($whoToFollowCover, $toFollow->cover);
        }

        // dd($user->posts);

        return Inertia::render('user/Followers', compact('user', 'whoToFollow', 'whoToFollowCover', 'whoToFollowBio', 'whoToFollowFollowers', 'whoToFollowFollowing', 'followers', 'followings'));
     }

    /**
     * Show Following data
     */

     public function following(User $user)
     {
        $userFollowings = [];
        $followings = [];
        $followers = [];


        $whoToFollow = [];
        $whoToFollowFollowers = [];
        $whoToFollowFollowing = [];
        $whoToFollowBio = [];
        $whoToFollowCover = [];


        foreach ($user->following as $following) {
            array_push($userFollowings, User::findOrfail($following->toFollow_id));
        }

        foreach($userFollowings as $follow) {
            array_push($followings, $follow->following);
        }

        foreach($userFollowings as $follower) {
            array_push($followers, $follower->followers);
        }

        array_push($whoToFollow, User::findOrfail(1));
        array_push($whoToFollow, User::where('id', '<>', $whoToFollow[0]->id)->inRandomOrder()->first());
        array_push($whoToFollow, User::whereNotIn('id', [$whoToFollow[0]->id, $whoToFollow[1]->id])->inRandomOrder()->first());

        foreach ($whoToFollow as $toFollow) {
            array_push($whoToFollowFollowers, $toFollow->followers);
            array_push($whoToFollowFollowing, $toFollow->following);
            array_push($whoToFollowBio, $toFollow->bio);
            array_push($whoToFollowCover, $toFollow->cover);
        }

        $user->followingUpdated = $userFollowings;
        return Inertia::render('user/Following', compact('user', 'whoToFollow', 'whoToFollowFollowers', 'whoToFollowFollowing', 'whoToFollowBio', 'whoToFollowCover', 'followings', 'followers'));
     }

     public function people()
     {
        $users = User::latest()->get();
        $whoToFollow = [];
        $whoToFollowFollowers = [];
        $whoToFollowFollowing = [];
        $whoToFollowBio = [];
        $whoToFollowCover = [];
        $followers = [];
        $following = [];
        $cover = [];
        $bio = [];


        array_push($whoToFollow, User::findOrfail(1));
        array_push($whoToFollow, User::where('id', '<>', $whoToFollow[0]->id)->inRandomOrder()->first());
        array_push($whoToFollow, User::whereNotIn('id', [$whoToFollow[0]->id, $whoToFollow[1]->id])->inRandomOrder()->first());

        foreach ($whoToFollow as $user) {
            array_push($whoToFollowFollowers, $user->followers);
            array_push($whoToFollowFollowing, $user->following);
            array_push($whoToFollowBio, $user->bio);
            array_push($whoToFollowCover, $user->cover);
        }

        foreach ($users as $user) {
            array_push($followers, $user->followers);
            array_push($following, $user->following);
            array_push($cover, $user->cover);
            array_push($bio, $user->bio);
        }

        return Inertia::render('user/People', compact('users', 'whoToFollow', 'whoToFollowBio', 'whoToFollowCover', 'whoToFollowFollowers', 'whoToFollowFollowing', 'followers', 'following', 'cover', 'bio'));
     }
}
