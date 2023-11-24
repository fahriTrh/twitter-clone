<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Fakhri',
            'email' => 'far@example.com',
            'username' => 'farskuy',
            'bio' => 'This is my bio',
            'location' => 'Medan',
            'password' => bcrypt('password'),
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Fakhriss',
            'email' => 'far1@example.com',
            'username' => 'far123',
            'bio' => 'This is my bio',
            'location' => 'Medan',
            'password' => bcrypt('password'),
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Gamal',
            'email' => 'mal@example.com',
            'username' => 'bro_gamal',
            'bio' => 'This is my bio',
            'location' => 'Jakarta',
            'password' => bcrypt('password'),
        ]);

        // Post::factory(10)->create();

        // \App\Models\Like::create([
        //     'user_id' => 1,
        //     'post_id' => 2,
        // ]);

        // \App\Models\Like::create([
        //     'user_id' => 2,
        //     'post_id' => 1,
        // ]);

        // \App\Models\Like::create([
        //     'user_id' => 3,
        //     'post_id' => 1,
        // ]);

    }
}
