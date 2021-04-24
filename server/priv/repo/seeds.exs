# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsSpa.Repo.insert!(%EventsSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventsSpa.Repo
alias EventsSpa.Users.User
alias EventsSpa.Posts.Post
#alias EventsSpa.Photos

defmodule Inject do

  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

alice = Inject.user("alice", "alice@test.com", "test1")
bob = Inject.user("bob", "bob@test.com", "test2")


p1 = %Post{
  user_id: alice.id,
  title: "Alice says Hi!",
  date: "Sunday May 30 2021 00:00:00 GMT-0400 (Eastern Daylight Time)",
  description: "Blah blah blah blah"
}
Repo.insert!(p1)

p2 = %Post{
  user_id: bob.id,
  title: "Bob's party",
  date: "Monday May 31 2021 00:00:00 GMT-0400 (Eastern Daylight Time)",
  description: "Blah blah "
}
Repo.insert!(p2)
