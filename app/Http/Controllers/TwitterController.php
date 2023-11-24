<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TwitterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->get();
        $user = [];
        $followers = [];
        $following = [];
        $createdAt = [];
        $postLikes = [];
        $comments = [];

        $whoToFollow = [];
        $whoToFollowFollowers = [];
        $whoToFollowFollowing = [];
        $whoToFollowBio = [];
        $whoToFollowCover = [];

        foreach ($posts as $post) {
            array_push($user, $post->user->name);
            array_push($user, $post->user->followers);
            array_push($user, $post->user->following);
            array_push($createdAt, $post->created_at->diffForHumans());
            array_push($postLikes, $post->likes);
            array_push($comments, $post->comments);
        }
        
        array_push($whoToFollow, User::findOrfail(1));
        array_push($whoToFollow, User::where('id', '<>', $whoToFollow[0]->id)->inRandomOrder()->first());
        array_push($whoToFollow, User::whereNotIn('id', [$whoToFollow[0]->id, $whoToFollow[1]->id])->inRandomOrder()->first());

        foreach ($whoToFollow as $user) {
            array_push($whoToFollowFollowers, $user->followers);
            array_push($whoToFollowFollowing, $user->following);
            array_push($whoToFollowBio, $user->bio);
            array_push($whoToFollowCover, $user->cover);
        }


        return Inertia::render('twitter/Home', compact('posts', 'user', 'createdAt', 'postLikes', 'followers', 'following', 'whoToFollow', 'whoToFollowFollowers', 'whoToFollowFollowing', 'whoToFollowBio', 'whoToFollowCover'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $validatePost = $request->validate([
            'text' => 'required|max:255',
            'image' => 'file|image|max:2000|mimes:jpg,bmp,png,gif',
        ]);

        if ($request->file('image')) {
            $file = $request->file('image');

            $destinationPath = public_path('post-images');
            $hashedName = Str::random(20);
            $extension = $file->getClientOriginalExtension();
            $fileName = $hashedName . '.' . $extension;

            $validatePost['image'] = $fileName;
            $file->move($destinationPath, $fileName);
        }

        $validatePost['user_id'] = auth()->user()->id;

        try {
            Post::create($validatePost);
            return redirect('/twitter')->with('success', 'posted success!');
        } catch (\Exception $e) {
            return redirect('/twitter')->with('error', 'something went wrong');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $twitter)
    {
        $post = $twitter;
        $user = $post->user;
        $followers = $post->user->followers;
        $following = $post->user->following;
        $cmtFollowers = [];
        $cmtFollowing = [];
        $bio = $post->user->bio;
        $likes = $post->likes;
        $comments = $post->comments;
        // $latestComments = $post->comments()->orderBy('created_at','desc')->get();
        // $post->user->latestComments = $latestComments;
        // dd($post->user->latestComments);
        $userComment = [];
        $commentCreatedAt = [];

        $whoToFollow = [];
        $whoToFollowFollowers = [];
        $whoToFollowFollowing = [];
        $whoToFollowBio = [];
        $whoToFollowCover = [];



        foreach ($comments as $comment) {
            array_push($userComment, $comment->user);
            array_push($commentCreatedAt, $comment->created_at->diffForHumans());
            array_push($cmtFollowers, $comment->user->followers);
            array_push($cmtFollowing, $comment->user->following);
        }

        array_push($whoToFollow, User::findOrfail(1));
        array_push($whoToFollow, User::where('id', '<>', $whoToFollow[0]->id)->inRandomOrder()->first());
        array_push($whoToFollow, User::whereNotIn('id', [$whoToFollow[0]->id, $whoToFollow[1]->id])->inRandomOrder()->first());

        foreach ($whoToFollow as $user) {
            array_push($whoToFollowFollowers, $user->followers);
            array_push($whoToFollowFollowing, $user->following);
            array_push($whoToFollowBio, $user->bio);
            array_push($whoToFollowCover, $user->cover);
        }

        $createdAt = Carbon::parse($post->created_at)->format('H:i · j M Y');

        return Inertia::render('twitter/Show', compact('post', 'createdAt', 'user', 'likes', 'comments', 'userComment', 'commentCreatedAt', 'followers', 'following', 'bio', 'cmtFollowers', 'cmtFollowing', 'whoToFollow', 'whoToFollowFollowers', 'whoToFollowFollowing', 'whoToFollowBio', 'whoToFollowCover'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Post $twitter)
    {
        if ($twitter->image) {
            unlink(public_path('post-images/'. $twitter->image));
        }
        
        try {
            Post::where('id', $twitter->id)->delete();
            return redirect('/twitter')->with('success','deleted success!');
        } catch (\Exception $e) {
            return redirect('/twitter')->with('error', 'something went wrong');
        }
    }
}
