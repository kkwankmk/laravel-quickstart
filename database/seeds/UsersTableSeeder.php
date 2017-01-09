<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => "test",
            'email' => 'a@a.com',
            'password' => bcrypt('test'),
            'api_token' => str_random(60),
        ]);
    }
}
